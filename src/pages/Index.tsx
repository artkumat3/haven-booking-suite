import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import BookingBar from "@/components/BookingBar";
import RoomCard from "@/components/RoomCard";
import AmenitiesSection from "@/components/AmenitiesSection";
import LocationSection from "@/components/LocationSection";
import { rooms } from "@/data/rooms";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hotel Mayur Rajnandgaon — Premium Stay Near Railway Station</title>
        <meta name="description" content="Book your stay at Hotel Mayur (Aceotel Select), Rajnandgaon. 4 min from Railway Station. Luxury rooms from ₹2,499/night. Free cancellation & breakfast." />
      </Helmet>

      <HeroSection />
      <BookingBar />

      {/* Rooms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-3">Our Rooms</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Four exquisite categories designed for every kind of traveller
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      <AmenitiesSection />
      <LocationSection />
    </>
  );
};

export default Index;
