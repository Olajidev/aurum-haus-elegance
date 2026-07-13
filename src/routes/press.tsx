import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Aurum Haus" },
      { name: "description", content: "Recent features, editorial notes, and press inquiries for Aurum Haus." },
      { property: "og:title", content: "Press — Aurum Haus" },
      { property: "og:description", content: "Features, editorial notes, and press inquiries." },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: Press,
});

const features = [
  { outlet: "Vogue Living", date: "May 2026", title: "The quiet objects redefining the modern table" },
  { outlet: "Kinfolk", date: "March 2026", title: "A Lisbon atelier's answer to the everyday" },
  { outlet: "Monocle", date: "January 2026", title: "Small brands, big intention: Aurum Haus" },
  { outlet: "T Magazine", date: "November 2025", title: "The bag holder becomes an heirloom" },
];

function Press() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-36 text-center">
        <p className="eyebrow text-accent mb-6">In the press</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Quietly noticed.
        </h1>
        <p className="mt-10 text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          A selection of recent features. For interviews, samples, or high-resolution imagery, please write to <a href="mailto:press@aurumhaus.com" className="text-accent hover:underline">press@aurumhaus.com</a>.
        </p>
      </section>

      <section className="mx-auto max-w-3xl w-full px-6 lg:px-12 pb-28">
        <ul className="divide-y divide-border">
          {features.map((f) => (
            <li key={f.title} className="py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
              <div className="md:w-48 shrink-0">
                <p className="eyebrow text-accent">{f.outlet}</p>
                <p className="text-sm text-muted-foreground mt-1">{f.date}</p>
              </div>
              <p className="font-display italic text-2xl leading-snug">{f.title}</p>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
