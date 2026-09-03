import { Locator, Page } from '@playwright/test';
import { MainPage } from '@/pages/main.page';

export class SearchPage extends MainPage {
    count: number = 0;

    readonly resultCards: Locator;

    get result() {
        return {
            searchResults: (searchKey: string) => this.page.getByRole('heading', {name: `Search results: “${searchKey}”`}),
            showingAllResults: (number: number) => this.page.getByText(`Showing all ${number} results`),
            noProductsFound: this.page.getByText('No products were found matching your selection.'),
        }
    }

    constructor(page: Page) {
        super(page)
        this.resultCards = page.locator('.products.columns-4 li');
    }

    /** One result card, located by its product title. */
    card = (title: string) => {
        const root = this.resultCards.filter({
            has: this.page.getByRole('heading', { level: 2, name: title }),
        });
        return {
            root,
            addToCart: root.getByRole('button', { name: 'Add to cart' }),
            salePrice: root.locator('ins .woocommerce-Price-amount').first(),
        };
    }

    countCourses = async () => {
        return this.resultCards.count();
    }

    coursesNames = async () => {
        return this.page.locator('.woocommerce-loop-product__title').allTextContents();
    }

    openDetailCourse = async (courseName: string) => {
        await this.page.getByText(courseName, {exact: true}).click();
    }
}