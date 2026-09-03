import { Page } from '@playwright/test';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateMainPage = async (path: string = '') => {
        await this.page.goto(path);
    }
}

