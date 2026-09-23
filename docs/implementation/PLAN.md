# Implementation plan: The Beng personal website

Status: ready for local implementation · Prepared 2026-09-23

This plan replaces the earlier deployment-oriented milestones. These documents specify implementation; they do not represent an implemented website. A later instruction to implement this plan authorizes the local source work and verification described here, subject to the instructions on that machine. Do not interpret this document as authorization to commit, push, deploy, change DNS, or alter the existing online site.

## 1. Outcome and scope

Deliver a complete, personalized website that runs locally in development and as a built static site. The user must be able to follow README commands to install dependencies, start the site, build it, preview the production output, and run the relevant checks. Finish with a verified local preview URL and recorded browser evidence.

The site should introduce Sourav as a curious, approachable systems engineer who enjoys Milky Way photography and immersive fantasy. It should feel personally authored, factual, and entertaining while remaining professional. A warm neutral page, pastel-green accents, and the selected frog-with-camera avatar form the visual identity.

Included:

- One polished responsive page, semantic navigation, career/education, engineering summaries, research, photography text, reading interests, nickname story, and professional profile links.
- Supplied `avatar.png` and `myself.jpeg`, optimized for the site, with the requested two-sided circular profile interaction.
- Complete presentation when no gallery photographs have been added; a documented way to add them later.
- Accessible behavior, reduced motion, static/no-JavaScript content, print styling, local 404 page, appropriate local metadata, and a small meaningful browser test suite.
- Manual visual review in the browser and verification of production output, not merely a successful development-server response.

Not part of this implementation: GitHub Pages workflow, publishing, domain/DNS/certificate changes, migration of the old site, contact form, email/phone/address display, original CV download, CMS, analytics, dark mode, blog, or new avatar generation. Hosting is a later user-led task. Domain choice must not block local completion.

## 2. Carry-forward facts and source precedence

Read this packet in order: PLAN.md → PERSONAL-STORY.md → PROFILE-INTERACTION.md → BACKGROUND.md → BROWSER-FOLLOWUP.md. DESIGN-BRIEF.md retains the previous detailed content/research inventory. The old the superseded avatar-generation brief (not included) is superseded and must not trigger image generation.

- Current CV: `../resume/SouravMohapatraCV.pdf`; confirmed up to date. Older `../resume/Cover_Letter.pdf` supplies historical motivations, not current employment status.
- Arm Senior Software Engineer from March 2025; ASML September 2022–March 2025; Qualcomm June 2017–June 2020. Preserve contribution attribution and accurate dates.
- Publications: ASPLOS 2025, DOI `10.1145/3676641.3715989`; IJECE 2018, 8(1), 429–440, DOI `10.11591/ijece.v8i1.pp429-440`. MSc thesis is separately labeled. Optional dataset is excluded until its primary record is verified.
- The Beng derives from the user's Odia high-school nickname Benga. Do not invent a personality, biography, or technical significance for the nickname.
- Photography focuses on the pleasure of planning and making night-sky images; no camera specifications or destinations are known. The user will add images later.
- Fantasy interests: world-building, magic systems, immersion; Cosmere and Realm of the Elderlings. Phrase time-sensitive reading information as dated or omit “currently.”
- No work-breakthrough anecdotes are needed; the user declined that exercise.
- No public contact details, including metadata and downloadable assets. Public professional/profile links supplied by the user are allowed.

If the next machine lacks the PDFs, the packet contains enough sourced career facts to implement. The selected images must also be transferred to the implementation machine; this documentation commit does not include image files. Use docs/implementation as the tracked planning reference, and .agent/work/personal-career-website for local progress/evidence. Missing required image files should be resolved from the user-provided originals; never silently replace them.

## 3. Technical decisions for this plan

Use **Astro static output, TypeScript, ordinary CSS, and npm**. This is the concrete implementation baseline selected for the plan, not a claim that the user separately chose a framework. No React/Vue runtime, animation library, server adapter, database, or runtime social-media fetch is required. Use the browser animation API or small CSS/TypeScript controller for the profile flip.

On the implementation machine, select a current stable Astro release and a compatible supported Node LTS, consulting the official prerequisites. Record Node/npm versions, pin the chosen Node line in `.nvmrc` and package engines, and retain `package-lock.json`. Do not hardcode an unverified future package version in this plan. Install only the dependencies needed for this site and its checks.

Proposed file structure:

