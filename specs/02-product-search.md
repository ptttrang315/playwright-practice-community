# Test Plan – Product Search

**Feature:** Header search bar and search-results page
**Shared context:** [00-overview.md](./00-overview.md)

## Test suite

|                 |                                                             |
|-----------------|-------------------------------------------------------------|
| **Suite name**  | `Product Search`                                            |
| **Spec folder** | `tests/search/`                                             |
| **Fixtures**    | `mainPage`, `searchPage`, `productPage` (from `@/fixtures`) |
| **Data**        | `@/data/products` (`CATALOG`, `SEARCH_KEYWORDS`)            |

Specs are grouped by **behaviour**, not one-file-per-case. Suite membership is set with
Playwright **tags** (`@smoke` ⊆ `@regression`; `@e2e` = cross-feature journey) — run a
subset with `npm run test:smoke` / `test:e2e`.

## Scenario index

| ID           | Title                                                   | Priority | Tags                     | Spec file                          |
|--------------|---------------------------------------------------------|----------|--------------------------|------------------------------------|
| TC-SEARCH-01 | Search a valid keyword returns matching products        | P1       | `@smoke` `@regression`   | `keyword-matching.spec.ts`         |
| TC-SEARCH-02 | Each search result opens a relevant product detail page | P1       | `@smoke` `@e2e` `@regression` | `result-navigation.spec.ts`    |
| TC-SEARCH-03 | Search with no matches                                  | P1       | `@regression`            | `empty-results.spec.ts`            |
| TC-SEARCH-04 | Empty search submission                                 | P2       | – (manual)               | –                                  |
| TC-SEARCH-05 | Search is case-insensitive                              | P2       | `@regression`            | `keyword-matching.spec.ts`         |
| TC-SEARCH-06 | Leading/trailing whitespace is trimmed                  | P3       | `@regression`            | `keyword-matching.spec.ts`         |
| TC-SEARCH-07 | Partial keyword                                         | P2       | `@regression`            | `keyword-matching.spec.ts`         |
| TC-SEARCH-08 | Category-scoped search                                  | P2       | `@regression`            | ❌ Not yet                          |
| TC-SEARCH-09 | Special / unsafe characters are handled safely          | P2       | `@regression`            | ❌ Not yet                          |
| TC-SEARCH-10 | Search works from a non-home page                       | P2       | `@e2e` `@regression`     | ❌ Not yet                          |

> `keyword-matching.spec.ts` runs TC-SEARCH-01 as a standalone `@smoke` test and
> TC-SEARCH-05/06/07 as a data-driven loop over keyword variants that must return the
> same product set as their canonical form.
> **TC-SEARCH-06:** WordPress does not trim the heading (`Search results: “ ISTQB ”`),
> but the result set is unchanged — the test asserts the set, not the heading.

---

## TC-SEARCH-01 — Search a valid keyword returns matching products (happy path)

**Priority:** P1 · **Type:** Auto · **Tags:** `@smoke @regression` · **Automated?:** ✅ `keyword-matching.spec.ts` — "exact keyword returns the matching product set"

**Objective:** Searching `ISTQB` from the header returns the expected result set and URL.

**Preconditions:** Fresh context; standing on `/`.

**Steps:**
1. Type `ISTQB` in the header search textbox.
2. Leave the category select at `All Categories`.
3. Submit the search (click the button / press Enter).

**Expected results:**
- URL is `?post_type=product&s=ISTQB&product_cat=`.
- Page `<h1>` is `Search results: "ISTQB"`.
- Exactly **5** product cards are shown ("Showing all 5 results").
- Every result title contains `ISTQB` (case-insensitive) OR the product description contains `ISTQB`.
- Each card still exposes price and an Add-to-cart button.

## TC-SEARCH-02 — Each search result opens a relevant product detail page

**Priority:** P1 · **Type:** Auto · **Tags:** `@smoke @e2e @regression` · **Automated?:** ✅ `result-navigation.spec.ts`

**Objective:** Every result links to a valid PDP whose name or description contains the keyword.

**Preconditions:** Completed a search for `ISTQB` (TC-SEARCH-01).

**Steps:**
1. For each of the 5 results, open the product detail page, then return to the results.

**Expected results:**
- Each PDP returns HTTP 200 and renders an `<h1>`.
- The `<h1>` text or the product description contains `ISTQB` (case-insensitive).
- URL matches `/product/<slug>/`.
- After going back, the results page for `ISTQB` is shown again.

