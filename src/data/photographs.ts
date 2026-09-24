import type { ImageMetadata } from 'astro';

/**
 * Gallery photographs. Empty by design until Sourav supplies images: the
 * photography section renders finished prose plus the Instagram link and
 * must never show placeholders or stock/generated imagery.
 *
 * To add a photograph later:
 *   1. Put the original export in src/assets/photography/ (not public/).
 *   2. Import it here and add an entry. `alt` and `caption` are required;
 *      `place`/`date` only when verified.
 *   3. Run `npm run build`. Astro re-encodes the derivative with metadata
 *      stripped and intrinsic dimensions preserved.
 *
 * A clearly labeled fixture for exercising the populated path lives in
 * tests/fixtures/ and must never be imported into this array permanently.
 */
export interface Photograph {
  src: ImageMetadata;
  alt: string;
  caption: string;
  place?: string;
  date?: string;
}

export const photographs: Photograph[] = [];
