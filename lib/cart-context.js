'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'prabha_kala_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
        setWishlist(parsed.wishlist || []);
      }
    } catch (e) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, wishlist }));
  }, [items, wishlist, hydrated]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, quantity: Math.min(i.quantity + qty, product.stock || 99) } : i));
      }
      return [
        ...prev,
        {
          slug: product.slug,
          title: product.title,
          price: product.salePrice || product.price,
          originalPrice: product.price,
          image: product.images?.[0],
          quantity: qty,
          maxStock: product.stock || 99,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQty = useCallback((slug, qty) => {
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((slug) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, wishlist, addItem, removeItem, updateQty, clearCart, toggleWishlist, subtotal, itemCount, hydrated }}
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
