/**
 * Progressive enhancement for the circular two-sided profile control.
 *
 * The server renders a static frog avatar. Only once this script and both
 * images are ready does the control become a flip button (frog front,
 * portrait back):
 *
 *   - First visible presentation per browser tab session: two full Y-axis
 *     rotations (720°) over ~2.4s, decelerating onto the frog. Plays once;
 *     never on scroll, resize, focus, or reload within the session.
 *   - Activation (click, tap, Enter, Space) rotates 180° in ~500ms to the
 *     other face. The chosen face stays until the next activation.
 *   - Activation during the intro cancels the flourish and goes to the
 *     portrait; rapid input always resolves to the latest requested face
 *     with no queued spins or stale labels.
 *   - Reduced motion: frog at first render, no intro, immediate face
 *     switches; a mid-animation preference change settles at once.
 *   - A failed portrait leaves the static frog in place and suppresses
 *     flipping entirely. Storage failures are non-fatal.
 *
 * Only the inner flipper rotates; layout and the focus ring stay put.
 */

const INTRO_DEGREES = 720;
const INTRO_MS = 2400;
const FLIP_MS = 500;
const INTRO_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'; // gentle deceleration
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const SESSION_KEY = 'beng-profile-intro-played';

type Face = 'frog' | 'portrait';

const ACTION_LABEL: Record<Face, string> = {
  frog: 'Show my photograph',
  portrait: 'Show my frog avatar',
};

const FACE_DEGREES: Record<Face, number> = {
  frog: 0,
  portrait: 180,
};

/** Current Y rotation in degrees, wrapped to (-180, 180]. */
function rotationOf(el: HTMLElement): number {
  const match = /matrix3d\((.+)\)/.exec(getComputedStyle(el).transform);
  if (!match?.[1]) return 0;
  const values = match[1].split(',').map(Number);
  const m11 = values[0] ?? 1;
  const m13 = values[2] ?? 0;
  return (Math.atan2(-m13, m11) * 180) / Math.PI;
}

/** Nearest rotation showing `face`, from the current visual position. */
function nearestRotation(from: number, face: Face): number {
  let delta = (((FACE_DEGREES[face] - from) % 360) + 360) % 360;
  if (delta > 180) delta -= 360;
  return from + delta;
}

function readIntroPlayed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function storeIntroPlayed(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Storage unavailable: the in-memory flag still keeps the intro single-play.
  }
}

/** Resolves with the image once it is loaded and decoded; rejects otherwise. */
async function readyImage(img: HTMLImageElement): Promise<HTMLImageElement> {
  if (img.decode) {
    await img.decode();
  }
  if (!img.naturalWidth) {
    throw new Error('image failed to load');
  }
  return img;
}

function enhance(root: HTMLElement): void {
  const frogImg = root.querySelector<HTMLImageElement>('img[data-profile-frog]');
  const portraitSrc = root.dataset['portraitSrc'];
  if (!frogImg || !portraitSrc) return;

  const portraitImg = new Image();
  portraitImg.decoding = 'async';
  portraitImg.src = portraitSrc;

  Promise.all([readyImage(frogImg), readyImage(portraitImg)])
    .then(() => mount(root, frogImg, portraitImg))
    .catch(() => {
      // Portrait (or frog) unusable: keep the static frog, suppress flipping.
    });
}

