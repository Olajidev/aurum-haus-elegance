import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct } from "@/lib/products";
import { createReservation } from "@/lib/reservations.functions";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Checkout — ${loaderData.product.name} · Aurum Haus` },
          { name: "description", content: `Secure checkout for ${loaderData.product.name}.` },
          { name: "robots", content: "noindex" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="p-12">
      <p>Product not found.</p>
      <Link to="/shop" className="underline">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-12">
      <p>{error.message}</p>
      <button onClick={reset} className="underline">Try again</button>
    </div>
  ),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const reserve = useServerFn(createReservation);
  const [processing, setProcessing] = useState<null | "apple" | "paypal">(null);
  const [confirmed, setConfirmed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const shipping = 0;
  const tax = Math.round(product.priceValue * 0.1);
  const total = product.priceValue + shipping + tax;

  const handlePay = async (method: "apple" | "paypal") => {
    setError(null);
    if (!fullName.trim() || !email.trim()) {
      setError("Please enter your name and email to reserve your piece.");
      return;
    }
    setProcessing(method);
    try {
      await reserve({
        data: {
          productSlug: product.slug,
          productName: product.name,
          fullName: fullName.trim(),
          email: email.trim(),
          pricePaid: total,
        },
      });
      setConfirmed(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setProcessing(null);
    }
  };


  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <section className="flex-1 mx-auto max-w-2xl w-full px-6 py-32 text-center">
          <p className="eyebrow text-accent mb-6">Order confirmed</p>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            Thank you<em className="italic font-light">.</em>
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            Your order for <span className="text-foreground">{product.name}</span> has been received.
            A confirmation has been sent to your inbox. Your piece will ship from the atelier within 48 hours.
          </p>
          <div className="flex gap-3 justify-center eyebrow">
            <Link to="/shop" className="px-8 py-4 bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors">
              Continue shopping
            </Link>
            <Link to="/" className="px-8 py-4 border border-foreground/30 hover:bg-foreground/5 transition-colors">
              Return home
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-[1300px] w-full px-6 lg:px-12 py-12 lg:py-20">
        <button
          onClick={() => navigate({ to: "/product/$slug", params: { slug: product.slug } })}
          className="eyebrow text-muted-foreground hover:text-foreground mb-10"
        >
          ← Back to piece
        </button>

        <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-20">
          {/* Payment column */}
          <div>
            <p className="eyebrow text-accent mb-4">Checkout</p>
            <h1 className="font-display text-4xl md:text-5xl mb-10">Secure payment</h1>

            <div className="space-y-4">
              <button
                disabled={processing !== null}
                onClick={() => handlePay("apple")}
                className="w-full flex items-center justify-center gap-3 py-5 bg-foreground text-background eyebrow hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                {processing === "apple" ? (
                  "Processing…"
                ) : (
                  <>
                    <AppleLogo /> Pay
                  </>
                )}
              </button>

              <button
                disabled={processing !== null}
                onClick={() => handlePay("paypal")}
                className="w-full flex items-center justify-center gap-2 py-5 bg-[#FFC439] text-[#003087] eyebrow hover:brightness-95 transition-all disabled:opacity-60"
              >
                {processing === "paypal" ? (
                  "Processing…"
                ) : (
                  <>
                    <span className="font-display italic text-xl normal-case tracking-normal">
                      <span className="text-[#003087]">Pay</span>
                      <span className="text-[#009cde]">Pal</span>
                    </span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground font-light leading-relaxed">
              Payments are processed securely. By completing this purchase you agree to the
              Aurum Haus terms of sale and return policy.
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="eyebrow text-muted-foreground mb-4">Shipping to</p>
              <p className="font-light text-foreground/80 leading-relaxed">
                Address will be confirmed by your chosen payment method.<br />
                Complimentary worldwide express shipping included.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <aside className="bg-secondary p-8 lg:p-10 self-start">
            <p className="eyebrow text-accent mb-6">Your order</p>

            <div className="flex gap-4 pb-6 border-b border-border">
              <div className="w-24 h-32 bg-background overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl leading-tight">{product.name}</h2>
                <p className="text-sm text-muted-foreground font-light mt-1">{product.finish}</p>
                <p className="font-display mt-3">{product.price}</p>
              </div>
            </div>

            <dl className="space-y-3 py-6 text-sm font-light">
              <Row label="Subtotal" value={`£${product.priceValue}`} />
              <Row label="Shipping" value="Complimentary" />
              <Row label="Estimated tax" value={`£${tax}`} />
            </dl>

            <div className="flex items-baseline justify-between pt-6 border-t border-border">
              <span className="eyebrow">Total</span>
              <span className="font-display text-2xl">£{total}</span>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground/80">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M16.365 12.65c-.02-2.06 1.683-3.05 1.76-3.098-.96-1.404-2.456-1.597-2.99-1.618-1.273-.128-2.485.75-3.132.75-.647 0-1.643-.732-2.703-.711-1.39.02-2.673.808-3.39 2.052-1.446 2.506-.37 6.215 1.038 8.247.687.99 1.505 2.103 2.582 2.063 1.036-.041 1.428-.67 2.68-.67 1.252 0 1.604.67 2.703.65 1.117-.02 1.823-1.013 2.508-2.006.79-1.15 1.115-2.265 1.135-2.323-.025-.012-2.18-.836-2.2-3.336zM14.4 6.42c.572-.694.957-1.66.852-2.622-.823.033-1.82.547-2.41 1.24-.53.616-.993 1.6-.868 2.545.918.07 1.854-.469 2.426-1.163z" />
    </svg>
  );
}
