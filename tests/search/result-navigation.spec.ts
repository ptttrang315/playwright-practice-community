// spec: specs/02-product-search.md
// seed: seed.spec.ts

import { test, expect } from '@/fixtures';
import { SEARCH_KEYWORDS } from '@/data/products';

test.describe('Product Search › result navigation', { tag: ['@e2e', '@regression'] }, () => {
    const canonical = SEARCH_KEYWORDS.canonical; // 'ISTQB'

    // TC-SEARCH-02 — every result opens a relevant product detail page
    test('each result opens a relevant product detail page', {
        tag: ['@smoke'],
        annotation: { type: 'test-case', description: 'TC-SEARCH-02' },
    }, async ({ mainPage, searchPage, productPage }) => {
        await mainPage.search.search(canonical);
        await expect(searchPage.result.searchResults(canonical)).toBeVisible();

        const titles = await searchPage.coursesNames();

        for (const title of titles) {
            await searchPage.openDetailCourse(title);
            await expect(productPage.courses.title(title)).toBeVisible();
            await expect(productPage.page).toHaveURL(/\/product\/[^/]+\/$/);

            await productPage.page.goBack();
            await expect(searchPage.result.searchResults(canonical)).toBeVisible();
        }
    });
});
