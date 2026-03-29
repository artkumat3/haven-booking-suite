import { motion } from "framer-motion";
import hotelNight from "@/assets/hotel-night.png";
import hotelFront from "@/assets/hotel-front.png";
import hotelReception from "@/assets/hotel-reception.png";
import hotelCorridor1 from "@/assets/hotel-corridor-1.png";
import hotelCorridor2 from "@/assets/hotel-corridor-2.png";
import hotelWardrobe from "@/assets/hotel-wardrobe.png";

const images = [
  { src: hotelNight, alt: "Hotel Mayur at night" },
  { src: hotelFront, alt: "Hotel Mayur front view" },
  { src: hotelReception, alt: "Hotel Mayur reception desk" },
  { src: hotelCorridor1, alt: "Hotel corridor with designer lights" },
  { src: hotelCorridor2, alt: "Hotel corridor evening view" },
  { src: hotelWardrobe, alt: "Room wardrobe and interiors" },
];

const GallerySection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
            Our Property
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            A glimpse into Hotel Mayur — where tradition meets modern comfort
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
