import { expect, test, type Page } from '@playwright/test';

/**
 * Observable-behavior tests for the profile control. Rotation is measured by
 * sampling the rendered transform per animation frame and unwrapping angles;
 * assertions cover what a visitor can observe (motion totals, final face,
 * labels, focus, layout), never internal controller state. Engine note: headless
 * WebKit cannot deliver Tab focus traversal (tool gap); that engine exercises
 * keyboard activation from a focused button instead.
 */

interface SpinSample {
  total: number;
  end: number;
}

interface FaceState {
  label: string | null;
  rot: number;
  frontVis: string;
  backVis: string;
}

function delay(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
}

async function sampleRotation(page: Page, ms: number): Promise<SpinSample> {
  return page.evaluate(async (duration) => {
    const samples: number[] = [];
    const start = performance.now();
    const { promise, resolve } = Promise.withResolvers<void>();
    const tick = () => {
      const el = document.querySelector('[data-profile-flipper]');
      let deg = 0;
      if (el) {
        const m = /matrix3d\((.+)\)/.exec(getComputedStyle(el).transform);
        if (m?.[1]) {
          const v = m[1].split(',').map(Number);
          deg = (Math.atan2(-(v[2] ?? 0), v[0] ?? 1) * 180) / Math.PI;
        }
      }
      samples.push(deg);
      if (performance.now() - start < duration) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
    await promise;
    let total = 0;
    for (let i = 1; i < samples.length; i++) {
      let d = (samples[i] ?? 0) - (samples[i - 1] ?? 0);
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      total += Math.abs(d);
    }
    return { total: Math.round(total), end: Math.round(samples[samples.length - 1] ?? 0) };
  }, ms);
}

async function faceState(page: Page): Promise<FaceState> {
  return page.evaluate(() => {
    const flipper = document.querySelector('[data-profile-flipper]');
    const front = document.querySelector('.profile__face--front');
    const back = document.querySelector('.profile__face--back');
    let rot = 0;
    if (flipper) {
      const m = /matrix3d\((.+)\)/.exec(getComputedStyle(flipper).transform);
      if (m?.[1]) {
        const v = m[1].split(',').map(Number);
        rot = Math.round((Math.atan2(-(v[2] ?? 0), v[0] ?? 1) * 180) / Math.PI);
      }
    }
    return {
      label: document.querySelector('[data-profile] button')?.getAttribute('aria-label') ?? null,
      rot,
      frontVis: front ? getComputedStyle(front).visibility : 'missing',
      backVis: back ? getComputedStyle(back).visibility : 'missing',
    };
  });
}

async function runningAnimations(page: Page): Promise<number> {
  return page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  );
}

// Recorder slot installed on the page by armSpinRecorder (page-side scratch).
type SpinRecorderWindow = Window & { __spinSamples?: number[] };

/**
 * Records rotation continuously from the first frame on (zeros before the
 * flipper exists). Resolves only once the recorder demonstrably captured a
 * frame, so tests can trigger the intro without a timing sleep.
 */
