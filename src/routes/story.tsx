import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import ah1Hero from "@/assets/AH1.jpeg";
import aurumCollectionMedallions from "@/assets/aurum-collection-medallions.jpg";
import { medallionsFlatlay } from "@/lib/products";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Aurum Haus · Est. MMXXVI" },
      {
        name: "description",
        content:
          "Aurum Haus is more than a product line — it is a lifestyle rooted in quiet luxury, intentional design, and purposeful living. Elevated tools for modern living.",
      },
      { property: "og:title", content: "Our Story — Aurum Haus" },
      {
        property: "og:description",
        content: "Elevated tools for modern living. Est. MMXXVI.",
      },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: Story,
});

function Story() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-4xl px-6 lg:px-12 pt-28 pb-20 lg:pt-36 lg:pb-24 text-center">
        <p className="eyebrow text-accent mb-4 uppercase tracking-[0.3em] text-xs">
          Aurum Haus · Est. MMXXVI
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.08] tracking-tight">
          Elevated tools<br />
          <em className="italic font-light">for modern living.</em>
        </h1>
        <p className="mt-8 text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Aurum Haus is more than a product line — it is a lifestyle rooted in quiet luxury, intentional design, and purposeful living. We design elevated tools that transform everyday rituals into refined experiences.
        </p>
      </section>

      {/* FULL WIDTH HERO EDITORIAL IMAGE */}
      <section className="relative h-[65vh] min-h-[460px] w-full overflow-hidden border-y border-border/40">
        <img
          src={ah1Hero}
          alt="Aurum Haus lifestyle table setting with elevated handbag holder"
          className="w-full h-full object-cover object-center brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </section>

      {/* NARRATIVE PILLARS: I. ORIGIN, II. CRAFT, III. PHILOSOPHY */}
      <section className="mx-auto max-w-3xl px-6 lg:px-12 py-24 sm:py-32 space-y-20 font-light text-base sm:text-lg leading-relaxed">
        
        {/* I · ORIGIN */}
        <div className="space-y-4">
          <p className="eyebrow text-accent tracking-[0.25em] text-xs uppercase">
            I · Origin
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            A quiet answer to an everyday dilemma.
          </h2>
          <p className="text-foreground/80 leading-relaxed pt-2">
            It started with a simple, shared frustration: sitting in a beautiful restaurant, surrounded by elegance, and having nowhere proper to place a handbag. The floor was never an option. The back of a chair felt careless. Placing it on the table disrupted the moment.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We knew there had to be a better way — not just an alternative, but an elevated solution. Aurum Haus was born out of a desire to create a piece that felt intentional, luxurious, and beautifully made. An object worthy of the bags it holds and the spaces it occupies.
          </p>
        </div>

        {/* II · CRAFT */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <p className="eyebrow text-accent tracking-[0.25em] text-xs uppercase">
            II · Craft
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            Form, function, and enduring beauty.
          </h2>
          <p className="text-foreground/80 leading-relaxed pt-2">
            Every Aurum Haus piece is crafted with intention. From the weight in your hand to the smooth articulation of the hook, every detail has been considered. We select materials for their beauty and durability, balancing form and function so that neither is compromised.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Functionality should never come at the expense of elegance. Our pieces are designed to integrate seamlessly into your daily life — compact enough to carry anywhere, refined enough to place on the most prestigious tables.
          </p>
        </div>

        {/* EDITORIAL MID-STORY IMAGE BREAK */}
        <div className="py-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/50 shadow-sm">
            <img
              src={medallionsFlatlay}
              alt="Aurum Haus medallions collection handcrafted finishes"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground/80 tracking-widest uppercase mt-3">
            Hand-finished medallions in four signature finishes
          </p>
        </div>

        {/* III · PHILOSOPHY */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <p className="eyebrow text-accent tracking-[0.25em] text-xs uppercase">
            III · Philosophy
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
            Quiet luxury in a world of excess.
          </h2>
          <p className="text-foreground/80 leading-relaxed pt-2">
            We believe true luxury is quiet. It is not about excess, but about intention — choosing fewer, better things that enrich your everyday experiences.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            In a world of fast trends and disposable design, Aurum Haus stands for longevity, restraint, and understated elegance. We create pieces designed to last, to be cherished, and to elevate the moments that make up a well-lived life.
          </p>
        </div>

      </section>

      {/* BRAND PRINCIPLES (THREE PILLARS) */}
      <section className="bg-secondary/40 border-y border-border/60 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="eyebrow text-accent uppercase tracking-[0.25em] text-xs">
              The Foundations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground font-normal">
              Brand Principles
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              The three non-negotiables that guide everything we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* PILLAR 1 */}
            <div className="p-8 bg-background border border-border/50 space-y-4">
              <span className="font-display text-2xl text-accent font-light">01</span>
              <h3 className="font-display text-2xl text-foreground">Elegance.</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Beauty in simplicity. Every line, curve, and finish is considered. We design for those who appreciate the quiet sophistication of understated luxury.
              </p>
            </div>

            {/* PILLAR 2 */}
            <div className="p-8 bg-background border border-border/50 space-y-4">
              <span className="font-display text-2xl text-accent font-light">02</span>
              <h3 className="font-display text-2xl text-foreground">Exclusive.</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Thoughtfully produced, never mass-marketed. Aurum Haus pieces are made for an intentional few who value quality and distinctiveness.
              </p>
            </div>

            {/* PILLAR 3 */}
            <div className="p-8 bg-background border border-border/50 space-y-4">
              <span className="font-display text-2xl text-accent font-light">03</span>
              <h3 className="font-display text-2xl text-foreground">Elevated.</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Transforming the ordinary into the extraordinary. We take everyday tools and elevate them into objects of desire and design.
              </p>
            </div>

          </div>

          {/* CLOSING QUOTE */}
          <div className="mt-20 pt-16 border-t border-border/40 text-center max-w-2xl mx-auto space-y-4">
            <blockquote className="font-display italic text-2xl sm:text-3xl text-foreground leading-snug">
              “It is not about what you use, but how you live.”
            </blockquote>
            <p className="eyebrow text-accent uppercase tracking-widest text-xs">
              — The Aurum Haus Principles
            </p>
          </div>

        </div>
      </section>

      {/* GALLERY DETAIL BREAK */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={aurumCollectionMedallions}
          alt="Aurum Haus precision craftsmanship"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* STAY IN THE HAUS / NEWSLETTER SECTION */}
      <section className="py-24 sm:py-32 px-6 lg:px-12 text-center max-w-2xl mx-auto">
        <p className="eyebrow text-accent uppercase tracking-[0.25em] text-xs mb-3">
          The Community
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-foreground font-normal mb-4">
          Stay in the Haus.
        </h2>
        <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto mb-8">
          A little luxury, delivered to your inbox. Be the first to know about new edits, private releases, and stories from the Maison.
        </p>

        {newsletterSubscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/80 border border-accent/40 text-sm text-foreground">
            <Check className="h-4 w-4 text-accent" />
            <span>Welcome to the Haus. We look forward to connecting with you.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-secondary/30 border border-border focus:border-accent focus:outline-none text-sm placeholder:text-muted-foreground/60 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background text-xs tracking-widest uppercase eyebrow hover:bg-accent hover:text-foreground transition-all duration-300 font-medium inline-flex items-center justify-center gap-2"
            >
              <span>Join the Haus</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
