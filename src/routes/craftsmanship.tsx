import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: "Craftsmanship — Aurum Haus" },
      { name: "description", content: "Inside the Lisbon atelier where each Aurum Haus piece is turned, polished, and hand-finished by a single artisan." },
      { property: "og:title", content: "Craftsmanship — Aurum Haus" },
      { property: "og:description", content: "Solid brass, hand-finished in Lisbon. One artisan, one piece, from beginning to end." },
    ],
    links: [{ rel: "canonical", href: "/craftsmanship" }],
  }),
  component: Craftsmanship,
});

function Craftsmanship() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-40 text-center">
        <p className="eyebrow text-accent mb-6">The Atelier</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Made slowly,<br /><em className="italic font-light">by a single hand.</em>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Every Aurum Haus piece begins as a solid brass billet and passes through the hands of one artisan — from lathe to lacquer — in our Lisbon workshop.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-12 pb-28 space-y-14 font-light text-lg leading-relaxed">
        <div>
          <p className="eyebrow text-accent mb-4">I · The material</p>
          <p>Solid brass, sourced from a single foundry in the Minho valley. Weighted, warm, and honest — a metal that ages with grace rather than pretense.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-4">II · The turn</p>
          <p>Each piece is turned on a manual lathe to a tolerance of one-tenth of a millimeter. The silhouette is refined by eye, not by machine.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-4">III · The finish</p>
          <p>Alabaster chrome, obsidian lacquer, or our signature antique gold — applied by hand in three passes, cured, and hand-polished with cotton wheels until the surface takes on its quiet gleam.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-4">IV · The mark</p>
          <p>The artisan signs the underside with a struck initial. No serial number. No barcode. A quiet acknowledgment of the hand that made it.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
