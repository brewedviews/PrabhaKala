import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ShopGrid from '@/components/site/ShopGrid';
import { getProducts } from '@/lib/shopify/products';

export default async function ShopPage() {
  const { products } = await getProducts({ first: 100 });

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />

      {/* Header */}
      <section className="bg-brand-cream py-16 md:py-20 text-center border-b border-brand-gold/20">
        <div className="container">
          <div className="text-xs tracking-[0.4em] uppercase text-brand-gold-dark mb-3">The Collection</div>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-maroon">All Sarees</h1>
          <p className="mt-4 text-brand-brown/70 max-w-xl mx-auto">Explore our complete edit of handwoven Banarasi silks — each piece one of a kind.</p>
        </div>
      </section>

      <ShopGrid products={products} />

      <Footer />
    </div>
  );
}
