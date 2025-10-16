import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartCount: number;
  onConfirm: () => void;
}

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

export const CheckoutDialog = ({ open, onOpenChange, cartCount, onConfirm }: CheckoutDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      onConfirm();
      onOpenChange(false);
      setIsConfirmed(false);
      setDate(undefined);
      setTime(undefined);
    }, 3000);
  };

  const canConfirm = date && time;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {!isConfirmed ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Schedule Your Pickup</DialogTitle>
              <DialogDescription>
                You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart. Choose when you'd like to pick them up.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Pickup Date
                </label>
                <Popover>
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
                      onSelect={setDate}
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
                  Pickup Time
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
                  <p className="font-medium text-foreground mb-1">Pickup Location</p>
                  <p className="text-muted-foreground">Shop 21, University Campus</p>
                  <p className="text-muted-foreground text-xs mt-1">Ground Floor, Main Building</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="flex-1"
              >
                Confirm Pickup
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center animate-scale-in">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your order is placed. Please pick up at:
            </p>
            <div className="bg-gradient-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <CalendarIcon className="w-5 h-5" />
                <span className="text-lg font-bold">
                  {date && format(date, "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-bold">{time}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                <span>Shop 21, University Campus</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We'll send you a reminder email before your pickup time.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
