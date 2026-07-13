import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/client-care")({
  head: () => ({
    meta: [
      { title: "Client Care — Aurum Haus" },
      { name: "description", content: "Personal, discreet assistance from the Aurum Haus atelier. Advice, aftercare, and lifetime support." },
      { property: "og:title", content: "Client Care — Aurum Haus" },
      { property: "og:description", content: "Personal, discreet assistance from the atelier." },
    ],
    links: [{ rel: "canonical", href: "/client-care" }],
  }),
  component: ClientCare,
});

function ClientCare() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-36 text-center">
        <p className="eyebrow text-accent mb-6">Client Care</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          A quiet word,<br /><em className="italic font-light">whenever you need it.</em>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Our atelier team is available for personal styling advice, aftercare, and lifetime support on every piece we make.
        </p>
      </section>

      <section className="mx-auto max-w-3xl w-full px-6 lg:px-12 pb-28 grid gap-10 md:grid-cols-2 font-light">
        <div>
          <p className="eyebrow text-accent mb-3">Write to us</p>
          <a href="mailto:care@aurumhaus.com" className="font-display italic text-2xl hover:text-accent">care@aurumhaus.com</a>
          <p className="text-sm text-muted-foreground mt-2">Replies within one business day.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">By appointment</p>
          <p className="font-display italic text-2xl">+351 21 000 0000</p>
          <p className="text-sm text-muted-foreground mt-2">Monday to Friday, 10h — 18h WET.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Lifetime aftercare</p>
          <p>Every Aurum Haus piece is guaranteed for life. Return your piece to the atelier for polishing, re-lacquering, or mechanism service at no cost.</p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-3">Private preview</p>
          <p>Clients are invited to preview new finishes and limited editions before public release. Register your interest by email.</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
