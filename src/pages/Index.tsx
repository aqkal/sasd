import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { SwipeSection } from "@/components/SwipeSection";
import { PointsRewards } from "@/components/PointsRewards";
import { LocationInfo } from "@/components/LocationInfo";
import { Footer } from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // clear state so back/forward doesn't auto-scroll again
      history.replaceState(null, "");
    }
  }, [location.state]);

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
