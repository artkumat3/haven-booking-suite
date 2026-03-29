import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hotelFAQs } from "@/data/rooms";

interface Message {
  role: "user" | "bot";
  text: string;
}

const findAnswer = (query: string): string => {
  const q = query.toLowerCase();
  for (const faq of hotelFAQs) {
    const keywords = faq.q.toLowerCase().split(" ").filter((w) => w.length > 3);
    const matches = keywords.filter((k) => q.includes(k));
    if (matches.length >= 2) return faq.a;
  }

  if (q.includes("check-in") || q.includes("checkin")) return hotelFAQs[0].a;
  if (q.includes("check-out") || q.includes("checkout")) return hotelFAQs[0].a;
  if (q.includes("location") || q.includes("address") || q.includes("where")) return hotelFAQs[1].a;
  if (q.includes("couple")) return hotelFAQs[2].a;
  if (q.includes("id") || q.includes("proof") || q.includes("aadhaar")) return hotelFAQs[3].a;
  if (q.includes("pet") || q.includes("dog") || q.includes("cat")) return hotelFAQs[4].a;
  if (q.includes("food") || q.includes("outside")) return hotelFAQs[5].a;
  if (q.includes("parking") || q.includes("car")) return hotelFAQs[6].a;
  if (q.includes("age")) return hotelFAQs[7].a;
  if (q.includes("restaurant") || q.includes("dining")) return hotelFAQs[8].a;
  if (q.includes("cancel")) return hotelFAQs[9].a;
  if (q.includes("contact") || q.includes("phone") || q.includes("call")) return hotelFAQs[10].a;
  if (q.includes("price") || q.includes("rate") || q.includes("cost")) {
    return "Our rooms start from ₹2,499/night (Standard) up to ₹5,058/night (Suite King Bed). Visit our Rooms page for detailed pricing and current offers!";
  }
  if (q.includes("book") || q.includes("reserve")) {
    return "You can book directly through our website using the booking bar, or call us at +91 97528-95362 for assistance.";
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Namaste! 🙏 Welcome to Hotel Mayur. How can I assist you today? I can help with room information, pricing, amenities, or policies.";
  }

  return "Thank you for your query! For detailed assistance, please call us at +91 97528-95362 or explore our room pages. I can help with check-in/out times, policies, amenities, pricing, and location info.";
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Namaste! 🙏 Welcome to Hotel Mayur AI Concierge. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: findAnswer(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gold-gradient p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity ${open ? "hidden" : ""}`}
        aria-label="Open AI Concierge"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded shadow-2xl flex flex-col overflow-hidden"
            style={{ height: 460 }}
          >
            {/* Header */}
            <div className="bg-gold-gradient px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-semibold text-primary-foreground">AI Concierge</h3>
                <p className="text-[10px] text-primary-foreground/70">Hotel Mayur • Online</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] text-sm px-3 py-2 rounded ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about rooms, policies..."
                className="flex-1 bg-background text-sm text-foreground rounded px-3 py-2 outline-none placeholder:text-muted-foreground font-body"
              />
              <button onClick={handleSend} className="bg-primary text-primary-foreground p-2 rounded hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
