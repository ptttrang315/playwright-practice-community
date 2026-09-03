// spec: specs/02-product-search.md
// seed: seed.spec.ts

import { test, expect } from '@/fixtures';
import { SEARCH_KEYWORDS, productsMatching, productByTitle } from '@/data/products';
import { parsePrice } from '@/utils/price';

test.describe('Product Search › keyword matching', () => {
    const canonical = SEARCH_KEYWORDS.canonical; // 'ISTQB'
    const canonicalTitles = productsMatching(canonical).map((p) => p.title);

    // TC-SEARCH-01 — the canonical keyword returns the expected result set and URL
    test('exact keyword returns the matching product set', {
        tag: ['@smoke', '@regression'],
        annotation: { type: 'test-case', description: 'TC-SEARCH-01' },
    }, async ({ mainPage, searchPage }) => {
        await expect(mainPage.siteTitle.title('E-commerce site testing')).toBeVisible();

        await mainPage.search.search(canonical);

        await test.step('URL, heading and count reflect the search', async () => {
            await expect(searchPage.page).toHaveURL(`?post_type=product&s=${canonical}&product_cat=`);
            await expect(searchPage.result.searchResults(canonical)).toBeVisible();
            await expect(searchPage.result.showingAllResults(canonicalTitles.length)).toBeVisible();
            expect(await searchPage.countCourses()).toBe(canonicalTitles.length);
        });

        await test.step('Every card is a genuine product with the catalog sale price', async () => {
            for (const title of canonicalTitles) {
                const card = searchPage.card(title);
                await expect(card.addToCart).toBeVisible();
                await expect(card.salePrice).toBeVisible();
                const shown = parsePrice((await card.salePrice.textContent()) ?? '');
                expect(shown).toBe(productByTitle(title).salePrice);
            }
        });
    });

    // Keyword variants that must return the same product set as their canonical form.
    const variants = [
        { name: 'lowercase input', input: 'istqb', canonical: 'ISTQB', tc: 'TC-SEARCH-05' },
        // WordPress does not trim the heading, but the result set is unchanged.
        { name: 'whitespace-padded input', input: '  ISTQB  ', canonical: 'ISTQB', tc: 'TC-SEARCH-06' },
        { name: 'partial keyword', input: 'Playwright', canonical: 'Playwright', tc: 'TC-SEARCH-07' },
    ];

    for (const v of variants) {
        test(`${v.name} returns the expected product set`, {
            tag: ['@regression'],
            annotation: { type: 'test-case', description: v.tc },
        }, async ({ mainPage, searchPage }) => {
            const expectedTitles = productsMatching(v.canonical).map((p) => p.title);

            await mainPage.search.search(v.input);

            await expect(searchPage.result.showingAllResults(expectedTitles.length)).toBeVisible();
            expect(await searchPage.countCourses()).toBe(expectedTitles.length);

            const actualTitles = await searchPage.coursesNames();
            expect(actualTitles.sort()).toEqual([...expectedTitles].sort());
        });
    }
});
