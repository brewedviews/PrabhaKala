'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// PLACEHOLDER TESTIMONIALS — swap for real customer quotes.
const TESTIMONIALS = [
  { name: 'Ananya Sharma', city: 'Mumbai', text: 'The craftsmanship is beyond words. My wedding saree from Prabha Kala felt like wearing a piece of art. Compliments from every guest.', rating: 5 },
  { name: 'Priya Iyer', city: 'Bangalore', text: 'I could feel the weight and richness of the pure silk the moment I opened the box. This is heirloom quality — for generations to come.', rating: 5 },
  { name: 'Kavya Deshmukh', city: 'Pune', text: 'Elegant packaging, honest craftsmanship, and a story behind every piece. Prabha Kala isn\'t a brand — it\'s a keepsake.', rating: 5 },
  { name: 'Meera Nair', city: 'Delhi', text: 'From the packaging to the pallu, everything whispered luxury. This is the saree I\'ll pass down to my daughter one day.', rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-brand-cream">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Kind Words</div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Loved by Brides Across India</h2>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-brand-ivory p-8 border border-brand-gold/20"
            >
              <div className="flex gap-1 text-brand-gold mb-4">
                {[...Array(t.rating)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
              </div>
              <p className="text-brand-brown/80 leading-relaxed italic mb-6">“{t.text}”</p>
              <div className="pt-4 border-t border-brand-gold/20">
                <div className="font-serif text-lg text-brand-maroon">{t.name}</div>
                <div className="text-xs tracking-widest uppercase text-brand-brown/50 mt-1">{t.city}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="w-[85%] flex-shrink-0 snap-start bg-brand-ivory p-8 border border-brand-gold/20"
            >
              <div className="flex gap-1 text-brand-gold mb-4">
                {[...Array(t.rating)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
              </div>
              <p className="text-brand-brown/80 leading-relaxed italic mb-6">“{t.text}”</p>
              <div className="pt-4 border-t border-brand-gold/20">
                <div className="font-serif text-lg text-brand-maroon">{t.name}</div>
                <div className="text-xs tracking-widest uppercase text-brand-brown/50 mt-1">{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
