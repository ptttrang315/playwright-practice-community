# Environments & accounts

## Choosing an environment

The target environment is selected with the `TEST_ENV` variable (`dev` | `staging` | `prod`, default `dev`).
Each environment has its own gitignored `.env.<env>` file; `playwright.config.ts` loads
`.env.<TEST_ENV>` and then `.env` (optional local overrides) on top.

```bash
npx playwright test                      # dev (default)
npm run test:staging                     # = TEST_ENV=staging playwright test
TEST_ENV=prod npx playwright test tests/search
```

Resolution order for the base URL (`src/config/env.ts` → `getBaseURL()`):

1. `BASE_URL` from the environment / `.env.<env>` file
2. a built-in default (only `dev` has one)
3. otherwise the run fails fast with a clear message

## Setup

```bash
cp .env.example .env.dev        # already present, with the dev URL filled in
cp .env.example .env.staging    # add BASE_URL (+ account) for staging
cp .env.example .env.prod
```

In CI, don't ship `.env.*` — set `TEST_ENV`, `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`
as pipeline variables. `dotenv` never overrides a variable that is already set.

## Accounts per environment

Credentials live in the same `.env.<env>` file as the URL, so an account always
travels with its environment:

```
# .env.staging
BASE_URL=https://.../
USER_EMAIL=qa-staging@example.com
USER_PASSWORD=...
```

The **default** `test` (`@/fixtures`) is logged out — the home / search / cart
suites assume a fresh anonymous context. For a signed-in spec, import the
authenticated `test` instead:

```ts
import { test, expect } from '@/fixtures/account/account.fixture';

test('my account page shows the user dashboard', async ({ page, credentials }) => {
  await page.goto('/my-account/');
  await expect(page.locator('.woocommerce-MyAccount-navigation')).toBeVisible();
  await expect(page.getByText(credentials.email)).toBeVisible();
});
```

It logs in once per worker via `LoginPage` and caches the session to
`playwright/.auth/<env>-user.json` (1-hour TTL). Switching `TEST_ENV` uses a
different account and a separate cache file. `credentials` is also available on
its own if a test needs to type the email/password itself.
