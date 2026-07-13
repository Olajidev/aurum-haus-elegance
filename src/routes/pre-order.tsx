import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PreOrderSection } from "@/components/PreOrderSection";
import { products } from "@/lib/products";

export const Route = createFileRoute("/pre-order")({
  head: () => ({
    meta: [
      { title: "Pre-Order — Aurum Haus" },
      { name: "description", content: "Reserve your Aurum Haus piece at £70 before the collection launches at £75 in the second week of August." },
      { property: "og:title", content: "Pre-Order — Aurum Haus" },
      { property: "og:description", content: "Reserve your piece at the pre-launch price of £70. Ships August." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PreOrderPage,
});

function PreOrderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pt-20 pb-8">
        <p className="eyebrow text-accent mb-4">Before launch</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-3xl">
          Pre-Order<em className="italic font-light text-accent">.</em>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground font-light">
          Three finishes. One quiet obsession. Reserve your piece at <span className="text-foreground">£70</span> before the collection opens publicly at £75.
        </p>
      </section>

      <PreOrderSection />

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {products.map((p) => (
            <div key={p.slug} className="group">
              <Link to="/product/$slug" params={{ slug: p.slug }} className="block aspect-[3/4] overflow-hidden bg-secondary mb-5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="font-display">
                  <span className="text-foreground">{p.price}</span>
                  {p.launchPrice && (
                    <span className="ml-2 text-muted-foreground line-through text-sm">{p.launchPrice}</span>
                  )}
                </p>
              </div>
              <p className="text-sm text-muted-foreground font-light mt-1">{p.finish}</p>
              <Link
                to="/checkout/$slug"
                params={{ slug: p.slug }}
                className="mt-6 block text-center px-6 py-3 bg-foreground text-background eyebrow hover:bg-accent hover:text-foreground transition-colors"
              >
                Reserve at £70
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow text-accent mb-4">How pre-order works</p>
          <div className="grid md:grid-cols-3 gap-8 mt-8 text-left">
            <div>
              <span className="font-display italic text-accent text-xl">I</span>
              <h3 className="font-display text-lg mt-3 mb-2">Reserve today</h3>
              <p className="text-sm text-muted-foreground font-light">Secure your piece at £70 — the launch price will be £75.</p>
            </div>
            <div>
              <span className="font-display italic text-accent text-xl">II</span>
              <h3 className="font-display text-lg mt-3 mb-2">Hand-finished</h3>
              <p className="text-sm text-muted-foreground font-light">Each 113g piece is polished by a single artisan in the atelier.</p>
            </div>
            <div>
              <span className="font-display italic text-accent text-xl">III</span>
              <h3 className="font-display text-lg mt-3 mb-2">Ships August</h3>
              <p className="text-sm text-muted-foreground font-light">Orders ship the second week of August, in the order they were reserved.</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
