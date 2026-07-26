// Server-only: reads SHOPIFY_STOREFRONT_ACCESS_TOKEN. Never import this from a 'use client' component.

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'prabha-kala.myshopify.com';
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2026-07';
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function shopifyFetch({ query, variables, cache, next }) {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set');
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Private token (from the Headless sales channel) — server-only, never expose to the client.
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : {}),
    ...(next ? { next } : {}),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API request failed: ${res.status} ${res.statusText}${body ? ` — ${JSON.stringify(body)}` : ''}`
    );
  }

  if (body?.errors?.length) {
    throw new Error(`Shopify Storefront API GraphQL error: ${body.errors.map((e) => e.message).join('; ')}`);
  }

  return body.data;
}
