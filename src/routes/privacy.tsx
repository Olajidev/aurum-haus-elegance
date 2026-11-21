import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Aurum Haus" },
      { name: "description", content: "Privacy policy and client data protection practices for Aurum Haus." },
      { property: "og:title", content: "Privacy Policy — Aurum Haus" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 mx-auto max-w-3xl px-6 lg:px-12 py-20 lg:py-28 font-light">
        <p className="eyebrow text-accent mb-3 text-xs">Maison Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-8">
          Privacy Policy<em className="italic font-light text-accent">.</em>
        </h1>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-foreground/80">
          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">1. Our Commitment to Discretion</h2>
            <p>
              Aurum Haus ("we", "us", or "our") treats client discretion and privacy with the same uncompromising standard applied to our craftsmanship. We do not sell, license, or monetize client personal data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">2. Information We Collect</h2>
            <p>
              When you reserve a piece, place an order, or converse with our concierge, we collect only the information strictly necessary to fulfill your request:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-muted-foreground">
              <li>Full name and correspondence email address.</li>
              <li>Delivery address and postal details for insured courier dispatch.</li>
              <li>Payment verification tokens (processed directly via PCI-DSS Level 1 compliant gateways).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">3. Data Retention & Your Rights (GDPR)</h2>
            <p>
              Under UK and EU GDPR, you retain complete authority over your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-muted-foreground">
              <li><strong>Right of Access:</strong> Request a full ledger of data held regarding your commissions.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request immediate permanent deletion of your customer records.</li>
            </ul>
            <p className="mt-2">
              To exercise any privacy rights, write to our data protection team directly at{" "}
              <a href="mailto:support@aurumhaus.com" className="text-accent underline">
                support@aurumhaus.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl text-foreground">4. Cookies & Telemetry</h2>
            <p>
              We employ strictly essential session cookies required for authentication and shopping bag state. We do not use third-party invasive cross-site advertising trackers.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}