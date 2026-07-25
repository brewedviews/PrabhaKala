'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { itemCount, wishlist } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop All' },
    { href: '/shop?category=Bridal%20Collection', label: 'Bridal' },
    { href: '/shop?category=Wedding%20Collection', label: 'Wedding' },
    { href: '/shop?category=Festive%20Collection', label: 'Festive' },
    { href: '/shop?category=New%20Arrivals', label: 'New' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-gold/20">
      <div className="hidden md:block bg-brand-maroon text-brand-ivory text-xs py-2 text-center tracking-widest">
        FREE SHIPPING ACROSS INDIA · HANDCRAFTED IN VARANASI · CERTIFIED PURE SILK
      </div>
      <div className="container flex items-center justify-between py-4 md:py-5">
        <button className="md:hidden text-brand-brown" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col items-center leading-none">
            <span className="font-serif text-2xl md:text-3xl tracking-widest text-brand-maroon">PRABHA</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-brand-gold-dark -mt-1">— KALA —</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-brown hover:text-brand-maroon transition-colors uppercase tracking-wider">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:flex text-brand-brown hover:text-brand-maroon" aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/shop" className="relative text-brand-brown hover:text-brand-maroon">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-brand-brown hover:text-brand-maroon">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-maroon text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-gold/20 bg-brand-ivory">
          <nav className="container flex flex-col py-4 gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-brand-brown py-2 uppercase tracking-wider">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
