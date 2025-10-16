import { useState } from "react";
import { Heart, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClothingItem {
  id: number;
  name: string;
  size: string;
  condition: string;
  category: string;
  image: string;
  points: number;
}

interface SwipeCardProps {
  item: ClothingItem;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeCard = ({ item, onSwipe }: SwipeCardProps) => {
  const [animation, setAnimation] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setAnimation(direction);
    setTimeout(() => {
      onSwipe(direction);
      setAnimation(null);
    }, 500);
  };

  return (
    <div 
      className={`relative w-full max-w-sm mx-auto ${
        animation === 'left' ? 'animate-slide-left' : 
        animation === 'right' ? 'animate-slide-right' : ''
      }`}
    >
      <div className="bg-gradient-card rounded-3xl shadow-card overflow-hidden">
        {/* Image */}
        <div className="relative h-96 bg-muted">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              {item.points} pts
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{item.name}</h3>
              <p className="text-muted-foreground">{item.category}</p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Info className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex gap-2 mb-6">
            <Badge variant="outline">Size: {item.size}</Badge>
            <Badge variant="outline">{item.condition}</Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleSwipe('left')}
            >
              <X className="w-6 h-6" />
              Pass
            </Button>
            <Button
              variant="default"
              size="lg"
              className="flex-1"
              onClick={() => handleSwipe('right')}
            >
              <Heart className="w-6 h-6" />
              Collect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
