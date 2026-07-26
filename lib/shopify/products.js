import { shopifyFetch } from './client';
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from './queries';

function normalizeMoney(money) {
  if (!money) return null;
  return { amount: parseFloat(money.amount), currencyCode: money.currencyCode };
}

export function normalizeProduct(node) {
  if (!node) return null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    availableForSale: node.availableForSale,
    productType: node.productType,
    vendor: node.vendor,
    tags: node.tags || [],
    images: (node.images?.edges || []).map((e) => ({
      url: e.node.url,
      altText: e.node.altText,
      width: e.node.width,
      height: e.node.height,
    })),
    priceRange: {
      min: normalizeMoney(node.priceRange?.minVariantPrice),
      max: normalizeMoney(node.priceRange?.maxVariantPrice),
    },
    variants: (node.variants?.edges || []).map((e) => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: e.node.availableForSale,
      quantityAvailable: e.node.quantityAvailable,
      price: normalizeMoney(e.node.price),
      selectedOptions: e.node.selectedOptions || [],
    })),
  };
}

export async function getProducts({ first = 20, after, sortKey, reverse, query } = {}) {
  const data = await shopifyFetch({
    query: PRODUCTS_QUERY,
    variables: { first, after, sortKey, reverse, query },
    next: { revalidate: 60 },
  });
  const edges = data?.products?.edges || [];
  return {
    products: edges.map((e) => normalizeProduct(e.node)),
    pageInfo: data?.products?.pageInfo || { hasNextPage: false, hasPreviousPage: false, endCursor: null, startCursor: null },
  };
}

export async function getProductByHandle(handle) {
  const data = await shopifyFetch({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    next: { revalidate: 60 },
  });
  return normalizeProduct(data?.product);
}
