# Background and evidence

Evidence reviewed: 2026-09-23. This is a personal website packet, not a Total Compute task.

## Request and workspace

Create a career/resume website plan using `../resume/SouravMohapatraCV.pdf` and the supplied LinkedIn profile. Consider GitHub Pages and `thebeng.dev` or `profile.thebeng.dev`. Save the plan in a work packet.

Workspace was an empty Git repository: no project files, scoped AGENTS.md, existing stack, or configured remote found. Generic user-provided guardrails apply. The local packet templates informed this lightweight packet; TC-specific process and runtime gates do not apply.

## Career facts from the CV

The one-page PDF was extracted with `pdftotext -layout`; metadata reports creation on 2026-09-18. No visual layout analysis was needed for career-content planning. Sourav confirmed the CV is up to date.

| Role or qualification | Dates stated | Evidence available for website copy |
| --- | --- | --- |
| Arm, Senior Software Engineer | March 2025–present | Firmware/Linux/Android; FPGA/FVP bring-up; firmware integration; telemetry; AVF/pKVM; protected guest boot |
| ASML, Embedded Software Developer | September 2022–March 2025 | Grade 6 to 7; sensor drivers across four platforms; Python calibration; Qt5 diagnostics; support for a 12-person outsourced team |
| Qualcomm, Embedded Engineer | June 2017–June 2020 | Associate Engineer to Engineer; Wi-Fi MAC protocols; kernel interfaces; scheduler and firmware communication; syzkaller regression testing |
| TU Delft, MSc Embedded Systems | September 2022 completion | 9.0/10, distinction, top 5% as reported by CV; start date unspecified |
| NIT Rourkela, BTech Computer Science and Engineering | May 2017 completion | Start date unspecified |
| ASPLOS 2025 publication | March 2025 | Data Cache for Intermittent Computing Systems with Non-Volatile Main Memory |

The CV reports 70%+ greater test coverage and 30% fewer bug reports for Qualcomm. Preserve the original meaning; confirm baseline/context before making these prominent headline metrics. Do not convert relative coverage improvements into percentage-point claims.

The CV contains email and phone details. Do not automatically reproduce the phone number or distribute the original PDF. Sourav explicitly instructed that no contact details be made public. The plan excludes the supplied CV download. London is the CV's personal location; Cambridge is the Arm role location.

## External sources

