# Test Plan – Overview & Shared Context

**System under test:** https://e-commerce-dev.betterbytesvn.com/ (WordPress + WooCommerce, EnvoThemes theme)
**Scope:** Home page · Product search · Add to cart
**Out of scope:** Checkout completion, payment (PayPal), account/login/registration, blog, product reviews, category browsing
**Author:** QA – Trang Pham
**Last updated:** 2026-09-03

Feature plans:
- [01 – Home Page](./01-home-page.md)
- [02 – Product Search](./02-product-search.md)
- [03 – Add to Cart](./03-add-to-cart.md)

---

## 1. Reference data (observed during exploration)

Products visible on the home grid (8) with regular → sale price:

| Product                                                   | Regular     | Sale        |
|-----------------------------------------------------------|-------------|-------------|
| API automation Testing với Playwright TypeScript          | 599.000 $   | 579.000 $   |
| FullStack Automation QA với Playwright Typescript         | 2.499.000 $ | 1.749.000 $ |
| ISTQB – Test Automation Engineer (CTAL-TAE) Tiếng Việt    | 599.000 $   | 279.000 $   |
| ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt | 399.000 $   | 279.000 $   |
| ISTQB Foundation Tiếng Việt – đã chỉnh sửa                | 599.000 $   | 279.000 $   |
| ISTQB Test Manager                                        | 599.000 $   | 279.000 $   |
| ISTQB Testing with Generative AI (CT-GenAI) tiếng Việt    | 599.000 $   | 279.000 $   |
| Regular Expression cho Tester tiếng Việt                  | 399.000 $   | 279.000 $   |

Per challenge `HOME_20260701`, a search for `ISTQB` is expected to return **5 products**.

Header regions (persist on every page):
- Site title "E-commerce site testing" / tagline "Website thực hành – hoctest.com" (links to `/`)
- Search: textbox (placeholder `Search products...`) + category `<select>` (`All Categories` selected, `Uncategorized`) + submit button
- Mini-cart button showing **item count** and **running total** (fresh state: `0` / `0 $`)
- "My Account" link → `/my-account/`
- Primary nav: `Trang chủ` → `/`, `Danh sách khoá học` → `/shop/`, `Blog` → `/blog/`

Cart page (`/cart/`) totals rows observed: **Subtotal**, **Flat rate = 13 $**, **Tax** (~8 % of subtotal), **Estimated total**.

## 2. Global assumptions

- Each scenario starts from a **fresh browser context**: no cookies, empty cart, logged out.
- Scenarios are independent and may run in any order.
- Currency/number format is `xxx.xxx $` (dot as thousands separator) — assertions must not parse prices as decimals.
- Base URL is configurable via `BASE_URL`; default is the dev host above.

## 3. Global risks / notes

- Home grid shows 8 products but the challenge precondition lists 9 catalog products ("Playwright TypeScript BDD tiếng Việt" is not on the grid) — confirm the expected home count.
- `Flat rate` shipping and `Tax` apply even to digital courses — confirm this is intended.
- PayPal buttons render inside an iframe; do not assert on their internals.

## 4. Priority & execution legend

| Field          | Value          | Meaning                                                                      |
|----------------|----------------|------------------------------------------------------------------------------|
| **Priority**   | **P1**         | Critical path / smoke. Must pass every run; blocks release.                  |
|                | **P2**         | High. Important functionality; fix before release.                           |
|                | **P3**         | Medium/low. Cosmetic, secondary, or low-usage paths.                         |
| **Type**       | **Auto**       | Belongs in the automated regression suite.                                   |
|                | **Manual**     | Run by hand — exploratory, behaviour not yet defined, or low automation ROI. |
| **Automated?** | ✅ `<test id>`  | Automated and passing; links to the test in the suite.                       |
|                | 🚧 `<test id>` | Partially automated (some steps/assertions still missing).                   |
|                | ❌ Not yet      | Planned for automation, not implemented.                                     |
|                | ➖ N/A          | Manual test; not an automation candidate.                                    |

## 5. Master test matrix

