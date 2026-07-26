import { shopifyFetch } from './client';
import { COLLECTIONS_QUERY, COLLECTION_BY_HANDLE_QUERY } from './queries';
import { normalizeProduct } from './products';

function normalizeCollection(node) {
  if (!node) return null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    image: node.image
      ? { url: node.image.url, altText: node.image.altText, width: node.image.width, height: node.image.height }
      : null,
  };
}

export async function getCollections({ first = 20, after } = {}) {
  const data = await shopifyFetch({
    query: COLLECTIONS_QUERY,
    variables: { first, after },
    next: { revalidate: 300 },
  });
  const edges = data?.collections?.edges || [];
  return {
    collections: edges.map((e) => normalizeCollection(e.node)),
    pageInfo: data?.collections?.pageInfo || { hasNextPage: false, hasPreviousPage: false, endCursor: null, startCursor: null },
  };
}

export async function getCollectionByHandle(handle, { first = 20, after } = {}) {
  const data = await shopifyFetch({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first, after },
    next: { revalidate: 300 },
  });
  const node = data?.collection;
  if (!node) return null;
  return {
    ...normalizeCollection(node),
    products: (node.products?.edges || []).map((e) => normalizeProduct(e.node)),
    pageInfo: node.products?.pageInfo || { hasNextPage: false, hasPreviousPage: false, endCursor: null, startCursor: null },
  };
}
