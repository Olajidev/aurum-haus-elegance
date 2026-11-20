import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20 sm:mt-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 py-14 sm:py-20 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl sm:text-3xl italic mb-3 sm:mb-4">Stay in the Haus.</h3>
          <p className="text-primary-foreground/70 max-w-md mb-6 font-light text-xs sm:text-sm leading-relaxed">
            A little luxury, delivered to your inbox. Be the first to know about new edits, private releases, and stories from the Haus.
          </p>
          <form className="flex border-b border-primary-foreground/30 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent py-3 outline-none placeholder:text-primary-foreground/40 text-base sm:text-sm"
            />
            <button className="eyebrow hover:text-accent transition uppercase tracking-wider text-xs shrink-0 pl-2">Join the Haus →</button>
          </form>
        </div>

        <div className="space-y-2.5 sm:space-y-3 eyebrow">
          <h4 className="eyebrow text-accent mb-3 sm:mb-4 text-xs">Haus</h4>
          <Link to="/story" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light text-sm">Our story</Link>
          <Link to="/shop" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light text-sm">Collection</Link>
          <Link to="/craftsmanship" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light text-sm">Craftsmanship</Link>
        </div>

        <div className="space-y-2.5 sm:space-y-3 eyebrow">
          <h4 className="eyebrow text-accent mb-3 sm:mb-4 text-xs">Service</h4>
          <Link to="/shipping-returns" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light text-sm">Shipping & returns</Link>
          <Link to="/contact" className="block text-primary-foreground/80 hover:text-primary-foreground normal-case tracking-normal font-light text-sm">Contact</Link>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60 text-center md:text-left">
          <span>© 2026 Aurum Haus®. Elevated tools for modern living.</span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 eyebrow">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
