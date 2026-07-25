export function formatINR(n) {
  if (typeof n !== 'number') return '₹0';
  return '₹' + n.toLocaleString('en-IN');
}

export function discountPct(price, salePrice) {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}
