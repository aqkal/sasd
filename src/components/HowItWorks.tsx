import { Upload, Heart, ShoppingBag, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Upload,
    title: "Donate Clothes",
    description: "List your gently used clothing items and earn ReWear Points for each approved donation.",
    color: "bg-primary/10 text-primary",
    action: { type: "route", to: "/donate" as const },
  },
  {
    icon: Heart,
    title: "Swipe & Collect",
    description: "Browse available items with our fun Tinder-style interface. Swipe right to add to cart!",
    color: "bg-secondary/10 text-secondary",
    action: { type: "scroll", targetId: "swipe-section" as const },
  },
  {
    icon: ShoppingBag,
    title: "Redeem Rewards",
    description: "Use your ReWear Points for Amazon vouchers, discounts, or premium picks.",
    color: "bg-accent/30 text-accent-foreground",
    action: { type: "scroll", targetId: "rewards-section" as const },
  },
  {
    icon: MapPin,
    title: "Easy Pickup",
    description: "All exchanges happen at Shop 21, University Campus. Drop off donations, pick up your finds!",
    color: "bg-primary-light/10 text-primary-dark",
    action: { type: "scroll", targetId: "location-section" as const },
  },
];

export const HowItWorks = () => {
  const navigate = useNavigate();

  const handleAction = (
    action:
      | { type: "route"; to: string }
      | { type: "scroll"; targetId: string }
  ) => {
    if (action.type === "route") {
      navigate(action.to);
      return;
    }

    // For in-page sections on the home route, navigate with state so Index can scroll
    navigate("/", { state: { scrollTo: action.targetId } });
  };

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
                <button
                  type="button"
                  onClick={() => handleAction(step.action)}
                  className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 h-full text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
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
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
