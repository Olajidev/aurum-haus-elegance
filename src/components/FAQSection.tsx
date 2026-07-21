import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "When will my Aurum Haus piece ship?",
    a: "Pre-orders from the current window ship within 4–6 weeks of the collection close date. Each piece is hand-finished to order, and you will receive tracking the moment it leaves our London atelier.",
  },
  {
    q: "What is the piece made of?",
    a: "A solid brass core, weighing precisely 113 grams, electroplated in your chosen finish — polished chrome, black lacquer, or 24k vermeil. The interior grip is lined in Italian nappa.",
  },
  {
    q: "How much weight can it hold?",
    a: "The Aurum Haus bag holder is engineered to suspend up to 12 kg — well beyond a fully appointed handbag, tote, or weekender.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. Complimentary express shipping is included worldwide, with duties prepaid to most destinations. Delivery is 2–4 business days once dispatched.",
  },
  {
    q: "What is your return policy?",
    a: "Unengraved pieces may be returned within 30 days for a full refund, in their original presentation box. Engraved commissions are final sale.",
  },
  {
    q: "Do you offer lifetime care?",
    a: "Every Aurum Haus piece is covered by complimentary re-polishing and re-plating, for as long as you carry it. Simply write to the atelier to arrange collection.",
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
