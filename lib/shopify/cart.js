'use server';

import { shopifyFetch } from './client';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_QUERY,
} from './queries';

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
