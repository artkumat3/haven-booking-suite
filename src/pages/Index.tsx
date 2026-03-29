import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import BookingBar from "@/components/BookingBar";
import RoomCard from "@/components/RoomCard";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import LocationSection from "@/components/LocationSection";
import SpecialOffers from "@/components/SpecialOffers";
import { rooms } from "@/data/rooms";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hotel Mayur Rajnandgaon — Premium Stay Near Railway Station</title>
        <meta name="description" content="Book your stay at Hotel Mayur (Aceotel Select), Rajnandgaon. 4 min from Railway Station. Luxury rooms from ₹2,499/night. Punkh Pure Veg Restaurant on premises." />
      </Helmet>

      <HeroSection />
      <BookingBar />

      {/* Rooms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gold-gradient mb-3">Our Rooms</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Four exquisite categories designed for every kind of traveller
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SpecialOffers />
      <GallerySection />
      <AmenitiesSection />
      <LocationSection />
    </>
  );
};

export default Index;
