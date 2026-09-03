import { Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { SearchComponent } from '@/components/search/search.component';

export class MainPage extends BasePage {
    readonly search: SearchComponent;

    get siteTitle() {
        return {
        title: (title: string) => this.page.getByRole("heading", { level: 1, name: title}),
        description: (description: string) => this.page.getByText(description),
        }
    }

    constructor(page: Page) {
        super(page);
        this.search = new SearchComponent(page);
    }
}
