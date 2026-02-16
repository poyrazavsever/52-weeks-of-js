import { getPhases } from "@/lib/api";
import HeroSection from "@/components/landing/HeroSection";
import PhasesGrid from "@/components/landing/PhasesGrid";

export default function Home() {
  const phases = getPhases();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PhasesGrid phases={phases} />
    </div>
  );
}
