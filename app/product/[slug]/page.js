import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import ProductDetail from '@/components/site/ProductDetail';
import { getProductByHandle, getProductRecommendations } from '@/lib/shopify/products';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-ivory">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-serif text-3xl text-brand-maroon mb-4">Saree not found</h1>
          <Link href="/shop" className="text-brand-gold-dark underline">Browse the collection</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similar = await getProductRecommendations(product.id);

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />
      <ProductDetail product={product} similar={similar} />
      <Footer />
    </div>
  );
}
