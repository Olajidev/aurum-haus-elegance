import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { PreOrderSection } from "@/components/PreOrderSection";
import { FAQSection } from "@/components/FAQSection";
import { ConciergeChat } from "@/components/ConciergeChat";
import { HeroDissolve } from "@/components/HeroDissolve";
import { AurumJournalCarousel } from "@/components/AurumJournalCarousel";
import { solPrimary, auraPrimary, noirPrimary, onyxPrimary } from "@/lib/products";

import heroSunlitCafe from "@/assets/hero-sunlit-cafe.png";
import new45Image from "@/assets/new-45.jpg";
import packagingImg from "@/assets/aurum-packaging.jpg.asset.json";
import slideBagRestaurant from "@/assets/slideshow-bag-restaurant.png.asset.json";
import ah1Hero from "@/assets/AH1.jpeg";
import rooftopToast from "@/assets/rooftop-toast.png";
import aurumHoldersMarble from "@/assets/aurum-holders-marble.png";
import elegantCafeDrinks from "@/assets/elegant-cafe-drinks.png";
import luxuryMarbleTabletop from "@/assets/luxury-marble-tabletop.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Haus — Elevated Tools for Modern Living" },
      {
        name: "description",
        content:
          "Quiet luxury, redefined. Discover the Aurum Haus signature bag holder — hand-finished in alabaster, obsidian and antique gold.",
      },
      { property: "og:title", content: "Aurum Haus — Elevated Tools for Modern Living" },
      {
        property: "og:description",
        content:
          "Quiet luxury, redefined. Discover the Aurum Haus signature bag holder — hand-finished in alabaster, obsidian and antique gold.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <Marquee />

      {/* 1. HERO — SUNLIT CAFE LUXURY HERO (WITH SMOOTH DISSOLVE TO MARBLE TABLETOP) */}
      <HeroDissolve
        slides={[
          {
            image: heroSunlitCafe,
            alt: "Quiet luxury held effortlessly — Aurum Haus signature bag holder",
            eyebrow: "SIGNATURE COLLECTION",
            title: (
              <>
                Quiet luxury,
                <br />
                <em className="italic font-light">held effortlessly.</em>
              </>
            ),
            body: "A jewel for the table. The Aurum Haus bag holder transforms a daily ritual into a refined gesture.",
            primary: { to: "/shop", label: "DISCOVER THE COLLECTION" },
            secondary: { to: "/story", label: "OUR STORY" },
          },
          {
            image: luxuryMarbleTabletop,
            alt: "Luxury Marble Tabletop with Handbag Hook",
            eyebrow: "SIGNATURE COLLECTION",
            title: (
              <>
                Quiet luxury,
                <br />
                <em className="italic font-light">held effortlessly.</em>
              </>
            ),
            body: "A jewel for the table. The Aurum Haus bag holder transforms a daily ritual into a refined gesture.",
            primary: { to: "/shop", label: "DISCOVER THE COLLECTION" },
            secondary: { to: "/story", label: "OUR STORY" },
          },
        ]}
      />

      {/* 2. THE COLLECTION GRID — FOUR PIECES: 2 UP, 2 DOWN (NO STARS, NO REVIEWS, NO BADGES) */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-accent mb-3">Maison Aurum · Edit n°1</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl leading-tight">
              Four pieces. <em className="italic font-light">One quiet obsession.</em>
            </h2>
            <p className="text-sm text-muted-foreground font-light mt-2 max-w-md">
              Tested to support 10kg on marble, glass, and wood. Weighted solid brass with nano-grip protection.
            </p>
          </div>
          <Link
            to="/shop"
            className="eyebrow text-foreground/75 hover:text-foreground border-b border-foreground/30 pb-1 text-xs"
          >
            View all finishes →
          </Link>
        </div>

        {/* 4 BIG CARDS GRID: 2 UP, 2 DOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto">
          <ProductCard
            slug="aurum-gold"
            image={solPrimary}
            name="Aurum Haus Sol"
            finish="Yellow"
            price="£70"
            compareAtPrice="£95"
          />
          <ProductCard
            slug="aurum"
            image={auraPrimary}
            name="Aurum Haus Aura"
            finish="White"
            price="£70"
            compareAtPrice="£95"
          />
          <ProductCard
            slug="aurum-noir"
            image={noirPrimary}
            name="Aurum Haus Noir"
            finish="Black"
            price="£70"
            compareAtPrice="£95"
          />
          <ProductCard
            slug="ivora"
            image={onyxPrimary}
            name="Aurum Haus Onyx"
            finish="Black & Gold"
            price="£70"
            compareAtPrice="£95"
          />
        </div>
      </section>

      {/* 3. CLEAN 3-IMAGE ATELIER GALLERY (HIDDEN AS REQUESTED) */}

      {/* 4. THREE PILLARS (EXACT FROM LOVABLE DEPLOYMENT: I, II, III) */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-24 lg:py-32 grid md:grid-cols-3 gap-12 text-center">
        {[
          { k: "I", t: "Hand-finished", d: "Each piece polished by a single artisan from start to closure." },
          { k: "II", t: "Solid brass core", d: "113g of weighted brass, electroplated in your chosen finish." },
          { k: "III", t: "Complimentary shipping", d: "Express worldwide delivery, duties prepaid to most destinations." },
        ].map((p) => (
          <div key={p.k}>
            <span className="font-display italic text-accent text-2xl">{p.k}</span>
            <h3 className="font-display text-2xl mt-4 mb-3">{p.t}</h3>
            <p className="text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">{p.d}</p>
          </div>
        ))}
      </section>

      {/* 5. THE UNBOXING (COMPACT LOVABLE VERSION ON GREEN BG-PRIMARY BACKGROUND) */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1500px] grid lg:grid-cols-2">
          <div className="px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center order-2 lg:order-1">
            <p className="eyebrow text-accent mb-6">The unboxing</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
              Arrives as a gift<br />
              <em className="italic font-light">to yourself.</em>
            </h2>
            <p className="text-primary-foreground/80 font-light leading-relaxed mb-4 max-w-lg">
              Every Aurum Haus piece is presented in a hand-finished rigid box — lined in cream suede, sealed with a gold-foil crest, and wrapped in tissue bearing our signature monogram.
            </p>
            <p className="text-primary-foreground/80 font-light leading-relaxed max-w-lg">
              The packaging is designed to be kept. A small luxury, from the moment it reaches your hands.
            </p>
            <Link
              to="/shop"
              className="mt-10 eyebrow text-accent hover:text-alabaster border-b border-accent/40 pb-1 self-start"
            >
              Explore the collection →
            </Link>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[700px] order-1 lg:order-2">
            <img
              src={packagingImg.url}
              alt="Aurum Haus luxury packaging — hand-finished rigid box with gold-foil crest"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. LIFESTYLE SECTION WITH NEW "NEW 45" IMAGE */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <img
            src={new45Image}
            alt="Aurum Haus Signature Luxury Bag Hook in lifestyle dining setting"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/30 to-transparent" />
          <div className="relative h-full mx-auto max-w-[1500px] px-6 lg:px-12 flex flex-col justify-end pb-12 sm:pb-16 text-alabaster">
            <div>
              <Link
                to="/shop"
                className="inline-block eyebrow text-accent hover:text-alabaster border-b border-accent/40 pb-1 text-xs tracking-widest uppercase transition-colors"
              >
                Shop the collection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE AURUM JOURNAL SLIDESHOW CAROUSEL (EXACT FROM LOVABLE DEPLOYMENT) */}
      <AurumJournalCarousel />

      {/* 8. PRE-ORDER COUNTDOWN */}
      <PreOrderSection />

      {/* 9. FAQ & FOOTER */}
      <FAQSection />
      <SiteFooter />
      <ConciergeChat />
    </div>
  );
}
