'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Award, Heart, Gem, Star, Instagram } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ProductCard from '@/components/site/ProductCard';

const HERO_IMG = 'https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?w=2000&q=90';
const STORY_IMG = 'https://images.pexels.com/photos/24738158/pexels-photo-24738158.jpeg?w=1400';
const STORY_IMG_2 = 'https://images.pexels.com/photos/29848182/pexels-photo-29848182.jpeg?w=1200';

const WHY = [
  { icon: Award, title: 'Authentic Banarasi Silk', text: 'Sourced directly from master weavers in Varanasi.' },
  { icon: Sparkles, title: 'Handpicked Designs', text: 'Each saree chosen for its rarity and artistry.' },
  { icon: Gem, title: 'Premium Quality', text: 'Pure zari, pure silk, exquisite finish.' },
  { icon: Heart, title: 'Trusted by Brides', text: 'Cherished at thousands of weddings across India.' },
  { icon: ShieldCheck, title: 'Secure Payments', text: 'PCI-DSS compliant checkout via Razorpay.' },
  { icon: Truck, title: 'Fast Delivery', text: 'Free shipping across India, delivered in 3–5 days.' },
];

const TESTIMONIALS = [
  { name: 'Ananya Sharma', city: 'Mumbai', text: 'The craftsmanship is beyond words. My wedding saree from Prabha Kala felt like wearing a piece of art. Compliments from every guest.', rating: 5 },
  { name: 'Priya Iyer', city: 'Bangalore', text: 'I could feel the weight and richness of the pure silk the moment I opened the box. This is heirloom quality — for generations to come.', rating: 5 },
  { name: 'Kavya Deshmukh', city: 'Pune', text: 'Elegant packaging, honest craftsmanship, and a story behind every piece. Prabha Kala isn\'t a brand — it\'s a keepsake.', rating: 5 },
];

const INSTA = [
  'https://images.pexels.com/photos/7920055/pexels-photo-7920055.jpeg?w=800',
  'https://images.pexels.com/photos/28943520/pexels-photo-28943520.jpeg?w=800',
  'https://images.pexels.com/photos/28943474/pexels-photo-28943474.jpeg?w=800',
  'https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?w=800&q=85',
  'https://images.unsplash.com/photo-1610189338175-0782dfdb0c04?w=800&q=85',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85',
];

export default function HomeContent({ featured }) {
  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
        <img src={HERO_IMG} alt="Banarasi Silk Saree" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/80 via-brand-brown/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 to-transparent" />

        <div className="relative container h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-2xl text-brand-ivory"
          >
            <div className="paisley-divider mb-6 max-w-xs">
              <span className="text-xs tracking-[0.4em] uppercase text-brand-gold-light">Prabha Kala</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-balance">
              Every Thread<br />
              <span className="gold-text italic">Tells a Story</span>
            </h1>
            <p className="text-base md:text-lg text-brand-ivory/85 max-w-xl leading-relaxed mb-10">
              Discover handcrafted Banarasi Silk Sarees that celebrate Indian tradition,
              timeless elegance and generations of skilled craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="group inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-brown px-8 py-4 text-sm tracking-widest uppercase transition-all">
                Shop Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#story" className="inline-flex items-center justify-center gap-2 border border-brand-ivory/60 hover:bg-brand-ivory hover:text-brand-brown text-brand-ivory px-8 py-4 text-sm tracking-widest uppercase transition-all">
                Explore the Craft
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-ivory/70 text-[10px] tracking-[0.4em] uppercase">
          Scroll to Discover ↓
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-24 md:py-32 bg-brand-cream">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={STORY_IMG} alt="Handloom weaving in Varanasi" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden md:block w-56 aspect-[3/4] overflow-hidden border-8 border-brand-cream shadow-xl">
              <img src={STORY_IMG_2} alt="Silk threads" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-4">Our Heritage</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon leading-tight mb-6">
              The Soul of <em className="gold-text">Varanasi</em>, Woven Thread by Thread.
            </h2>
            <p className="text-brand-brown/80 leading-relaxed mb-4">
              For over five hundred years, the sacred looms of Varanasi have hummed with the rhythm of
              master weavers. Their fingers, guided by knowledge passed through generations, coax silk
              and gold zari into motifs that tell stories of gods, gardens and dynasties.
            </p>
            <p className="text-brand-brown/80 leading-relaxed mb-8">
              At Prabha Kala, we work directly with these families. Each saree we bring you is a
              testament to their artistry — handwoven with pure Katan silk, adorned with real zari,
              and destined to be worn during the most sacred moments of your life.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { n: '500+', l: 'Years of Craft' },
                { n: '300+', l: 'Master Weavers' },
                { n: '10k+', l: 'Happy Brides' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-serif text-3xl md:text-4xl text-brand-maroon">{s.n}</div>
                  <div className="text-[10px] tracking-widest uppercase text-brand-brown/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 md:py-32 bg-brand-ivory">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Curated Collection</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon mb-4">Featured Sarees</h2>
            <div className="paisley-divider max-w-[200px] mx-auto mt-4"><Sparkles size={16} /></div>
            <p className="text-brand-brown/70 mt-6">A handpicked edit of our most-loved Banarasi silks, each a masterpiece in its own right.</p>
          </div>

          {featured.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-brand-cream animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              {featured.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/shop" className="inline-flex items-center gap-2 border border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-brand-ivory px-8 py-3 text-sm tracking-widest uppercase transition-all">
              View All Sarees <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 bg-brand-brown text-brand-cream">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-light mb-3">The Prabha Promise</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-ivory">Why Choose <em className="gold-text">Prabha Kala</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY.map((w) => (
              <div key={w.title} className="border border-brand-gold/20 p-8 hover:bg-brand-maroon-dark transition-colors">
                <div className="h-12 w-12 rounded-full border border-brand-gold/40 flex items-center justify-center mb-5 text-brand-gold-light">
                  <w.icon size={22} />
                </div>
                <h3 className="font-serif text-xl text-brand-ivory mb-2">{w.title}</h3>
                <p className="text-sm text-brand-cream/70 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-brand-cream">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">Kind Words</div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Loved by Brides Across India</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-24 bg-brand-ivory">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <a
              href="https://www.instagram.com/prabha_kala_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3 inline-flex items-center hover:text-brand-maroon transition-colors"
            >
              <Instagram size={16} className="inline mr-2" />@prabha_kala_
            </a>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-maroon">Follow The Journey</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
            {INSTA.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/prabha_kala_/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
              >
                <img src={src} alt="Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/40 transition-colors flex items-center justify-center">
                  <Instagram size={22} className="text-brand-ivory opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
