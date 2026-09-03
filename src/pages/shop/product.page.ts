import { Page } from '@playwright/test';
import { MainPage } from '@/pages/main.page';

export class ProductPage extends MainPage {
    get courses() {
        return {
            title: (courseName: string) => this.page.getByRole('heading',{ name: courseName , level: 1})
        }
    }

    constructor(page: Page) {
        super(page);
    }
}