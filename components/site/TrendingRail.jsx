'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/site/ProductCard';

export default function TrendingRail({ products = [] }) {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-24 bg-brand-ivory">
      <div className="container">
        <div className="flex items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Curated Edit</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Trending Now</h2>
          </motion.div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="h-11 w-11 rounded-full border border-brand-maroon/30 flex items-center justify-center text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="h-11 w-11 rounded-full border border-brand-maroon/30 flex items-center justify-center text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] flex-shrink-0 aspect-[3/4] bg-brand-cream animate-pulse" />
            ))}
          </div>
        ) : (
          <div ref={scrollerRef} className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
            {products.map((p) => (
              <div key={p.handle} className="w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] flex-shrink-0 snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory px-8 py-3 text-sm tracking-widest uppercase transition-all"
          >
            View All Sarees <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
