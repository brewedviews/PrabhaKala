'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ProductCard from '@/components/site/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

function ShopInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initialCategory = params.get('category') || '';

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [colour, setColour] = useState('');
  const [occasion, setOccasion] = useState('');
  const [priceMax, setPriceMax] = useState(50000);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => { setAll(d.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { setCategory(params.get('category') || ''); }, [params]);

  const categories = useMemo(() => [...new Set(all.map((p) => p.category))], [all]);
  const colours = useMemo(() => [...new Set(all.map((p) => p.colour))], [all]);
  const occasions = useMemo(() => [...new Set(all.map((p) => p.occasion))], [all]);

  const filtered = useMemo(() => {
    let list = all.filter((p) => {
      if (category && p.category !== category) return false;
      if (colour && p.colour !== colour) return false;
      if (occasion && p.occasion !== occasion) return false;
      if ((p.salePrice || p.price) > priceMax) return false;
      return true;
    });
    if (sort === 'price-low') list = [...list].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    if (sort === 'price-high') list = [...list].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    if (sort === 'featured') list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [all, category, colour, occasion, priceMax, sort]);

  const clearAll = () => { setCategory(''); setColour(''); setOccasion(''); setPriceMax(50000); router.push('/shop'); };

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-cream py-16 md:py-20 text-center border-b border-brand-gold/20">
        <div className="container">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">The Collection</div>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-maroon">{category || 'All Sarees'}</h1>
          <p className="mt-4 text-brand-brown/70 max-w-xl mx-auto">Explore our complete edit of handwoven Banarasi silks — each piece one of a kind.</p>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-brand-brown/70">Showing <span className="text-brand-maroon font-medium">{filtered.length}</span> of {all.length} pieces</div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 border border-brand-brown/30 px-4 py-2 text-xs tracking-widest uppercase">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent border border-brand-brown/30 px-4 py-2 text-xs tracking-widest uppercase text-brand-brown focus:outline-none focus:border-brand-maroon">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-8`}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-brand-maroon">Filters</h3>
              <button onClick={clearAll} className="text-xs text-brand-brown/60 hover:text-brand-maroon underline">Clear all</button>
            </div>

            <FilterGroup title="Category">
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(category === c ? '' : c)} className={`block text-left text-sm py-1 hover:text-brand-maroon w-full ${category === c ? 'text-brand-maroon font-medium' : 'text-brand-brown/70'}`}>
                  {c}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Colour">
              {colours.map((c) => (
                <button key={c} onClick={() => setColour(colour === c ? '' : c)} className={`block text-left text-sm py-1 hover:text-brand-maroon w-full ${colour === c ? 'text-brand-maroon font-medium' : 'text-brand-brown/70'}`}>
                  {c}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Occasion">
              {occasions.map((o) => (
                <button key={o} onClick={() => setOccasion(occasion === o ? '' : o)} className={`block text-left text-sm py-1 hover:text-brand-maroon w-full ${occasion === o ? 'text-brand-maroon font-medium' : 'text-brand-brown/70'}`}>
                  {o}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Max Price">
              <div className="text-xs text-brand-brown/70 mb-2">Up to ₹{priceMax.toLocaleString('en-IN')}</div>
              <input type="range" min="5000" max="50000" step="1000" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))} className="w-full accent-brand-maroon" />
            </FilterGroup>
          </aside>

          {/* Products */}
          <div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] bg-brand-cream animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="font-serif text-2xl text-brand-maroon mb-2">No sarees match your filters</div>
                <button onClick={clearAll} className="text-brand-gold-dark underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold-dark mb-3 border-b border-brand-gold/20 pb-2">{title}</h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

const App = () => (
  <Suspense fallback={<div className="min-h-screen bg-brand-ivory" />}>
    <ShopInner />
  </Suspense>
);

export default App;
