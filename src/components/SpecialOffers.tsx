import { motion } from "framer-motion";
import { Sparkles, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const offers = [
  {
    title: "Early Bird Discount",
    description: "Book 7+ days in advance and get 15% off on all room categories.",
    icon: Clock,
    badge: "15% OFF",
    link: "/rooms",
  },
  {
    title: "Weekend Getaway",
    description: "Special rates on Fri–Sun stays. Suite starting at ₹4,299/night.",
    icon: Sparkles,
    badge: "WEEKEND",
    link: "/rooms/suite",
  },
  {
    title: "Extended Stay",
    description: "Stay 3+ nights and get complimentary airport transfer & late checkout.",
    icon: Tag,
    badge: "3+ NIGHTS",
    link: "/rooms",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
            Special Offers
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Exclusive deals for an unforgettable stay at Hotel Mayur
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={offer.link}
                className="group block bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <offer.icon className="w-8 h-8 text-primary" />
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {offer.badge}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {offer.description}
                </p>
                <span className="inline-block mt-4 text-xs text-primary font-semibold uppercase tracking-wider group-hover:underline">
                  Book Now →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
