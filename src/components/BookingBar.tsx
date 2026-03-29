import { useState } from "react";
import { CalendarDays, Users, BedDouble } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roomCategories = ["Standard", "Deluxe", "Executive", "Suite"];

const BookingBar = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [category, setCategory] = useState("Suite");
  const [guests, setGuests] = useState("2");

  const handleBook = () => {
    navigate(`/rooms/${category.toLowerCase()}`);
  };

  return (
    <div className="sticky top-16 z-40 bg-surface-elevated/95 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex items-center gap-2 flex-1 bg-background rounded px-3 py-2">
            <CalendarDays className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none font-body"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 bg-background rounded px-3 py-2">
            <CalendarDays className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none font-body"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 bg-background rounded px-3 py-2">
            <BedDouble className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Room</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none font-body"
              >
                {roomCategories.map((c) => (
                  <option key={c} value={c} className="bg-background">{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 bg-background rounded px-3 py-2">
            <Users className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-sm text-foreground outline-none font-body"
              >
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n} className="bg-background">{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="bg-gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-3 rounded tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;
