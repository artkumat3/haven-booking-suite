import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-gold-gradient mb-4">Hotel Mayur</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aceotel Select Mayur — Premium hospitality near Rajnandgaon Railway Station. Experience comfort, elegance, and warm Indian hospitality. Home to Punkh Pure Veg Family Restaurant.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Standard", "Deluxe", "Executive", "Suite"].map((r) => (
                <Link key={r} to={`/rooms/${r.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {r} Room
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Near Railway Station, Rajnandgaon, CG 491441
              </div>
              <a href="tel:+919752895362" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +91 97528-95362
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@hotelmayur.in
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hotel Mayur, Rajnandgaon. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
