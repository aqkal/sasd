import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { SwipeSection } from "@/components/SwipeSection";
import { PointsRewards } from "@/components/PointsRewards";
import { LocationInfo } from "@/components/LocationInfo";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <SwipeSection />
      <PointsRewards />
      <LocationInfo />
      <Footer />
    </div>
  );
};

export default Index;
