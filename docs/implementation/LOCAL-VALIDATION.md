# Local website validation protocol

Status: all implementation checks NOT RUN. This is a protocol and results template, not completed evidence.

## Evidence format

For each check record: ID, source/build identity, command or browser action, browser/version and viewport, expected versus observed result, pass/fail/blocked, timestamp, and evidence path. Keep artifacts under this packet's evidence/ directory. A screenshot is evidence only after someone has inspected it. Do not put reports, screenshots, private notes, or source PDFs in public/ or dist/.

## Required browser matrix

| Environment | Required checks | Evidence |
| --- | --- | --- |
| Chromium, 1440×900 | Full desktop content, navigation, initial profile animation, manual toggle, console/network | Full-page screenshot, first-viewport screenshot, interaction clip |
| Chromium, 375×812 | Full mobile content, tap target/crop, navigation wrapping, text density | Full-page and first-viewport screenshots |
| Chromium, 320×740, 768×1024, 1024×768 | Layout transitions, long publication titles, overflow | Focused screenshots if issues appear; recorded inspection |
| WebKit, 1440×900 and 390×844 | 3D face rendering/clipping, front/back orientation, taps, reduced motion, layout | Desktop/mobile screenshots and animation observation |
| Firefox, 1440×900 | Navigation, flip completion, keyboard, responsive smoke | Screenshot and interaction result |
| Chromium, 200% zoom | Text, navigation, focus visibility, no lost controls or clipped content | Screenshot and manual notes |
| Chromium, 1280-wide at 400% zoom | Reflow equivalent to a narrow viewport, reading order, no two-dimensional scrolling | Manual result |
| Reduced motion at desktop/mobile widths | No automatic spin, immediate deliberate image switch | Result plus final-state screenshots |
| Print preview | Readable sections, links/content not cut by fixed heights, static avatar | Print preview screenshot or local PDF |

WebKit mobile emulation does not establish real iPhone/Safari-device coverage. Real-device testing is optional if a device is available; report it separately. A screen-reader spot check is required where supported (VoiceOver/NVDA/Orca), otherwise record the tool limitation and perform an accessibility-tree/name/focus review without claiming equivalent coverage.

## Functional and resilience cases

| ID | Action | Pass condition |
| --- | --- | --- |
| F01 | Open built home and local 404 page | Correct content/assets; no uncaught page errors or missing first-party resources |
| F02 | Follow every internal navigation link and directly load each hash | Unique target exists; heading is visible and not obscured |
| F03 | Inspect all external link destinations | User/publisher URLs correct; actual 404 corrected/removed; authentication or crawler blocking distinguished from a bad link |
| F04 | Fresh context, normal motion, decoded images, profile visible | Two full rotations; final frog face; no loop or layout shift |
| F05 | Reload same tab/session; scroll away/back; resize | Intro does not repeat |
| F06 | Click/tap frog then portrait | Correct alternate face, useful action label, no mirrored image |
| F07 | Activate using Enter and Space | Same behavior; focus stays on stationary visible ring; no scroll caused by Space |
| F08 | Activate during intro, then issue several rapid toggles | Intro cancels; latest requested state wins; no queued spins, visual snap, stale label, or stuck intermediate face |
| F09 | Set reduced motion before page load | No intro; frog visible; manual activation switches immediately |
| F10 | Enable reduced motion during spin | Settles promptly on intended face without further motion |
| F11 | Deny sessionStorage access | Page and toggle work without console exception; no loop within the current document |
| F12 | Block portrait request / simulate decode failure | Frog remains visible; unavailable flipping is suppressed; no blank face |
| F13 | Slow image loading | Stable layout and visible fallback; intro waits for usable faces |
| F14 | Hidden/offscreen first render and hide during intro | No unseen automatic start or surprise replay; safe final face |
| F15 | Disable JavaScript | Career/personal content and links work; static avatar has useful alternative text and no inert button |
| F16 | Empty photograph list | Finished prose/Instagram link; no placeholders, broken figures, or empty controls |
| F17 | Populated photo data using an explicit local fixture | Responsive images, captions/alt, stable dimensions; fixture absent from final delivered data |
| F18 | Navigation/network inspected after initial load | No runtime dependency on social sites, external fonts, analytics, or secret/API configuration |

Automate F01/F02 and the important avatar state/failure cases in a compact Playwright suite. Manually inspect animation quality: state assertions alone cannot detect ugly clipping, motion, or facial cropping. Simulated visibility/storage conditions may need browser tooling; record whether a case was automated or manual.

