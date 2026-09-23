> Supporting design/content reference retained from planning. PLAN.md is the authoritative execution plan. Its local-only scope and implementation decisions override older milestones, optional-portrait wording, and hosting requirements below.

# Personal career website plan

Date: 2026-09-23 · Status: draft for discussion · Scope: planning only

## Personalization revision

The user wants a site that feels made by and for him, beyond a web resume. Read [PERSONAL-STORY.md](PERSONAL-STORY.md) before drafting copy or layouts. The personal direction is grounded in the user’s answers. The outline below now integrates that direction; exact copy and assets remain to be reviewed.

Confirmed personal anchors: The Beng/Benga nickname and frog avatars; curiosity and deep problem-solving across systems; Milky Way photography combining artistic choices with precise planning; immersive epic fantasy, world-building, and magic systems. Visual preferences: pastel-green accent and an occasional frog character with personality, while retaining a professional appearance. Target tone: factual, entertaining yet formal, approachable, and free of boasting. Keep the confirmed hiring-manager/engineering-peer audience and no-contact-details requirement.

Proposed revised flow: personal introduction with current role → concise engineering work summaries → night-sky photography → research and compact career/education record → reading note and nickname story → professional profile links. Keep a visible Work/Research route so the personal content does not obscure professional information. Photography and The Beng should be part of the actual design, not a generic hobbies paragraph. Use CV-backed work summaries; the user declined the work-breakthrough anecdote exercise. No work anecdote is required. User will populate photographs later and requested a newly designed avatar. The historical character brief is in the superseded avatar-generation brief (not included); the selected avatar.png and portrait myself.jpeg are now available; see PROFILE-INTERACTION.md.

## Goal and proposed direction

Create a credible, memorable home for Sourav Mohapatra's engineering career. A reader should understand the engineering focus within 30 seconds, find evidence of contributions within two minutes, and easily explore professional profiles and research. Do not publish contact details.

Confirmed audience: hiring managers and engineering peers. Confirmed visual direction: clean and understated. Use clear, technically specific language. The detailed layout and palette below remain proposals.

The central story is systems engineering across firmware, Linux, Android, and embedded hardware, drawing on experience at Arm, ASML, and Qualcomm. The publications add research depth in intermittent computing and real-time scheduling.

Suggested opening copy, subject to review:

> I’m Sourav. My friends call me Benga—or The Beng.
>
> I’m a software engineer who enjoys figuring out how things work. I work across firmware, Linux, and Android at Arm. Away from work, I enjoy photographing the night sky and getting lost in epic fantasy.

Display the exact current title separately: “Senior Software Engineer at Arm,” confirmed current by Sourav. Keep the person’s full name clearly visible alongside The Beng, a nickname with a real personal history documented in PERSONAL-STORY.md.

## First release: one page with meaningful anchors

| Section | Content | Visitor purpose |
| --- | --- | --- |
| Introduction | Name, The Beng, current role, short personal introduction, small frog character | Meet the person and understand his work |
| Engineering work | Three concise CV-backed summaries; curiosity and whole-system thinking expressed without invented anecdotes | Understand interests and contributions |
| Under the night sky | One strong Milky Way/night-sky image and a few supporting photographs when supplied; short text about planning place/time and making the image | Experience his creative work |
| Research | ASPLOS 2025 and IJECE 2018 papers; separately labeled thesis; Scholar link | Explore technical depth |
| Career and education | Compact reverse chronology, role dates, a few relevant technologies, TU Delft and NIT Rourkela | Find professional facts quickly |
| Away from work | Brief fantasy-reading note and the real nickname story | Add personality without turning hobbies into credentials |
| Profiles/footer | LinkedIn, Google Scholar, photography Instagram; GitHub once confirmed; optional second small frog appearance | Explore work and interests; no contact details |

Desktop navigation: Work, Photography, Research, About. Career details must be easy to find from Work. On mobile use simple wrapping links unless space requires a menu. Keep all content usable without JavaScript. Do not add empty photo placeholders to a published site; a local design can use explicitly labeled pending assets.

### Proposed contribution summaries

