import { Locator, Page } from '@playwright/test';

/**
 * Contract for "type a keyword and submit" — implemented by the desktop header
 * bar today, and by any future variant (mobile drawer, autocomplete box).
 * Tests/pages can depend on this instead of the concrete component.
 */
export interface SearchControl {
    search(keyword: string, category?: string): Promise<void>;
}

/**
 * Header search bar. Persists on every page (home, PDP, search results),
 * so it is modelled as a component rather than a page.
 */
export class SearchComponent implements SearchControl {
    readonly page: Page;
    readonly searchFld: Locator;
    readonly categorySlt: Locator;
    readonly searchBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchFld = page.locator('input.header-search-input');``
        this.categorySlt = page.locator('select.header-search-select');
        this.searchBtn = page.locator('button.header-search-button');
    }

    search = async (keyword: string, category?: string) => {
        await this.searchFld.fill(keyword);
        if (category !== undefined) {
            await this.categorySlt.selectOption({ label: category });
        }
        await this.searchBtn.click();
    }
}
