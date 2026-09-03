// spec: specs/02-product-search.md
// seed: seed.spec.ts

import { test, expect } from '@/fixtures';
import { SEARCH_KEYWORDS } from '@/data/products';

test.describe('Product Search › empty results', () => {
    // TC-SEARCH-03 — a non-matching keyword shows an empty-state message, not an error
    test('non-matching keyword shows the empty state', {
        tag: ['@regression'],
        annotation: { type: 'test-case', description: 'TC-SEARCH-03' },
    }, async ({ mainPage, searchPage }) => {
        const keyword = SEARCH_KEYWORDS.noMatch; // 'zzzznotfound'

        await mainPage.search.search(keyword);

        await expect(searchPage.result.searchResults(keyword)).toBeVisible();
        await expect(searchPage.result.noProductsFound).toBeVisible();
        expect(await searchPage.countCourses()).toBe(0);
    });
});
