# Test Plan – Home Page

**Feature:** Landing page (`/`) and course catalog grid
**Shared context:** [00-overview.md](./00-overview.md)

## Test suite

|                |                                                           |
|----------------|-----------------------------------------------------------|
| **Suite name** | `Home Page`                                               |
| **Spec file**  | `tests/home/home-page.spec.ts`                            |
| **Fixtures**   | `mainPage`, `homePage`, `productPage` (from `@/fixtures`) |
| **Status**     | Not created yet                                           |

## Scenario index

| ID         | Suite test | Title                                                 | Priority | Type   | Automated? |
|------------|------------|-------------------------------------------------------|----------|--------|------------|
| TC-HOME-01 | `HOME_01`  | Home page loads with all primary regions              | P1       | Auto   | ❌ Not yet  |
| TC-HOME-02 | `HOME_02`  | Product grid shows each product with required details | P1       | Auto   | ❌ Not yet  |
| TC-HOME-03 | `HOME_03`  | Sale price presentation                               | P2       | Auto   | ❌ Not yet  |
| TC-HOME-04 | `HOME_04`  | Primary navigation links                              | P2       | Auto   | ❌ Not yet  |
| TC-HOME-05 | `HOME_05`  | Product card navigates to the product detail page     | P1       | Auto   | ❌ Not yet  |
| TC-HOME-06 | `HOME_06`  | Header persists and is interactive on the home page   | P2       | Auto   | ❌ Not yet  |
| TC-HOME-07 | –          | Sidebar widgets                                       | P3       | Manual | ➖ N/A      |

---

## TC-HOME-01 — Home page loads with all primary regions

**Priority:** P1 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** The landing page renders header, navigation, product grid, sidebar, and footer.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Wait for the page to finish loading.

**Expected results:**
- Page `<h1>` is `Trang chủ`; section heading `Tất cả các khóa học` is visible.
- Header shows: site title link, search textbox, category select, search button, mini-cart button, "My Account" link.
- Primary nav shows exactly: `Trang chủ`, `Danh sách khoá học`, `Blog`.
- Sidebar shows headings `Các comment gần đây` and `Categories` (`Courses`, `Uncategorized`).
- Footer shows `Theme by EnvoThemes`.
- No console errors of severity `error`.

## TC-HOME-02 — Product grid shows each product with required details

**Priority:** P1 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Every product card exposes image, title, price, and an Add-to-cart control.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Enumerate all product cards in the `Tất cả các khóa học` list.

**Expected results:**
- At least 8 product cards are displayed.
- Each card contains: a product image with non-empty `alt`, a title linking to `/product/<slug>/`, a visible price, and a button labelled `Add to cart` / `Add to cart: "<product name>"`.
- Each title link and its heading link point to the same product URL.

## TC-HOME-03 — Sale price presentation

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Discounted products show both original and current price and a "Sale" badge.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Inspect a product on sale (e.g. `ISTQB Test Manager`).

**Expected results:**
- A `Sale` badge is shown on the card.
- The original price is rendered struck-through (`<del>`) and the current price as `<ins>`.
- Accessible text includes `Original price was: <x>` and `Current price is: <y>`, with `y < x`.

## TC-HOME-04 — Primary navigation links

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Header nav routes to the correct pages.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Click `Danh sách khoá học`; note URL, then go back.
3. Click `Blog`; note URL, then go back.
4. Click the site title.

**Expected results:**
- `Danh sách khoá học` → `/shop/` (page `<h1>` "Shop").
- `Blog` → `/blog/`.
- Site title → `/` (home).
- Each destination returns HTTP 200 and renders its main content.

## TC-HOME-05 — Product card navigates to the product detail page

**Priority:** P1 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Clicking a product opens its detail page with matching data.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Click the title of `ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt`.

**Expected results:**
- URL is `/product/istqb-certified-tester-finance-testing-ct-ft-tieng-viet/`.
- Detail `<h1>` matches the product name.
- Price shows `399.000 $` struck-through and `279.000 $` current.
- Short description contains `Chinh phục chứng chỉ ISTQB® CT-FT`.
- An `Add to cart` button and a quantity input (default `1`) are present.

## TC-HOME-06 — Header persists and is interactive on the home page

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Search field, category select, mini-cart, and account link are usable.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Focus the search textbox and type text; open the category select.
3. Read the mini-cart button label.
4. Hover/click "My Account".

**Expected results:**
- Search textbox accepts input; category select lists `All Categories` (default) and `Uncategorized`.
- Mini-cart button reads `0` / `0 $` on a fresh context.
- "My Account" navigates to `/my-account/` (login form for a logged-out user).

## TC-HOME-07 — Sidebar widgets

**Priority:** P3 · **Type:** Manual · **Automated?:** ➖ N/A

**Objective:** Sidebar renders recent comments and category links.

**Preconditions:** Fresh context.

**Steps:**
1. Navigate to `/`.
2. Inspect the sidebar.

**Expected results:**
- `Các comment gần đây` lists at least one entry with an author link and a post link.
- `Categories` lists `Courses` → `/category/courses/` and `Uncategorized` → `/category/uncategorized/`.