```text
.nvmrc
.gitignore
package.json
package-lock.json
astro.config.mjs
tsconfig.json
README.md
src/
  assets/profile/             # optimized, metadata-stripped derivatives
  assets/photography/         # optional later user photographs
  components/
    Header.astro
    Hero.astro
    ProfileFlip.astro
    SelectedWork.astro
    Photography.astro
    Research.astro
    Experience.astro
    About.astro
    Footer.astro
  data/
    profile.ts
    publications.ts
    photographs.ts
  layouts/BaseLayout.astro
  pages/index.astro
  pages/404.astro
  scripts/profile-flip.ts
  styles/tokens.css
  styles/global.css
public/favicon.svg            # simple original identity treatment; no new mascot
scripts/check-built-site.mjs  # focused output/link/privacy checks
tests/site.spec.ts
tests/profile-flip.spec.ts
playwright.config.ts
avatar.png                   # retain supplied original
myself.jpeg                  # retain supplied original
.agent/work/personal-career-website/  # local packet and evidence
```

Use Astro image processing for imported local derivatives, with dimensions and appropriate responsive sizes. Ensure metadata removal and preserve avatar transparency where present. Avoid serving the 1.7 MB avatar original for a small profile control. Do not copy the workspace root or `.agent/` into `public/`.

Define these scripts during scaffolding:

| Script | Contract |
| --- | --- |
| `dev` | Astro development server |
| `check` | Astro/TypeScript diagnostics using installed tooling |
| `build` | Static production build to dist/ |
| `preview` | Serve the built site locally |
| `test:e2e` | Playwright tests against production preview, not the dev server |
| `check:built` | Inspect generated files, internal links/fragments, required metadata, and prohibited contact data |

Use development-only `@playwright/test` and `@axe-core/playwright` for meaningful interaction/accessibility tests. Select compatible current versions during implementation. Configure browser projects for Chromium, Firefox, and WebKit; install browser binaries on that machine under its applicable permissions. Prefer existing browser tools for interactive inspection. Do not silently skip an unavailable engine and report all browsers tested.

## 4. Checkpoints and execution rules

Checkpoints are evidence gates, not recurring requests for user permission. Once implementation is authorized, perform routine work and iterate through them autonomously. Ask only for a missing material decision or genuinely blocked requirement; use the documented defaults for ordinary design choices. Never mark a future check as passed simply because its instructions exist.

Create local PROGRESS.md, VALIDATION.md, and evidence/ under .agent/work/personal-career-website if absent. For each checkpoint update PROGRESS.md with completion, important decisions, and unresolved issues; update VALIDATION.md with commands, browser/version, local URL, outcome, and evidence paths. Store screenshots/videos/reports under `evidence/` inside this packet, excluded from the site and public source. Redact any private browser/account data from evidence.

### CP0 — Establish the local workspace and browser capabilities

Tasks:

1. Read applicable AGENTS.md and the packet. Inspect git status; preserve originals and unrelated changes. Existing workspace contains a Git directory, packet, avatar.png, and myself.jpeg; no application exists at planning time.
2. Confirm required image filenames, dimensions, and visibility. Do not rename or overwrite supplied originals.
3. Check Node/npm and available browser tooling. Confirm the browser can reach a localhost server; use explicit port forwarding if remote. Bind to loopback by default; do not expose the dev server to a wider network unnecessarily.
4. Create PROGRESS.md and the evidence directory when implementation starts. Record environment and source identity, including hashes of selected image inputs if useful for provenance.
5. Revisit each BROWSER-FOLLOWUP.md item once using the available browser. Record accessible, still blocked, or genuinely missing. External profile failures remain non-blocking because local content is sourced. Do not chase repeated login barriers or add unverified claims.

Checkpoint: workspace is understood, original files are preserved, browser-to-localhost access is known, and outstanding external retrievals are explicitly recorded. Missing local-browser capability is a validation blocker, not a successful checkpoint.

### CP1 — Scaffold and establish a runnable baseline

Tasks:

1. Add a minimal Astro project into the existing repository without overwriting the packet or assets. Use a minimal/manual scaffold, not a generic portfolio theme.
2. Add strict TypeScript configuration, npm scripts, the selected runtime version, and lockfile. Add ignores for node_modules, dist, .astro, local packet/evidence, Playwright results, and secrets. Do not stage or commit.
3. Create a semantic layout, initial home page, and 404 page. Add local styles and a working favicon. Use a system font stack initially so rendering does not depend on external fonts.
4. Configure static output and local root paths. Centralize an optional future public-site URL; do not hardcode localhost as the canonical public identity or require a production domain to run.
5. Install dependencies, run the type check and first production build, and open the page through both development and preview servers.

Checkpoint: home and 404 pages render; local assets load; no browser console errors; check/build pass. Capture one desktop baseline screenshot. A template-only page is sufficient at this checkpoint but not at completion.

### CP2 — Build the real content and responsive composition

Tasks:

