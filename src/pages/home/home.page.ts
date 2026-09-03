import { Page } from '@playwright/test';
import { MainPage } from '@/pages/main.page';

export class HomePage extends MainPage {

    constructor(page: Page) {
        super(page);
    }
}