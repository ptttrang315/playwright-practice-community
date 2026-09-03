# Test Plans

Test plans for **https://e-commerce-dev.betterbytesvn.com/** (WordPress + WooCommerce).

| # | Plan | Feature | Test suite | Spec file |
|---|------|---------|------------|-----------|
| 00 | [Overview](./00-overview.md) | Shared context, legend, master matrix, suite composition | – | – |
| 01 | [Home Page](./01-home-page.md) | Landing page & catalog grid | `Home Page` | `tests/home/home-page.spec.ts` |
| 02 | [Product Search](./02-product-search.md) | Header search bar & results | `Product Search` | `tests/search/` |
| 03 | [Add to Cart](./03-add-to-cart.md) | Add to cart, mini-cart, cart page | `Add to Cart` | `tests/cart/add-to-cart.spec.ts` |

**Out of scope:** checkout completion, payment (PayPal), account/login/registration, blog, product reviews, category browsing.

## Test types

Automated tests carry Playwright **tags**; run a subset with `--grep` (or the npm scripts).

| Suite | `--grep` | npm script | Meaning |
|-------|----------|------------|---------|
| Smoke | `@smoke` | `npm run test:smoke` | Critical-path gate on every build (⊆ regression) |
| E2E | `@e2e` | `npm run test:e2e` | Cross-feature user journeys |
| Regression | `@regression` | `npm run test:regression` | Full coverage (every automated case) |

## Automation status

| Feature | Total | Automated | Manual only | Not yet automated |
|---------|-------|-----------|-------------|-------------------|
| Home Page | 7 | 0 | 1 | 6 |
| Product Search | 10 | 6 | 1 | 3 |
| Add to Cart | 13 | 0 | 1 | 12 |
| **Total** | **30** | **6** | **3** | **21** |
