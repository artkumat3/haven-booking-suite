import { motion } from "framer-motion";
import { Utensils, Car, CigaretteOff, Clock, Wifi, ConciergeBell, ShieldCheck, Umbrella } from "lucide-react";

const amenities = [
  { icon: Utensils, label: "Restaurant" },
  { icon: Car, label: "Free Parking" },
  { icon: CigaretteOff, label: "Smoking Rooms" },
  { icon: Clock, label: "24hr Housekeeping" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: ConciergeBell, label: "Room Service" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Umbrella, label: "Umbrellas" },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 bg-card border border-border rounded p-6 hover:border-gold transition-colors"
            >
              <a.icon className="w-6 h-6 text-primary" />
              <span className="text-sm text-foreground font-body">{a.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
