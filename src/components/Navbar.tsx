import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-semibold text-gold-gradient">Hotel Mayur</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-body tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919752895362" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +91 97528-95362
          </a>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <Link to="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <User className="w-4 h-4" /> Dashboard
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm bg-gold-gradient text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
                  className={`text-sm py-2 transition-colors ${location.pathname === link.path ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="text-sm py-2 text-primary flex items-center gap-1"><Shield className="w-4 h-4" /> Admin</Link>}
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm py-2 text-muted-foreground flex items-center gap-1"><User className="w-4 h-4" /> Dashboard</Link>
                  <button onClick={handleSignOut} className="text-sm py-2 text-muted-foreground text-left flex items-center gap-1"><LogOut className="w-4 h-4" /> Sign Out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm py-2 text-primary font-medium">Sign In</Link>
              )}
              <a href="tel:+919752895362" className="flex items-center gap-2 text-sm text-primary py-2">
                <Phone className="w-4 h-4" /> +91 97528-95362
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
