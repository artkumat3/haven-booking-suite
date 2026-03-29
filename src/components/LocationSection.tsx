import { MapPin, Train, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";

const LocationSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-3">Location</h2>
          <p className="text-muted-foreground text-sm">Perfectly positioned near Rajnandgaon Railway Station</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left column: Info + Map */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Hotel Mayur, Near Railway Station, Rajnandgaon, Chhattisgarh 491441
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { name: "Raj Nandgaon Railway Station", distance: "4 min walk" },
                  { name: "Jatkanhar Railway Station", distance: "37.2 km" },
                ].map((point) => (
                  <div key={point.name} className="flex items-center gap-3 text-sm">
                    <Train className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{point.name}</span>
                    <span className="text-muted-foreground ml-auto">{point.distance}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+919752895362" className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
                <Phone className="w-4 h-4" /> Call: +91 97528-95362
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-border h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.847!2d81.0289!3d21.0969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2880dacd3d5c5f%3A0x1234567890abcdef!2sHotel%20Mayur%2C%20Near%20Railway%20Station%2C%20Rajnandgaon%2C%20Chhattisgarh%20491441!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Mayur Location"
              />
            </div>
          </div>

          {/* Right column: Rules */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Property Rules
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Check-in: <span className="text-foreground font-medium">12:00 PM</span> — Check-out: <span className="text-foreground font-medium">10:00 AM</span></li>
              <li>• Unmarried couples allowed, local IDs accepted</li>
              <li>• Primary guest must be 18+ years</li>
              <li>• Groups with only male guests are allowed</li>
              <li>• Accepted IDs: Passport, Aadhaar, Govt. ID, Driving License</li>
              <li>• Pets and outside food not allowed</li>
              <li>• <span className="text-primary font-medium">Punkh Restaurant</span> — Pure Veg Family Dining on premises</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
