import { MainPage } from '@/pages/main.page';
import { test as base } from '@playwright/test';

type MainFixture = {
    mainPage: MainPage;
}

export const test = base.extend <MainFixture> (
    {
        mainPage : async ({page}, use) => {
        const mainPage = new MainPage(page);
        
        // Setup
        await mainPage.navigateMainPage();
        await use(mainPage);

        }
    }
)