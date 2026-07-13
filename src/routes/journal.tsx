import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — Aurum Haus" },
      { name: "description", content: "Notes from the atelier. On quiet luxury, intentional living, and the rituals that shape a beautiful day." },
      { property: "og:title", content: "The Journal — Aurum Haus" },
      { property: "og:description", content: "Notes from the Aurum Haus atelier." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

const entries = [
  { n: "01", date: "September 2026", title: "On the weight of small objects", excerpt: "Why 180 grams is the difference between a tool and an ornament." },
  { n: "02", date: "August 2026", title: "A dinner in Lisbon", excerpt: "Inside the table that started the Maison — and the bag that would not behave." },
  { n: "03", date: "July 2026", title: "Quiet luxury, considered", excerpt: "On rejecting trend in favour of permanence." },
];

function Journal() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pt-20 pb-12">
        <p className="eyebrow text-accent mb-4">Notes from the Atelier</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-3xl">
          The Journal<em className="italic font-light text-accent">.</em>
        </h1>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-12 pb-28">
        {entries.map((e) => (
          <article key={e.n} className="group border-t border-border py-10 grid grid-cols-[auto_1fr] gap-8 cursor-pointer">
            <div className="eyebrow text-accent">{e.n}</div>
            <div>
              <p className="eyebrow text-muted-foreground mb-3">{e.date}</p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight group-hover:italic transition-all">
                {e.title}
              </h2>
              <p className="mt-4 text-muted-foreground font-light max-w-xl">{e.excerpt}</p>
              <span className="eyebrow inline-block mt-6 border-b border-foreground/30 pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                Read the note →
              </span>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
