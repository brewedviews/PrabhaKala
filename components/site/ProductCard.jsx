'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatINR, discountPct } from '@/lib/format';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const inWishlist = wishlist.includes(product.handle);

  const price = product.priceRange?.min?.amount ?? 0;
  const compareAt = product.compareAtPriceRange?.min?.amount;
  const disc = compareAt && compareAt > price ? discountPct(compareAt, price) : 0;

  const variant = product.variants?.[0];
  const stock = variant?.quantityAvailable;

  const handleAddToBag = async (e) => {
    e.preventDefault();
    if (!variant?.id) return;
    try {
      await addItem(variant.id, 1);
      toast.success(`${product.title} added to bag`);
    } catch (err) {
      toast.error('Could not add to bag');
    }
  };

  return (
    <div className="group relative">
      <Link href={`/product/${product.handle}`} className="block overflow-hidden bg-brand-cream aspect-[3/4] relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          loading="lazy"
        />
        {product.images?.[1] && (
          <img
            src={product.images[1].url}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            loading="lazy"
          />
        )}
        {disc > 0 && (
          <div className="absolute top-3 left-3 bg-brand-maroon text-white text-[10px] tracking-widest px-2 py-1">
            -{disc}%
          </div>
        )}
        {stock != null && stock <= 5 && stock > 0 && (
          <div className="absolute top-3 right-3 bg-brand-gold text-brand-brown text-[10px] tracking-widest px-2 py-1">
            ONLY {stock} LEFT
          </div>
        )}
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.handle); }}
        className="absolute top-3 right-3 z-10 h-9 w-9 bg-brand-ivory/90 hover:bg-brand-ivory rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Add to wishlist"
      >
        <Heart size={16} className={inWishlist ? 'fill-brand-maroon text-brand-maroon' : 'text-brand-brown'} />
      </button>

      <button
        onClick={handleAddToBag}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-brand-brown text-brand-ivory px-6 py-2.5 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 hover:bg-brand-maroon"
      >
        <span className="flex items-center gap-2"><ShoppingBag size={14} /> Add to Bag</span>
      </button>

      <div className="pt-4 text-center">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-serif text-lg text-brand-brown hover:text-brand-maroon transition-colors">{product.title}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-medium text-brand-maroon">{formatINR(price)}</span>
          {disc > 0 && (
            <span className="text-xs text-brand-brown/40 line-through">{formatINR(compareAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
