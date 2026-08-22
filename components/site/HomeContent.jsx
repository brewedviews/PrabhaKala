import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import RatingTrustStrip from '@/components/site/RatingTrustStrip';
import HeroCarousel from '@/components/site/HeroCarousel';
import TrendingRail from '@/components/site/TrendingRail';
import CategoryTiles from '@/components/site/CategoryTiles';
import HeritageStory from '@/components/site/HeritageStory';
import PriceTiles from '@/components/site/PriceTiles';
import InstagramSection from '@/components/site/InstagramSection';
import Testimonials from '@/components/site/Testimonials';
import TrustBadges from '@/components/site/TrustBadges';

export default function HomeContent({ trending }) {
  return (
    <div className="min-h-screen bg-brand-ivory">
      <Navbar />
      <RatingTrustStrip />
      <HeroCarousel />
      <TrendingRail products={trending} />
      <CategoryTiles />
      <HeritageStory />
      <PriceTiles />
      <InstagramSection />
      <Testimonials />
      <TrustBadges />
      <Footer />
    </div>
  );
}
