
-- Create roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC NOT NULL,
  description TEXT,
  short_description TEXT,
  size TEXT,
  max_guests INT NOT NULL DEFAULT 2,
  bed_type TEXT,
  view_type TEXT,
  amenities TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  total_inventory INT NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed', 'pending')),
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Rooms policies (public read, admin write)
CREATE POLICY "Anyone can view active rooms" ON public.rooms
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage rooms" ON public.rooms
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage bookings" ON public.bookings
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed room data
INSERT INTO public.rooms (slug, name, category, price, original_price, description, short_description, size, max_guests, bed_type, view_type, amenities, highlights, total_inventory) VALUES
('standard', 'Standard Room', 'Standard', 2499, 3499, 'A comfortable retreat designed for the discerning traveller. Our Standard Room offers a serene ambiance with modern amenities, plush bedding, and a curated selection of in-room comforts.', 'Comfort meets elegance in our thoughtfully designed standard room.', '220 sq.ft (20 sq.mt)', 2, 'Queen Bed', 'City View', ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mineral Water','24-hour Housekeeping','In-room Dining','Bathroom with Hot Water','Wardrobe'], ARRAY['Free Cancellation','Complimentary Breakfast'], 5),
('deluxe', 'Deluxe Room', 'Deluxe', 3499, 4999, 'Elevate your stay in our spacious Deluxe Room. Featuring a generous sitting area, premium furnishings, and enhanced amenities.', 'Spacious luxury with premium amenities and a dedicated sitting area.', '280 sq.ft (26 sq.mt)', 2, 'King Bed', 'City View', ARRAY['Free Wi-Fi','Air Conditioning','Flat-screen TV','Mini Bar','Tea/Coffee Maker','Mineral Water','24-hour Housekeeping','In-room Dining','Premium Bathroom','Sitting Area','Wardrobe','Work Desk'], ARRAY['Free Cancellation','Complimentary Breakfast','Late Checkout'], 4),
('executive', 'Executive Room', 'Executive', 4499, 5999, 'Designed for the business traveller, the Executive Room features a dedicated workspace, panoramic views, and premium amenities.', 'Premium workspace and panoramic views for the business traveller.', '320 sq.ft (30 sq.mt)', 3, 'King Bed', 'Panoramic View', ARRAY['Free Wi-Fi','Air Conditioning','55" Smart TV','Mini Bar','Espresso Machine','Mineral Water','24-hour Housekeeping','In-room Dining','Premium Bathroom','Executive Desk','Lounge Chair','Bathrobe & Slippers','Iron & Board'], ARRAY['Free Cancellation','Complimentary Breakfast','Late Checkout','Airport Transfer'], 3),
('suite', 'Suite King Bed Room', 'Suite', 5058, 6999, 'The crown jewel of Hotel Mayur. Our Suite offers 336 sq.ft of pure luxury with a separate living area and curated amenities.', 'The pinnacle of luxury — expansive living with a king bed and premium amenities.', '336 sq.ft (31 sq.mt)', 3, '1 King Bed', 'City View', ARRAY['Free Wi-Fi','Air Conditioning','55" Smart TV','Mini Bar','Espresso Machine','Mineral Water','24-hour Housekeeping','In-room Dining','Premium Bathroom','Living Area','Dining Area','Bathrobe & Slippers','Smoking Room','Interconnected Room'], ARRAY['Free Cancellation','Complimentary Breakfast','Late Checkout','Airport Transfer','Welcome Drinks'], 2);
