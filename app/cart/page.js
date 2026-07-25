'use client';

import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useCart } from '@/lib/cart-context';
import { formatINR } from '@/lib/format';
import { useState } from 'react';
import { toast } from 'sonner';

const App = () => {
  const { items, updateQty, removeItem, subtotal, hydrated } = useCart();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);

  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199;
  const discount = applied ? Math.round(subtotal * (applied.pct / 100)) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'PRABHA10') { setApplied({ code, pct: 10 }); toast.success('Coupon applied — 10% off'); }
    else if (code === 'FESTIVE20') { setApplied({ code, pct: 20 }); toast.success('Festive offer applied — 20% off'); }
    else { toast.error('Invalid coupon code'); }
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-brand-ivory"><Navbar /><div className="container py-32" /></div>;
  }

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      <section className="bg-brand-cream py-14 text-center border-b border-brand-gold/20">
        <div className="container">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Your Selection</div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon">Shopping Bag</h1>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="container py-24 text-center">
          <div className="font-serif text-3xl text-brand-maroon mb-4">Your bag awaits its first heirloom</div>
          <p className="text-brand-brown/70 mb-8">Explore our collection and add a piece that speaks to you.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-maroon text-brand-ivory px-8 py-4 text-xs tracking-widest uppercase hover:bg-brand-maroon-dark">
            Shop Collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <section className="container py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Items */}
          <div>
            <div className="border-b border-brand-gold/20 pb-3 mb-2 flex text-[10px] tracking-widest uppercase text-brand-brown/60">
              <div className="flex-1">Product</div>
              <div className="w-28 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
              <div className="w-10" />
            </div>

            {items.map((it) => (
              <div key={it.slug} className="flex items-center gap-4 py-6 border-b border-brand-gold/10">
                <Link href={`/product/${it.slug}`} className="w-24 aspect-[3/4] bg-brand-cream overflow-hidden shrink-0">
                  <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <Link href={`/product/${it.slug}`}>
                    <h3 className="font-serif text-lg text-brand-maroon hover:underline">{it.title}</h3>
                  </Link>
                  <div className="text-sm text-brand-brown/70 mt-1">{formatINR(it.price)}</div>
                </div>
                <div className="w-28 flex items-center justify-center">
                  <div className="flex items-center border border-brand-brown/30">
                    <button onClick={() => updateQty(it.slug, it.quantity - 1)} className="px-2 py-2 hover:bg-brand-cream"><Minus size={12} /></button>
                    <span className="px-3 text-sm min-w-[30px] text-center">{it.quantity}</span>
                    <button onClick={() => updateQty(it.slug, it.quantity + 1)} className="px-2 py-2 hover:bg-brand-cream"><Plus size={12} /></button>
                  </div>
                </div>
                <div className="w-24 text-right font-medium text-brand-maroon">{formatINR(it.price * it.quantity)}</div>
                <button onClick={() => { removeItem(it.slug); toast('Removed from bag'); }} className="w-10 flex justify-center text-brand-brown/50 hover:text-brand-maroon" aria-label="Remove"><X size={18} /></button>
              </div>
            ))}

            <div className="mt-8">
              <Link href="/shop" className="text-sm text-brand-gold-dark hover:text-brand-maroon underline">← Continue Shopping</Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-brand-cream p-8 h-fit sticky top-32">
            <h2 className="font-serif text-2xl text-brand-maroon mb-6">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 bg-brand-ivory border border-brand-gold/40 px-3 py-2.5 text-sm focus:outline-none focus:border-brand-gold"
                />
                <button onClick={applyCoupon} className="bg-brand-brown text-brand-ivory px-4 text-xs tracking-widest uppercase hover:bg-brand-maroon">Apply</button>
              </div>
              <div className="text-[10px] text-brand-brown/60 mt-2 flex items-center gap-1"><Tag size={10} /> Try <span className="font-medium">PRABHA10</span> or <span className="font-medium">FESTIVE20</span></div>
            </div>

            <div className="space-y-3 text-sm py-4 border-t border-b border-brand-gold/20">
              <div className="flex justify-between text-brand-brown/80"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              {applied && (
                <div className="flex justify-between text-brand-gold-dark"><span>Discount ({applied.code})</span><span>-{formatINR(discount)}</span></div>
              )}
              <div className="flex justify-between text-brand-brown/80"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span></div>
            </div>

            <div className="flex justify-between items-baseline py-5">
              <span className="text-xs tracking-widest uppercase text-brand-brown/70">Grand Total</span>
              <span className="font-serif text-2xl text-brand-maroon">{formatINR(total)}</span>
            </div>

            <button
              onClick={() => toast.info('Checkout coming in Phase 2 — Razorpay integration')}
              className="w-full bg-brand-maroon text-brand-ivory py-4 text-xs tracking-widest uppercase hover:bg-brand-maroon-dark flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={14} />
            </button>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-brand-gold/20 text-[10px] tracking-widest uppercase text-brand-brown/60">
              <div className="flex items-center gap-2"><Truck size={14} className="text-brand-gold-dark" /> Free Shipping</div>
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-brand-gold-dark" /> Secure Checkout</div>
            </div>
          </aside>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default App;
