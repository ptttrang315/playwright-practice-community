import { test as base } from '@playwright/test';
import { ProductPage } from '@/pages/shop/product.page';

type ShopFixtures = {
    productPage: ProductPage;
}

export const test = base.extend <ShopFixtures> (
    {
        productPage: async ({page}, use) => {
            const productPage = new ProductPage(page);

            await use(productPage);
        }
    }
)