function mount(
  root: HTMLElement,
  frogImg: HTMLImageElement,
  portraitImg: HTMLImageElement,
): void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'profile__button';
  button.setAttribute('aria-label', ACTION_LABEL.frog);

  const scene = document.createElement('span');
  scene.className = 'profile__scene';
  const flipper = document.createElement('span');
  flipper.className = 'profile__flipper';
  flipper.dataset['profileFlipper'] = '';
  scene.append(flipper);

  // Faces are wrapper spans: WebKit culls backfaces unreliably when the
  // transform/backface-visibility sits on a replaced element (img).
  frogImg.alt = '';
  frogImg.setAttribute('aria-hidden', 'true');
  const front = document.createElement('span');
  front.className = 'profile__face profile__face--front';
  front.setAttribute('aria-hidden', 'true');

  // Enhancement swap happens while the frog is still in the layout: the button
  // takes the static img's place (same footprint), then the frog moves into
  // its face wrapper. The already-laid-out hint simply becomes visible.
  frogImg.replaceWith(button);
  front.append(frogImg);
  root.querySelector('[data-profile-hint]')?.classList.remove('profile__hint--idle');

  portraitImg.alt = '';
  portraitImg.setAttribute('aria-hidden', 'true');
  const back = document.createElement('span');
  back.className = 'profile__face profile__face--back';
  back.setAttribute('aria-hidden', 'true');
  back.append(portraitImg);

  flipper.append(front, back);
  button.append(scene);

  const state = {
    face: 'frog' as Face,
    activated: false,
    animation: null as Animation | null,
  };
  let introPlayed = readIntroPlayed() || reduceMotion.matches;
  let inView = false;
  let paintFrame = 0;

  // Some engines (WebKit in raster) do not cull 3D backfaces reliably, so
  // face visibility is also driven from rotation parity — exactly the
  // semantics of backface-visibility: front while |rotation| < 90 (mod 360).
  function paint(rotation: number): void {
    const frontFacing = Math.cos((rotation * Math.PI) / 180) >= 0;
    front.style.visibility = frontFacing ? 'visible' : 'hidden';
    back.style.visibility = frontFacing ? 'hidden' : 'visible';
  }

  function paintLoop(): void {
    paint(rotationOf(flipper));
    if (state.animation) {
      paintFrame = requestAnimationFrame(paintLoop);
    } else {
      paintFrame = 0;
    }
  }

  function cancelAnimation(): void {
    state.animation?.cancel();
    state.animation = null;
  }

  /** Snap straight to a face: no motion at all. */
  function setFaceNow(face: Face): void {
    cancelAnimation();
    flipper.style.transform = `rotateY(${FACE_DEGREES[face]}deg)`;
    paint(FACE_DEGREES[face]);
    state.face = face;
    button.setAttribute('aria-label', ACTION_LABEL[face]);
  }

  function animateTo(target: number, duration: number, easing: string): void {
    const from = rotationOf(flipper); // read before cancel: no visual snap
    cancelAnimation();
    if (reduceMotion.matches) {
      flipper.style.transform = `rotateY(${target}deg)`;
      return;
    }
    const animation = flipper.animate(
      [
        { transform: `rotateY(${from}deg)` },
        { transform: `rotateY(${target}deg)` },
      ],
      { duration, easing },
    );
    state.animation = animation;
    if (paintFrame === 0) {
      paintFrame = requestAnimationFrame(paintLoop);
    }
    animation.addEventListener('finish', () => {
      if (state.animation !== animation) return;
      flipper.style.transform = `rotateY(${target}deg)`;
      paint(target);
      state.animation = null;
    });
    animation.addEventListener('cancel', () => {
      if (state.animation === animation) state.animation = null;
    });
  }

  function playIntro(): void {
    if (introPlayed) return;
    introPlayed = true;
    storeIntroPlayed();
    animateTo(INTRO_DEGREES, INTRO_MS, INTRO_EASING);
  }

  function maybePlayIntro(): void {
    if (introPlayed || state.activated || !inView || document.hidden) return;
    if (state.face !== 'frog') return;
    playIntro();
  }

  function activate(): void {
    state.activated = true;
    state.face = state.face === 'frog' ? 'portrait' : 'frog';
    button.setAttribute('aria-label', ACTION_LABEL[state.face]);
    if (reduceMotion.matches) {
      setFaceNow(state.face);
      return;
    }
    animateTo(
      nearestRotation(rotationOf(flipper), state.face),
      FLIP_MS,
      FLIP_EASING,
    );
  }

  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      if (inView) maybePlayIntro();
    },
    { threshold: 0.5 },
  );
  observer.observe(root);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Settle safely; never replay a surprise spin on return.
      if (state.animation) setFaceNow(state.face);
    } else {
      maybePlayIntro();
    }
  });

  reduceMotion.addEventListener('change', () => {
    if (!reduceMotion.matches) return;
    introPlayed = true;
    if (state.animation) setFaceNow(state.face);
  });

  // Print must always show the settled static frog. The print stylesheet
  // forces the front face and unrotates the flipper, but a running Web
  // Animation is not overridable by CSS in every engine — settle it first.
  // Both hooks cover real printing (beforeprint) and print-media emulation.
  function settleForPrint(): void {
    if (state.animation) setFaceNow(state.face);
  }
  window.addEventListener('beforeprint', settleForPrint);
  matchMedia('print').addEventListener('change', (event) => {
    if (event.matches) settleForPrint();
  });

  button.addEventListener('click', activate);
  paint(0);
}

function init(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-profile]')) {
    enhance(root);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
