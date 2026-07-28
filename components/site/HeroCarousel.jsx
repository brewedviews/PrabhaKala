'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?w=2000&q=90',
    eyebrow: 'Prabha Kala',
    heading: 'Handwoven.',
    headingAccent: 'Timeless.',
    text: 'Discover handcrafted silk sarees that celebrate Indian tradition, timeless elegance and generations of skilled craftsmanship.',
    cta: { label: 'Shop Now', href: '/shop' },
  },
  {
    image: 'https://images.pexels.com/photos/27575104/pexels-photo-27575104.jpeg?w=2000&q=90',
    eyebrow: 'The Kanjivaram Edit',
    heading: 'Threads of Heritage,',
    headingAccent: 'Cut for Today.',
    text: 'Rich zari, vivid silk, and centuries of craft — reimagined for the modern bride and the everyday icon.',
    cta: { label: 'Explore Kanjivaram', href: '/shop?category=Kanjivaram' },
  },
  {
    image: 'https://images.pexels.com/photos/29049398/pexels-photo-29049398.jpeg?w=2000&q=90',
    eyebrow: 'Wedding Season',
    heading: 'Small Batches.',
    headingAccent: 'Boundless Artistry.',
    text: 'Curated for the occasions that matter — from sangeet to saat phere, a saree for every chapter.',
    cta: { label: 'Discover the Wedding Edit', href: '/shop?category=Wedding%20Edit' },
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i) => setIndex((i + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  // Arrows are desktop-only (hidden below md:), so touch-swipe is the only
  // manual navigation on mobile besides the dots.
  const touchStartX = useRef(null);
  const SWIPE_THRESHOLD = 50;
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goTo(index - 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(index + 1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-brand-brown"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.heading} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/80 via-brand-brown/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative container h-full flex items-center">
        <motion.div
          key={`text-${index}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="max-w-2xl text-brand-ivory"
        >
          <div className="paisley-divider mb-6 max-w-xs">
            <span className="text-xs tracking-[0.4em] uppercase text-brand-gold-light">{slide.eyebrow}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-balance">
            {slide.heading}<br />
            <span className="gold-text italic">{slide.headingAccent}</span>
          </h1>
          <p className="text-base md:text-lg text-brand-ivory/85 max-w-xl leading-relaxed mb-10">
            {slide.text}
          </p>
          <Link
            href={slide.cta.href}
            className="group inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-brown px-8 py-4 text-sm tracking-widest uppercase transition-all"
          >
            {slide.cta.label} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-brand-ivory/40 items-center justify-center text-brand-ivory hover:bg-brand-ivory hover:text-brand-brown transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-brand-ivory/40 items-center justify-center text-brand-ivory hover:bg-brand-ivory hover:text-brand-brown transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-11 w-11 -mx-1 flex items-center justify-center"
          >
            <span className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-brand-gold' : 'w-1.5 bg-brand-ivory/50'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
