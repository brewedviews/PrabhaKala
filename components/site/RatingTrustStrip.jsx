import { Star } from 'lucide-react';

// PLACEHOLDER AGGREGATE NUMBERS: no reviews app is integrated yet (see
// lib/placeholders.js), so there's no real site-wide rating/customer count
// to pull from. These are illustrative only — deliberately kept to
// aggregate figures, no fabricated names, quotes, or photos. Replace with a
// live aggregate once a reviews app (Judge.me, Loox, etc.) is wired up.
const PLACEHOLDER_RATING = 4.7;
const PLACEHOLDER_CUSTOMER_COUNT = '500+';

export default function RatingTrustStrip() {
  return (
    <div className="bg-brand-maroon text-brand-ivory py-2.5">
      <div className="container flex items-center justify-center gap-2 text-xs md:text-sm tracking-wide">
        <span className="flex items-center gap-1 font-semibold">
          {PLACEHOLDER_RATING}
          <Star size={14} className="fill-brand-gold-light text-brand-gold-light" />
        </span>
        <span className="text-brand-ivory/50">·</span>
        <span>{PLACEHOLDER_CUSTOMER_COUNT} Happy Customers</span>
      </div>
    </div>
  );
}
