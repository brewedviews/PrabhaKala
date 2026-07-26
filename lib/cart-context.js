'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCurrentCart, addToCart, updateCartLine, removeCartLine } from '@/lib/shopify/cart';

const CartContext = createContext(null);
const WISHLIST_KEY = 'prabha_kala_wishlist_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) setWishlist(JSON.parse(raw) || []);
    } catch (e) {}

    getCurrentCart()
      .then((c) => setCart(c))
      .catch(() => setCart(null))
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addItem = useCallback(async (variantId, quantity = 1) => {
    setPending(true);
    try {
      const updated = await addToCart(variantId, quantity);
      setCart(updated);
      return updated;
    } finally {
      setPending(false);
    }
  }, []);

  const updateQty = useCallback(async (lineId, quantity) => {
    setPending(true);
    try {
      const updated = quantity <= 0 ? await removeCartLine(lineId) : await updateCartLine(lineId, quantity);
      setCart(updated);
      return updated;
    } finally {
      setPending(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId) => {
    setPending(true);
    try {
      const updated = await removeCartLine(lineId);
      setCart(updated);
      return updated;
    } finally {
      setPending(false);
    }
  }, []);

  const toggleWishlist = useCallback((handle) => {
    setWishlist((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]));
  }, []);

  const items = (cart?.lines || []).map((l) => ({
    lineId: l.id,
    slug: l.handle,
    title: l.title,
    variantTitle: l.variantTitle,
    image: l.image?.url,
    price: l.price?.amount ?? 0,
    quantity: l.quantity,
    lineTotal: l.lineTotal?.amount ?? 0,
  }));

  const subtotal = cart?.cost?.subtotal?.amount ?? 0;
  const itemCount = cart?.totalQuantity ?? 0;
  const checkoutUrl = cart?.checkoutUrl ?? null;

  return (
    <CartContext.Provider
      value={{ items, wishlist, addItem, removeItem, updateQty, toggleWishlist, subtotal, itemCount, checkoutUrl, hydrated, pending }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
