# Sourav Mohapatra — personal website (The Beng)

One-page personal site: introduction, engineering work, night-sky photography,
research, career/education, and a bit of personality. Static output (Astro,
TypeScript, plain CSS, npm), no runtime services, no third-party requests, no
contact details anywhere in text, metadata, or assets.

The planning and validation packet lives in `docs/implementation/` (tracked)
and `.agent/work/personal-career-website/` (local evidence, gitignored).

## Requirements

- Node 24 (pinned in `.nvmrc` and `package.json` engines) — developed with
  Node 24.20.0, npm 11.19.0
- npm (lockfile committed)

```bash
npm ci          # or: npm install
```

Playwright browser binaries (one-time setup for `test:e2e`):

```bash
npx playwright install chromium firefox webkit
```

On this machine node-based downloads stalled against `cdn.playwright.dev`; the
archives were fetched with `curl` and installed via a local mirror:
`PLAYWRIGHT_DOWNLOAD_HOST=http://127.0.0.1:8399 npx playwright install …`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (use `-- --host 127.0.0.1 --port 4321`) |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run build` | Static production build to `dist/` |
| `npm run preview` | Serve the built site |
| `npm run check:built` | Generated-output checks: files, metadata, links/fragments, prohibited contact data |
| `npm run test:e2e` | Playwright suite against the production preview (Chromium + WebKit) |
| `npm run test:e2e:firefox` | Same suite on Firefox (configured; needs a machine where the Playwright Firefox build launches) |

Notes:

- Tests build nothing themselves: run `npm run build` first. The Playwright
  `webServer` starts `npm run preview -- --host 127.0.0.1 --port 4322
  --ignore-lock` and owns/stops it. `--ignore-lock` matters: Astro 7's
  preview manager backgrounds itself on non-TTY spawns otherwise, and
  Playwright reports the server as "exited early".
- Human preview: `npm run preview -- --host 127.0.0.1 --port 4321`. Without a
  TTY this Astro release may run the preview as a background daemon — check
  with `npx astro preview status`, stop with `npx astro preview stop`, or add
  `--ignore-lock` to keep it in the foreground.
- Known engine gaps on the development machine (documented in the validation
  packet): the Playwright Firefox build cannot launch (profile-folder startup
  failure on macOS 27), and headless WebKit cannot deliver Tab focus traversal
  (keyboard activation and focus rings are still verified there).

## Editing content

Facts live in typed data files; prose lives in components.

| Change | Edit |
| --- | --- |
| Roles, dates, locations, work summaries, education, profile links | `src/data/profile.ts` |
| Papers and thesis (title, venue, year, DOI, explanation) | `src/data/publications.ts` |
| Gallery photographs | `src/data/photographs.ts` (see below) |
| Hero copy | `src/components/Hero.astro` |
| Section prose (work lede, photography, about) | `src/components/{SelectedWork,Photography,About}.astro` |
| Page title/description | `src/pages/index.astro` and `src/pages/404.astro` |
| Design tokens (palette, type, spacing) | `src/styles/tokens.css` |

Keep claims sourced from the CV/packet; do not add contact details, invented
metrics, or unverified publications (the 2023 dataset candidate stays out
until its primary record is verified).

## Adding photographs later

The gallery renders nothing until `photographs` is non-empty — that is the
delivered state, not a placeholder.

1. Put the original exports in `src/assets/photography/` (never in `public/`).
2. Import each in `src/data/photographs.ts` and add an entry:
   `src` (the import), `alt`, `caption` required; `place`/`date` only when
   verified. Captions are personal notes, not equipment lists.
3. `npm run build` — Astro/sharp re-encodes responsive derivatives with
   metadata (EXIF/GPS) stripped and intrinsic dimensions preserved.
4. Check both states: with entries the section renders semantic `<figure>`
   elements; with the array empty it renders prose + the Instagram link. The
   committed `tests/fixtures/TEST-FIXTURE-not-sourav-photography.png` exists
   to exercise the populated path — never leave it imported in the data file
   and never present it as Sourav's photography.

## Images and the avatar control

- Supplied originals stay untouched at the repo root: `avatar.png`
  (1254×1254, alpha preserved) and `myself.jpeg` (800×800).
- Working derivatives (metadata stripped) live in `src/assets/profile/`;
  regenerate with sharp if the originals change. The build emits 368px webp
  (frog ≈ 29KB, portrait ≈ 11KB; both verified free of EXIF/ICC/XMP).
- The circular profile control is progressive enhancement
  (`src/scripts/profile-flip.ts`):
  - Static frog renders first; the button exists only after script and both
    images are ready. No JavaScript (or a failed portrait) keeps a usable
    static frog — never a dead button or blank face.
  - First visible presentation per browser tab session: two rotations (720°)
    over ~2.4s, settling on the frog. Click/tap/Enter/Space flips 180° in
    ~500ms. Clicking during the intro cancels it and goes to the portrait;
    rapid input resolves to the latest face.
  - `sessionStorage` stores exactly one key, `beng-profile-intro-played`;
    storage failures are non-fatal and the intro still plays once per document.
  - Reduced motion: no intro, immediate face switches; changing the preference
    mid-spin settles at once.
  - Face visibility is driven from rotation parity in TS as well as CSS
    `backface-visibility`, because WebKit's rasterizer does not cull 3D
    backfaces reliably.

### Replaying the intro for review

The intro plays once per tab session. To review it again in the same tab, run
`sessionStorage.removeItem('beng-profile-intro-played')` in the console and
reload, or simply open a new tab. `npm run test:e2e` re-validates the motion
behavior automatically; screenshot/record evidence from development lives in
`.agent/work/personal-career-website/evidence/`.

## Later hosting (out of scope here)

The site is fully working locally; publishing is a separate, user-led step:

1. Choose the final hostname (`thebeng.dev` or `profile.thebeng.dev`) and set
   `SITE_URL` (see `astro.config.mjs`) — only then enable canonical/Open Graph
   URLs (deliberately omitted until a real public URL exists).
2. Add sitemap/robots as appropriate, and a GitHub Pages workflow that
   deploys only `dist/`.
3. Review the published artifact: no packet files, source PDFs, originals, or
   contact details (the `check:built` script encodes these rules).
4. Decide what happens to the existing `souravmohapatra.github.io` site and
   its public email before migrating; verify DNS/HTTPS and live links after.

Do not add contact details anywhere — including metadata, downloadable assets,
or structured data. A downloadable CV would need a separately prepared
contact-free version.
