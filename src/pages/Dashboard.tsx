import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { CalendarDays, Clock, IndianRupee, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  guest_name: string;
  created_at: string;
  rooms: { name: string; slug: string } | null;
}

const Dashboard = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*, rooms(name, slug)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setBookings((data as unknown as Booking[]) || []);
      setFetching(false);
    };
    fetchBookings();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-16 text-muted-foreground">Loading...</div>;
  if (!user) return null;

  const statusColors: Record<string, string> = {
    confirmed: "text-green-400",
    pending: "text-yellow-400",
    cancelled: "text-red-400",
    completed: "text-muted-foreground",
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard — Hotel Mayur</title>
      </Helmet>
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold text-gold-gradient">My Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <Button variant="outline" onClick={() => navigate("/admin")} className="gap-2 border-gold">
                    <Shield className="w-4 h-4" /> Admin
                  </Button>
                )}
                <Button variant="ghost" onClick={() => { signOut(); navigate("/"); }} className="gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </div>
          </motion.div>

          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">My Bookings</h2>

          {fetching ? (
            <p className="text-muted-foreground">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="bg-card border border-border rounded p-8 text-center">
              <p className="text-muted-foreground mb-4">No bookings yet.</p>
              <Link to="/rooms" className="text-primary hover:underline text-sm">Browse Rooms →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {b.rooms?.name || "Room"}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {b.check_in} → {b.check_out}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.guests} guests</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold capitalize ${statusColors[b.status] || "text-foreground"}`}>
                      {b.status}
                    </span>
                    <div className="flex items-center gap-1 text-primary font-heading text-lg font-bold">
                      <IndianRupee className="w-4 h-4" /> {Number(b.total_price).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
