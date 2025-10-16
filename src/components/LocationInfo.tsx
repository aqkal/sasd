import { MapPin, Clock, Calendar, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LocationInfo = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Visit Our <span className="bg-gradient-primary bg-clip-text text-transparent">Collection Point</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              All donations and pickups happen at one convenient campus location
            </p>
          </div>

          <Card className="bg-gradient-card p-8 shadow-card">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Shop 21, University Campus</p>
                    <p className="text-sm text-muted-foreground mt-1">Ground Floor, Main Building</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground mt-1">9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Pickup Schedule</h3>
                    <p className="text-muted-foreground">Book your slot online</p>
                    <p className="text-sm text-muted-foreground mt-1">Same-day or next-day options available</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-2xl overflow-hidden h-64 md:h-auto relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-muted-foreground font-medium">Interactive Map</p>
                    <p className="text-sm text-muted-foreground mt-1">Click to view directions</p>
                  </div>
                </div>
                {/* In a real app, integrate Google Maps or similar */}
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
            </div>
          </Card>
          
          <div className="text-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/buy-credits')}
              className="min-w-[250px]"
            >
              <Coins className="w-5 h-5" />
              Buy ReWear Credits
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