| ID           | Feature | Title                                                   | Priority | Type   | Automated? |
|--------------|---------|---------------------------------------------------------|----------|--------|------------|
| TC-HOME-01   | Home    | Home page loads with all primary regions                | P1       | Auto   | ❌ Not yet  |
| TC-HOME-02   | Home    | Product grid shows each product with required details   | P1       | Auto   | ❌ Not yet  |
| TC-HOME-03   | Home    | Sale price presentation                                 | P2       | Auto   | ❌ Not yet  |
| TC-HOME-04   | Home    | Primary navigation links                                | P2       | Auto   | ❌ Not yet  |
| TC-HOME-05   | Home    | Product card navigates to the product detail page       | P1       | Auto   | ❌ Not yet  |
| TC-HOME-06   | Home    | Header persists and is interactive on the home page     | P2       | Auto   | ❌ Not yet  |
| TC-HOME-07   | Home    | Sidebar widgets                                         | P3       | Manual | ➖ N/A      |
| TC-SEARCH-01 | Search  | Search a valid keyword returns matching products        | P1       | Auto   | ✅ `keyword-matching`   |
| TC-SEARCH-02 | Search  | Each search result opens a relevant product detail page | P1       | Auto   | ✅ `result-navigation`  |
| TC-SEARCH-03 | Search  | Search with no matches                                  | P1       | Auto   | ✅ `empty-results`      |
| TC-SEARCH-04 | Search  | Empty search submission                                 | P2       | Manual | ➖ N/A      |
| TC-SEARCH-05 | Search  | Search is case-insensitive                              | P2       | Auto   | ✅ `keyword-matching`   |
| TC-SEARCH-06 | Search  | Leading/trailing whitespace is trimmed                  | P3       | Auto   | ✅ `keyword-matching`   |
| TC-SEARCH-07 | Search  | Partial keyword                                         | P2       | Auto   | ✅ `keyword-matching`   |
| TC-SEARCH-08 | Search  | Category-scoped search                                  | P2       | Auto   | ❌ Not yet  |
| TC-SEARCH-09 | Search  | Special / unsafe characters are handled safely          | P2       | Auto   | ❌ Not yet  |
| TC-SEARCH-10 | Search  | Search works from a non-home page                       | P2       | Auto   | ❌ Not yet  |
| TC-CART-01   | Cart    | Add a product from the home listing                     | P1       | Auto   | ❌ Not yet  |
| TC-CART-02   | Cart    | Add a product from the PDP (default quantity)           | P1       | Auto   | ❌ Not yet  |
| TC-CART-03   | Cart    | Add a product with quantity greater than 1              | P1       | Auto   | ❌ Not yet  |
| TC-CART-04   | Cart    | "View cart" link from the confirmation                  | P2       | Auto   | ❌ Not yet  |
| TC-CART-05   | Cart    | Cart page shows correct line items and totals           | P1       | Auto   | ❌ Not yet  |
| TC-CART-06   | Cart    | Add multiple different products; totals accumulate      | P1       | Auto   | ❌ Not yet  |
| TC-CART-07   | Cart    | Adding the same product twice increments its quantity   | P1       | Auto   | ❌ Not yet  |
| TC-CART-08   | Cart    | Update quantity on the cart page recalculates totals    | P1       | Auto   | ❌ Not yet  |
| TC-CART-09   | Cart    | Reduce quantity is disabled at the minimum              | P2       | Auto   | ❌ Not yet  |
| TC-CART-10   | Cart    | Remove an item / empty cart state                       | P1       | Auto   | ❌ Not yet  |
| TC-CART-11   | Cart    | Cart persists across navigation and reload              | P2       | Auto   | ❌ Not yet  |
| TC-CART-12   | Cart    | Quantity input edge cases on the PDP                    | P2       | Manual | ➖ N/A      |
| TC-CART-13   | Cart    | "Proceed to Checkout" navigates to the checkout page    | P2       | Auto   | ❌ Not yet  |

## 6. Suggested smoke suite (P1)

TC-HOME-01, TC-HOME-02, TC-HOME-05, TC-SEARCH-01, TC-SEARCH-02, TC-SEARCH-03,
TC-CART-01, TC-CART-02, TC-CART-03, TC-CART-05, TC-CART-06, TC-CART-07, TC-CART-08, TC-CART-10.

## 7. Traceability

| Challenge / requirement                                                             | Covered by             |
|-------------------------------------------------------------------------------------|------------------------|
| `HOME_20260701` step 1 – search `ISTQB`, default category, URL params, 5 results    | TC-SEARCH-01           |
| `HOME_20260701` step 2 – click each result → PDP, name/description contains `ISTQB` | TC-SEARCH-02           |
| Home page renders catalog                                                           | TC-HOME-01, TC-HOME-02 |
| Add product to cart                                                                 | TC-CART-01, TC-CART-02 |
| Cart totals correctness                                                             | TC-CART-05             |

## 8. Open questions for the product owner

1. Expected number of products on the home grid (8 shown vs 9 in catalog)?
2. Is `Flat rate` shipping + `Tax` intended for digital course products?
3. Expected behaviour for an empty search submission (TC-SEARCH-04)?
4. Is there a maximum purchasable quantity per product (stock limit)?
5. Expected behaviour for whitespace-padded search terms (TC-SEARCH-06)?
