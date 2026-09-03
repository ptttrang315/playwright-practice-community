import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { getBaseURL } from './src/config/env';

const TEST_ENV = process.env.TEST_ENV || 'dev';

// Per-environment config lives in .env.<env> (gitignored); .env holds optional
// local overrides on top of it. dotenv never overrides a variable that is already
// set, so CI can inject BASE_URL / USER_* directly and these files are ignored.
dotenv.config({ path: path.resolve(__dirname, `.env.${TEST_ENV}`) });
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: '.',
  testMatch: [
    'tests/**/*.spec.ts'
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // The SUT is a shared dev host that flakes under load — retry once locally, and
  // cap local parallelism so a run doesn't hammer it with too many search requests.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: getBaseURL(),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