1. Separate profile, publication, and optional photograph data from layout. Keep dates, names, links, and achievements in one source of truth. Avoid parsing PDFs or fetching social profiles at runtime.
2. Implement this flow: introduction → engineering work → photography → research → career/education → reading/nickname story → professional profiles. Navigation: Work, Photography, Research, About. Provide an obvious Career link from Work.
3. Use real copy immediately. A starting introduction: “I’m Sourav. My friends call me Benga—or The Beng. I’m a software engineer who enjoys figuring out how things work.” Follow with current role and a brief reference to night-sky photography and fantasy. Refine phrasing without unsupported claims or exaggerated self-praise.
4. Keep engineering summaries distinct from the compact chronology. Research entries show title, year, venue/type, short explanation, and authoritative link. Do not use skill percentages, achievement counters, employer prestige banners, or invented testimonials.
5. Build the photography section as complete prose plus Instagram link when `photographs` is empty. No “coming soon,” broken image frames, stock/AI Milky Way imagery, or giant empty gallery. When entries exist, render semantic figures with src, alt, caption, optional verified place/date, and dimensions. Do not build a lightbox/carousel.
6. Use the visual tokens below, a responsive editorial grid, deliberate whitespace, and varied section treatment rather than a repeated wall of cards. Integrate the frog at the hero only initially; avoid visual overuse.
7. Establish intrinsic image dimensions, long-title wrapping, stable section anchors, and print styles. If navigation is sticky, headings/focus must not be obscured; otherwise prefer the simpler non-sticky header.

Visual starting points: page #FAFAFA, text #18181B, muted text #475569, pastel accent #DCEBD8, dark-green controls/links #28513B. Body 16–18px, line-height about 1.6, content width around 1100px, prose around 65–75 characters. Use pastel as a surface/accent, not low-contrast small text. Profile circle approximately 144px on narrow screens and 184px on desktop; tune after inspection.

Checkpoint: complete, credible site content at 375px and 1440px with no missing-photo dependency. Inspect first viewport and full page in browser. Fix content density, hierarchy, rhythm, cropping, and awkward whitespace before adding motion. Save desktop/mobile screenshots and short review notes.

### CP3 — Implement and validate the profile swivel

Use PROFILE-INTERACTION.md as the detailed behavior contract. Implement this as a small self-contained component/controller, independently of the rest of the page.

1. Display the frog in a circular frame with a stable pastel rim. Preserve the frog's silhouette with contain/padding; portrait uses an appropriate cover crop.
2. Enhance a static fallback only after the script and both images are ready. No-JavaScript rendering is a meaningful static avatar, not a dead button.
3. First visible presentation in a tab session: two full Y-axis rotations (720 degrees), approximately 2.4 seconds, settling on the frog. It plays once, not every scroll, resize, focus, or reload in the same session.
4. Activation flips 180 degrees to the portrait in about 500ms; next activation returns to the frog. Clicking during the intro cancels the flourish and proceeds to the portrait. Rapid input resolves to the latest desired face without queued spins or stale labels.
5. Explicitly track intended face, current animation, and intro-played state. Catch storage exceptions. Skip automatic spinning when hidden/offscreen; settle safely if the tab becomes hidden. A slow/failed portrait leaves the frog visible.
6. Native keyboard activation, visible stationary focus ring, meaningful action labels, and a small visible hint such as “Click or tap to see me” make the control discoverable. Do not rely solely on hover. Avoid duplicate face announcements.
7. Reduced motion: frog at first render; no intro; immediate deliberate image switch. A mid-animation preference change settles on the intended face. Restrict 3D transforms to the inner flipper so layout/focus do not rotate.

Checkpoint: browser-observed first-load sequence, repeat-session behavior, click/tap/keyboard toggles, cancellation, and reduced-motion behavior all work. Save a short recording or a sequence of timestamped frames covering intro and manual toggle; a static screenshot alone is not animation validation. Verify visually in Chromium and WebKit, with Firefox interaction smoke coverage.

### CP4 — Add focused regression checks and browser quality review

Add tests for observable behavior, not assertions that merely mirror CSS or implementation functions. Use stable roles/names and asynchronous state/completion conditions rather than brittle arbitrary sleeps. Fresh browser contexts isolate first-visit tests; reuse the same page/session for reload checks. Do not disable animations globally in tests intended to validate motion.

Automate the cases in LOCAL-VALIDATION.md: navigation/internal resources; avatar completion/toggling/input cancellation; reduced motion; portrait failure; storage failure; no-JavaScript content; overflow at target widths; automated accessibility scan; built-output privacy checks. Use screenshot evidence for review, not an unreviewed blanket snapshot suite.