async function armSpinRecorder(page: Page): Promise<void> {
  await page.evaluate(() => {
    const holder = window as SpinRecorderWindow;
    if (holder.__spinSamples) return;
    const samples: number[] = [];
    holder.__spinSamples = samples;
    const tick = () => {
      const el = document.querySelector('[data-profile-flipper]');
      let deg = 0;
      if (el) {
        const m = /matrix3d\((.+)\)/.exec(getComputedStyle(el).transform);
        if (m?.[1]) {
          const v = m[1].split(',').map(Number);
          deg = (Math.atan2(-(v[2] ?? 0), v[0] ?? 1) * 180) / Math.PI;
        }
      }
      samples.push(deg);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await page.waitForFunction(() => {
    const holder = window as SpinRecorderWindow;
    return (holder.__spinSamples?.length ?? 0) > 0;
  });
}

// Unwrapping duplicates sampleRotation's page-side math because evaluated
// functions cannot close over module helpers.
async function readRecordedSpin(page: Page): Promise<SpinSample> {
  return page.evaluate(() => {
    const holder = window as SpinRecorderWindow;
    const samples = holder.__spinSamples ?? [];
    let total = 0;
    for (let i = 1; i < samples.length; i++) {
      let d = (samples[i] ?? 0) - (samples[i - 1] ?? 0);
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      total += Math.abs(d);
    }
    return { total: Math.round(total), end: Math.round(samples[samples.length - 1] ?? 0) };
  });
}

test('first presentation plays two rotations and settles on the frog', async ({ page }) => {
  // Hold the portrait request so the intro cannot start before sampling is
  // armed; the sampler then captures the initial zero-rotation state and the
  // complete animation (the decelerating easing makes lost early frames skew
  // the total low).
  const { promise: gate, resolve: release } = Promise.withResolvers<void>();
  await page.route('**/*sourav-portrait*', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await armSpinRecorder(page);
  release();

  await expect(page.locator('[data-profile] button')).toHaveAttribute('aria-label', 'Show my photograph');
  const before = await page.locator('[data-profile]').boundingBox();
  await delay(3000); // full intro window (2.4s) observed by the recorder
  const spin = await readRecordedSpin(page);
  expect(spin.total).toBeGreaterThan(650);
  expect(spin.total).toBeLessThan(790);
  expect(Math.abs(spin.end)).toBeLessThan(15);

  const state = await faceState(page);
  expect(state.label).toBe('Show my photograph');
  expect(state.frontVis).toBe('visible');
  expect(state.backVis).toBe('hidden');

  const after = await page.locator('[data-profile]').boundingBox();
  expect(after).toEqual(before);
});

test('intro does not repeat on reload, scroll, or resize', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-profile] button')).toBeVisible();
  await delay(3000);

  await page.reload();
  await expect(page.locator('[data-profile] button')).toBeVisible();
  expect((await sampleRotation(page, 1200)).total).toBeLessThan(10);

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await delay(300);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await delay(300);
  await page.setViewportSize({ width: 1024, height: 768 });
  expect((await sampleRotation(page, 800)).total).toBeLessThan(10);
});

test('activation toggles between the faces with matching labels', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('[data-profile] button');
  await expect(button).toHaveAttribute('aria-label', 'Show my photograph');

  await button.click();
  await delay(700);
  const portrait = await faceState(page);
  expect(portrait.label).toBe('Show my frog avatar');
  expect(Math.abs(Math.abs(portrait.rot) - 180)).toBeLessThan(10);
  expect(portrait.frontVis).toBe('hidden');
  expect(portrait.backVis).toBe('visible');

  await button.click();
  await delay(700);
  const frog = await faceState(page);
  expect(frog.label).toBe('Show my photograph');
  expect(Math.abs(frog.rot)).toBeLessThan(10);
  expect(frog.frontVis).toBe('visible');
  expect(frog.backVis).toBe('hidden');
});

test('keyboard activation works with a stationary focus ring and no scrolling', async ({ page, browserName }) => {
  await page.goto('/');
  const button = page.locator('[data-profile] button');
  await expect(button).toBeVisible();

  if (browserName === 'webkit') {
    // Headless WebKit drops Tab focus traversal; focus the control directly
    // and validate keyboard activation and the visible ring from there.
    await button.focus();
  } else {
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const onButton = await page.evaluate(
        () => document.activeElement === document.querySelector('[data-profile] button'),
      );
      if (onButton) break;
    }
  }
  const focus = await page.evaluate(() => {
    const b = document.querySelector('[data-profile] button');
    return {
      onButton: document.activeElement === b,
      outline: b ? getComputedStyle(b).outlineStyle : 'none',
    };
  });
  expect(focus.onButton).toBe(true);
  expect(focus.outline).toBe('solid');

  const boxBefore = await button.boundingBox();
  const scrollBefore = await page.evaluate(() => window.scrollY);

  await page.keyboard.press('Space');
  await expect(button).toHaveAttribute('aria-label', 'Show my frog avatar');
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);

  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-label', 'Show my photograph');
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  expect(await button.boundingBox()).toEqual(boxBefore);
});

test('activation during the intro cancels it; rapid input resolves to the latest face', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('[data-profile] button');
  await button.waitFor();

  await button.click(); // mid-intro: cancel and go to the portrait
  const spin = await sampleRotation(page, 1400);
  expect(Math.abs(Math.abs(spin.end) - 180)).toBeLessThan(25);
  expect(spin.total).toBeLessThan(500);

  for (let i = 0; i < 5; i++) {
    await button.click();
    await delay(40);
  }
  await delay(900);
  const state = await faceState(page);
  expect(state.label).toBe('Show my photograph');
  expect(Math.abs(state.rot)).toBeLessThan(10);
  expect(await runningAnimations(page)).toBe(0);
});

test('reduced motion: no intro and immediate deliberate switching', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-profile] button')).toBeVisible();
  expect((await sampleRotation(page, 1100)).total).toBeLessThan(10);

  await page.locator('[data-profile] button').click();
  // Deliberate changes are immediate: within a quarter second the portrait
  // is settled and nothing is still animating (a 500ms flip would still be
  // mid-flight at that point).
  await expect
    .poll(async () => Math.abs(Math.abs((await faceState(page)).rot) - 180), { timeout: 250 })
    .toBeLessThan(10);
  const state = await faceState(page);
  expect(state.label).toBe('Show my frog avatar');
  expect(state.backVis).toBe('visible');
  expect(await runningAnimations(page)).toBe(0);
});

