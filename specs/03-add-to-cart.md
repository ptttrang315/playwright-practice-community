# Test Plan – Add to Cart

**Feature:** Add to cart (listing + PDP), mini-cart, cart page (`/cart/`)
**Shared context:** [00-overview.md](./00-overview.md)

## Test suite

|                |                                                                       |
|----------------|-----------------------------------------------------------------------|
| **Suite name** | `Add to Cart`                                                         |
| **Spec file**  | `tests/cart/add-to-cart.spec.ts`                                      |
| **Fixtures**   | `mainPage`, `homePage`, `productPage`, `cartPage` (from `@/fixtures`) |
| **Status**     | Not created yet — needs a `cartPage` page object                      |

## Scenario index

| ID         | Title                                                 | Priority | Test type         | Execution | Automated? |
|------------|-------------------------------------------------------|----------|-------------------|-----------|------------|
| TC-CART-01 | Add a product from the home listing                   | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-02 | Add a product from the PDP (default quantity)         | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-03 | Add a product with quantity greater than 1            | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-04 | "View cart" link from the confirmation                | P2       | Regression        | Auto      | ❌ Not yet  |
| TC-CART-05 | Cart page shows correct line items and totals         | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-06 | Add multiple different products; totals accumulate    | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-07 | Adding the same product twice increments its quantity | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-08 | Update quantity on the cart page recalculates totals  | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-09 | Reduce quantity is disabled at the minimum            | P2       | Regression        | Auto      | ❌ Not yet  |
| TC-CART-10 | Remove an item / empty cart state                     | P1       | Smoke, Regression | Auto      | ❌ Not yet  |
| TC-CART-11 | Cart persists across navigation and reload            | P2       | E2E, Regression   | Auto      | ❌ Not yet  |
| TC-CART-12 | Quantity input edge cases on the PDP                  | P2       | Regression        | Manual    | ➖ N/A      |
| TC-CART-13 | "Proceed to Checkout" navigates to the checkout page  | P2       | E2E, Regression   | Auto      | ❌ Not yet  |

---

## TC-CART-01 — Add a product from the home listing

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** The listing "Add to cart" button adds the item and updates the mini-cart.

**Preconditions:** Fresh context; empty cart; standing on `/`.

**Steps:**
1. Click `Add to cart: "ISTQB Test Manager"` on its card.
2. Wait for the AJAX add to complete.

**Expected results:**
- Mini-cart count changes from `0` to `1`.
- Mini-cart total shows `279.000 $`.
- The button transitions to a "View cart" affordance (or a confirmation is shown).
- No full page reload is required (AJAX add).

## TC-CART-02 — Add a product from the product detail page (default quantity)

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** PDP add-to-cart with quantity 1.

**Preconditions:** Fresh context; empty cart.

**Steps:**
1. Open `/product/istqb-certified-tester-finance-testing-ct-ft-tieng-viet/`.
2. Leave quantity at `1`.
3. Click `Add to cart`.

**Expected results:**
- A success alert appears: `"ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt" has been added to your cart.` with a `View cart` link to `/cart/`.
- Mini-cart shows `1` / `279.000 $`.

## TC-CART-03 — Add a product with quantity greater than 1

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Quantity selector is respected.

**Preconditions:** Fresh context; empty cart.

**Steps:**
1. Open the CT-FT product page.
2. Set the quantity spinbutton to `3`.
3. Click `Add to cart`.

**Expected results:**
- Mini-cart count shows `3`.
- Mini-cart total shows `837.000 $` (3 × 279.000).
- Cart page line item quantity is `3`, line total `837.000 $`.

## TC-CART-04 — "View cart" link from the confirmation

**Priority:** P2 · **Test type:** Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** The confirmation link routes to the cart page.

**Preconditions:** Completed TC-CART-02.

**Steps:**
1. Click `View cart` in the success alert.

**Expected results:**
- URL is `/cart/`; `<h1>` is `Cart`.
- The added product appears as a single row.

## TC-CART-05 — Cart page shows correct line items and totals

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Cart math (subtotal, flat rate, tax, estimated total) is correct.

**Preconditions:** Fresh context; add CT-FT (qty 1) to cart.

**Steps:**
1. Navigate to `/cart/`.
2. Read the totals table.

**Expected results:**
- One row: product image, name link → PDP, `Previous price: 399.000 $`, `Discounted price: 279.000 $`, quantity `1`, line total `279.000 $`, `Save 120.000 $`.
- `Subtotal` = `279.000 $`.
- `Flat rate` = `13 $`.
- `Tax` is shown (≈ `22.321 $`).
- `Estimated total` = Subtotal + Flat rate + Tax (≈ `301.334 $`).
- `Proceed to Checkout` link points to `/checkout/`.
- `Add coupons` control is present.

