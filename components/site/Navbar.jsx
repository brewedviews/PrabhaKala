'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

// PLACEHOLDER DATA: no real Shopify Collections exist yet, so this mega-menu
// is hand-authored (same approach as components/site/CategoryTiles.jsx).
// Every link below points at `/shop?category=<label>`, matching the query
// param convention ShopGrid.jsx/Footer.jsx already use — once real
// Collections exist, swap this list for `getCollections()` output and this
// component (plus CategoryTiles/Footer) can read collection handles instead
// of free-text category labels.
const MEGA_MENU = [
  {
    label: 'Sarees',
    href: '/shop?category=Sarees',
    groups: [
      { heading: 'By Fabric', items: ['Banarasi', 'Kanjivaram', 'Organza', 'Cotton'] },
      { heading: 'By Occasion', items: ['Wedding', 'Festive', 'Daily Wear', 'Office Wear'] },
      { heading: 'By Price', items: ['Under ₹2k', '₹2k – ₹5k', 'Premium'] },
    ],
  },
  {
    label: 'Blouses',
    href: '/shop?category=Blouses',
    groups: [
      { heading: 'By Fabric', items: ['Banarasi', 'Kanjivaram', 'Organza', 'Cotton'] },
      { heading: 'By Occasion', items: ['Wedding', 'Festive', 'Daily Wear', 'Office Wear'] },
      { heading: 'By Price', items: ['Under ₹2k', '₹2k – ₹5k', 'Premium'] },
    ],
  },
  {
    label: 'Ready-to-Wear',
    href: '/shop?category=Ready-to-Wear',
    groups: [
      { heading: 'By Occasion', items: ['Wedding', 'Festive', 'Daily Wear', 'Office Wear'] },
      { heading: 'By Price', items: ['Under ₹2k', '₹2k – ₹5k', 'Premium'] },
    ],
  },
  {
    label: 'Collections',
    href: '/shop?category=Collections',
    groups: [
      { heading: 'Featured', items: ['Wedding Edit', 'New Arrivals', 'Bridal Collection', 'Festive Collection'] },
    ],
  },
  {
    label: 'Sale',
    href: '/shop?category=Sale',
    highlight: true,
    groups: [
      { heading: 'Deals', items: ['Under ₹2k', 'Clearance', 'Flash Deals'] },
    ],
  },
];

export default function Navbar() {
  const { itemCount, wishlist } = useCart();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const closeMobile = () => {
    setOpen(false);
    setExpandedMobile(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-gold/20">
      <div className="hidden md:block bg-brand-maroon text-brand-ivory text-xs py-2 text-center tracking-widest">
        FREE SHIPPING · HANDPICKED FROM INDIA'S FINEST LOOMS · CERTIFIED PURE SILK
      </div>
      <div className="container flex items-center justify-between py-4 md:py-5">
        <button className="md:hidden text-brand-brown" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-new.png" alt="Prabha Kala" className="h-12 md:h-16 w-auto" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          onMouseLeave={() => setActiveMenu(null)}
        >
          {MEGA_MENU.map((cat, i) => (
            <div key={cat.label} className="relative" onMouseEnter={() => setActiveMenu(i)}>
              <Link
                href={cat.href}
                className={`flex items-center gap-1 text-sm uppercase tracking-wider transition-colors ${
                  cat.highlight ? 'text-brand-red font-semibold hover:text-brand-red/80' : 'text-brand-brown hover:text-brand-maroon'
                }`}
              >
                {cat.label}
                <ChevronDown size={13} className={`transition-transform ${activeMenu === i ? 'rotate-180' : ''}`} />
              </Link>

              {activeMenu === i && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                  <div className="flex gap-10 bg-brand-ivory border border-brand-gold/20 shadow-xl px-8 py-6 min-w-[420px]">
                    {cat.groups.map((group) => (
                      <div key={group.heading}>
                        <div className="text-[11px] tracking-[0.25em] uppercase text-brand-gold-dark mb-3 whitespace-nowrap">
                          {group.heading}
                        </div>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/shop?category=${encodeURIComponent(item)}`}
                                className="text-sm text-brand-brown hover:text-brand-maroon transition-colors whitespace-nowrap"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
        <div className="md:hidden border-t border-brand-gold/20 bg-brand-ivory max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container flex flex-col py-4">
            {MEGA_MENU.map((cat, i) => (
              <div key={cat.label} className="border-b border-brand-gold/10 last:border-b-0">
                <div className="flex items-center justify-between py-3">
                  <Link
                    href={cat.href}
                    onClick={closeMobile}
                    className={`text-sm uppercase tracking-wider ${cat.highlight ? 'text-brand-red font-semibold' : 'text-brand-brown'}`}
                  >
                    {cat.label}
                  </Link>
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === i ? null : i)}
                    aria-label={`Toggle ${cat.label} submenu`}
                    className="p-2 -mr-2 text-brand-brown"
                  >
                    <ChevronRight size={16} className={`transition-transform ${expandedMobile === i ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {expandedMobile === i && (
                  <div className="pb-4 pl-4 grid grid-cols-2 gap-x-6 gap-y-4">
                    {cat.groups.map((group) => (
                      <div key={group.heading}>
                        <div className="text-[10px] tracking-[0.25em] uppercase text-brand-gold-dark mb-2">
                          {group.heading}
                        </div>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/shop?category=${encodeURIComponent(item)}`}
                                onClick={closeMobile}
                                className="text-sm text-brand-brown/80"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
