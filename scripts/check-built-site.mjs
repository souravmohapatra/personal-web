#!/usr/bin/env node
/**
 * check:built — focused checks over the generated site (dist/):
 *   - required files, metadata, and document language
 *   - internal links and fragment targets resolve
 *   - external links are https and present
 *   - prohibited contact data and private artifacts never ship
 *
 * Phone-number-like strings are reported for manual classification (dates and
 * DOIs are expected false positives), not hard-failed. Exits non-zero on any
 * hard failure.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');

const failures = [];
const review = [];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// --- required files -------------------------------------------------------
for (const required of ['index.html', '404.html', 'favicon.svg']) {
  try {
    statSync(join(DIST, required));
  } catch {
    failures.push(`missing required file: dist/${required}`);
  }
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const allFiles = walk(DIST);
const allText = allFiles
  .filter((f) => /\.(html|css|js|svg)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

for (const file of htmlFiles) {
  const rel = relative(ROOT, file);
  const html = readFileSync(file, 'utf8');

  if (!/<html[^>]+lang="en"/.test(html)) failures.push(`${rel}: <html lang="en"> missing`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${rel}: <title> missing`);
  if (!/name="description" content="[^"]+"/.test(html)) failures.push(`${rel}: meta description missing`);
  if (!/rel="icon"/.test(html)) failures.push(`${rel}: favicon link missing`);

  // Every href must resolve: same-document fragments, internal paths, and
  // internal paths with fragments must all point at real targets.
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('https://') || href.startsWith('http://')) {
      if (!href.startsWith('https://')) failures.push(`${rel}: non-https external link ${href}`);
      continue;
    }
    const [pathAndQuery, hash] = href.split('#');
    const path = pathAndQuery.split('?')[0] ?? '';
    let targetFile = file;
    if (path !== '' && path !== '/') {
      const target = path.replace(/^\//, '');
      const candidates = [join(DIST, target), join(DIST, target, 'index.html'), join(DIST, `${target}.html`)];
      targetFile = candidates.find((c) => { try { statSync(c); return true; } catch { return false; } });
      if (!targetFile) {
        failures.push(`${rel}: internal link ${href} has no target file`);
        continue;
      }
    } else if (path === '/') {
      targetFile = join(DIST, 'index.html');
    }
    if (hash) {
      const targetHtml = readFileSync(targetFile, 'utf8');
      if (!new RegExp(`id="${hash}"`).test(targetHtml)) {
        failures.push(`${rel}: fragment ${href} has no target in ${relative(ROOT, targetFile)}`);
      }
    }
  }
}

// --- prohibited content ---------------------------------------------------
if (/\bmailto:/.test(allText)) failures.push('mailto: link found in output');
if (/\btel:/.test(allText)) failures.push('tel: link found in output');

const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
for (const match of allText.matchAll(EMAIL)) failures.push(`email-like string in output: ${match[0]}`);

// Phone-like strings are review items (dates/DOIs collide with these patterns).
const PHONE = /(?:\+\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}\b/g;
const phoneSeen = new Set();
for (const match of allText.matchAll(PHONE)) {
  const digits = match[0].replace(/\D/g, '');
  if (digits.length >= 9 && !match[0].includes('.')) phoneSeen.add(match[0]);
}
for (const candidate of phoneSeen) review.push(`phone-like string (classify manually): ${candidate}`);

// Private artifacts and originals never ship.
for (const file of allFiles) {
  const rel = relative(DIST, file);
  if (/\.pdf$/i.test(rel)) failures.push(`pdf in output: ${rel}`);
  if (/\.agent|(^|\/)docs\//.test(rel)) failures.push(`private packet file in output: ${rel}`);
  if (/(^|\/)(avatar\.png|myself\.jpeg|resume)/i.test(rel)) failures.push(`original private asset in output: ${rel}`);
}

// Public source must not contain contact data either (review source separately).
const publicText = walk(PUBLIC)
  .filter((f) => /\.(html|css|js|svg|txt)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');
if (/\bmailto:|\btel:/.test(publicText)) failures.push('contact link in public/ source');
for (const match of publicText.matchAll(EMAIL)) failures.push(`email-like string in public/: ${match[0]}`);

// --- report ---------------------------------------------------------------
console.log(`checked ${allFiles.length} generated files (${htmlFiles.length} html)`);
for (const item of review) console.log(`REVIEW  ${item}`);
if (failures.length > 0) {
  for (const failure of failures) console.log(`FAIL    ${failure}`);
  console.log(`\n${failures.length} failure(s)`);
  process.exit(1);
}
console.log('check:built OK');
