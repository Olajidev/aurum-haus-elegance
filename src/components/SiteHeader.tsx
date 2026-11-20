import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

const links = [
  { to: "/", label: "Haus" },
  { to: "/shop", label: "Collection" },
  { to: "/pre-order", label: "Pre-Order" },
  { to: "/story", label: "Story" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="hairline" />
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
          
          {/* MOBILE HAMBURGER BUTTON (VISIBLE ONLY ON MOBILE) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* DESKTOP NAV: LEFT SIDE */}
          <nav className="hidden md:flex items-center gap-8 flex-1 eyebrow">
            {links.slice(0, 2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* BRAND LOGO */}
          <Link to="/" className="flex-shrink-0 text-center">
            <span className="font-display text-xl sm:text-2xl tracking-[0.25em] text-foreground">
              AURUM&nbsp;HAUS
            </span>
          </Link>

          {/* DESKTOP NAV: RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end eyebrow">
            {links.slice(2).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-5 pl-4">
              <button aria-label="Search" className="hover:text-accent transition">
                <Search className="h-4 w-4" />
              </button>
              <button aria-label="Account" className="hover:text-accent transition">
                <User className="h-4 w-4" />
              </button>
              <Link to="/shop" aria-label="Bag" className="hover:text-accent transition relative">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 text-[10px] tracking-normal">0</span>
              </Link>
            </div>
          </div>

          {/* MOBILE BAG ICON (VISIBLE ON MOBILE FOR ACCESSIBILITY) */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/shop"
              aria-label="Bag"
              className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-0 text-[10px] tracking-normal font-medium bg-foreground text-background w-4 h-4 rounded-full flex items-center justify-center scale-90">
                0
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* MOBILE LUXURY SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-background border-r border-border/60 shadow-2xl z-50 flex flex-col justify-between p-6 pt-20 overflow-y-auto animate-in slide-in-from-left duration-300">
            
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-border/40">
              <p className="eyebrow text-accent text-[11px] tracking-widest uppercase">
                Aurum Haus · Edit n°1
              </p>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-foreground/70 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Primary Nav Links with Elegant Serif Styling */}
            <nav className="py-8 space-y-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-display text-2xl sm:text-3xl text-foreground/90 hover:text-accent transition-colors py-1 flex items-center justify-between group"
                  activeProps={{ className: "text-foreground font-semibold" }}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                </Link>
              ))}

              <div className="pt-4 border-t border-border/30 space-y-3">
                <Link
                  to="/shipping-returns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  Complimentary Shipping & Returns
                </Link>
              </div>
            </nav>

            {/* Bottom Drawer Footer */}
            <div className="pt-6 border-t border-border/40 space-y-3 text-xs text-muted-foreground font-light">
              <div className="py-2.5 px-3 bg-secondary/60 border border-border/40 text-[11px] tracking-wider uppercase text-center text-foreground font-medium">
                Complimentary UK Shipping
              </div>
              <p className="text-center text-[10px] text-muted-foreground/80 tracking-wider uppercase pt-1">
                © 2026 Aurum Haus®. Elevated tools for modern living.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
