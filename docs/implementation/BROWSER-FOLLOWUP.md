# Browser follow-up checklist

User requested that inaccessible websites be recorded for a later session with browser access. These retrieval failures do not block page planning. A normal browser may still require sign-in or encounter restrictions; record what was actually accessible. Do not bypass access controls or assume browser access will resolve every failure.

| Resource | Observed limitation | Later task | Current fallback/status |
| --- | --- | --- | --- |
| https://www.linkedin.com/in/souravmohapatra/ | Direct request returned HTTP 999. A UK-profile search excerpt was available, but not the complete profile. | Read accessible profile sections; reconcile useful public career/project details with current CV. | User confirmed CV is current; do not add claims from incomplete snippets. |
| https://scholar.google.com/citations?hl=en&user=9c6V7nwAAAAJ | Direct request, expanded-list request, and existing-site Scholar link failed. | Inspect complete publication list and check canonical paper links. | User supplied remaining IJECE 2018 article; paper inventory reconciled against publisher evidence. No export request remains open. |
| https://www.instagram.com/sourav.mohapatra_/ | Fetch denied by robots.txt. No photographs were viewed. | Inspect accessible images for composition/palette and optional caption inspiration. | User will supply website images later. Do not scrape, rehost, or infer particular images; no dependency on Instagram embeds. |
| https://souravmohapatra.github.io/publications/ | Direct request returned 404; navigation-link retrieval also failed. | Check current site navigation and actual publication path; distinguish a broken page from a browser-tool limitation. | Homepage was accessible; treat old site as possible migration source only. Do not copy its contact details. |
| https://dblp.org/pid/401/6935.html and https://dblp.org/rec/data/12/KortbeekMAP23 | Indexed author text was available; direct author/record retrievals failed intermittently, including the record's .html variant. | Follow the dataset DOI from the record to its primary repository; verify contributors, title, year, and resource type. | Dataset remains an optional candidate; not a confirmed additional paper. |

Additional documentation retrieval: `https://docs.astro.build/en/guides/develop-and-build/` returned an internal retrieval error during detailed planning. If needed, navigate from the accessible Astro documentation homepage to the current develop/build guide rather than assuming that path is current. Installation and Playwright configuration/accessibility documentation were accessible.

## Follow-up boundaries

- Preserve the no-public-contact-details instruction in any copied content, images, metadata, or documents.
- External browsing is for evidence and visual references. Do not post, message, change account settings, or replace the existing site.
- Photograph population is explicitly deferred by the user. Design the gallery so images/captions can be added later. Hide it or use a short honest text section if real images are absent at launch; never pass stock/generated night-sky photos off as Sourav's work.
- Record access date, findings, and remaining uncertainties in BACKGROUND.md. Update this checklist after successful retrieval; do not repeatedly ask the user to provide data already reconciled.
