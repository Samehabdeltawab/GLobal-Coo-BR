// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const RPconfig = {
  // @ts-ignore
  apiKey: 'GACA_qIhdm5BsToutIA2Mi1nMPQJrHA5dSo1_neL_MDe-MIWGb4_CIGP65RvG1lIrVaem',
  endpoint: 'https://qcauto-rp.thiqah.sa/api/v1',
  project: 'mobility_logistics_industrial',
  launch: 'Global_COO_Test',
};

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js', // or '**/*.test.js' depending on your filenames
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  globalSetup: require.resolve('./global/global-setup.js'),
  globalTeardown: require.resolve('./global/global-teardown.js'),


  // Glob patterns or regular expressions to ignore test files.
  // testIgnore: '*test-assets',
  // Glob patterns or regular expressions that match test files.
  // testMatch: '*todo-tests/*.spec.ts',

  // Each test is given 1000 seconds.
  timeout: 600 * 1000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // globalSetup: require.resolve('./global-setup'),
  // path to the global teardown files.
  // globalTeardown: require.resolve('./global-teardown'),

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 500000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  reporter: [
    ['html', { open: 'never' }],],
  // globalSetup: require.resolve('./global-setup'),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://global-coo-frontend.aks.thiqah.sa',
    baseURL: 'https://cicibaspp.thiqah.sa/',
    //baseUrl: 'https://quality-mate.aks.thiqah.sa'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Tell all tests to load signed-in state from 'storageState.json'.
    // storageState: 'storageState.json',
    // Viewport used for all pages in the context.
    viewport: { width: 1280, height: 720 },

    // Emulates the user timezone.
    // timezoneId: 'Europe/Paris',

    // Context geolocation.
    // geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale.
    // locale: 'en-GB',

    // Change the default data-testid attribute.
    // testIdAttribute: 'pw-test-id',

    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    // actionTimeout: 0,

    // Netowrk options //
    // Whether to automatically download all the attachments.
    // acceptDownloads: false,

    // An object containing additional HTTP headers to be sent with every request.
    // extraHTTPHeaders: {
    //   'X-My-Header': 'value',
    // },

    // Credentials for HTTP authentication.
    // httpCredentials: {
    //   username: 'user',
    //   password: 'pass',
    // },

    // Whether to ignore HTTPS errors during navigation.
    // ignoreHTTPSErrors: true,

    // Whether to emulate network being offline.
    // offline: true,

    // Proxy settings used for all pages in the test.
    // proxy: {
    //   server: 'http://myproxy.com:3128',
    //   bypass: 'localhost',
    // },

    // recording options //
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

    // Record video only when retrying a test for the first time.
    // video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
function handleTestFailure(arg0) {
  throw new Error('Function not implemented.');
}

