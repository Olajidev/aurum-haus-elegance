import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurum Haus" },
      { name: "description", content: "Write to the Aurum Haus atelier. Client care, support, and inquiries." },
      { property: "og:title", content: "Contact — Aurum Haus" },
      { property: "og:description", content: "Write to the Haus." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-24 lg:py-32 text-center">
        <p className="eyebrow text-accent mb-6">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Write to the Haus.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
          For client care, private appointments, order concierge, or trade inquiries.
        </p>
      </section>

      <section className="mx-auto max-w-3xl w-full px-6 lg:px-12 pb-14">
        <div className="grid gap-8 sm:grid-cols-2 p-8 border border-border/40 rounded-xl bg-card/40 backdrop-blur-sm text-center">
          <div>
            <p className="eyebrow text-accent mb-2">General inquiries</p>
            <a
              href="mailto:contact@theaurumhaus.com"
              className="font-display text-lg tracking-wide hover:text-accent transition-colors"
            >
              contact@theaurumhaus.com
            </a>
          </div>
          <div>
            <p className="eyebrow text-accent mb-2">Client care & support</p>
            <a
              href="mailto:support@theaurumhaus.com"
              className="font-display text-lg tracking-wide hover:text-accent transition-colors"
            >
              support@theaurumhaus.com
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl w-full px-6 lg:px-12 pb-28">
        {submitted ? (
          <div className="text-center py-16 px-6 border border-border/40 rounded-xl bg-card/40 backdrop-blur-sm">
            <span className="text-3xl text-accent mb-4 block">✦</span>
            <h3 className="font-display text-2xl mb-3">Thank you for writing to us.</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your inquiry has been relayed to our team at{" "}
              <span className="text-foreground font-medium">support@theaurumhaus.com</span>. An atelier specialist will attend to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-8 eyebrow border-b border-accent pb-1 hover:text-accent transition text-xs"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="eyebrow text-accent block mb-2">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition text-sm"
              />
            </div>
            <div>
              <label className="eyebrow text-accent block mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition text-sm"
              />
            </div>
            <div>
              <label className="eyebrow text-accent block mb-2">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How may our concierge assist you?"
                className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition resize-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="eyebrow border-b border-accent pb-1 hover:text-accent transition pt-2"
            >
              Send inquiry →
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