1. **Platform bring-up and virtualization at Arm.** FPGA/FVP Android bring-up and cross-layer integration; protected guest deployment with AVF/pKVM. Preserve “co-delivered” where applicable. Keep the summary within the CV’s confirmed scope; do not imply sole ownership of all outcomes.
2. **Embedded sensing and diagnostics at ASML.** Sensor drivers across four platforms and calibration/diagnostic tooling. Explain what Sourav built and who benefited, without invented throughput figures.
3. **Linux Wi-Fi driver reliability at Qualcomm.** Kernel/userspace interfaces and syzkaller-based regression testing. Use the CV's quantitative results only with sufficient context confirmed by Sourav; otherwise use a qualitative summary.

Initially these are concise on-page summaries, not detailed employer case studies. Public project pages become useful when Sourav can provide code, diagrams, talks, or additional publishable detail. Do not manufacture repositories, testimonials, project screenshots, or achievements.

Research copy can explain that the paper investigates caching for intermittently powered systems. Link to the work; attribute any later benchmark claims to the paper as a collaborative result, not personal impact metrics.

### Research inventory and completeness

- **Conference paper, 2025:** Data Cache for Intermittent Computing Systems with Non-Volatile Main Memory, ASPLOS. Use the verified [full DOI](https://doi.org/10.1145/3676641.3715989).
- **Journal article, 2018:** Leena Das, Sourav Mohapatra, and Durga Prasad Mohapatra. “Schedulability of Rate Monotonic Algorithm using Improved Time Demand Analysis for Multiprocessor Environment.” International Journal of Electrical and Computer Engineering, 8(1), 429–440. [Publisher record](https://ijece.iaescore.com/index.php/IJECE/article/view/10610); [DOI: 10.11591/ijece.v8i1.pp429-440](https://doi.org/10.11591/ijece.v8i1.pp429-440). Suggested summary: Research on reducing the analysis needed to assess real-time task schedulability, including multiprocessor environments.
- **MSc thesis, 2022:** Efficient Memory Architecture for Next Generation Low-Power Embedded Systems. TU Delft's [thesis document](https://repository.tudelft.nl/file/File_51b0fa32-fc48-4611-8f4c-52416207f320) identifies Sourav and a presentation date of 29 August 2022. Keep the CV's September 2022 education completion date; these are different date fields.
- **Dataset candidate, 2023:** Data underlying the PhD thesis: Accelerating Programmer-Friendly Intermittent Computing (Chapter 6). DBLP lists Sourav as a contributor, but the primary dataset record remains to be verified. Do not describe this as Sourav's PhD or as a peer-reviewed paper. Track it in the evidence file until verified.
- Link to the [user-supplied Google Scholar profile](https://scholar.google.com/citations?hl=en&user=9c6V7nwAAAAJ). Direct retrieval failed, but Sourav supplied the remaining publication, the IJECE 2018 article, and its metadata was verified against the publisher. The paper inventory is reconciled with the user’s input; no further Scholar export is required. The thesis is a separate research output and the dataset remains an optional verification candidate. Do not add citation counts or h-index figures without verified, dated evidence.

The research section should show title, type, year, venue/institution, a brief explanation, and an authoritative external link. Keep source PDFs external; do not host copies that may include contact information.

## Visual design proposal

A typography-led editorial layout: warm off-white background, charcoal text, a pastel-green accent, thin rules, and ample space. Keep experience entries easy to scan with dates in a side column on desktop and above the role on mobile. Selected contributions can use simple bordered panels; avoid enclosing every paragraph in a card.

Starting tokens: background `#FAFAFA`, foreground `#18181B`, muted text `#475569`, accent fill `#DCEBD8`, dark green link/control text `#28513B`, border `#E4E4E7`. Verify contrast in implementation. Use a system sans-serif stack initially; a licensed, self-hosted display font can be evaluated during visual review. Body text 16–18px, line-height around 1.6, prose width around 65–75 characters, content width around 1100px.

Pair a clear text identity with an occasional frog character. Use the user-selected geometric frog-with-camera avatar.png and supplied portrait myself.jpeg. The selected artwork supersedes the earlier generation brief. Keep it to one or two supporting placements. Photography should use Sourav’s own images, with natural aspect ratios and unobtrusive captions. A portrait is optional and should not delay a first draft. Small hover/focus transitions are sufficient. Respect reduced motion; avoid scroll-dependent reading, carousels, skill percentage bars, typing effects, and ornamental 3D scenes. A dark theme is optional follow-up scope, not a first-release requirement.

Accessibility target: WCAG 2.2 AA, including semantic landmarks, ordered headings, skip link, visible keyboard focus, contrast, comfortable touch targets, zoom support, and meaningful link labels. Automated checks alone do not establish conformance.

## Technical proposal

**Recommend Astro static output with TypeScript and ordinary CSS.** No existing stack was detected. This is a proposed selection, not an established user preference. Astro provides reusable sections and content separation while producing static output suitable for Pages. Plain HTML/CSS remains a reasonable smaller alternative if zero build tooling is preferred. Resolve the choice before scaffolding.

Suggested structure after implementation is authorized:

```text
src/pages/index.astro
src/pages/404.astro
src/layouts/BaseLayout.astro
src/components/{Header,Hero,SelectedWork,Photography,Experience,Research,About,Profiles}.astro
src/data/profile.ts
src/styles/global.css
public/                       # explicitly public assets only
.github/workflows/pages.yml
astro.config.mjs
README.md
.agent/work/personal-career-website/  # local planning, never a site asset
```

Keep roles, dates, achievements, publications, and links in one typed content source. Add Markdown content pages only when there are actual longer case studies or articles. Avoid a CMS, backend, contact form, analytics, and React dependency for the initial scope.

Include title/description, canonical URL, Open Graph metadata, favicon, sitemap and robots configuration. Add a simple social preview image during implementation if useful. Use Person structured data only for confirmed public facts and verified profile URLs. Provide print styles. Ensure downloads and assets work with the chosen hosting path.

Treat the HTML as the accessible career record. The CV is confirmed up to date. Do not publish email addresses, phone numbers, postal addresses, contact forms, mailto/tel links, or contact data in structured metadata, assets, or public source. Omit a CV download: the supplied PDF contains contact details. Professional profile and publication links remain in scope; do not embed or mirror their contact-bearing pages/PDFs. A future downloadable CV would need a separately prepared version without contact details.

## Hosting and domain decision

Provisional preference: **`profile.thebeng.dev`**, leaving the apex available for a broader personal site. Use `thebeng.dev` instead if this career page should become the permanent main identity. Choose one canonical hostname before launch; do not assume redirects are already available.

GitHub Pages supports static output and custom domains. Astro's [official Pages guide](https://docs.astro.build/en/guides/deploy/github/) documents its configuration. For the proposed custom domain, set `site` to `https://profile.thebeng.dev` and use the root path. A temporary project URL under `USERNAME.github.io/REPOSITORY/` needs its repository `base`; verify both configurations separately if both are used.

Future launch sequence:

1. Confirm GitHub account/repository, visibility, final hostname, and DNS access. An existing profile at `souravmohapatra.github.io` matches the career details; establish whether to replace that site or publish a separate project site before changing Pages settings. Check Pages eligibility if a private source repository is desired.
2. Prepare a workflow that builds the static site, uploads only `dist/`, and deploys through the `github-pages` environment. Pull-request validation must not deploy; production deployment follows the selected default branch or an explicit manual trigger. Pin reviewed action versions at implementation time.
3. Review the public copy and artifact. Keep `.agent/`, raw resume extraction, private notes, and unapproved contact details out of both the published artifact and public source history. Decide whether to keep the packet local/ignored before any first commit; ignoring does not remove files already tracked.
4. Verify domain ownership in GitHub, then set the repository's Pages custom domain before changing DNS. Follow [GitHub's domain-verification guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
5. For the selected subdomain, configure `profile` as a CNAME to `USERNAME.github.io`, not a repository URL or the apex. With custom Actions publishing, a repository CNAME file is not required; configure the domain in Pages settings. Follow [GitHub's custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
6. Once DNS/certificate provisioning completes, enforce HTTPS. Verify the final domain, canonical metadata, anchors, assets, downloads, and 404 handling. Record live results in this packet.

This request authorizes the plan and packet. Implementation, dependency installation/builds, commits/pushes, and hosting/DNS changes are future work to authorize when requested. No external settings have been changed.

## Ordered implementation milestones

| Milestone | Work and dependency | Reviewable result / completion criterion |
| --- | --- | --- |
| 1. Content and choices | Use confirmed audience, current CV, and no-contact rule; finalize research inventory, preferred work stories, stack, and hostname | Final content outline; every career claim grounded in CV, user input, or public source |
| 2. Local page | Scaffold chosen static stack; build layout, content data, navigation, responsive CSS | Complete local draft with real content; functional anchors and keyboard navigation |
| 3. Polish and verification | Review mobile/desktop layouts, accessibility, metadata, print output, privacy checks | Recorded checks and corrected defects; no placeholder links or unsupported claims |
| 4. Deployment preparation | Add reviewed Pages workflow and update instructions; inspect artifact and source staging | Concrete deployment change ready for review; only intended public files included |
| 5. Authorized launch | Publish repository/site, configure chosen domain and HTTPS | Live URL checked; DNS and deployment behavior recorded |

Do not scaffold or install during this planning task. Time estimates should follow content decisions; publication-ready case studies can take more effort than the page implementation.

## Acceptance checks for the eventual website

- First screen clearly identifies Sourav and his engineering focus while sounding like a personal introduction.
- Personalization is concrete: nickname story, restrained frog character, green accent, actual night-sky photographs when supplied, and fantasy-reading interests. No invented work anecdotes, grandiose claims, or photo equipment details.
- Arm/ASML/Qualcomm dates and titles match confirmed facts; education does not invent start dates; publication uses the full DOI.
- Readable at 320, 375, 768, 1024, and 1440px; no horizontal overflow; long titles wrap naturally; content remains usable at 200% zoom.
- All navigation and professional profile links work with keyboard and touch; focus remains visible; meaningful structure is checked manually with a screen reader.
- Automated accessibility scan has no serious/critical findings; contrast and reduced-motion behavior are manually checked.
- Production static build succeeds; built-site smoke checks cover home, assets, anchors, 404, external links, and any PDF download. Check only relevant routes and behaviors; no snapshot-heavy test suite is needed for a small static page.
- Target mobile Lighthouse performance and accessibility scores of at least 95 in a recorded environment. These are targets, not promises or substitutes for real usability checks. No layout shift from unsized images or fonts.
- Core content works without JavaScript; metadata uses the final canonical domain; a print preview is readable.
- Published artifact and public source contain no local packet or contact details or unapproved personal details.
- After authorized deployment, HTTPS, canonical domain, downloaded assets, and live links are verified separately from local results.

## Follow-up ideas, only when content exists

A longer research write-up, selected public project pages, and technical articles. Personal interests now belong in the main design exploration, with scope set by available photographs and stories. Keep empty sections out of the first release.

## Decisions still open

Profile-interaction visual review, optional dataset verification, ownership/migration choice for the existing GitHub Pages profile, optional portrait, stack preference, final hostname, repository visibility, and DNS provider. Audience, clean/understated professional tone, pastel-green accent, occasional frog character, CV currency, and exclusion of public contact details are confirmed. None prevents this planning draft; publication-dependent decisions must be resolved before launch.

## Deferred assets and browser research

The user will populate photographs later; this is not a planning or layout blocker. Prepare the photography content model and layout during implementation, use clearly marked placeholders only in local previews, and omit empty gallery frames from a public release. Do not substitute stock or generated images for the user's own photographs.

The user has now supplied and selected avatar.png and myself.jpeg. The earlier [selected-avatar interaction specification](PROFILE-INTERACTION.md) is superseded; no generation or API fallback is needed. [PROFILE-INTERACTION.md](PROFILE-INTERACTION.md) defines the circular two-sided profile control: two opening rotations settling on the frog, then click/tap/keyboard flips between the frog and portrait, with reduced-motion support. This explicitly requested animation is an exception to the earlier static-avatar idea.

All observed inaccessible/partially accessible sites and broken-page candidates are tracked in [BROWSER-FOLLOWUP.md](BROWSER-FOLLOWUP.md): LinkedIn, Google Scholar, Instagram, the old site's publications page, and direct DBLP/dataset records. Revisit with browser access in a later session; do not block implementation on those checks. The original site's homepage, publisher pages, and official hosting documentation were accessible.
