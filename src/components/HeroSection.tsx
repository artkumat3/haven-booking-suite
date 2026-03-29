import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImg}
        alt="Hotel Mayur luxury lobby"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-gold-gradient">
            Hotel Mayur
          </h1>

          <p className="font-heading text-lg md:text-xl text-foreground/80 italic mb-6">
            Aceotel Select — Where Elegance Meets Comfort
          </p>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Near Railway Station, Rajnandgaon, Chhattisgarh 491441</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-surface-elevated/80 backdrop-blur px-4 py-2 rounded">
              <span className="text-2xl font-heading font-bold text-primary">3.1</span>
              <div className="text-left">
                <p className="text-xs text-foreground font-semibold">Good</p>
                <p className="text-[10px] text-muted-foreground">35 Ratings</p>
              </div>
            </div>
            <div className="bg-surface-elevated/80 backdrop-blur px-4 py-2 rounded text-sm text-muted-foreground">
              4 min walk to Railway Station
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
