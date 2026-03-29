import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Printer, ArrowLeft } from "lucide-react";

interface BookingData {
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
  rooms: { name: string; slug: string; price: number } | null;
}

const Invoice = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*, rooms(name, slug, price)")
        .eq("id", id)
        .single();
      setBooking(data as unknown as BookingData);
      setLoading(false);
    };
    fetch();
  }, [user, id]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-foreground mb-2">Invoice not found</p>
          <Link to="/dashboard" className="text-primary hover:underline text-sm">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);
  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000));
  const roomPrice = booking.rooms?.price || booking.total_price / nights;
  const subtotal = roomPrice * nights;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  return (
    <>
      <Helmet>
        <title>Invoice #{booking.id.slice(0, 8).toUpperCase()} — Hotel Mayur</title>
      </Helmet>

      <div className="pt-20 pb-12 min-h-screen bg-background">
        {/* Print/Back controls - hidden when printing */}
        <div className="container mx-auto px-4 mb-6 print:hidden">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <Link to="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
          </div>
        </div>

        {/* Invoice */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 md:p-12 print:border-0 print:shadow-none print:rounded-none print:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-6 border-b border-border">
              <div>
                <h1 className="font-heading text-3xl font-bold text-gold-gradient">Hotel Mayur</h1>
                <p className="text-xs text-muted-foreground mt-1">Aceotel Select · Client ID: HMRJN</p>
                <p className="text-xs text-muted-foreground">Near Railway Station, Rajnandgaon, CG 491441</p>
                <p className="text-xs text-muted-foreground">Phone: +91 97528-95362</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <h2 className="font-heading text-xl font-semibold text-foreground">INVOICE</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  #{booking.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Date: {format(new Date(booking.created_at), "dd MMM yyyy")}
                </p>
                <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                  booking.status === "completed" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Guest Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bill To</h3>
                <p className="text-sm font-semibold text-foreground">{booking.guest_name}</p>
                {booking.guest_email && <p className="text-xs text-muted-foreground">{booking.guest_email}</p>}
                {booking.guest_phone && <p className="text-xs text-muted-foreground">{booking.guest_phone}</p>}
              </div>
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Stay Details</h3>
                <p className="text-sm text-foreground">
                  {format(checkIn, "dd MMM yyyy")} → {format(checkOut, "dd MMM yyyy")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {nights} Night{nights > 1 ? "s" : ""} · {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="border border-border rounded-lg overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Description</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Nights</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Rate</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium">{booking.rooms?.name || "Room"}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{nights}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">₹{roomPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-foreground font-medium">₹{subtotal.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-foreground font-semibold">
                  <span>Grand Total</span>
                  <span className="font-heading text-lg text-primary">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                Thank you for choosing Hotel Mayur. We look forward to welcoming you!
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                This is a computer-generated invoice. No signature required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
