import { Instagram } from 'lucide-react';

const INSTA = [
  'https://images.pexels.com/photos/7920055/pexels-photo-7920055.jpeg?w=800',
  'https://images.pexels.com/photos/28943520/pexels-photo-28943520.jpeg?w=800',
  'https://images.pexels.com/photos/28943474/pexels-photo-28943474.jpeg?w=800',
  'https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?w=800&q=85',
  'https://images.unsplash.com/photo-1610189338175-0782dfdb0c04?w=800&q=85',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85',
];

export default function InstagramSection() {
  return (
    <section className="py-12 md:py-24 bg-brand-ivory">
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
  );
}
