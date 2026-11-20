import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products as staticProducts } from "@/lib/products";
import { useEcommerceStore } from "@/lib/ecommerceStore";

import aurumHoldersMarble from "@/assets/aurum-holders-marble.png";
import slideBagRestaurant from "@/assets/slideshow-bag-restaurant.png.asset.json";
import elegantCafeDrinks from "@/assets/elegant-cafe-drinks.png";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection — Aurum Haus" },
      {
        name: "description",
        content:
          "The complete Aurum Haus collection. Hand-finished bag holders in alabaster, obsidian and antique gold.",
      },
      { property: "og:title", content: "The Collection — Aurum Haus" },
      { property: "og:description", content: "Hand-finished bag holders for modern living." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const { products } = useEcommerceStore();
  const activeProducts = products && products.length > 0 ? products : staticProducts;
  const shopProducts = activeProducts.filter((p) => p.slug !== "rose-gold");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* HEADER */}
      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 pt-14 sm:pt-20 pb-8 sm:pb-12">
        <p className="eyebrow text-accent mb-3 sm:mb-4 text-xs">Aurum Haus</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1] max-w-3xl">
          The Collection<em className="italic font-light text-accent">.</em>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-xl text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
          A considered edit of four pieces and the collector's suite — each a study in proportion, weight and finish. Complimentary UK shipping on every order.
        </p>
      </section>

      {/* 5 PRODUCTS GRID: 3 UP, 2 DOWN */}
      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 pb-20 sm:pb-24">
        <div className="flex items-center justify-between border-y border-border py-3.5 sm:py-4 mb-8 sm:mb-12 eyebrow text-muted-foreground text-xs">
          <span>5 pieces</span>
          <div className="flex gap-6">
            <span className="text-foreground">Haus Edit n°1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14">
          {shopProducts.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </section>

      {/* SECTION 1: PILLARS FIRST (I, II, III) */}
      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 grid md:grid-cols-3 gap-10 sm:gap-12 text-center border-t border-border/40">
        {[
          { k: "I", t: "Hand-finished", d: "Each piece polished and inspected individually before release." },
          { k: "II", t: "Solid weighted core", d: "Approximately 113g weighted core, engineered for balance and stability." },
          { k: "III", t: "Complimentary shipping", d: "Complimentary UK shipping on all orders with tracked express dispatch." },
        ].map((p) => (
          <div key={p.k}>
            <span className="font-display italic text-accent text-2xl">{p.k}</span>
            <h3 className="font-display text-2xl mt-4 mb-3">{p.t}</h3>
            <p className="text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">{p.d}</p>
          </div>
        ))}
      </section>

      {/* SECTION 2: FOLLOWED BY THE 3 IMAGES (REVERSED ORDER FROM HOMEPAGE) */}
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary border border-border/40 group">
            <img
              src={aurumHoldersMarble}
              alt="Aurum Haus Holders on Marble"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-secondary border border-border/40 group">
            <img
              src={slideBagRestaurant.url}
              alt="Aurum Haus suspending luxury bag at dining table"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-secondary border border-border/40 group">
            <img
              src={elegantCafeDrinks}
              alt="Elegant Café Table with Drinks"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
