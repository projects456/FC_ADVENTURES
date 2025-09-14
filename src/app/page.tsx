import HeroSection from '@/components/home/hero-section';
import AdventuresSection from '@/components/home/adventures-section';
import WhyUsSection from '@/components/home/why-us-section';
import UpcomingTripSection from '@/components/home/upcoming-trip-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="mt-[-90px] md:mt-[-120px] relative z-20">
        <AdventuresSection />
      </div>
      <WhyUsSection />
      <UpcomingTripSection />
    </div>
  );
}