Perform visual inspection separately: check actual rendered pages, screenshots, interaction clips, keyboard behavior, and print output. Read the copy at normal zoom. Iterate on concrete defects, record changes, and recheck affected cases. Passing browser assertions or generating screenshots without looking at them does not satisfy visual review.

Checkpoint: no unresolved functional, accessibility, privacy, or material visual defects. Complete the browser/viewport matrix and record any missing tool coverage honestly. Photographs deferred by the user and blocked external social sites are not local defects.

### CP5 — Validate production output, performance, and maintainability

1. Run check and build on final source. Serve dist via the preview script; run E2E and built-output checks against that build. Confirm source edits have not left the preview serving an older artifact.
2. Inspect dist for absent packet/source PDFs/original private assets/contact data; verify only intended derivatives and content are shipped. Review the public source for contact data too. Do not rely solely on grep to prove image/PDF metadata privacy.
3. Check title, description, favicon, document language, heading structure, and accessible links. Optional canonical/absolute Open Graph URLs must be omitted until a final public URL is configured. No placeholder domain, accidental old-site identity, or fabricated structured data. Defer sitemap/domain-specific robots setup to hosting.
4. Run a Lighthouse mobile audit on the production preview with its environment recorded. Targets: performance and accessibility at least 95, CLS below 0.1, and lab LCP below 2.5s. These are local lab targets, not field-performance claims. Investigate misses; rerun only after a relevant fix or a justified check of noisy results.
5. Aim for a compressed interaction script below 20 KB and initial avatar/portrait image transfer below 250 KB combined, while retaining good appearance. Inspect network results; document any justified budget adjustment. No third-party runtime requests are required to display the page.
6. Document content edits, photo addition with captions/alt text, image processing, avatar behavior, session replay for review, scripts, runtime versions, and later-hosting considerations in README.
7. Exercise the gallery's zero-image path (the real delivered state) and populated path using a clearly identified local test fixture or supplied photo if available. Remove/keep fixtures outside shipped data; do not display test imagery as Sourav's photography in the final page.

Checkpoint: reproducible build/preview, functioning output, meaningful audit evidence, and instructions sufficient for a new local checkout. Final website stays useful with no social-site access.

### CP6 — Final local acceptance and handoff

Use the final checklist in LOCAL-VALIDATION.md. Record exact commands, failures/fixes, screenshot locations, environment/browser versions, source state, and outstanding hosting-only work. Confirm the documented clean-install path using `npm ci` on a temporary copy containing only intended source/assets and the lockfile, without discarding the working tree. Run check/build there; repeat browser tests only if output or dependencies differ or a concern appears.

Return to the main workspace, start/leave the verified local preview running where the environment permits, and provide its actual URL and process/stop instructions. If the process cannot persist beyond the session, say so and supply the verified restart command. A successful build alone is not “fully working locally.”

Final report must identify what is implemented, tests actually run, visual evidence reviewed, local launch instructions, and deferred items. Do not label the work complete with a broken avatar, unreadable mobile layout, exposed contact data, or unperformed local browser validation.

## 5. Local command contract

These commands are planned, not executed in this planning session. Implement the named npm scripts before using them. Choose another free port if necessary and keep the browser/test base URL aligned.

```bash
npm ci
npm run check
npm run build
npm run check:built
npm run test:e2e
```

Playwright's webServer configuration should start `npm run preview -- --host 127.0.0.1 --port 4322` for the existing final build and use that URL as baseURL. Avoid accidentally reusing an unrelated/stale server on the port. The test runner owns and stops its server. For a human preview afterward:

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

For development:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

Browser-binary installation is a setup action, not a repeated test step; document the exact command used for the installed Playwright version. Stop only servers started for this task, never unrelated processes.

## 6. Completion criteria and deferred work

Local completion means CP0–CP6 are recorded, all required functional checks pass, real browser visual review is complete, and the built site runs from documented commands. Remaining optional images and external-profile access can be listed without blocking completion. Browser-engine/tool gaps must be documented as gaps; do not claim their checks passed.

Later hosting work: choose apex versus profile subdomain; choose repository/migration strategy; set final public URL and canonical metadata; add sitemap/robots as appropriate; configure a Pages workflow; verify DNS/HTTPS and live URLs. None of that is required to finish this local implementation.

## 7. Reference documentation

Consulted during planning; refresh relevant version-specific details on the implementation machine:

- [Astro installation and prerequisites](https://docs.astro.build/en/install-and-setup/)
- [Astro image handling](https://docs.astro.build/en/guides/images/)
- [Playwright configuration and webServer](https://playwright.dev/docs/test-configuration)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)

UI/UX skill guidance applied: use static Astro components for content, local image optimization, semantic controls, responsive typography, visible focus, and reduced-motion support. No Total Compute implementation/build workflow applies to this personal website.
