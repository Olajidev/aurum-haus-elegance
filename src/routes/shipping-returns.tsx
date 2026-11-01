import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Aurum Haus" },
      { name: "description", content: "Complimentary worldwide shipping, discreet packaging, and a 30-day return window on every Aurum Haus order." },
      { property: "og:title", content: "Shipping & Returns — Aurum Haus" },
      { property: "og:description", content: "Complimentary worldwide shipping. 30-day returns." },
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
          <p className="eyebrow text-accent mb-3">Complimentary shipping</p>
          <p>Every order ships free, worldwide, in our signature rigid box. European orders arrive within 2 – 4 business days; international orders within 5 – 9.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Tracking</p>
          <p>A tracking number is issued as soon as your piece leaves the atelier. Signature is required on delivery.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Returns</p>
          <p>Should a piece not feel right, return it — unused, in its original packaging — within 30 days for a full refund. We arrange the collection.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Engraved and made-to-order</p>
          <p>Made-to-order finishes are final sale.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Duties & taxes</p>
          <p>Prices include VAT within the EU. Orders outside the EU may be subject to local duties, which are the responsibility of the recipient.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
