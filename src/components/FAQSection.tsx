import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "When will my Aurum Haus piece ship?",
    a: "Orders are prepared and dispatched within 24–48 business hours. Each piece is inspected before release, and you will receive tracking the moment it leaves our atelier.",
  },
  {
    q: "What is the piece made of?",
    a: "A weighted core (approximately 113 grams), finished in your chosen signature finish — Auré (Satin Gold), Écru (Refined Ivory), Rêve Noir (Timeless Black), or Nuit Dorée (Black & Gold), with a surface-safe table grip.",
  },
  {
    q: "How much weight can it hold?",
    a: "The Aurum Haus bag holder is load tested to 7.5kg (16.5 lbs) — engineered for everyday structured handbags, totes, and designer clutches.",
  },
  {
    q: "Do you offer complimentary shipping?",
    a: "Yes. Complimentary UK shipping is included on all orders. International shipping is also available with express tracked couriers.",
  },
  {
    q: "What is your return policy?",
    a: "Pieces in their original unused condition and packaging may be returned within 14 days of delivery for an easy refund or exchange.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background border-t border-border/60">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12 py-24 lg:py-32">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-4">Frequently asked</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Considered answers,<br />
            <em className="italic font-light">for considered pieces.</em>
          </h2>
        </div>

        <div className="divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors">
                    {f.q}
                  </span>
                  <span className="flex-shrink-0 text-accent">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-muted-foreground font-light leading-relaxed max-w-3xl">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
