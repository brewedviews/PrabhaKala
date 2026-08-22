// PLACEHOLDER DATA: no reviews app (Judge.me, Loox, Shopify Product Reviews,
// etc.) is integrated yet, so there is no real rating/review-count data on
// any product. These values are deterministically derived from the product
// handle — not random — so a given product always shows the same numbers on
// every render (no server/client hydration mismatch, no reshuffling on
// refresh). Swap this out once a reviews app is wired up and its data is
// available on the normalized product (e.g. via metafields in
// lib/shopify/queries.js).
export function getPlaceholderRating(handle) {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  }
  const rating = 4.3 + (hash % 60) / 100; // 4.3–4.9
  const reviewCount = 12 + (hash % 180); // 12–191
  return { rating: Math.round(rating * 10) / 10, reviewCount };
}
