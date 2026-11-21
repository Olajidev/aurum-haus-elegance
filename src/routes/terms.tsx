import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Aurum Haus" },
      { name: "description", content: "Terms and conditions governing purchases, reservations, and warranty for Aurum Haus." },
      { property: "og:title", content: "Terms of Service — Aurum Haus" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 mx-auto max-w-3xl px-6 lg:px-12 py-20 lg:py-28 font-light">
        <p className="eyebrow text-accent mb-3 text-xs">Maison Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-8">
          Terms of Service<em className="italic font-light text-accent">.</em>
        </h1>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-foreground/80">
          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">1. Atelier Commissions & Orders</h2>
            <p>
              Each Aurum Haus piece is crafted from solid weighted brass and individually inspected. By confirming an order or reservation, you enter into a binding agreement to acquire the designated edition upon release.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">2. Pricing & Currency</h2>
            <p>
              All prices are quoted in British Pounds Sterling (£ GBP) and include all duties and taxes applicable to United Kingdom orders. Complimentary white-glove express courier shipping is included on all editions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">3. 12-Month Atelier Craftsmanship Guarantee</h2>
            <p>
              Every Aurum Haus holder is backed by our comprehensive 12-Month Atelier Craftsmanship Guarantee against structural or mechanical defect. In the rare event of mechanical compromise under rated load (up to 7.5kg / 16.5 lbs), our atelier provides immediate restoration or replacement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">4. Inquiries & Dispute Resolution</h2>
            <p>
              For legal, dispatch, or order inquiries, please contact our team at{" "}
              <a href="mailto:contact@theaurumhaus.com" className="text-accent underline">
                contact@theaurumhaus.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}