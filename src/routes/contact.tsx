import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurum Haus" },
      { name: "description", content: "Write to the Aurum Haus atelier in Lisbon. Client care, press, wholesale, and private commissions." },
      { property: "og:title", content: "Contact — Aurum Haus" },
      { property: "og:description", content: "Write to the atelier in Lisbon." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 lg:py-36 text-center">
        <p className="eyebrow text-accent mb-6">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02]">
          Write to the maison.
        </h1>
      </section>

      <section className="mx-auto max-w-4xl w-full px-6 lg:px-12 pb-16 grid gap-12 md:grid-cols-2 font-light">
        <div>
          <p className="eyebrow text-accent mb-3">The atelier</p>
          <p className="font-display italic text-2xl leading-snug">Rua da Boavista, 47<br />1200-066 Lisboa, Portugal</p>
          <p className="text-sm text-muted-foreground mt-3">By appointment only.</p>
        </div>
        <div className="space-y-8">
          <div>
            <p className="eyebrow text-accent mb-2">Client care</p>
            <a href="mailto:care@aurumhaus.com" className="hover:text-accent">care@aurumhaus.com</a>
          </div>
          <div>
            <p className="eyebrow text-accent mb-2">Press</p>
            <a href="mailto:press@aurumhaus.com" className="hover:text-accent">press@aurumhaus.com</a>
          </div>
          <div>
            <p className="eyebrow text-accent mb-2">Wholesale & commissions</p>
            <a href="mailto:atelier@aurumhaus.com" className="hover:text-accent">atelier@aurumhaus.com</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl w-full px-6 lg:px-12 pb-28">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="eyebrow text-accent block mb-2">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition" />
          </div>
          <div>
            <label className="eyebrow text-accent block mb-2">Email</label>
            <input type="email" className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition" />
          </div>
          <div>
            <label className="eyebrow text-accent block mb-2">Message</label>
            <textarea rows={5} className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-accent transition resize-none" />
          </div>
          <button className="eyebrow border-b border-accent pb-1 hover:text-accent transition">Send →</button>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
