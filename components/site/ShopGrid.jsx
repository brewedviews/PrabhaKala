'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/site/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function ShopGrid({ products }) {
  const [priceMax, setPriceMax] = useState(50000);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => (p.priceRange?.min?.amount ?? 0) <= priceMax);
    if (sort === 'price-low') list = [...list].sort((a, b) => (a.priceRange?.min?.amount ?? 0) - (b.priceRange?.min?.amount ?? 0));
    if (sort === 'price-high') list = [...list].sort((a, b) => (b.priceRange?.min?.amount ?? 0) - (a.priceRange?.min?.amount ?? 0));
    return list;
  }, [products, priceMax, sort]);

  const clearAll = () => setPriceMax(50000);

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-brand-brown/70">Showing <span className="text-brand-maroon font-medium">{filtered.length}</span> of {products.length} pieces</div>
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

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold-dark mb-3 border-b border-brand-gold/20 pb-2">Max Price</h4>
            <div className="text-xs text-brand-brown/70 mb-2">Up to ₹{priceMax.toLocaleString('en-IN')}</div>
            <input type="range" min="5000" max="50000" step="1000" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))} className="w-full accent-brand-maroon" />
          </div>
        </aside>

        {/* Products */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="font-serif text-2xl text-brand-maroon mb-2">No sarees match your filters</div>
              <button onClick={clearAll} className="text-brand-gold-dark underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p) => <ProductCard key={p.handle} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
