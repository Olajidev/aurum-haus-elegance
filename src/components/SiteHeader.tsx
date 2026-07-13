import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag } from "lucide-react";

const links = [
  { to: "/", label: "Maison" },
  { to: "/shop", label: "Collection" },
  { to: "/pre-order", label: "Pre-Order" },
  { to: "/story", label: "Story" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="hairline" />
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8 flex-1 eyebrow">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="flex-shrink-0 mx-auto md:mx-0">
          <span className="font-display text-2xl tracking-[0.25em] text-foreground">
            AURUM&nbsp;HAUS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-end eyebrow">
          {links.slice(2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-5 pl-4">
            <button aria-label="Search" className="hover:text-accent transition"><Search className="h-4 w-4" /></button>
            <button aria-label="Account" className="hover:text-accent transition"><User className="h-4 w-4" /></button>
            <button aria-label="Bag" className="hover:text-accent transition relative">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 text-[10px] tracking-normal">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
