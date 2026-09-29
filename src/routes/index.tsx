import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { PreOrderSection } from "@/components/PreOrderSection";
import { FAQSection } from "@/components/FAQSection";
import { ConciergeChat } from "@/components/ConciergeChat";
import { HeroDissolve } from "@/components/HeroDissolve";

import pieceSaintLaurent from "@/assets/aurum-chrome-piece.jpg.asset.json";
import promenadeChrome from "@/assets/promenade-black.jpeg.asset.json";
import promenadeTrio from "@/assets/promenade-trio.jpeg.asset.json";
import heirloomWarm from "@/assets/heirloom-warm.png.asset.json";
import packagingImg from "@/assets/aurum-packaging.jpg.asset.json";
import cafeLifestyle from "@/assets/cafe-lifestyle.png.asset.json";
import slideBagRestaurant from "@/assets/slideshow-bag-restaurant.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Haus — Elevated Tools for Modern Living" },
      { name: "description", content: "Quiet luxury, redefined. Discover the Aurum Haus signature bag holder — hand-finished in alabaster, obsidian and antique gold." },
      { property: "og:title", content: "Aurum Haus — Elevated Tools for Modern Living" },
      { property: "og:description", content: "Quiet luxury, redefined. Discover the Aurum Haus signature bag holder — hand-finished in alabaster, obsidian and antique gold." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <Marquee />

      {/* HERO — dissolving slideshow */}
      <HeroDissolve
        slides={[
          {
            image: slideBagRestaurant.url,
            alt: "Aurum Haus bag holder in a Japanese restaurant, suspending a monogram bag",
            eyebrow: "A seat at the table",
            title: (
              <>
                Never on the floor.
                <br />
                <em className="italic font-light">Always within reach.</em>
              </>
            ),
            body: "From long lunches in Tokyo to late suppers in Paris — a small brass gesture that keeps what you carry close.",
            primary: { to: "/shop", label: "Shop the ritual" },
            secondary: { to: "/story", label: "The atelier" },
          },
        ]}
      />

      {/* COLLECTION GRID */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-24 lg:py-32">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-accent mb-3">Maison Aurum · Edit n°1</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl leading-tight">
              Three finishes. <em className="italic font-light">One quiet obsession.</em>
            </h2>
          </div>
          <Link to="/shop" className="eyebrow text-foreground/70 hover:text-foreground border-b border-foreground/30 pb-1">
            View all pieces →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <ProductCard slug="ivora" image={promenadeChrome.url} name="Ivora" finish="Polished chrome · ivory inlay" price="£70" />
          <ProductCard slug="noir" image={promenadeTrio.url} name="Noir" finish="Black lacquer · onyx leather" price="£70" />
          <ProductCard slug="aurum" image={pieceSaintLaurent.url} name="Aurum" finish="24k vermeil · antique gold" price="£70" />



        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1500px] grid lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[700px]">
            <img src={heirloomWarm.url} alt="Aurum Haus bag holder at golden hour" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
            <p className="eyebrow text-accent mb-6">A modern heirloom</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
              Designed to disappear<br />
              <em className="italic font-light">into the everyday.</em>
            </h2>
            <p className="text-primary-foreground/80 font-light leading-relaxed mb-4 max-w-lg">
              Crafted from solid brass and hand-polished to a mirror finish, each Aurum Haus piece weighs precisely 113 grams — heavy enough to hold a fully appointed bag, light enough to slip into the lining of a clutch.
            </p>
            <p className="text-primary-foreground/80 font-light leading-relaxed max-w-lg">
              We make a single object, exceptionally well.
            </p>
            <Link to="/story" className="mt-10 eyebrow text-accent hover:text-alabaster border-b border-accent/40 pb-1 self-start">
              The atelier →
            </Link>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-24 lg:py-32 grid md:grid-cols-3 gap-12 text-center">
        {[
          { k: "I", t: "Hand-finished", d: "Each piece polished by a single artisan from start to closure." },
          { k: "II", t: "Solid brass core", d: "113g of weighted brass, electroplated in your chosen finish." },
          { k: "III", t: "Lifetime care", d: "Complimentary re-polishing and re-plating, for as long as you carry it." },
        ].map((p) => (
          <div key={p.k}>
            <span className="font-display italic text-accent text-2xl">{p.k}</span>
            <h3 className="font-display text-2xl mt-4 mb-3">{p.t}</h3>
            <p className="text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">{p.d}</p>
          </div>
        ))}
      </section>

      {/* PACKAGING */}
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
            <Link to="/shop" className="mt-10 eyebrow text-accent hover:text-alabaster border-b border-accent/40 pb-1 self-start">
              Explore the collection →
            </Link>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[700px] order-1 lg:order-2">
            <img src={packagingImg.url} alt="Aurum Haus luxury packaging — hand-finished rigid box with gold-foil crest" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* LIFESTYLE — LUNCH RITUAL */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <img src={cafeLifestyle.url} alt="Two women dining al fresco — bag held by Aurum Haus" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/30 to-transparent" />
          <div className="relative h-full mx-auto max-w-[1500px] px-6 lg:px-12 flex flex-col justify-center text-alabaster">
            <div className="max-w-xl">
              <p className="eyebrow text-accent mb-4">A seat at the table</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                For the long lunches<br />
                <em className="italic font-light">and the bags worth keeping close.</em>
              </h2>
              <p className="text-alabaster/85 font-light leading-relaxed max-w-md">
                No more chairs draped in leather. No more floors that aren't quite clean. Slip the Aurum Haus beneath the marble — your bag is suspended in confidence, within reach, off the ground.
              </p>
              <Link to="/shop" className="mt-10 inline-block eyebrow text-accent hover:text-alabaster border-b border-accent/40 pb-1">
                Shop the ritual →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-secondary py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl md:text-4xl italic leading-snug text-foreground">
            "It's the kind of small object that quietly reorganises a room. You don't notice it — until you can't imagine the table without it."
          </p>
          <p className="eyebrow text-muted-foreground mt-8">Vogue · The Quiet Luxury Issue</p>
        </div>
      </section>

      {/* PRE-ORDER COUNTDOWN */}
      <PreOrderSection />

      <FAQSection />

      <SiteFooter />

      <ConciergeChat />
    </div>
  );
}
