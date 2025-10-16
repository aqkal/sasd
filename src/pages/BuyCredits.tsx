import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Heart, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const creditPackages = [
  { id: 1, points: 10, price: 1, popular: false },
  { id: 2, points: 50, price: 5, popular: true },
  { id: 3, points: 100, price: 10, popular: false },
  { id: 4, points: 250, price: 25, popular: false },
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[1]);
  const [donationAmount, setDonationAmount] = useState(0);
  const [step, setStep] = useState<"select" | "confirmed">("select");

  const handlePurchase = () => {
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-2">
            You've purchased {selectedPackage.points} ReWear Points
            {donationAmount > 0 && ` and donated $${donationAmount}`}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            100% of your contribution goes to support sustainable fashion and help those in need. Together, we're making a difference! 🌱
          </p>
          <Button onClick={() => navigate("/")} className="w-full" variant="hero">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Buy ReWear Points</h1>
          <p className="text-muted-foreground">
            Support sustainable fashion and unlock more items to claim
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-6 cursor-pointer transition-all relative ${
                selectedPackage.id === pkg.id
                  ? "border-primary border-2 shadow-card"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{pkg.points}</div>
                <div className="text-sm text-muted-foreground mb-4">Points</div>
                <div className="text-2xl font-bold text-primary">${pkg.price}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <Label htmlFor="donation" className="text-lg font-semibold">
              Donate Additional (Optional)
            </Label>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Every dollar helps us provide quality clothing to those in need
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">$</span>
            <Input
              id="donation"
              type="number"
              min="0"
              step="1"
              value={donationAmount || ""}
              onChange={(e) => setDonationAmount(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="0"
              className="text-lg"
            />
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>{selectedPackage.points} Points</span>
              <span>${selectedPackage.price}</span>
            </div>
            {donationAmount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Additional Donation</span>
                <span>${donationAmount}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${selectedPackage.price + donationAmount}</span>
            </div>
          </div>
        </Card>

        <Button
          onClick={handlePurchase}
          className="w-full"
          variant="hero"
          size="lg"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Pay with Credit Card
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Your purchase supports sustainable fashion initiatives
        </p>
      </div>
    </div>
  );
}
