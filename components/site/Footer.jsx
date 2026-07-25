import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream mt-20">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif text-3xl tracking-widest text-brand-gold-light">PRABHA</div>
          <div className="text-[10px] tracking-[0.4em] text-brand-gold mb-4">— KALA —</div>
          <p className="text-sm text-brand-cream/70 leading-relaxed">
            Handcrafted Banarasi Silk Sarees woven with generations of skill in the sacred looms of Varanasi.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-brand-gold/40 flex items-center justify-center hover:bg-brand-gold hover:text-brand-brown transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-brand-gold-light text-sm uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li><Link href="/shop">All Sarees</Link></li>
            <li><Link href="/shop?category=Bridal%20Collection">Bridal</Link></li>
            <li><Link href="/shop?category=Wedding%20Collection">Wedding</Link></li>
            <li><Link href="/shop?category=Festive%20Collection">Festive</Link></li>
            <li><Link href="/shop?category=New%20Arrivals">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold-light text-sm uppercase tracking-widest mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-brand-cream/70">
            <li>About Us</li>
            <li>Contact</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold-light text-sm uppercase tracking-widest mb-4">Newsletter</h4>
          <p className="text-sm text-brand-cream/70 mb-4">Receive stories of craft and first access to new collections.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="flex-1 bg-transparent border border-brand-gold/40 px-3 py-2 text-sm placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold" />
            <button className="bg-brand-gold text-brand-brown px-4 text-sm font-medium hover:bg-brand-gold-light transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-gold/20">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-brand-cream/50">
          <div>© {new Date().getFullYear()} Prabha Kala. All rights reserved.</div>
          <div>Handwoven with love in Varanasi, India.</div>
        </div>
      </div>
    </footer>
  );
}
