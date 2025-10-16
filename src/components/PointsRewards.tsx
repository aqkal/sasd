import { Gift, Award, TrendingUp, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rewards = [
  {
    icon: Gift,
    title: "Amazon Vouchers",
    points: 100,
    value: "$10",
    description: "Redeem points for Amazon gift cards",
    color: "bg-amber-500/10 text-amber-700",
  },
  {
    icon: Award,
    title: "Premium Picks",
    points: 50,
    value: "Free",
    description: "Access exclusive clothing items",
    color: "bg-purple-500/10 text-purple-700",
  },
  {
    icon: TrendingUp,
    title: "Store Discount",
    points: 75,
    value: "20%",
    description: "Discount on partner stores",
    color: "bg-blue-500/10 text-blue-700",
  },
  {
    icon: Star,
    title: "Bonus Points",
    points: 150,
    value: "2x",
    description: "Double points for a week",
    color: "bg-green-500/10 text-green-700",
  },
];

export const PointsRewards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Rewards Program
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Earn <span className="bg-gradient-primary bg-clip-text text-transparent">ReWear Points</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every donation earns you points. Redeem them for amazing rewards and exclusive benefits.
          </p>
        </div>

        {/* How to Earn Points */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="bg-gradient-card p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">How to Earn Points</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">10</span>
                </div>
                <p className="font-medium text-foreground mb-1">Basic Items</p>
                <p className="text-sm text-muted-foreground">T-shirts, accessories</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">15</span>
                </div>
                <p className="font-medium text-foreground mb-1">Quality Items</p>
                <p className="text-sm text-muted-foreground">Jeans, dresses, shirts</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">20</span>
                </div>
                <p className="font-medium text-foreground mb-1">Premium Items</p>
                <p className="text-sm text-muted-foreground">Jackets, coats, suits</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rewards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            return (
              <div
                key={index}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="p-6 h-full hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-card">
                  <div className={`w-14 h-14 ${reward.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {reward.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-primary">{reward.points}</span>
                    <span className="text-sm text-muted-foreground">points</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {reward.description}
                  </p>
                  
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Worth {reward.value}
                  </Badge>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
