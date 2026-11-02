import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection — Aurum Haus" },
      { name: "description", content: "The complete Aurum Haus collection. Hand-finished bag holders in alabaster, obsidian and antique gold." },
      { property: "og:title", content: "The Collection — Aurum Haus" },
      { property: "og:description", content: "Hand-finished bag holders for modern living." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});


function Shop() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pt-20 pb-12">
        <p className="eyebrow text-accent mb-4">Maison Aurum</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-3xl">
          The Collection<em className="italic font-light text-accent">.</em>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground font-light">
          A considered edit of five pieces — each a study in proportion, weight and finish. Free worldwide shipping on every order.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-28">
        <div className="flex items-center justify-between border-y border-border py-4 mb-12 eyebrow text-muted-foreground">
          <span>{products.length} pieces</span>
          <div className="flex gap-6">
            <button className="hover:text-foreground">Finish</button>
            <button className="hover:text-foreground">Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.map((p) => <ProductCard key={p.slug} {...p} />)}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
