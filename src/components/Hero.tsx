import { Button } from "@/components/ui/button";
import { Sparkles, Recycle, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-sustainable-fashion.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToSwipe = () => {
    document.getElementById('swipe-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-soft">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Sustainable fashion community" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-soft opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6">
            <Recycle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Sustainable Fashion Made Simple</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Give Clothes a<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Second Life</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Donate your gently used clothes, earn rewards, and discover new-to-you items. 
            Join our community making sustainable fashion fun and rewarding.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToSwipe}
              className="min-w-[200px]"
            >
              <Sparkles className="w-5 h-5" />
              Start Browsing
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/donate')}
              className="min-w-[200px]"
            >
              <Gift className="w-5 h-5" />
              Donate Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-1">2,500+</div>
              <div className="text-sm text-muted-foreground">Items Exchanged</div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-1">800+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-1">50kg</div>
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
    </section>
  );
};