## Content, accessibility, and privacy checks

| ID | Check | Pass condition |
| --- | --- | --- |
| C01 | Compare roles, dates, publications with packet | Accurate chronology and attribution; no invented metrics, projects, or personal details |
| C02 | Read page aloud/at normal zoom | First-person, approachable, factual; no boastful slogans; personal interests feel integrated |
| C03 | Research links and labels | Both verified papers included; thesis labeled correctly; dataset excluded unless primary-verified |
| A01 | axe scan in normal and reduced-motion states | No serious/critical violations; all other findings triaged and applicable WCAG AA failures fixed |
| A02 | Manual contrast and focus review | Text/control contrast meets applicable AA thresholds; pastel accents do not carry unreadable text |
| A03 | Tab from start to finish | Skip link works; logical order; no traps; visible focus; interactive targets comfortable on touch |
| A04 | Inspect headings/landmarks/control names | One clear primary heading; logical hierarchy; profile announces action without duplicate face text |
| A05 | Screen reader spot check or recorded tool gap | Navigation, reading order, button purpose/state understood; auto intro causes no announcement chatter |
| A06 | Zoom/reflow and reduced motion | Content/actions remain available and legible; no forced motion |
| P01 | Inspect built HTML/JS/assets/metadata | No email/phone/postal address, mailto/tel link, contact form, or source CV/cover letter |
| P02 | Inspect dist manifest and public source files | No .agent notes, reports, secrets, irrelevant originals, or private application material |
| P03 | Inspect derivative image metadata | No location/contact metadata; chosen transparency preserved; originals unchanged |
| P04 | Inspect identity metadata | Correct title/description; no fake/localhost public canonical URL; no unintended contact fields in structured data |

Search for prohibited data using local known values/patterns without copying them into public test fixtures or logs. Manually classify matches so dates/DOIs are not mistaken for phone numbers. Public profile URLs are allowed.

## Visual review rubric

At CP2 and after CP3/CP4 fixes, inspect the actual page and record concrete observations:

- First viewport clearly introduces Sourav and the current engineering focus; the avatar supports rather than overwhelms it.
- Pastel green feels intentional; the multicolored geometric avatar fits the neutral setting without forcing a busy page palette.
- Text has readable line lengths, balanced wrapping, adequate contrast, and deliberate vertical spacing.
- Work, research, and chronology remain scannable; the page does not read like a copied PDF or generic card template.
- Photography has a finished zero-image presentation; personal sections contain specific user-grounded details.
- Frog and portrait have equally intentional circular crops; no square corners, transparent-edge artifacts, clipped eyes, stretched faces, or back-face ghosts.
- Intro motion is brief and restrained; manual response feels prompt; controls are discoverable and work without hover.
- Mobile layout has no horizontal scroll, crammed navigation, orphaned labels, oversized gaps, or missing content.

For each issue: record viewport/browser, screenshot, observed problem, fix, and targeted recheck. Do not repeatedly run the entire suite for a copy-only correction; rerun affected checks and one final full acceptance pass after the final substantive change.

## Final acceptance checklist

- [ ] CP0–CP6 evidence recorded; required failures fixed or an honest validation limitation explicitly reported.
- [ ] npm ci/check/build work from a temporary clean source copy with the lockfile and documented runtime.
- [ ] Production preview tested, not just development mode; local URL and server lifecycle documented.
- [ ] Automated interaction, accessibility, and built-output checks pass on final output.
- [ ] Desktop/mobile browser screenshots actually inspected; motion recording reviewed; cross-engine checks recorded.
- [ ] Avatar request is implemented including initial settlement, user toggles, and reduced-motion fallback.
- [ ] No-JavaScript and missing-portrait paths are usable.
- [ ] No public contact details, packet files, or source PDFs in shipped output; image metadata reviewed.
- [ ] Empty gallery is intentional and finished; later photo insertion is documented and exercised with a fixture.
- [ ] Performance audit recorded with targets/outcomes; no unexamined first-party errors or failed resources.
- [ ] README includes install/run/check/build/preview, content editing, photo addition, and avatar behavior.
- [ ] PROGRESS.md, VALIDATION.md, and HANDOFF.md reflect actual results, not planned claims.
- [ ] Final response provides local URL/restart command, visual evidence links, and hosting-only follow-up items.

Do not treat blocked external social profiles or user-deferred photographs as failed local functionality. Conversely, do not label unperformed browser checks as passing or describe a deployed website when only local preview was validated.
