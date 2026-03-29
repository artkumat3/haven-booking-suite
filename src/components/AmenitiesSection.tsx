import { motion } from "framer-motion";
import { Utensils, Car, Cigarette, Clock, Wifi, ConciergeBell, ShieldCheck, Umbrella } from "lucide-react";

const amenities = [
  { icon: Utensils, label: "Punkh Restaurant", desc: "Pure Veg Family Dining" },
  { icon: Car, label: "Free Parking", desc: "On-site parking available" },
  { icon: Cigarette, label: "Smoking Rooms", desc: "Designated smoking rooms" },
  { icon: Clock, label: "24hr Housekeeping", desc: "Round-the-clock service" },
  { icon: Wifi, label: "Free Wi-Fi", desc: "High-speed internet" },
  { icon: ConciergeBell, label: "Room Service", desc: "In-room dining available" },
  { icon: ShieldCheck, label: "Security", desc: "24/7 security on premises" },
  { icon: Umbrella, label: "Umbrellas", desc: "Complimentary for guests" },
];

const AmenitiesSection = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-3">Amenities</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Every detail curated for your comfort and convenience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all text-center"
            >
              <a.icon className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-foreground font-body">{a.label}</span>
              <span className="text-[11px] text-muted-foreground">{a.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
