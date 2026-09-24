import { defineConfig } from 'astro/config';

// Optional future public-site URL (e.g. https://profile.thebeng.dev).
// Set SITE_URL in the environment when a final public URL exists; canonical
// links stay off until then and local work never requires a production domain.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  output: 'static',
  site,
  build: {
    // One page plus 404: dist/index.html and dist/404.html directly.
    format: 'file',
  },
});
