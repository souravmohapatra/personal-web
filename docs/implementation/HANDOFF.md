# Handoff

Updated: 2026-09-23 (after local implementation)

## Current outcome

The website is **fully implemented and validated locally**: a one-page Astro
site (static output, TypeScript, plain CSS) with real content, the two-sided
swiveling profile control, regression tests, and production checks. Local
preview: `npm run preview -- --host 127.0.0.1 --port 4321`. Checkpoints CP0–CP6
are recorded with evidence in `.agent/work/personal-career-website/`
(PROGRESS.md, VALIDATION.md, evidence/). Nothing has been committed, pushed, or
deployed; hosting remains a separate user-led task.

Final acceptance (2026-09-23): `npm run check` 0 errors · `npm run build`
2 pages · `npm run check:built` OK · `npm run test:e2e` **44/44 on Chromium +
WebKit 26.6** · Lighthouse mobile 100/100 (LCP 1.2s, CLS 0) · clean-copy
`npm ci`/check/build verified from a source-only copy.

## Resume

1. `npm ci`, then `npm run dev` (or `npm run build && npm run preview`).
   Node 24 (`.nvmrc`); commands and content-editing guide in `README.md`.
2. Validation results, browser matrix, and defect history:
   `.agent/work/personal-career-website/VALIDATION.md`.
3. Content facts live in `src/data/{profile,publications,photographs}.ts`;
   prose in `src/components/*.astro`.

## Known gaps (honest, documented)

- **Firefox (Playwright build) could not launch in this environment** (profile-
  folder startup failure, Firefox 155 / macOS 27, even raw binary). The
  firefox project stays configured; `npm run test:e2e:firefox` runs where it
  launches. Firefox checks are not claimed as passed.
- No screen-reader automation available; accessibility-tree/name/focus review
  done instead (VALIDATION CP4/A05).
- Harness video recording unavailable (no ffmpeg on PATH); motion evidence is
  timestamped frame sequences (the plan allows either).

## Facts and decisions to preserve

- No public contact details anywhere (text, metadata, assets, structured
  data). No CV download. Publication inventory: ASPLOS 2025 + IJECE 2018 +
  MSc thesis (separately labeled); the 2023 dataset candidate stays out until
  its primary record is verified. A 2017 IJAER co-authorship surfaced during
  the 2026-09-23 Scholar retrieval and is deliberately NOT on the site —
  recorded in BACKGROUND.md for Sourav to decide.
- Profile control behavior contract lives in PROFILE-INTERACTION.md; the
  implementation also drives face visibility from rotation parity because
  WebKit does not cull 3D backfaces in raster (VALIDATION CP3).
- Photographs are deferred by the user; the gallery renders finished prose +
  Instagram link until `src/data/photographs.ts` gets entries (README documents
  the process; `tests/fixtures/TEST-FIXTURE-not-sourav-photography.png` exists
  for exercising the populated path).
- Astro 7 note: `astro preview` backgrounds itself on non-TTY runs; use
  `--ignore-lock` for foreground/test-runner-owned serving.

## Next (user-led)

Hosting: choose hostname, set `SITE_URL` (then canonical/OG), sitemap/robots,
Pages workflow, DNS/HTTPS, and decide the fate of the old
`souravmohapatra.github.io` site before migration.
