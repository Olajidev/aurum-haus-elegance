import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/engraving")({
  head: () => ({
    meta: [
      { title: "Engraving — Aurum Haus" },
      { name: "description", content: "Hand-struck monograms and quiet inscriptions. A complimentary service on every Aurum Haus piece." },
      { property: "og:title", content: "Engraving — Aurum Haus" },
      { property: "og:description", content: "Hand-struck monograms. A quiet, personal mark." },
    ],
    links: [{ rel: "canonical", href: "/engraving" }],
  }),
  component: Engraving,
});

function Engraving() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-36 text-center">
        <p className="eyebrow text-accent mb-6">Engraving</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          A quiet mark,<br /><em className="italic font-light">struck by hand.</em>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Every Aurum Haus piece may be personalised with a monogram of up to three characters or a short inscription, struck by hand in our Lisbon atelier.
        </p>
      </section>

      <section className="mx-auto max-w-3xl w-full px-6 lg:px-12 pb-28 space-y-12 font-light text-lg leading-relaxed">
        <div>
          <p className="eyebrow text-accent mb-3">Complimentary</p>
          <p>Included with every order. Simply add your inscription at checkout, or write to the atelier if you would prefer to discuss it first.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">The style</p>
          <p>Set in our house serif, struck to a depth of 0.2mm on the underside of the piece. Visible only to the person who holds it.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Delivery</p>
          <p>Engraved pieces add three to five business days to the standard delivery window.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
