'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// PLACEHOLDER DATA: mirrors CategoryTiles.jsx's approach — `/shop?category=`
// links today, ready to swap for real Shopify Collections or a proper price
// filter param once one exists. Kept as a plain uniform grid (not bento) —
// three items don't need it, and it reads as an intentional rhythm change
// after the bento category grid above.
const PRICE_TIERS = [
  { name: 'Under ₹5k', category: 'Under 5k', image: 'https://images.pexels.com/photos/35108770/pexels-photo-35108770.jpeg?w=1000&q=85' },
  { name: '₹5k – ₹15k', category: '5k to 15k', image: 'https://images.pexels.com/photos/9419023/pexels-photo-9419023.jpeg?w=1000&q=85' },
  { name: 'Premium Edit', category: 'Premium Edit', image: 'https://images.pexels.com/photos/10317127/pexels-photo-10317127.jpeg?w=1000&q=85' },
];

export default function PriceTiles() {
  return (
    <section className="py-12 md:py-24 bg-brand-ivory">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Find Your Fit</div>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Shop by Price</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PRICE_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(tier.category)}`}
                className="group block relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/75 via-brand-brown/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <span className="font-serif text-2xl text-brand-ivory">{tier.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