- [Supplied LinkedIn profile](https://www.linkedin.com/in/souravmohapatra/): automated retrieval returned HTTP 999. Its content was not verified or used to invent additional facts.
- [TU Delft publication record](https://research.tudelft.nl/en/publications/data-cache-for-intermittent-computing-systems-with-non-volatile-m/): confirms title, Sourav Mohapatra's authorship, ASPLOS 2025, pages 227–243, and full DOI [10.1145/3676641.3715989](https://doi.org/10.1145/3676641.3715989). The CV's visible DOI ends in `37159` and appears truncated. The portal author list contains apparent metadata anomalies; use the publisher/paper if a full author list is later needed.
- [Astro deployment documentation](https://docs.astro.build/en/guides/deploy/github/): static deployment to GitHub Pages; custom-domain `site` versus repository-path `base` configuration.
- [GitHub custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): repository domain setting, subdomain CNAME, HTTPS, and Actions-specific CNAME-file behavior.
- [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages): account-level verification workflow.
- [GitHub publishing workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site): static artifact build/upload/deploy flow.

## Design guidance

Used `the local ui-ux-pro-max skill`. The initial design-system query, `personal portfolio engineer minimal`, returned brutalism and scroll storytelling, which were a poor fit for the proposed understated career site. A single narrower retry, `minimalism accessible portfolio --domain style`, returned Minimalism & Swiss Style. Adopt its typography, spacing, contrast, and restrained-motion principles. The plan's specific layout and palette are editorial recommendations, not user-approved design choices.

## Open questions sent to the user

1. Primary audience and visual tone: hiring managers/engineering peers, technical collaborators, or a broad personal audience?
2. Changes since the CV, projects or achievements to feature, and contact details suitable for public display?

User confirmed: hiring managers and engineering peers; clean and understated. Sourav confirmed the CV is up to date and instructed that no contact details be public. The paper inventory is reconciled with the user-supplied remaining publication and publisher metadata. GitHub username, repository visibility, DNS provider, final hostname, portrait, and project links can be collected during implementation preparation.

## Follow-up evidence and confirmed constraints

- Confirmed: hiring managers and engineering peers; clean and understated; CV up to date; no public contact details.
- Google Scholar: `https://scholar.google.com/citations?hl=en&user=9c6V7nwAAAAJ`. Direct retrieval and one expanded-list retry failed. Sourav answered the request for missing titles with the IJECE 2018 article. This resolves the paper-inventory question through user input, not direct Scholar access. Do not claim the profile was successfully read.
- TU Delft thesis: [Efficient Memory Architecture for Next Generation Low-Power Embedded Systems](https://repository.tudelft.nl/file/File_51b0fa32-fc48-4611-8f4c-52416207f320), Sourav Mohapatra, 2022; title-page presentation date 29 August 2022. Verified in the university-hosted document's indexed text.
- Dataset discovery lead: [DBLP author record](https://dblp.org/pid/401/6935.html) lists “Data underlying the PhD thesis: Accelerating Programmer-Friendly Intermittent Computing (Chapter 6),” 2023, by Vito Kortbeek, Sourav Mohapatra, Saad Ahmed, and Przemysław Pawełczak. Primary dataset metadata/DOI not retrieved; keep this as a candidate, not a verified paper.
- [Existing GitHub Pages site](https://souravmohapatra.github.io/) matches name, employers, and degree and links to the supplied Scholar identity. It currently has template content and a public email. Do not copy contact details into the new site or modify the old site under this planning request. Confirm ownership and migration choice during deployment preparation; the local repository still has no configured remote.
- Search surfaced an indexed UK LinkedIn profile excerpt matching the supplied profile, but the original direct retrieval failed. The current CV remains the career source of truth; no extra teaching or employment claims were added from snippets.
- Public profile links are treated as professional references; contact details themselves must not appear in the new site's text, metadata, assets, or public source. Existing third-party pages are outside this site's control.

## Remaining publication supplied by Sourav

Sourav identified this as the remaining publication: Leena Das, Sourav Mohapatra, and Durga Prasad Mohapatra, “Schedulability of Rate Monotonic Algorithm using Improved Time Demand Analysis for Multiprocessor Environment,” International Journal of Electrical and Computer Engineering 8(1), 429–440 (2018).

Verified author names, title, and DOI against the [publisher article record](https://ijece.iaescore.com/index.php/IJECE/article/view/10610); volume/issue/pages against the [publisher issue listing](https://ijece.iaescore.com/index.php/IJECE/issue/view/442). The publisher records 2018; the [archived article record](https://zenodo.org/record/4061265) gives 1 February 2018. DOI: [10.11591/ijece.v8i1.pp429-440](https://doi.org/10.11591/ijece.v8i1.pp429-440).

The website should feature both the ASPLOS 2025 paper and IJECE 2018 article. The MSc thesis is separately labeled; the dataset remains optional pending primary verification. No further Scholar export is needed for planning. The no-public-contact-details instruction remains unchanged.

## Browser-retrieval update (2026-09-23)

Google Scholar was successfully read with a real browser (see
BROWSER-FOLLOWUP.md). The profile lists four entries: the two reconciled
papers and the MSc thesis above, plus an additional co-authorship the packet
had not inventoried: Leena Das, Durga Prasad Mohapatra, and Sourav Mohapatra,
“Schedulability analysis for rate-monotonic algorithm in parallel real-time
systems,” International Journal of Applied Engineering Research 12(16),
5681–5689 (2017). Recorded here as an unverified-in-primary-source candidate
only: the website intentionally ships just the reconciled inventory (ASPLOS
2025, IJECE 2018, thesis). If Sourav confirms this paper and its canonical
link, it can be added to `src/data/publications.ts`. Remaining uncertainties:
publisher record not consulted for the 2017 article; dataset candidate still
unverified; LinkedIn still authwalled.

## Personal discovery

See PERSONAL-STORY.md for the user’s six detailed answers and historical Cover_Letter.pdf evidence. Current CV takes precedence over the older letter. The site direction is being revised beyond a resume layout; implementation remains out of scope.

## Photography and style follow-up

User supplied https://www.instagram.com/sourav.mohapatra_/; fetching it returned a robots.txt denial. No image content was inspected. User confirmed Milky Way photography as a meeting of artistic and engineering interests; world-building/magic systems/immersion as the appeal of fantasy; occasional frog character and pastel-green accent with professional presentation. User declined work breakthrough anecdotes; do not repeat that request.
