import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct, hookColors } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { AurumJournalCarousel } from "@/components/AurumJournalCarousel";
import { Truck, ShieldCheck, RotateCcw, Gift, Check } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aurum Haus` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Aurum Haus` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-32 flex-1">
        <p className="eyebrow text-accent mb-4">Not found</p>
        <h1 className="font-display text-5xl mb-6">This piece is no longer available.</h1>
        <Link to="/shop" className="eyebrow border-b border-foreground/30 pb-1">
          Return to the collection →
        </Link>
      </section>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-12">
      <p>{error instanceof Error ? error.message : String(error)}</p>
      <button onClick={reset} className="underline">Try again</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("specs");

  const totalPrice = product.priceValue * quantity;
  const isTrio = product.slug === "noir" || product.slug.includes("trio");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* TOP ANNOUNCEMENT / BREADCRUMB */}
      <div className="border-b border-border/40 py-2.5 px-6 lg:px-12 text-center text-xs tracking-wider text-muted-foreground uppercase bg-secondary/30">
        Complimentary express delivery & duties prepaid worldwide
      </div>

      <main className="mx-auto max-w-[1500px] px-6 lg:px-12 pt-8 lg:pt-12 pb-24 flex-1">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Edit n°1</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        {/* 2-COLUMN BIG PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: EXPANSIVE GALLERY (7 COLUMNS) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start space-y-4">
            <ProductGallery
              key={product.slug}
              images={product.gallery}
              name={product.name}
              finish={product.finish}
            />

            {/* Atelier trust reassurance footer under gallery */}
            <div className="hidden sm:grid grid-cols-3 gap-3 pt-3 text-center border-t border-border/50 text-[11px] text-muted-foreground tracking-wider uppercase">
              <div className="py-2 px-3 bg-secondary/40 border border-border/40">
                Solid Weighted Brass
              </div>
              <div className="py-2 px-3 bg-secondary/40 border border-border/40">
                10kg Load Certified
              </div>
              <div className="py-2 px-3 bg-secondary/40 border border-border/40">
                Surface-Safe Grip
              </div>
            </div>
          </div>

          {/* RIGHT: BUY BOX & CARRIE-ATELIER STYLE DESCRIPTION (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* PRODUCT HEADER (CLEAN — NO STARS, NO REVIEWS, NO BADGES) */}
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-sm font-light">
                {product.finish}
              </p>

              {/* PRICE BLOCK (CLEAN — NO BADGES) */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-display text-3xl text-foreground font-normal">
                  {product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-muted-foreground/70 line-through font-light">
                    {product.compareAtPrice}
                  </span>
                )}
              </div>
            </div>

            {/* 3 COLOURS ONLY: GOLD, BLACK, WHITE (OR NONE IF TRIO SUITE) */}
            {!isTrio && (
              <div className="pt-4 pb-6 border-y border-border/50 space-y-3">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                  <span className="text-muted-foreground">Select Finish:</span>
                  <span className="font-semibold text-foreground">
                    {product.finishCategory}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 items-center pt-1">
                  {hookColors.map((color) => {
                    const isCurrent = product.slug === color.slug;

                    return (
                      <Link
                        key={color.slug}
                        to="/product/$slug"
                        params={{ slug: color.slug }}
                        className={`group relative flex items-center justify-center h-12 w-12 rounded-full transition-all duration-200 ${
                          isCurrent
                            ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-105 shadow-md"
                            : "opacity-75 hover:opacity-100 hover:scale-105"
                        }`}
                        title={color.colorName}
                      >
                        <span
                          className="h-10 w-10 rounded-full border border-black/25 shadow-inner"
                          style={{ background: color.swatchGradient }}
                        />
                        {isCurrent && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-4 w-4 text-foreground stroke-[3] drop-shadow" />
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground/80 font-light pt-1">
                  Choose between Sol (Yellow), Aura (White), Noir (Black), and Onyx (Black & Gold).
                </p>
              </div>
            )}

            {/* QUANTITY & PRIMARY ACTION CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border bg-secondary/40 h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-4 text-foreground/70 hover:text-foreground text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 text-sm font-medium min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="px-4 text-foreground/70 hover:text-foreground text-lg transition-colors"
                  >
                    +
                  </button>
                </div>

                <Link
                  to="/checkout/$slug"
                  params={{ slug: product.slug }}
                  className="flex-1 block text-center py-3.5 px-8 bg-foreground text-background eyebrow text-xs tracking-widest hover:bg-accent hover:text-foreground transition-all duration-300 font-semibold shadow-sm"
                >
                  Proceed to Checkout · £{totalPrice}
                </Link>
              </div>

              {/* TRUST ICONS UNDER CTA */}
              <div className="grid grid-cols-2 gap-3.5 pt-3 text-xs text-muted-foreground font-light">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-accent stroke-[1.5] shrink-0" />
                  <span>Complimentary express delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-accent stroke-[1.5] shrink-0" />
                  <span>12-Month Atelier Warranty</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="h-4 w-4 text-accent stroke-[1.5] shrink-0" />
                  <span>60-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Gift className="h-4 w-4 text-accent stroke-[1.5] shrink-0" />
                  <span>Gold-foil gift box included</span>
                </div>
              </div>
            </div>

            {/* CARRIE ATELIER STYLE DESCRIPTION SECTION */}
            <div className="space-y-5 pt-6 border-t border-border/50 text-foreground/90 font-light leading-relaxed">
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                {product.leadParagraph}
              </p>

              <p className="text-sm text-foreground/80 leading-relaxed">
                With Aurum Haus, you can take your most treasured handbag out with confidence, knowing it stays pristine, off the floor, and within reach — wherever you dine.
              </p>

              {/* SPECIFICATIONS LIST */}
              <div className="bg-secondary/40 border border-border/60 p-6 space-y-4 rounded-sm">
                <h3 className="eyebrow text-foreground text-xs uppercase tracking-widest font-semibold">
                  Atelier Specifications
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {product.specs.map((spec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-foreground/85">
                      <span className="text-accent mt-0.5 text-sm leading-none">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                {/* MEASUREMENTS GRID */}
                <div className="pt-4 mt-4 border-t border-border/40 space-y-2">
                  <h4 className="eyebrow text-foreground text-[11px] uppercase tracking-wider font-semibold">
                    Measurements & Weight
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs pt-1">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Diameter</span>
                      <span className="font-medium text-foreground">{product.measurements.width}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Folded Height</span>
                      <span className="font-medium text-foreground">{product.measurements.height}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Hook Drop</span>
                      <span className="font-medium text-foreground">{product.measurements.hookDrop}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Net Weight</span>
                      <span className="font-medium text-foreground">{product.measurements.weight}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-border/30">
                      <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Certified Safe Load</span>
                      <span className="font-medium text-foreground">{product.measurements.capacity} (Tested on Marble, Glass, & Hardwood)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE ACCORDIONS */}
            <div className="border-t border-border/60 divide-y divide-border/40 pt-2">
              <div className="py-4">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "how" ? null : "how")}
                  className="w-full flex items-center justify-between text-left font-display text-lg tracking-wide hover:text-accent transition-colors"
                >
                  <span>How It Works & Table Compatibility</span>
                  <span className="font-mono text-base">{openAccordion === "how" ? "−" : "+"}</span>
                </button>
                {openAccordion === "how" && (
                  <div className="pt-3 text-sm text-foreground/80 font-light leading-relaxed space-y-2">
                    <p>
                      Simply unfold the curved brass arm and rest the circular weighted crest flat on the table edge. The weight of your handbag naturally locks the nano-grip stabilizer firmly against the surface without adhesives or clips.
                    </p>
                    <p>
                      Engineered for table depths up to 7 cm (2.8 in) across dining tables, cocktail bars, outdoor terraces, marble counters, treated wood, and glass surfaces without leaving any residue or pressure marks.
                    </p>
                  </div>
                )}
              </div>

              <div className="py-4">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "shipping" ? null : "shipping")}
                  className="w-full flex items-center justify-between text-left font-display text-lg tracking-wide hover:text-accent transition-colors"
                >
                  <span>Complimentary Shipping & 60-Day Returns</span>
                  <span className="font-mono text-base">{openAccordion === "shipping" ? "−" : "+"}</span>
                </button>
                {openAccordion === "shipping" && (
                  <div className="pt-3 text-sm text-foreground/80 font-light leading-relaxed space-y-2">
                    <p>
                      All orders are dispatched via express tracked courier within 24 hours. Duties and customs are prepaid for the UK, European Union, United States, and major international hubs.
                    </p>
                    <p>
                      Enjoy a 60-day trial period. If you or your gift recipient are not completely enchanted, complimentary return shipping is provided upon request.
                    </p>
                  </div>
                )}
              </div>

              <div className="py-4">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "warranty" ? null : "warranty")}
                  className="w-full flex items-center justify-between text-left font-display text-lg tracking-wide hover:text-accent transition-colors"
                >
                  <span>12-Month Atelier Craftsmanship Guarantee</span>
                  <span className="font-mono text-base">{openAccordion === "warranty" ? "−" : "+"}</span>
                </button>
                {openAccordion === "warranty" && (
                  <div className="pt-3 text-sm text-foreground/80 font-light leading-relaxed space-y-2">
                    <p>
                      Every Aurum Haus piece is crafted from solid weighted brass and individually inspected before unboxing. We guarantee each piece against plating defects, mechanical hinge wear, or craftsmanship faults for a full 12 months.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* AURUM JOURNAL SLIDESHOW CAROUSEL (REPLACED ALSO FROM ATELIER AS REQUESTED) */}
      <AurumJournalCarousel />

      <SiteFooter />
    </div>
  );
}
