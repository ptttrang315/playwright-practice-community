import { test, expect } from '@/fixtures/account/account.fixture';

/**
 * Example authenticated spec. Runs only when USER_EMAIL / USER_PASSWORD are set
 * for the current TEST_ENV (see docs/environments.md); skipped otherwise so the
 * logged-out suites stay runnable without an account.
 */
test.describe('My Account', () => {
    test.skip(
        !process.env.USER_EMAIL || !process.env.USER_PASSWORD,
        'No account credentials for this environment',
    );

    test('the account dashboard is reachable when signed in', async ({ page, credentials }) => {
        await page.goto('/my-account/');

        await expect(page.locator('.woocommerce-MyAccount-navigation')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        expect(credentials.email).toBeTruthy();
    });
});
