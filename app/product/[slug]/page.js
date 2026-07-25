'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Minus, Plus, Star } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ProductCard from '@/components/site/ProductCard';
import { useCart } from '@/lib/cart-context';
import { formatINR, discountPct } from '@/lib/format';
import { toast } from 'sonner';

const App = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  const [zoom, setZoom] = useState(false);

  const { addItem, toggleWishlist, wishlist } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d.product); setSimilar(d.similar || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory">
        <Navbar />
        <div className="container py-16 grid md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-brand-cream animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-brand-cream animate-pulse w-3/4" />
            <div className="h-6 bg-brand-cream animate-pulse w-1/2" />
            <div className="h-32 bg-brand-cream animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-ivory">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-serif text-3xl text-brand-maroon mb-4">Saree not found</h1>
          <Link href="/shop" className="text-brand-gold-dark underline">Browse the collection</Link>
        </div>
      </div>
    );
  }

  const disc = discountPct(product.price, product.salePrice);
  const inWishlist = wishlist.includes(product.slug);

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container pt-6 text-xs tracking-widest uppercase text-brand-brown/60">
        <Link href="/" className="hover:text-brand-maroon">Home</Link> / <Link href="/shop" className="hover:text-brand-maroon">Shop</Link> / <span className="text-brand-maroon">{product.title}</span>
      </div>

      <section className="container pt-8 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`aspect-[3/4] overflow-hidden border-2 ${activeImg === i ? 'border-brand-maroon' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream cursor-zoom-in" onClick={() => setZoom(!zoom)}>
            <img src={product.images[activeImg]} alt={product.title} className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? 'scale-150' : ''}`} />
            {disc > 0 && (
              <div className="absolute top-4 left-4 bg-brand-maroon text-white text-xs tracking-widest px-3 py-1.5">-{disc}% OFF</div>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">{product.category}</div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-maroon leading-tight">{product.title}</h1>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex gap-0.5 text-brand-gold">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            <span className="text-xs text-brand-brown/60">(24 reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mt-6">
            <span className="font-serif text-3xl text-brand-maroon">{formatINR(product.salePrice)}</span>
            {product.salePrice < product.price && (
              <>
                <span className="text-lg text-brand-brown/40 line-through">{formatINR(product.price)}</span>
                <span className="text-sm text-brand-gold-dark font-medium">You save {formatINR(product.price - product.salePrice)}</span>
              </>
            )}
          </div>
          <div className="text-xs text-brand-brown/60 mt-1">Inclusive of all taxes</div>

          <div className="paisley-divider my-8"><span className="text-[10px] tracking-widest uppercase">Details</span></div>

          <div className="grid grid-cols-2 gap-y-3 text-sm mb-8">
            <div className="text-brand-brown/60 uppercase tracking-widest text-xs">Fabric</div>
            <div className="text-brand-brown">{product.fabric}</div>
            <div className="text-brand-brown/60 uppercase tracking-widest text-xs">Colour</div>
            <div className="text-brand-brown">{product.colour}</div>
            <div className="text-brand-brown/60 uppercase tracking-widest text-xs">Occasion</div>
            <div className="text-brand-brown">{product.occasion}</div>
            <div className="text-brand-brown/60 uppercase tracking-widest text-xs">Availability</div>
            <div className={product.stock > 0 ? 'text-emerald-700' : 'text-red-700'}>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</div>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-brand-brown/30">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 hover:bg-brand-cream"><Minus size={14} /></button>
              <span className="px-4 py-3 text-sm min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-3 hover:bg-brand-cream"><Plus size={14} /></button>
            </div>
            <button
              onClick={() => { addItem(product, qty); toast.success(`${product.title} added to bag`); }}
              className="flex-1 bg-brand-brown hover:bg-brand-maroon text-brand-ivory py-4 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> Add to Bag
            </button>
            <button onClick={() => toggleWishlist(product.slug)} className="h-[52px] w-[52px] border border-brand-brown/30 flex items-center justify-center hover:bg-brand-cream" aria-label="Wishlist">
              <Heart size={18} className={inWishlist ? 'fill-brand-maroon text-brand-maroon' : 'text-brand-brown'} />
            </button>
          </div>

          <button
            onClick={() => { addItem(product, qty); router.push('/cart'); }}
            className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-brown py-4 text-xs tracking-widest uppercase transition-colors"
          >
            Buy Now
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-brand-gold/20">
            {[{ i: Truck, t: 'Free Shipping' }, { i: RotateCcw, t: 'Easy Returns' }, { i: ShieldCheck, t: 'Secure Payment' }].map((b) => (
              <div key={b.t} className="text-center">
                <b.i size={22} className="mx-auto text-brand-gold-dark mb-2" />
                <div className="text-[10px] tracking-widest uppercase text-brand-brown/70">{b.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container pb-16">
        <div className="flex gap-8 border-b border-brand-gold/20 mb-8">
          {[{ k: 'desc', l: 'Description' }, { k: 'ship', l: 'Shipping' }, { k: 'return', l: 'Returns' }, { k: 'reviews', l: 'Reviews' }].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`py-3 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${tab === t.k ? 'text-brand-maroon border-brand-maroon' : 'text-brand-brown/60 border-transparent hover:text-brand-brown'}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="max-w-3xl text-brand-brown/80 leading-relaxed">
          {tab === 'desc' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Handwoven in Varanasi by master weavers</li>
                <li>Pure {product.fabric} with certified zari</li>
                <li>Comes with matching blouse piece (0.8m)</li>
                <li>Length: 5.5m saree + 0.8m blouse</li>
              </ul>
              <div>
                <div className="font-serif text-lg text-brand-maroon mt-6 mb-2">Care Instructions</div>
                <p className="text-sm">Dry clean only. Store folded in muslin cloth away from direct sunlight. Refold every 3 months to prevent creases.</p>
              </div>
            </div>
          )}
          {tab === 'ship' && (
            <div className="space-y-3 text-sm">
              <p>• Free shipping across India on orders above ₹5,000.</p>
              <p>• Delivered in 3–5 business days by insured courier.</p>
              <p>• International shipping available on request.</p>
            </div>
          )}
          {tab === 'return' && (
            <div className="space-y-3 text-sm">
              <p>• 7-day easy return for unused sarees in original packaging.</p>
              <p>• Full refund processed within 5–7 business days after inspection.</p>
              <p>• Custom or altered sarees are non-returnable.</p>
            </div>
          )}
          {tab === 'reviews' && (
            <div className="text-sm text-brand-brown/60">Reviews will appear here soon.</div>
          )}
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="container pb-24">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">You Might Also Love</div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-maroon">Similar Sarees</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default App;
