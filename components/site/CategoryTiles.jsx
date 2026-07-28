'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// PLACEHOLDER DATA: no Shopify Collections exist yet. Once real collections
// are created, replace this list with `getCollections()` output and swap
// `image`/`name` accordingly — the `/shop?category=` link pattern below
// already matches the convention used in Footer.jsx, so ShopGrid.jsx just
// needs to start reading that query param.
//
// Bento layout: each tile's `span` sets its own mobile size (2-col grid,
// height driven by aspect ratio) and, via `md:` classes, its desktop size
// (4-col grid, height driven by row-span against a fixed row height). Order
// matters — CSS grid auto-placement fills cells in DOM order, which is what
// produces the asymmetric hero/wide/small pattern without explicit
// grid-column/row lines.
const CATEGORIES = [
  {
    name: 'Wedding Edit',
    image: 'https://images.pexels.com/photos/27575174/pexels-photo-27575174.jpeg?w=1200&q=85',
    span: 'col-span-2 aspect-[16/9] md:aspect-auto md:row-span-2',
    hero: true,
  },
  {
    name: 'Banarasi',
    image: 'https://images.pexels.com/photos/35108811/pexels-photo-35108811.jpeg?w=1000&q=85',
    span: 'col-span-2 aspect-[21/9] md:aspect-auto',
  },
  {
    name: 'Kanjivaram',
    image: 'https://images.pexels.com/photos/10317113/pexels-photo-10317113.jpeg?w=700&q=85',
    span: 'col-span-1 aspect-square md:aspect-auto',
  },
  {
    name: 'Organza',
    image: 'https://images.pexels.com/photos/28054616/pexels-photo-28054616.jpeg?w=700&q=85',
    span: 'col-span-1 aspect-square md:aspect-auto',
  },
  {
    name: 'Cotton',
    image: 'https://images.pexels.com/photos/35108820/pexels-photo-35108820.jpeg?w=1000&q=85',
    span: 'col-span-2 aspect-[21/9] md:aspect-auto',
  },
  {
    name: 'New Arrivals',
    image: 'https://images.pexels.com/photos/35108765/pexels-photo-35108765.jpeg?w=1000&q=85',
    span: 'col-span-2 aspect-[21/9] md:aspect-auto',
  },
];

export default function CategoryTiles() {
  return (
    <section className="py-12 md:py-24 bg-brand-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Explore</div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 md:auto-rows-[200px] lg:auto-rows-[240px]">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={cat.span}
            >
              <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group block relative w-full h-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/75 via-brand-brown/10 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 ${cat.hero ? 'p-6 md:p-8' : 'p-4'}`}>
                  <span className={`block text-brand-ivory tracking-widest uppercase font-medium ${cat.hero ? 'font-serif text-xl md:text-3xl normal-case tracking-normal mb-1' : 'text-xs md:text-sm'}`}>
                    {cat.name}
                  </span>
                  {cat.hero && (
                    <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-brand-gold-light">
                      Shop the Edit <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
