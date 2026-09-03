import { test as base, mergeTests } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { test as indexTest } from '@/fixtures';
import { getEnvName, getUser, type TestUser } from '@/config/env';
import { LoginPage } from '@/pages/account/login.page';

/**
 * Authenticated `test` for account / logged-in specs.
 *
 *   import { test, expect } from '@/fixtures/account/account.fixture';
 *
 * The default `test` from `@/fixtures` stays logged out — the home / search /
 * cart suites assume a fresh, anonymous context. Only import this one when a
 * spec needs a signed-in user.
 *
 * Login runs once per worker and is cached to `playwright/.auth/<env>-user.json`,
 * so switching `TEST_ENV` uses a different account and a different cache file.
 */

const AUTH_TTL_MS = 60 * 60 * 1000;
const AUTH_DIR = path.resolve(__dirname, '../../../playwright/.auth');

type AccountFixtures = {
    /** Raw credentials for the current environment. */
    credentials: TestUser;
};

type AccountWorkerFixtures = {
    /** Path to the cached storage-state file for the signed-in user. */
    userStorageState: string;
};

const accountTest = base.extend<AccountFixtures, AccountWorkerFixtures>({
    credentials: async ({}, use) => {
        await use(getUser());
    },

    userStorageState: [
        async ({ browser }, use) => {
            fs.mkdirSync(AUTH_DIR, { recursive: true });
            const file = path.join(AUTH_DIR, `${getEnvName()}-user.json`);

            const cached =
                fs.existsSync(file) &&
                Date.now() - fs.statSync(file).mtimeMs < AUTH_TTL_MS;

            if (!cached) {
                const page = await browser.newPage();
                const login = new LoginPage(page);
                await login.goto();
                await login.loginAs(getUser());
                await page.context().storageState({ path: file });
                await page.close();
            }

            await use(file);
        },
        { scope: 'worker' },
    ],

    // Every context created by this `test` starts already signed in.
    storageState: async ({ userStorageState }, use) => {
        await use(userStorageState);
    },
});

export const test = mergeTests(indexTest, accountTest);
export { expect } from '@playwright/test';
