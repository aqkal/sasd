import { useEffect, useMemo, useState } from "react";
import { SwipeCard } from "./SwipeCard";
import { CheckoutDialog } from "./CheckoutDialog";
import { Button } from "@/components/ui/button";
import { getCredits, setCredits } from "@/lib/credits";
import { ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";

const mockItems = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    size: "M",
    condition: "Like New",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    points: 4,
  },
  {
    id: 2,
    name: "Cotton Summer Dress",
    size: "S",
    condition: "Gently Used",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    points: 3,
  },
  {
    id: 3,
    name: "Wool Sweater",
    size: "L",
    condition: "Like New",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    points: 5,
  },
  {
    id: 4,
    name: "Linen Trousers",
    size: "32",
    condition: "Excellent",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    points: 2,
  },
];

export const SwipeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [credits, setCreditsState] = useState<number>(getCredits());
  const [collectedPoints, setCollectedPoints] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const pts = mockItems[currentIndex % mockItems.length].points;
      setCartCount(prev => prev + 1);
      setCollectedPoints(prev => prev + pts);
      toast.success("Item added to cart!");
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % mockItems.length);
    }, 300);
  };

  const handleCheckoutConfirm = () => {
    const totalPoints = collectedPoints;
    const currentCredits = getCredits();
    if (totalPoints > currentCredits) {
      toast.error("Not enough credits. Please buy or donate to earn more.");
      return;
    }

    // Deduct credits and persist
    const remaining = currentCredits - totalPoints;
    setCredits(remaining);
    setCreditsState(remaining);

    setCartCount(0);
    setCollectedPoints(0);
    toast.success("Thank you! See you at pickup time.");

    // Increment checkout counter in localStorage and notify listeners (e.g., Hero)
    const key = 'rewearCheckoutCount';
    const current = parseInt(localStorage.getItem(key) || '0', 10) || 0;
    const next = current + 1;
    localStorage.setItem(key, String(next));
    // Dispatch a custom event so other components can update live
    window.dispatchEvent(new CustomEvent<number>('checkout:increment', { detail: next }));
  };

  const currentItem = mockItems[currentIndex % mockItems.length];
  const totalPoints = collectedPoints;

  // Keep local credits in sync with global updates
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === 'number') setCreditsState(detail);
      else setCreditsState(getCredits());
    };
    window.addEventListener('credits:update', handler as EventListener);
    return () => window.removeEventListener('credits:update', handler as EventListener);
  }, []);

  return (
    <section id="swipe-section" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Find Your Next <span className="bg-gradient-primary bg-clip-text text-transparent">Favorite</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Swipe through curated clothing items. Right to collect, left to pass.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Swipe Card */}
          <div className="animate-scale-in">
            <SwipeCard item={currentItem} onSwipe={handleSwipe} />
            
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Item {currentIndex + 1} of {mockItems.length}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-8 animate-fade-in">
            <div className="bg-card rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Your Cart</h3>
                  <p className="text-sm text-muted-foreground">Items and required credits</p>
                </div>
              </div>
              <div className="text-4xl font-bold text-primary">{cartCount}</div>
              <div className="mt-2 text-sm text-muted-foreground">Total credits needed: <span className="font-semibold text-foreground">{totalPoints}</span></div>
              <div className="mt-1 text-sm text-muted-foreground">Your credits: <span className="font-semibold text-foreground">{credits}</span></div>
            </div>

            <div className="bg-gradient-card rounded-3xl p-8 shadow-soft">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">How Swiping Works</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Swipe right</strong> or tap the heart to add items to your cart</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">•</span>
                  <span><strong className="text-foreground">Swipe left</strong> or tap the X to pass</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Each item shows how many ReWear Points you'll need</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Schedule pickup after checkout at Shop 21</span>
                </li>
              </ul>
              
              <Button 
                variant="default" 
                className="w-full mt-6" 
                size="lg"
                onClick={() => setCheckoutOpen(true)}
                disabled={cartCount === 0}
              >
                Checkout ({cartCount} items, needs {totalPoints} credits)
              </Button>
            </div>
          </div>
        </div>

        <CheckoutDialog 
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          cartCount={cartCount}
          onConfirm={handleCheckoutConfirm}
          requiredCredits={totalPoints}
          userCredits={credits}
        />
      </div>
    </section>
  );
};
