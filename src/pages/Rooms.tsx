import { Helmet } from "react-helmet-async";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/RoomCard";
import BookingBar from "@/components/BookingBar";
import { motion } from "framer-motion";

const Rooms = () => {
  return (
    <>
      <Helmet>
        <title>Rooms & Suites — Hotel Mayur Rajnandgaon</title>
        <meta name="description" content="Explore Standard, Deluxe, Executive, and Suite rooms at Hotel Mayur, Rajnandgaon. Starting from ₹2,499/night with free breakfast." />
      </Helmet>

      <div className="pt-16">
        <BookingBar />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-gold-gradient mb-3">Rooms & Suites</h1>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Choose your perfect retreat at Hotel Mayur
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {rooms.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Rooms;
