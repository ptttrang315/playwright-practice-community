/**
 * Case-insensitive "does this text contain the keyword" check.
 * Used to derive expected search results from catalog data.
 */
export const containsKeyword = (text: string, keyword: string): boolean =>
    text.toLowerCase().includes(keyword.toLowerCase());

/**
 * Normalize typographic quotes to ASCII. The site renders the search
 * heading as `Search results: “term”` with curly quotes.
 */
export const normalizeQuotes = (text: string): string =>
    text.replace(/[“”„‟]/g, '"').replace(/[‘’‚‛]/g, "'");
