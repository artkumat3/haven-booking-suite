import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { rooms } from "@/data/rooms";
import { useAuth } from "@/contexts/AuthContext";
import BookingModal from "@/components/BookingModal";
import { motion } from "framer-motion";
import { Check, Users, Maximize2, Eye, BedDouble, ArrowLeft } from "lucide-react";

import roomStandard from "@/assets/room-standard.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomSuite from "@/assets/room-suite.jpg";

const roomImages: Record<string, string> = {
  standard: roomStandard,
  deluxe: roomDeluxe,
  executive: roomExecutive,
  suite: roomSuite,
};

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = rooms.find((r) => r.slug === slug);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">Room Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{room.name} — Hotel Mayur Rajnandgaon | ₹{room.price.toLocaleString()}/night</title>
        <meta name="description" content={room.description} />
      </Helmet>

      <div className="pt-16">
        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={roomImages[room.id]}
            alt={room.name}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
            <Link to="/rooms" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Rooms
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{room.name}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              <p className="text-muted-foreground leading-relaxed">{room.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Maximize2, label: room.size },
                  { icon: Users, label: `Max ${room.maxGuests} Guests` },
                  { icon: BedDouble, label: room.bedType },
                  { icon: Eye, label: room.view },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-xs text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Booking card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24"
            >
              <div className="mb-4">
                <span className="text-sm text-muted-foreground line-through">₹{room.originalPrice.toLocaleString()}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-bold text-primary">₹{room.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/ night</span>
                </div>
                <span className="text-xs text-muted-foreground">+ taxes & fees</span>
              </div>

              <div className="space-y-2 mb-6">
                {room.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {h}
                  </div>
                ))}
              </div>

              <button
                onClick={handleBookNow}
                className="block w-full bg-gold-gradient text-center text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm tracking-wide"
              >
                BOOK NOW
              </button>

              {!user && (
                <p className="text-[11px] text-muted-foreground text-center mt-3">
                  Sign in required to book
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        room={{
          id: room.id,
          name: room.name,
          price: room.price,
          maxGuests: room.maxGuests,
          slug: room.slug,
        }}
      />
    </>
  );
};

export default RoomDetail;
