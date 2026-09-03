import { SearchPage } from '@/pages/search/search.page';
import { test as base } from "@playwright/test";

type SearchFixtures = {
    searchPage: SearchPage;
}

export const test = base.extend <SearchFixtures> (
    {
        searchPage: async ({page}, use) => {
            const searchPage = new SearchPage(page);

            await use(searchPage);
        },
    }
)

export { expect } from '@playwright/test';