import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Aurum Haus" },
      { name: "description", content: "Complimentary UK shipping, signature presentation box, and a 14-day return window on every Aurum Haus order." },
      { property: "og:title", content: "Shipping & Returns — Aurum Haus" },
      { property: "og:description", content: "Complimentary UK shipping. 14-day easy returns." },
    ],
    links: [{ rel: "canonical", href: "/shipping-returns" }],
  }),
  component: ShippingReturns,
});

function ShippingReturns() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-36 text-center">
        <p className="eyebrow text-accent mb-6">Shipping & Returns</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Delivered with intention.
        </h1>
      </section>

      <section className="mx-auto max-w-3xl w-full px-6 lg:px-12 pb-28 space-y-12 font-light text-lg leading-relaxed">
        <div>
          <p className="eyebrow text-accent mb-3">Complimentary UK Shipping</p>
          <p>Every order ships free across the United Kingdom in our signature presentation box, accompanied by a protective travel pouch and microfibre cleaning cloth. Orders are dispatched within 24–48 business hours with express tracked delivery.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Tracking</p>
          <p>A tracking number is issued as soon as your piece leaves the atelier. You can follow your parcel from dispatch to your door.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">14-Day Easy Returns</p>
          <p>Should a piece not feel right, you may return it unused, in its original presentation box and accessories, within 14 days of delivery for a full refund or exchange.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Warranty & Care</p>
          <p>Every piece includes our 12-Month Atelier Warranty against craftsmanship defects. Simply wipe clean with the provided microfibre cloth and store in the protective pouch when not in use.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">International Orders</p>
          <p>International orders are dispatched via express tracked courier. Local import duties and taxes may be applied at customs according to local regulations.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
