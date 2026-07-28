'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// PLACEHOLDER PHOTOGRAPHY: handloom-weaving stock shots, standing in for
// real Prabha Kala workshop/artisan photography.
const WEAVE_IMG = 'https://images.pexels.com/photos/24738158/pexels-photo-24738158.jpeg?w=1400';
const WEAVE_IMG_2 = 'https://images.pexels.com/photos/29848182/pexels-photo-29848182.jpeg?w=1200';

const STATS = [
  { n: '500+', l: 'Years of Craft' },
  { n: '300+', l: 'Master Weavers' },
  { n: '10k+', l: 'Happy Brides' },
];

// Cinematic entrance — bigger displacement, slight scale, slower expo-out
// easing than the site's standard fade-up, staggered per element. This is
// meant to be the single most "alive" section on the page.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 60, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay },
});

export default function HeritageStory() {
  return (
    <section className="relative py-20 md:py-32 bg-brand-charcoal text-brand-cream overflow-hidden">
      <div className="container">
        <motion.div {...reveal(0)} className="text-center max-w-3xl mx-auto mb-4">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-light mb-6">Our Heritage</div>
        </motion.div>

        {/* The big typography moment */}
        <motion.div {...reveal(0.1)} className="text-center mb-16 md:mb-24">
          <h2 className="font-serif leading-[1.05]">
            <span className="block text-3xl md:text-5xl text-brand-ivory mb-1 md:mb-2">Rooted in Heritage.</span>
            <span className="block gold-text italic text-[clamp(3.5rem,9vw,8rem)] leading-none">
              Woven for Today.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...reveal(0.2)} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={WEAVE_IMG} alt="Handloom weaving in Varanasi" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden md:block w-56 aspect-[3/4] overflow-hidden border-8 border-brand-charcoal shadow-xl">
              <img src={WEAVE_IMG_2} alt="Silk threads on the loom" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div {...reveal(0.35)}>
            <p className="text-brand-cream/80 leading-relaxed mb-4">
              For over five hundred years, the sacred looms of Varanasi have hummed with the rhythm of
              master weavers. Their fingers, guided by knowledge passed through generations, coax silk
              and gold zari into motifs that tell stories of gods, gardens and dynasties.
            </p>
            <p className="text-brand-cream/80 leading-relaxed mb-10">
              At Prabha Kala, we work directly with these families. Each saree we bring you is a
              testament to their artistry — handwoven with pure Katan silk, adorned with real zari,
              and destined to be worn during the most sacred moments of your life.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {STATS.map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="font-serif text-3xl md:text-4xl text-brand-gold-light">{s.n}</div>
                  <div className="text-[10px] tracking-widest uppercase text-brand-cream/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 border border-brand-gold/50 hover:bg-brand-gold text-brand-gold-light hover:text-brand-charcoal px-8 py-4 text-sm tracking-widest uppercase transition-all"
            >
              Explore Our Craft <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
