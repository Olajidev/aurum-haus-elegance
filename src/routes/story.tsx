import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import goldDetail from "@/assets/gold-detail.jpg";
import trioAlt from "@/assets/trio-alt.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Aurum Haus" },
      { name: "description", content: "Aurum Haus designs elevated tools that transform everyday rituals into refined experiences. Rooted in quiet luxury and intentional living." },
      { property: "og:title", content: "Our Story — Aurum Haus" },
      { property: "og:description", content: "Quiet luxury, intentional living." },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: Story,
});

function Story() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-40 text-center">
        <p className="eyebrow text-accent mb-6">Est. MMXXV</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Elevated tools<br /><em className="italic font-light">for modern living.</em>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Aurum Haus is more than a product line — it is a lifestyle rooted in quiet luxury.
          We design pieces that transform daily rituals into refined experiences.
        </p>
      </section>

      <section className="relative h-[70vh] min-h-[500px]">
        <img src={goldDetail} alt="Antique gold finish detail" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-12 py-28 space-y-12 font-light text-lg leading-relaxed">
        <div>
          <p className="eyebrow text-accent mb-4">I · Origin</p>
          <p>
            The Maison began with a single observation — that the most beautiful bags of our age were too often relegated to the floor of a café, a hook, a stranger's chair. We set out to design a small object equal to the things it would hold.
          </p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-4">II · Craft</p>
          <p>
            Each Aurum Haus piece is hand-finished in a small atelier in Lisbon. Solid brass is turned, polished, and electroplated in alabaster chrome, obsidian lacquer, or our signature antique gold. The closure mechanism — silent, weighted, deliberate — is assembled by a single artisan from beginning to end.
          </p>
        </div>
        <div>
          <p className="eyebrow text-accent mb-4">III · Philosophy</p>
          <p>
            We believe true luxury transcends trends. We make a single object, exceptionally well. It is not about what you use — but how you live.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-display italic text-3xl md:text-4xl leading-snug">
            "Timeless elegance. Craftsmanship & quality. Calm, considered, complete."
          </p>
          <p className="eyebrow text-accent mt-8">— The Aurum Haus principles</p>
        </div>
      </section>

      <section className="relative h-[60vh] min-h-[420px]">
        <img src={trioAlt} alt="The five finishes" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      <SiteFooter />
    </div>
  );
}
