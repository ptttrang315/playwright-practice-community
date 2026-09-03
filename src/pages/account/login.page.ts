import { Page } from '@playwright/test';
import { MainPage } from '@/pages/main.page';
import type { TestUser } from '@/config/env';

/** WooCommerce `My Account` login form (logged-out state of `/my-account/`). */
export class LoginPage extends MainPage {
    get form() {
        return {
            username: this.page.locator('#username'),
            password: this.page.locator('#password'),
            submit: this.page.getByRole('button', { name: 'Log in' }),
        };
    }

    /** Present only once the user is authenticated. */
    get accountNav() {
        return this.page.locator('.woocommerce-MyAccount-navigation');
    }

    constructor(page: Page) {
        super(page);
    }

    goto = async () => {
        await this.page.goto('/my-account/');
    };

    loginAs = async (user: TestUser) => {
        await this.form.username.fill(user.email);
        await this.form.password.fill(user.password);
        await this.form.submit.click();
        await this.accountNav.waitFor({ state: 'visible' });
    };
}
