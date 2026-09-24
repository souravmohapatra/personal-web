import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const EXTERNAL_LINKS = [
  'https://doi.org/10.1145/3676641.3715989',
  'https://doi.org/10.11591/ijece.v8i1.pp429-440',
  'https://github.com/souravmohapatra',
  'https://www.instagram.com/sourav.mohapatra_/',
  'https://www.linkedin.com/in/souravmohapatra/',
  'https://repository.tudelft.nl/file/File_51b0fa32-fc48-4611-8f4c-52416207f320',
  'https://scholar.google.com/citations?hl=en&user=9c6V7nwAAAAJ',
];

const SECTIONS = [
  'Engineering work',
  'Under the night sky',
  'Research',
  'Career and education',
  'Away from work',
];

test('home renders content with no page errors or failed first-party resources', async ({ page }) => {
  const errors: string[] = [];
  const failed: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) {
      failed.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Sourav Mohapatra' })).toBeVisible();
  for (const heading of SECTIONS) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test('local 404 page renders usable content', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByRole('heading', { name: /This page doesn/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to the front page/ })).toBeVisible();
});

test('navigation links and hash targets resolve', async ({ page }) => {
  await page.goto('/');
  for (const hash of ['#work', '#photography', '#research', '#about']) {
    const link = page.locator(`nav[aria-label="Primary"] a[href="/${hash}"]`);
    await expect(link).toHaveCount(1);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${hash}$`));
    await expect(page.locator(hash)).toBeInViewport();
  }
  await expect(page.locator('a[href="#career"]')).toHaveCount(1);
});

test('hash URLs load directly to visible targets', async ({ page }) => {
  for (const hash of ['#work', '#photography', '#research', '#career', '#about']) {
    await page.goto(`/${hash}`);
    await expect(page.locator(hash)).toBeInViewport();
  }
});

test('external links match the verified destinations', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="https://"]')].map((a) => (a as HTMLAnchorElement).href),
  );
  expect([...new Set(hrefs)].sort()).toEqual([...EXTERNAL_LINKS].sort());
});

test('page load makes no third-party runtime requests', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1')) external.push(request.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(external).toEqual([]);
});

test('no horizontal overflow at target widths', async ({ page }) => {
  for (const [width, height] of [
    [320, 740],
    [375, 812],
    [768, 1024],
    [1024, 768],
    [1440, 900],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `viewport width ${width}`).toBeLessThanOrEqual(1);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('content, links, and static avatar stay usable', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Sourav Mohapatra' })).toBeVisible();
    for (const heading of SECTIONS) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
    const frog = page.locator('img[data-profile-frog]');
    await expect(frog).toBeVisible();
    await expect(frog).toHaveAttribute('alt', /.+/);
    await expect(page.locator('[data-profile] button')).toHaveCount(0);
    await expect(
      page.getByRole('navigation', { name: 'Profiles' }).getByRole('link', { name: 'LinkedIn' }),
    ).toBeVisible();
  });
});

test('empty photography section is a finished presentation', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#photography');
  await expect(section.getByRole('link', { name: 'Instagram' })).toBeVisible();
  await expect(section.locator('img, figure')).toHaveCount(0);
  await expect(section).not.toContainText(/coming soon/i);
});

test('axe scan: no serious or critical violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-profile] button')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const serious = results.violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => `${violation.id}: ${violation.help}`);
  expect(serious).toEqual([]);
});

test('axe scan in reduced motion: no serious or critical violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-profile] button')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const serious = results.violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => `${violation.id}: ${violation.help}`);
  expect(serious).toEqual([]);
});