## TC-SEARCH-03 — Search with no matches

**Priority:** P1 · **Type:** Auto · **Tags:** `@regression` · **Automated?:** ✅ `empty-results.spec.ts`

**Objective:** A non-matching keyword shows an empty-state message, not an error.

**Preconditions:** Fresh context; standing on `/`.

**Steps:**
1. Search for `zzzznotfound`.

**Expected results:**
- `<h1>` is `Search results: "zzzznotfound"`.
- Status message `No products were found matching your selection.` is shown.
- No product cards are rendered; no console errors.

## TC-SEARCH-04 — Empty search submission

**Priority:** P2 · **Type:** Manual · **Automated?:** ➖ N/A

**Objective:** Submitting an empty query is handled gracefully.

**Preconditions:** Fresh context; standing on `/`.

**Steps:**
1. Leave the search textbox blank and submit.

**Expected results:**
- The site does not error (500 / JS exception).
- Either the user stays on `/`, or a results page for an empty term renders — **document the actual behaviour** and confirm the intended one with the product owner.

## TC-SEARCH-05 — Search is case-insensitive

**Priority:** P2 · **Type:** Auto · **Tags:** `@regression` · **Automated?:** ✅ `keyword-matching.spec.ts` (data-driven variant: `lowercase input`)

**Objective:** Lowercase input returns the same set as the canonical keyword.

**Preconditions:** Fresh context.

**Steps:**
1. Search for `istqb`.

**Expected results:**
- Result count and product set equal those of the `ISTQB` search (TC-SEARCH-01) — 5 products.
- `<h1>` reflects the entered casing: `Search results: "istqb"`.

## TC-SEARCH-06 — Leading/trailing whitespace is trimmed

**Priority:** P3 · **Type:** Auto · **Tags:** `@regression` · **Automated?:** ✅ `keyword-matching.spec.ts` (data-driven variant: `whitespace-padded input`)

**Observed behaviour:** WordPress does **not** trim — the heading renders `Search results: “ ISTQB ”`
with the spaces. The result set is unchanged (5 products), so the test asserts the product set
and count, not the heading text.

**Objective:** `"  ISTQB  "` returns the same product set as `"ISTQB"`.

**Preconditions:** Fresh context.

**Steps:**
1. Search for `  ISTQB  ` (spaces before and after).

**Expected results:**
- 5 products returned (same set as TC-SEARCH-01), OR document divergence.
- `s=` parameter is URL-encoded correctly.

## TC-SEARCH-07 — Partial keyword

**Priority:** P2 · **Type:** Auto · **Tags:** `@regression` · **Automated?:** ✅ `keyword-matching.spec.ts` (data-driven variant: `partial keyword`)

**Objective:** A substring keyword returns related results.

**Preconditions:** Fresh context.

**Steps:**
1. Search for `Playwright`.

**Expected results:**
- Returns the courses whose title/description contains `Playwright` (e.g. `API automation Testing với Playwright TypeScript`, `FullStack Automation QA với Playwright Typescript`).
- All returned cards are genuine products (no blog posts).

## TC-SEARCH-08 — Category-scoped search

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Selecting a category in the search select restricts results.

**Preconditions:** Fresh context.

**Steps:**
1. Type `ISTQB`, change the category select to `Uncategorized`, and submit.

**Expected results:**
- URL has `product_cat=uncategorized` (or the category slug).
- Results are limited to products in that category; count ≤ the all-categories count.
- `<h1>` still reflects the search term.

## TC-SEARCH-09 — Special / unsafe characters are handled safely

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** Search input is escaped; no script execution or query error.

**Preconditions:** Fresh context.

**Steps:**
1. Search for `<script>alert(1)</script>`.
2. Search for `%` and for `' OR 1=1 --`.

**Expected results:**
- No JavaScript dialog appears; the injected markup is rendered as inert text in the heading.
- Page returns a normal "no products found" state, not a 500 error.

## TC-SEARCH-10 — Search works from a non-home page

**Priority:** P2 · **Type:** Auto · **Automated?:** ❌ Not yet

**Objective:** The persistent header search works from any page.

**Preconditions:** Fresh context; navigate to a product detail page first.

**Steps:**
1. Open any `/product/<slug>/` page.
2. Use the header search to search for `ISTQB`.

**Expected results:**
- Navigates to the search results page with the same params and 5 results as TC-SEARCH-01.