## TC-CART-06 — Add multiple different products; totals accumulate

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Independent products stack in the cart.

**Preconditions:** Fresh context; empty cart.

**Steps:**
1. From `/`, add `ISTQB Test Manager` (279.000).
2. Add `Regular Expression cho Tester tiếng Việt` (279.000).
3. Open `/cart/`.

**Expected results:**
- Mini-cart count `2`; total `558.000 $`.
- Cart page shows two distinct rows, each quantity `1`.
- `Subtotal` = `558.000 $`.

## TC-CART-07 — Adding the same product twice increments its quantity

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Re-adding merges into one line with quantity 2.

**Preconditions:** Fresh context; empty cart.

**Steps:**
1. Add `ISTQB Test Manager` from the home listing.
2. Add `ISTQB Test Manager` again.
3. Open `/cart/`.

**Expected results:**
- Cart shows **one** row for the product with quantity `2` (not two rows).
- Mini-cart count `2`; line total `558.000 $`.

## TC-CART-08 — Update quantity on the cart page recalculates totals

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** The cart quantity stepper updates line and cart totals.

**Preconditions:** Fresh context; CT-FT (qty 1) in cart; on `/cart/`.

**Steps:**
1. Click `Increase quantity of ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt` once (→ 2).
2. Wait for the cart to refresh.

**Expected results:**
- Quantity is `2`; line total `558.000 $`.
- `Subtotal` updates to `558.000 $`; `Estimated total` recalculates accordingly.
- The `Reduce quantity` button becomes enabled (it is disabled at quantity 1).

## TC-CART-09 — Reduce quantity is disabled at the minimum

**Priority:** P2 · **Test type:** Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Quantity cannot go below 1 via the stepper.

**Preconditions:** CT-FT (qty 1) in cart; on `/cart/`.

**Steps:**
1. Inspect the `Reduce quantity` button.

**Expected results:**
- The `Reduce quantity` button is `disabled` while quantity is `1`.

## TC-CART-10 — Remove an item / empty cart state

**Priority:** P1 · **Test type:** Smoke, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Removing the last item empties the cart.

**Preconditions:** Fresh context; one product in cart; on `/cart/`.

**Steps:**
1. Click `Remove <product> from cart`.

**Expected results:**
- The row disappears; an empty-cart message is shown (e.g. "Your cart is currently empty").
- Mini-cart returns to `0` / `0 $`.
- `Proceed to Checkout` is no longer available.

## TC-CART-11 — Cart persists across navigation and reload

**Priority:** P2 · **Test type:** E2E, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** Cart contents survive page changes within the same context.

**Preconditions:** Fresh context; add one product.

**Steps:**
1. Navigate `/` → `/shop/` → open a product page.
2. Reload the browser.

**Expected results:**
- Mini-cart count and total are unchanged after each navigation and after reload.
- `/cart/` still lists the product.

## TC-CART-12 — Quantity input edge cases on the PDP

**Priority:** P2 · **Test type:** Regression · **Execution:** Manual · **Automated?:** ➖ N/A (then automate the confirmed cases)

**Objective:** Invalid quantities are rejected or clamped.

**Preconditions:** Fresh context; on the CT-FT product page.

**Steps:**
1. Enter `0` in the quantity input and click `Add to cart`.
2. Reset; enter `-1` and add.
3. Reset; enter `abc` and add.
4. Reset; enter a very large value (e.g. `999999`) and add.

**Expected results:**
- `0`, negative, and non-numeric values do not add a line (validation message or no-op); no console error.
- Large values either add that quantity or are clamped to a stock limit; the cart total equals `unit price × accepted quantity`.
- The mini-cart never shows a negative or `NaN` value.

## TC-CART-13 — "Proceed to Checkout" navigates to the checkout page

**Priority:** P2 · **Test type:** E2E, Regression · **Execution:** Auto · **Automated?:** ❌ Not yet

**Objective:** The cart-to-checkout hand-off works (checkout completion is out of scope).

**Preconditions:** Fresh context; one product in cart; on `/cart/`.

**Steps:**
1. Click `Proceed to Checkout`.

**Expected results:**
- URL is `/checkout/`; `<h1>` is `Checkout`.
- The order summary reflects the cart line item and the same estimated total.
- (Stop here — do not submit payment.)
