'use client';

import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Award, Truck } from 'lucide-react';

const BADGES = [
  { icon: Gem, label: 'Certified Pure Silk' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: Award, label: 'Direct from Artisans' },
  { icon: Truck, label: 'Pan-India Shipping' },
];

export default function TrustBadges() {
  return (
    <section className="py-10 md:py-16 bg-brand-ivory border-y border-brand-gold/20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="h-12 w-12 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-maroon">
                <b.icon size={20} />
              </div>
              <span className="text-xs md:text-sm tracking-widest uppercase text-brand-brown/80">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
