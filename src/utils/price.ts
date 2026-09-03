/**
 * Parse a WooCommerce price string into an integer amount.
 *
 * The site formats prices as `xxx.xxx $` — dot is a thousands separator,
 * there are no decimals — so `"1.749.000 $"` -> `1749000`.
 */
export const parsePrice = (raw: string): number => {
    const digits = raw.replace(/[^\d]/g, '');
    if (!digits) {
        throw new Error(`Cannot parse a price from: "${raw}"`);
    }
    return Number(digits);
};
