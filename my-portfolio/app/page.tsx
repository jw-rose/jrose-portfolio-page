import HeroSection from '@/components/HeroSection';
import TechStrip from '@/components/TechStrip';
import WorkSection from '@/components/WorkSection';
import WhoIAmTeaser from '@/components/WhoIAmTeaser';
import ClosingCTA from '@/components/ClosingCTA';

export default function Home() {
  return (
    <div className="bg-ink text-paper">
      <HeroSection />
      <TechStrip />
      <WorkSection />
      <WhoIAmTeaser />
      <ClosingCTA />
    </div>
  );
}
