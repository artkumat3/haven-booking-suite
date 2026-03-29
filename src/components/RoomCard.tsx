import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Maximize2, Eye } from "lucide-react";
import type { Room } from "@/data/rooms";

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

const RoomCard = ({ room, index }: { room: Room; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <Link
        to={`/rooms/${room.slug}`}
        className="group block bg-card rounded overflow-hidden border border-border hover:border-gold transition-colors glow-gold"
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={roomImages[room.id]}
            alt={room.name}
            loading="lazy"
            width={1280}
            height={720}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded">
            {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}% OFF
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{room.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{room.shortDescription}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {room.maxGuests}</span>
            <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {room.size}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {room.view}</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-muted-foreground line-through">₹{room.originalPrice.toLocaleString()}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-heading font-bold text-primary">₹{room.price.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">/ night</span>
              </div>
            </div>
            <span className="text-xs text-primary font-semibold uppercase tracking-wider group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RoomCard;
