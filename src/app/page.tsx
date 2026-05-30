import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustSection } from '@/components/home/TrustSection';
import { MarketInsightSection } from '@/components/home/MarketInsightSection';
import { PropertyCareCTA } from '@/components/home/PropertyCareCTA';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesPreview />
        <HowItWorks />
        <TrustSection />
        <MarketInsightSection />
        <PropertyCareCTA />
      </main>
      <SiteFooter />
    </>
  );
}
