/**
 * Environment + account resolution.
 *
 * The target environment is selected with the `TEST_ENV` variable (default `dev`).
 * `playwright.config.ts` loads `.env.<TEST_ENV>` before anything here runs, so the
 * getters below just read `process.env`. They are functions, not top-level
 * constants, so a missing value only throws for the run that actually needs it
 * (e.g. the logged-out suites never touch `getUser()`).
 */

export type EnvName = 'dev' | 'staging' | 'prod';

/** Base URLs known at commit time. Anything else must come from `.env.<env>`. */
const KNOWN_BASE_URLS: Partial<Record<EnvName, string>> = {
    dev: 'https://e-commerce-dev.betterbytesvn.com/',
};

export interface TestUser {
    email: string;
    password: string;
}

export function getEnvName(): EnvName {
    const raw = (process.env.TEST_ENV ?? 'dev').toLowerCase();
    if (raw !== 'dev' && raw !== 'staging' && raw !== 'prod') {
        throw new Error(`Unknown TEST_ENV "${raw}". Expected one of: dev, staging, prod.`);
    }
    return raw;
}

export function getBaseURL(): string {
    const env = getEnvName();
    const url = process.env.BASE_URL || KNOWN_BASE_URLS[env];
    if (!url) {
        throw new Error(
            `No base URL for TEST_ENV=${env}. Set BASE_URL in .env.${env} (see .env.example).`,
        );
    }
    return url;
}

export function getUser(): TestUser {
    const env = getEnvName();
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    if (!email || !password) {
        throw new Error(
            `Missing account credentials for TEST_ENV=${env}. ` +
                `Set USER_EMAIL and USER_PASSWORD in .env.${env}.`,
        );
    }
    return { email, password };
}
