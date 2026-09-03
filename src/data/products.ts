import { containsKeyword } from '@/utils/text';

export type CatalogProduct = {
    title: string;
    /** PDP slug — only filled in where verified against the live site. */
    slug?: string;
    /** Amounts in the site's integer format (see @/utils/price). */
    regularPrice: number;
    salePrice: number;
};

/**
 * Reference catalog observed during exploration (see specs/00-overview.md).
 */
export const CATALOG: CatalogProduct[] = [
    {
        title: 'API automation Testing với Playwright TypeScript',
        slug: 'api-automation-testing-voi-playwright-typescript',
        regularPrice: 599000,
        salePrice: 579000,
    },
    {
        title: 'FullStack Automation QA với Playwright Typescript',
        slug: 'fullstack-automation-qa-voi-playwright-typescript',
        regularPrice: 2499000,
        salePrice: 1749000,
    },
    { title: 'ISTQB – Test Automation Engineer (CTAL-TAE) Tiếng Việt', regularPrice: 599000, salePrice: 279000 },
    { title: 'ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt', regularPrice: 399000, salePrice: 279000 },
    { title: 'ISTQB Foundation Tiếng Việt – đã chỉnh sửa', regularPrice: 599000, salePrice: 279000 },
    { title: 'ISTQB Test Manager', regularPrice: 599000, salePrice: 279000 },
    { title: 'ISTQB Testing with Generative AI (CT-GenAI) tiếng Việt', regularPrice: 599000, salePrice: 279000 },
    { title: 'Regular Expression cho Tester tiếng Việt', regularPrice: 399000, salePrice: 279000 },
];

export const SEARCH_KEYWORDS = {
    canonical: 'ISTQB',
    partial: 'Playwright',
    noMatch: 'zzzznotfound',
} as const;

/** Catalog products whose title contains the keyword (case-insensitive). */
export const productsMatching = (keyword: string): CatalogProduct[] =>
    CATALOG.filter((p) => containsKeyword(p.title, keyword));

export const productByTitle = (title: string): CatalogProduct => {
    const match = CATALOG.find((p) => p.title === title);
    if (!match) {
        throw new Error(`No catalog product titled "${title}"`);
    }
    return match;
};
