import { Upload, Heart, ShoppingBag, MapPin } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Donate Clothes",
    description: "List your gently used clothing items and earn ReWear Points for each approved donation.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Swipe & Collect",
    description: "Browse available items with our fun Tinder-style interface. Swipe right to add to cart!",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: ShoppingBag,
    title: "Redeem Rewards",
    description: "Use your ReWear Points for Amazon vouchers, discounts, or premium picks.",
    color: "bg-accent/30 text-accent-foreground",
  },
  {
    icon: MapPin,
    title: "Easy Pickup",
    description: "All exchanges happen at Shop 21, University Campus. Drop off donations, pick up your finds!",
    color: "bg-primary-light/10 text-primary-dark",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">ReWear</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to sustainable fashion and rewarding experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-card">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
