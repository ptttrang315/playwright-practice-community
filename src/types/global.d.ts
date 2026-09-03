/**
 * Global type augmentation.
 *
 * `interface` is required here, not `type` — these declarations *merge* into
 * types Node/Playwright already ship, adding fields rather than redefining them.
 */

declare namespace NodeJS {
    interface ProcessEnv {
        /** Target environment; selects which .env.<env> file is loaded. Default: `dev`. */
        TEST_ENV?: 'dev' | 'staging' | 'prod';
        /** Base URL of the system under test. Falls back to the dev host in src/config/env.ts. */
        BASE_URL?: string;
        /** Test account for logged-in specs (see src/config/env.ts, getUser()). */
        USER_EMAIL?: string;
        USER_PASSWORD?: string;
        /** Set by CI providers — enables retries and single-worker runs. */
        CI?: string;
    }
}

// Example of extending Playwright's assertion surface. Uncomment together with a
// matching `expect.extend({ ... })` implementation before using it in a test.
//
// declare global {
//     namespace PlaywrightTest {
//         interface Matchers<R> {
//             toBeOnProductDetailPage(): R;
//         }
//     }
// }
