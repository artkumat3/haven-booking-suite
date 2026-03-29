import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, CalendarDays, IndianRupee, Users, ArrowLeft, Save } from "lucide-react";

interface Room {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  original_price: number;
  total_inventory: number;
  max_guests: number;
  is_active: boolean;
}

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  created_at: string;
  rooms: { name: string } | null;
}

const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchData = async () => {
      const [roomsRes, bookingsRes] = await Promise.all([
        supabase.from("rooms").select("*").order("price"),
        supabase.from("bookings").select("*, rooms(name)").order("created_at", { ascending: false }),
      ]);
      setRooms((roomsRes.data as Room[]) || []);
      setBookings((bookingsRes.data as unknown as Booking[]) || []);
      setFetching(false);
    };
    fetchData();
  }, [isAdmin]);

  const handleSaveRoom = async () => {
    if (!editingRoom) return;
    const { error } = await supabase
      .from("rooms")
      .update({
        price: editingRoom.price,
        original_price: editingRoom.original_price,
        total_inventory: editingRoom.total_inventory,
        is_active: editingRoom.is_active,
      })
      .eq("id", editingRoom.id);

    if (error) {
      toast({ title: "Failed to update room", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Room updated!" });
      setRooms((prev) => prev.map((r) => (r.id === editingRoom.id ? editingRoom : r)));
      setEditingRoom(null);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
      toast({ title: `Booking ${status}` });
    }
  };

  if (loading || fetching) return <div className="min-h-screen flex items-center justify-center pt-16 text-muted-foreground">Loading...</div>;
  if (!isAdmin) return null;

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-900/30 text-green-400",
    pending: "bg-yellow-900/30 text-yellow-400",
    cancelled: "bg-red-900/30 text-red-400",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel — Hotel Mayur</title>
      </Helmet>
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="font-heading text-3xl font-bold text-gold-gradient">Admin Panel</h1>
          </div>

          <Tabs defaultValue="rooms">
            <TabsList className="bg-card border border-border mb-6">
              <TabsTrigger value="rooms" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BedDouble className="w-4 h-4 mr-1" /> Rooms
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CalendarDays className="w-4 h-4 mr-1" /> Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rooms">
              <div className="space-y-4">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading text-lg font-semibold text-foreground">{room.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${room.is_active ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                        {room.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {editingRoom?.id === room.id ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground">Price (₹)</label>
                          <Input
                            type="number"
                            value={editingRoom.price}
                            onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Original Price (₹)</label>
                          <Input
                            type="number"
                            value={editingRoom.original_price}
                            onChange={(e) => setEditingRoom({ ...editingRoom, original_price: Number(e.target.value) })}
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Inventory</label>
                          <Input
                            type="number"
                            value={editingRoom.total_inventory}
                            onChange={(e) => setEditingRoom({ ...editingRoom, total_inventory: Number(e.target.value) })}
                            className="bg-background border-border"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <Button onClick={handleSaveRoom} className="bg-gold-gradient text-primary-foreground gap-1">
                            <Save className="w-4 h-4" /> Save
                          </Button>
                          <Button variant="ghost" onClick={() => setEditingRoom(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> {room.price.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {room.max_guests}</span>
                          <span>Inventory: {room.total_inventory}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditingRoom(room)} className="border-gold text-sm">
                          Edit Pricing
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              {bookings.length === 0 ? (
                <div className="bg-card border border-border rounded p-8 text-center text-muted-foreground">
                  No bookings yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded p-5"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {b.guest_name} — {b.rooms?.name || "Room"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{b.check_in} → {b.check_out}</span>
                            <span>{b.guests} guests</span>
                            {b.guest_email && <span>{b.guest_email}</span>}
                            {b.guest_phone && <span>{b.guest_phone}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded capitalize ${statusColors[b.status] || ""}`}>
                            {b.status}
                          </span>
                          <span className="font-heading font-bold text-primary">₹{Number(b.total_price).toLocaleString()}</span>
                          {b.status === "confirmed" && (
                            <Button size="sm" variant="outline" onClick={() => handleUpdateBookingStatus(b.id, "completed")} className="text-xs border-gold">
                              Complete
                            </Button>
                          )}
                          {b.status !== "cancelled" && (
                            <Button size="sm" variant="ghost" onClick={() => handleUpdateBookingStatus(b.id, "cancelled")} className="text-xs text-destructive">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
