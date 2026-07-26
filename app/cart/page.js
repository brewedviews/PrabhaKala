'use client';

import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { useCart } from '@/lib/cart-context';
import { formatINR } from '@/lib/format';
import { toast } from 'sonner';

const App = () => {
  const { items, updateQty, removeItem, subtotal, hydrated, checkoutUrl, pending } = useCart();

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      <section className="bg-brand-cream py-14 text-center border-b border-brand-gold/20">
        <div className="container">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Your Selection</div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon">Shopping Bag</h1>
        </div>
      </section>

      {!hydrated ? (
        <div className="container py-32" />
      ) : items.length === 0 ? (
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
              <div key={it.lineId} className="flex items-center gap-4 py-6 border-b border-brand-gold/10">
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
                    <button disabled={pending} onClick={() => updateQty(it.lineId, it.quantity - 1)} className="px-2 py-2 hover:bg-brand-cream disabled:opacity-40"><Minus size={12} /></button>
                    <span className="px-3 text-sm min-w-[30px] text-center">{it.quantity}</span>
                    <button disabled={pending} onClick={() => updateQty(it.lineId, it.quantity + 1)} className="px-2 py-2 hover:bg-brand-cream disabled:opacity-40"><Plus size={12} /></button>
                  </div>
                </div>
                <div className="w-24 text-right font-medium text-brand-maroon">{formatINR(it.lineTotal)}</div>
                <button
                  disabled={pending}
                  onClick={() => { removeItem(it.lineId); toast('Removed from bag'); }}
                  className="w-10 flex justify-center text-brand-brown/50 hover:text-brand-maroon disabled:opacity-40"
                  aria-label="Remove"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <div className="mt-8">
              <Link href="/shop" className="text-sm text-brand-gold-dark hover:text-brand-maroon underline">← Continue Shopping</Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-brand-cream p-8 h-fit sticky top-32">
            <h2 className="font-serif text-2xl text-brand-maroon mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm py-4 border-t border-b border-brand-gold/20">
              <div className="flex justify-between text-brand-brown/80"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="text-xs text-brand-brown/60">Shipping and taxes calculated at checkout.</div>
            </div>

            <div className="flex justify-between items-baseline py-5">
              <span className="text-xs tracking-widest uppercase text-brand-brown/70">Subtotal</span>
              <span className="font-serif text-2xl text-brand-maroon">{formatINR(subtotal)}</span>
            </div>

            <button
              disabled={!checkoutUrl || pending}
              onClick={() => { if (checkoutUrl) window.location.href = checkoutUrl; }}
              className="w-full bg-brand-maroon text-brand-ivory py-4 text-xs tracking-widest uppercase hover:bg-brand-maroon-dark disabled:opacity-50 flex items-center justify-center gap-2"
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
