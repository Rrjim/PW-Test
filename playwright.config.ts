import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,
  expect: {
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },
  // testDir: './tests', // DEFAULT VALUE CAN BE REMOVED
  /* Run tests in files in parallel */
  // fullyParallel: false, // DEFAULT VALUE CAN BE REMOVED
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI, // DEFAULT VALUE CAN BE REMOVED
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined, // DEFAULT VALUE CAN BE REMOVED
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['json', {outputFile: 'test-results/jsonReport.json'}],
  ['junit', {outputFile: 'test-results/junitReport.xml'}],
  // ['allure-playwright'],
  ['html']
],
// ALLURE SETUP
// npm install -g allure-commandline
// allure generate allure-results -o allure-report --clean  


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:4200',
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4201/"
        : process.env.STAGING === "1"
        ? "http://localhost:4202/"
        : "http://localhost:4200/",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
        video: {
          mode: "off",
          size: { width: 1920, height: 1080 },
        },
      },
      fullyParallel: true,
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
    {
      name: "mobile",
      testMatch: "**/testMobile.spec.ts",
      use: {
        browserName: "webkit",
        ...devices["iPhone 15 Pro"],
      },
    },
  ],
webServer: {
  command: 'npm run start',       // your dev server
  url: 'http://localhost:4200',
  reuseExistingServer: true,      // attach if already running
  timeout: 120_000,
},

});
