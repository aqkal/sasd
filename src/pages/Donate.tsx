import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, Gift, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Footer } from "@/components/Footer";

const clothingTypes = [
  { value: "dress", label: "Dress", points: 15 },
  { value: "jacket", label: "Jacket", points: 20 },
  { value: "tshirt", label: "T-Shirt", points: 10 },
  { value: "shirt", label: "Shirt", points: 12 },
  { value: "jeans", label: "Jeans", points: 15 },
  { value: "sweater", label: "Sweater", points: 15 },
  { value: "skirt", label: "Skirt", points: 12 },
  { value: "shorts", label: "Shorts", points: 10 },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function Donate() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "datetime" | "confirmation">("form");
  const [clothingType, setClothingType] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const selectedClothing = clothingTypes.find((item) => item.value === clothingType);
  const pointsEarned = selectedClothing?.points || 0;

  const handleDonateClick = () => {
    if (clothingType) {
      setStep("datetime");
    }
  };

  const handleConfirm = () => {
    if (date && time) {
      setStep("confirmation");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {step === "form" && (
            <div className="bg-card rounded-2xl p-8 shadow-elegant animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">Donate Your Clothes</h1>
                <p className="text-muted-foreground">
                  Make a difference while earning ReWear Points
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    What are you donating?
                  </label>
                  <Select value={clothingType} onValueChange={setClothingType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select clothing type" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label} - {item.points} points
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {clothingType && (
                  <div className="bg-primary/5 rounded-lg p-4 flex items-center gap-3 animate-scale-in">
                    <Gift className="w-5 h-5 text-primary shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        You'll earn {pointsEarned} ReWear Points
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Points will be added once you hand over your clothes
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleDonateClick}
                  disabled={!clothingType}
                  className="w-full"
                  size="lg"
                >
                  Continue to Schedule
                </Button>
              </div>
            </div>
          )}

          {step === "datetime" && (
            <div className="bg-card rounded-2xl p-8 shadow-elegant animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Schedule Drop-off
                </h2>
                <p className="text-muted-foreground">
                  When would you like to drop off your {selectedClothing?.label.toLowerCase()}?
                </p>
              </div>

              <div className="space-y-6">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    Drop-off Date
                  </label>
                  <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => { setDate(d); setIsDatePopoverOpen(false); }}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0 || date.getDay() === 6
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Drop-off Time
                  </label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Info */}
                <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Drop-off Location</p>
                    <p className="text-muted-foreground">Shop 21, University Campus</p>
                    <p className="text-muted-foreground text-xs mt-1">Ground Floor, Main Building</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("form")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!date || !time}
                    className="flex-1"
                  >
                    Confirm Drop-off
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="bg-card rounded-2xl p-8 shadow-elegant animate-scale-in text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Congratulations!
              </h2>
              
              <div className="bg-gradient-card rounded-2xl p-6 mb-6 shadow-soft">
                <p className="text-5xl font-bold text-primary mb-2">
                  {pointsEarned} Points
                </p>
                <p className="text-muted-foreground text-sm">
                  will be added to your wallet
                </p>
              </div>

              <p className="text-foreground mb-6">
                Your points will be updated once you hand over your clothes at the collection point.
              </p>

              <div className="bg-muted rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Drop-off Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="font-medium">
                      {date && format(date, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Shop 21, University Campus</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                We'll send you a reminder before your drop-off time.
              </p>

              <Button onClick={handleBackToHome} size="lg" className="w-full">
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
