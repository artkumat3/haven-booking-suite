import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, IndianRupee } from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: {
    id: string;
    name: string;
    price: number;
    maxGuests: number;
    slug: string;
  };
  roomDbId?: string;
}

const BookingModal = ({ open, onOpenChange, room, roomDbId }: BookingModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);

  const [checkIn, setCheckIn] = useState(format(tomorrow, "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(dayAfter, "yyyy-MM-dd"));
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [guestPhone, setGuestPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const nights = Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn)));
  const subtotal = nights > 0 ? nights * room.price : room.price;
  const tax = Math.round(subtotal * 0.18);
  const totalPrice = subtotal + tax;

  const handleBook = async () => {
    if (!user) {
      toast({ title: "Please sign in to book", variant: "destructive" });
      navigate("/login");
      return;
    }

    if (!guestName.trim()) {
      toast({ title: "Please enter guest name", variant: "destructive" });
      return;
    }

    if (nights <= 0) {
      toast({ title: "Check-out must be after check-in", variant: "destructive" });
      return;
    }

    setLoading(true);

    let dbRoomId = roomDbId;
    if (!dbRoomId) {
      const { data: roomData } = await supabase
        .from("rooms")
        .select("id")
        .eq("slug", room.slug)
        .single();
      dbRoomId = roomData?.id;
    }

    if (!dbRoomId) {
      toast({ title: "Room not found in database", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      room_id: dbRoomId,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      total_price: subtotal,
      guest_name: guestName.trim(),
      guest_email: guestEmail.trim() || null,
      guest_phone: guestPhone.trim() || null,
      status: "confirmed",
    }).select("id").single();

    setLoading(false);

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking Confirmed! 🎉", description: `${room.name} for ${nights} night${nights > 1 ? "s" : ""}` });
      onOpenChange(false);
      if (data?.id) {
        navigate(`/invoice/${data.id}`);
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-gold-gradient">
            Book {room.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Dates - using native inputs to avoid Popover ref issues */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Check-in</Label>
              <Input
                type="date"
                value={checkIn}
                min={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd"));
                  }
                }}
                className="bg-muted border-border"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Check-out</Label>
              <Input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <Label className="text-xs text-muted-foreground">Guests</Label>
            <div className="flex items-center gap-3 mt-1">
              <Users className="w-4 h-4 text-primary" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none border border-border"
              >
                {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest details */}
          <div>
            <Label className="text-xs text-muted-foreground">Guest Name *</Label>
            <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Full name" className="bg-muted border-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="email@example.com" type="email" className="bg-muted border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <Input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="+91 98765 43210" className="bg-muted border-border" />
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-muted rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{room.price.toLocaleString()} × {nights > 0 ? nights : 1} night{nights > 1 ? "s" : ""}</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="flex items-center gap-1 text-primary font-heading text-lg">
                <IndianRupee className="w-4 h-4" />
                {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            onClick={handleBook}
            disabled={loading}
            className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 font-semibold py-3"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
