export interface Room {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  shortDescription: string;
  size: string;
  maxGuests: number;
  bedType: string;
  view: string;
  amenities: string[];
  highlights: string[];
}

export const rooms: Room[] = [
  {
    id: "standard",
    slug: "standard",
    name: "Standard Room",
    category: "Standard",
    price: 2499,
    originalPrice: 3499,
    description: "A comfortable retreat designed for the discerning traveller. Our Standard Room offers a serene ambiance with modern amenities, plush bedding, and a curated selection of in-room comforts. Just 4 minutes walk from Rajnandgaon Railway Station.",
    shortDescription: "Comfort meets elegance in our thoughtfully designed standard room.",
    size: "220 sq.ft (20 sq.mt)",
    maxGuests: 2,
    bedType: "Queen Bed",
    view: "City View",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mineral Water", "24-hour Housekeeping", "In-room Dining", "Bathroom with Hot Water", "Wardrobe"],
    highlights: ["Free Cancellation", "Complimentary Breakfast"],
  },
  {
    id: "deluxe",
    slug: "deluxe",
    name: "Deluxe Room",
    category: "Deluxe",
    price: 3499,
    originalPrice: 4999,
    description: "Elevate your stay in our spacious Deluxe Room. Featuring a generous sitting area, premium furnishings, and enhanced amenities, this room is perfect for those who desire a little extra comfort and sophistication during their stay at Hotel Mayur.",
    shortDescription: "Spacious luxury with premium amenities and a dedicated sitting area.",
    size: "280 sq.ft (26 sq.mt)",
    maxGuests: 2,
    bedType: "King Bed",
    view: "City View",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Tea/Coffee Maker", "Mineral Water", "24-hour Housekeeping", "In-room Dining", "Premium Bathroom", "Sitting Area", "Wardrobe", "Work Desk"],
    highlights: ["Free Cancellation", "Complimentary Breakfast", "Late Checkout"],
  },
  {
    id: "executive",
    slug: "executive",
    name: "Executive Room",
    category: "Executive",
    price: 4499,
    originalPrice: 5999,
    description: "Designed for the business traveller and discerning guest, the Executive Room features a dedicated workspace, panoramic views, and premium amenities. Enjoy the perfect blend of productivity and relaxation at Hotel Mayur, Rajnandgaon.",
    shortDescription: "Premium workspace and panoramic views for the business traveller.",
    size: "320 sq.ft (30 sq.mt)",
    maxGuests: 3,
    bedType: "King Bed",
    view: "Panoramic View",
    amenities: ["Free Wi-Fi", "Air Conditioning", "55\" Smart TV", "Mini Bar", "Espresso Machine", "Mineral Water", "24-hour Housekeeping", "In-room Dining", "Premium Bathroom", "Executive Desk", "Lounge Chair", "Bathrobe & Slippers", "Iron & Board"],
    highlights: ["Free Cancellation", "Complimentary Breakfast", "Late Checkout", "Airport Transfer"],
  },
  {
    id: "suite",
    slug: "suite",
    name: "Suite King Bed Room",
    category: "Suite",
    price: 5058,
    originalPrice: 6999,
    description: "The crown jewel of Hotel Mayur. Our Suite King Bed Room offers an expansive 336 sq.ft of pure luxury with a separate living area, premium king bed, and curated amenities. Experience the pinnacle of hospitality near Rajnandgaon Railway Station.",
    shortDescription: "The pinnacle of luxury — expansive living with a king bed and premium amenities.",
    size: "336 sq.ft (31 sq.mt)",
    maxGuests: 3,
    bedType: "1 King Bed",
    view: "City View",
    amenities: ["Free Wi-Fi", "Air Conditioning", "55\" Smart TV", "Mini Bar", "Espresso Machine", "Mineral Water", "24-hour Housekeeping", "In-room Dining", "Premium Bathroom", "Living Area", "Dining Area", "Bathrobe & Slippers", "Smoking Room", "Interconnected Room"],
    highlights: ["Free Cancellation", "Complimentary Breakfast", "Late Checkout", "Airport Transfer", "Welcome Drinks"],
  },
];

export const hotelFAQs = [
  { q: "What is the check-in and check-out time?", a: "Check-in is at 12:00 PM and Check-out is at 10:00 AM." },
  { q: "Where is Hotel Mayur located?", a: "Hotel Mayur is located near Railway Station, Rajnandgaon, Chhattisgarh 491441. Just 4 minutes walk from Raj Nandgaon Railway Station." },
  { q: "Are unmarried couples allowed?", a: "Yes, unmarried couples are allowed. Local IDs are accepted." },
  { q: "What ID proofs are accepted?", a: "Passport, Aadhaar, Government ID, and Driving License are accepted." },
  { q: "Are pets allowed?", a: "No, pets are not allowed at the property." },
  { q: "Is outside food allowed?", a: "No, outside food is not allowed. We have an in-house restaurant and room service available." },
  { q: "Is parking available?", a: "Yes, complimentary parking is available for guests." },
  { q: "What is the minimum age for primary guest?", a: "The primary guest must be at least 18 years of age." },
  { q: "Do you have a restaurant?", a: "Yes, we have an in-house restaurant serving delicious Indian and local cuisine." },
  { q: "Is there free cancellation?", a: "Yes, free cancellation is available till check-in time on most room categories." },
  { q: "How do I contact the hotel?", a: "You can reach us at +91 97528-95362 for bookings and inquiries." },
  { q: "Are group bookings allowed?", a: "Yes, groups including all-male groups are welcome at the property." },
];