test('enabling reduced motion mid-spin settles promptly on the intended face', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-profile] button').waitFor();
  await delay(500);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await delay(150);

  const state = await faceState(page);
  expect(state.label).toBe('Show my photograph');
  expect(Math.abs(state.rot)).toBeLessThan(10);
  expect(state.frontVis).toBe('visible');
  expect(await runningAnimations(page)).toBe(0);
});

test('storage failure keeps the control working without errors or looping', async ({ browser }) => {
  const context = await browser.newContext();
  await context.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new DOMException('storage denied', 'SecurityError');
      },
    });
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.goto('/');
  await expect(page.locator('[data-profile] button')).toBeVisible();
  const spin = await sampleRotation(page, 3400);
  expect(spin.total).toBeLessThan(820); // at most one intro in this document

  await page.locator('[data-profile] button').click();
  await delay(700);
  expect((await faceState(page)).label).toBe('Show my frog avatar');
  expect(errors).toEqual([]);
  await context.close();
});

test('portrait failure keeps the static frog and suppresses flipping', async ({ browser }) => {
  const context = await browser.newContext();
  await context.route('**/*sourav-portrait*', (route) => route.abort());
  const page = await context.newPage();

  await page.goto('/');
  const frog = page.locator('img[data-profile-frog]');
  await expect(frog).toBeVisible();
  await expect(frog).toHaveAttribute('alt', /frog/i);
  await delay(1500);
  await expect(page.locator('[data-profile] button')).toHaveCount(0);
  await context.close();
});

test('slow portrait delays enhancement without layout shift', async ({ browser }) => {
  const context = await browser.newContext();
  const { promise: gate, resolve: release } = Promise.withResolvers<void>();
  await context.route('**/*sourav-portrait*', async (route) => {
    await gate;
    await route.continue();
  });
  const page = await context.newPage();
  // domcontentloaded: the pending portrait delays the load event, and the
  // pre-enhancement state must be observable while the request is held.
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const frog = page.locator('img[data-profile-frog]');
  await expect(frog).toBeVisible();
  const before = await page.locator('[data-profile]').boundingBox();
  await delay(400);
  await expect(page.locator('[data-profile] button')).toHaveCount(0);

  release();
  await expect(page.locator('[data-profile] button')).toBeVisible({ timeout: 3000 });
  const after = await page.locator('[data-profile]').boundingBox();
  expect(Math.abs((after?.width ?? 0) - (before?.width ?? 0))).toBeLessThanOrEqual(2);
  expect(Math.abs((after?.height ?? 0) - (before?.height ?? 0))).toBeLessThanOrEqual(2);
  await context.close();
});

test('print shows the static frog regardless of selected face or motion', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('[data-profile] button');
  await button.waitFor();

  const printedFrog = async () => {
    await page.emulateMedia({ media: 'print' });
    const printed = await page.evaluate(() => {
      const flipper = document.querySelector('[data-profile-flipper]');
      const front = document.querySelector('.profile__face--front');
      const back = document.querySelector('.profile__face--back');
      return {
        flipperTransform: flipper ? getComputedStyle(flipper).transform : 'missing',
        frontVis: front ? getComputedStyle(front).visibility : 'missing',
        backDisplay: back ? getComputedStyle(back).display : 'missing',
      };
    });
    await page.emulateMedia({ media: null });
    return printed;
  };

  // Portrait selected: the print stylesheet must restore the frog.
  await button.click();
  await delay(700);
  expect((await faceState(page)).frontVis).toBe('hidden');
  expect(await printedFrog()).toEqual({
    flipperTransform: 'none',
    frontVis: 'visible',
    backDisplay: 'none',
  });

  // Mid-animation: same static frog, no half-turned flipper.
  await button.click();
  await delay(120);
  expect(await printedFrog()).toEqual({
    flipperTransform: 'none',
    frontVis: 'visible',
    backDisplay: 'none',
  });
});

test('offscreen first render starts no hidden intro; first visibility plays it', async ({ browser }) => {
  const context = await browser.newContext();
  const { promise: gate, resolve: release } = Promise.withResolvers<void>();
  await context.route('**/*sourav-portrait*', async (route) => {
    await gate;
    await route.continue();
  });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));

  release();
  await expect(page.locator('[data-profile] button')).toBeVisible({ timeout: 3000 });
  expect((await sampleRotation(page, 1200)).total).toBeLessThan(10);

  // Arm the recorder before the scroll that triggers the intro.
  await armSpinRecorder(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await delay(3000);
  const spin = await readRecordedSpin(page);
  expect(spin.total).toBeGreaterThan(650);
  expect(Math.abs(spin.end)).toBeLessThan(15);
  await context.close();
});
