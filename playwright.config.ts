import { defineConfig } from '@playwright/test';

// Tests run against the production preview of the existing build:
//   npm run build && npm run test:e2e
// The runner owns and stops its server (port 4322, distinct from the human
// preview on 4321). The firefox project is configured but cannot launch in
// this environment (see .agent/work/personal-career-website/VALIDATION.md);
// it is run explicitly via `npm run test:e2e:firefox` where it works.
export default defineConfig({
  testDir: './tests',
  outputDir: '.agent/work/personal-career-website/evidence/playwright/test-results',
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: '.agent/work/personal-career-website/evidence/playwright/report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'retain-on-failure',
  },
  webServer: {
    // --ignore-lock keeps astro preview in the foreground (the default
    // lock/manager mode backgrounds itself on non-TTY spawns, which Playwright
    // sees as "exited early"). The runner owns and stops this server.
    command: 'npm run preview -- --host 127.0.0.1 --port 4322 --ignore-lock',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'webkit', use: { browserName: 'webkit', viewport: { width: 1440, height: 900 } } },
    { name: 'firefox', use: { browserName: 'firefox', viewport: { width: 1440, height: 900 } } },
  ],
});
