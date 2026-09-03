import { test as homeTest } from '@/fixtures/home/home.fixture';
import { test as searchTest } from '@/fixtures/search/search.fixture';
import { test as shopTest } from '@/fixtures/shop/shop.fixture';
import { test as mainPage } from '@/fixtures/main.fixture';

import { mergeTests } from '@playwright/test';

export const test = mergeTests(homeTest, shopTest, searchTest, mainPage);
  
export { expect } from '@playwright/test';