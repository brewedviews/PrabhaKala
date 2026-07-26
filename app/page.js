import HomeContent from '@/components/site/HomeContent';
import { getCollectionByHandle } from '@/lib/shopify/collections';

export default async function HomePage() {
  const frontpage = await getCollectionByHandle('frontpage', { first: 8 });
  const featured = frontpage?.products || [];

  return <HomeContent featured={featured} />;
}
