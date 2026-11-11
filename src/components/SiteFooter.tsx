import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl italic mb-4">Stay in the Haus.</h3>
          <p className="text-primary-foreground/70 max-w-md mb-6 font-light">
            Private previews, atelier notes, and quiet invitations. Delivered with intention.
          </p>
          <form className="flex border-b border-primary-foreground/30 max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent py-3 outline-none placeholder:text-primary-foreground/40 text-sm"
            />
            <button className="eyebrow hover:text-accent transition">Subscribe →</button>
          </form>
        </div>

        <div className="space-y-3 eyebrow">
          <h4 className="eyebrow text-accent mb-4">Maison</h4>
          <Link to="/story" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Our story</Link>
          <Link to="/shop" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Collection</Link>
          <Link to="/craftsmanship" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Craftsmanship</Link>
          <Link to="/press" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Press</Link>
        </div>

        <div className="space-y-3 eyebrow">
          <h4 className="eyebrow text-accent mb-4">Service</h4>
          <Link to="/shipping-returns" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Shipping & returns</Link>
          <Link to="/contact" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light">Contact</Link>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Aurum Haus®. Elevated tools for modern living.</span>
          <div className="flex gap-6 eyebrow">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Cookies</a>
            <Link to="/admin" className="text-accent/80 hover:text-accent font-medium">Atelier Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
