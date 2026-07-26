'use server';

import { cookies } from 'next/headers';
import { shopifyFetch } from './client';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_QUERY,
} from './queries';

const CART_COOKIE = 'shopify_cart_id';
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function normalizeMoney(money) {
  if (!money) return null;
  return { amount: parseFloat(money.amount), currencyCode: money.currencyCode };
}

function normalizeCart(cart) {
  if (!cart) return null;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      subtotal: normalizeMoney(cart.cost?.subtotalAmount),
      total: normalizeMoney(cart.cost?.totalAmount),
      tax: normalizeMoney(cart.cost?.totalTaxAmount),
    },
    lines: (cart.lines?.edges || []).map((e) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      variantId: e.node.merchandise?.id,
      title: e.node.merchandise?.product?.title,
      variantTitle: e.node.merchandise?.title,
      handle: e.node.merchandise?.product?.handle,
      image: e.node.merchandise?.image
        ? { url: e.node.merchandise.image.url, altText: e.node.merchandise.image.altText }
        : null,
      price: normalizeMoney(e.node.merchandise?.price),
      lineTotal: normalizeMoney(e.node.cost?.totalAmount),
    })),
  };
}

function normalizeWarnings(warnings) {
  return (warnings || []).map((w) => ({ code: w.code, message: w.message, target: w.target }));
}

function normalizeMutationResult(payload) {
  const cart = normalizeCart(payload?.cart);
  return cart ? { ...cart, warnings: normalizeWarnings(payload?.warnings) } : cart;
}

function throwOnUserErrors(userErrors, action) {
  if (userErrors?.length) {
    throw new Error(`Shopify ${action} error: ${userErrors.map((e) => e.message).join('; ')}`);
  }
}

// lines: [{ merchandiseId: variantGid, quantity }]
export async function createCart(lines = []) {
  const data = await shopifyFetch({
    query: CART_CREATE_MUTATION,
    variables: { input: lines.length ? { lines } : {} },
    cache: 'no-store',
  });
  throwOnUserErrors(data?.cartCreate?.userErrors, 'cartCreate');
  return normalizeMutationResult(data?.cartCreate);
}

export async function getCart(cartId) {
  if (!cartId) return null;
  const data = await shopifyFetch({ query: CART_QUERY, variables: { id: cartId }, cache: 'no-store' });
  return normalizeCart(data?.cart);
}

// lines: [{ merchandiseId: variantGid, quantity }]
export async function addCartLines(cartId, lines) {
  const data = await shopifyFetch({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  throwOnUserErrors(data?.cartLinesAdd?.userErrors, 'cartLinesAdd');
  return normalizeMutationResult(data?.cartLinesAdd);
}

// lines: [{ id: lineId, quantity }]
export async function updateCartLines(cartId, lines) {
  const data = await shopifyFetch({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  throwOnUserErrors(data?.cartLinesUpdate?.userErrors, 'cartLinesUpdate');
  return normalizeMutationResult(data?.cartLinesUpdate);
}

// lineIds: [lineId]
export async function removeCartLines(cartId, lineIds) {
  const data = await shopifyFetch({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });
  throwOnUserErrors(data?.cartLinesRemove?.userErrors, 'cartLinesRemove');
  return normalizeMutationResult(data?.cartLinesRemove);
}

async function readCartId() {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value || null;
}

async function writeCartId(id) {
  const store = await cookies();
  store.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: CART_COOKIE_MAX_AGE,
    path: '/',
  });
}

async function ensureCart() {
  const cartId = await readCartId();
  if (cartId) {
    const existing = await getCart(cartId);
    if (existing) return existing;
  }
  const created = await createCart();
  await writeCartId(created.id);
  return created;
}

// Cookie-aware wrappers — call these from client components. They manage the
// shopify_cart_id cookie internally so callers only ever deal with the cart itself.
export async function getCurrentCart() {
  const cartId = await readCartId();
  if (!cartId) return null;
  return getCart(cartId);
}

// lines: [{ merchandiseId: variantGid, quantity }]
export async function addToCart(variantId, quantity = 1) {
  const cart = await ensureCart();
  return addCartLines(cart.id, [{ merchandiseId: variantId, quantity }]);
}

export async function updateCartLine(lineId, quantity) {
  const cart = await ensureCart();
  return updateCartLines(cart.id, [{ id: lineId, quantity }]);
}

export async function removeCartLine(lineId) {
  const cart = await ensureCart();
  return removeCartLines(cart.id, [lineId]);
}
