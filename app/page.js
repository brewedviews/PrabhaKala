import HomeContent from '@/components/site/HomeContent';
import { getProducts } from '@/lib/shopify/products';

export default async function HomePage() {
  const { products } = await getProducts({ first: 12 });

  return <HomeContent trending={products} />;
}
