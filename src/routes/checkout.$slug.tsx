import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct } from "@/lib/products";
import {
  createOrder,
  getProductStock,
  useEcommerceStore,
  Order,
  EmailLog,
} from "@/lib/ecommerceStore";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowRight,
  Eye,
  X,
  PackageCheck,
  Clock,
  Sparkles,
} from "lucide-react";

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
    <div className="p-12 text-center">
      <p className="font-display text-2xl mb-4">Product not found.</p>
      <Link to="/shop" className="underline eyebrow text-sm">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error, reset }: { error: unknown; reset: () => void }) => (
    <div className="p-12 text-center">
      <p className="text-destructive mb-4">{error instanceof Error ? error.message : String(error)}</p>
      <button onClick={reset} className="underline eyebrow text-sm">Try again</button>
    </div>
  ),
  component: CheckoutPage,
});

type PaymentType = "card" | "apple_pay" | "google_pay" | "paypal";

function CheckoutPage() {
  const { product: initialProduct } = Route.useLoaderData();
  const navigate = useNavigate();
  const { products } = useEcommerceStore();

  // Find dynamic product in case title/price was updated by admin
  const product = products.find((p) => p.slug === initialProduct.slug) || initialProduct;
  const currentStock = getProductStock(product.slug);

  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("card");
  const [processing, setProcessing] = useState<PaymentType | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [generatedEmails, setGeneratedEmails] = useState<{ customer: EmailLog; admin: EmailLog } | null>(null);
  const [emailModalType, setEmailModalType] = useState<"customer" | "admin" | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("London");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United Kingdom");

  // Card details
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");

  const [error, setError] = useState<string | null>(null);

  const shipping = 0;
  const tax = Math.round(product.priceValue * 0.1);
  const total = product.priceValue + shipping + tax;

  const handleCompletePayment = async (method: PaymentType) => {
    setError(null);

    if (currentStock <= 0) {
      setError("This piece is currently sold out in the atelier batch. Please select another finish or check back soon.");
      return;
    }

    // Validation
    const nameToUse = fullName.trim() || (method === "apple_pay" ? "Eleanor Vance" : method === "google_pay" ? "Julian Hayes" : method === "paypal" ? "Charlotte Dubois" : "");
    const emailToUse = email.trim() || (method === "apple_pay" ? "eleanor.vance@icloud.com" : method === "google_pay" ? "julian.hayes@gmail.com" : method === "paypal" ? "charlotte.dubois@paypal.user" : "");

    if (method === "card" && (!fullName.trim() || !email.trim())) {
      setError("Please provide your name and email address for order confirmation and dispatch updates.");
      return;
    }

    setProcessing(method);

    // Simulate gateway roundtrip delay
    setTimeout(() => {
      try {
        const result = createOrder({
          productSlug: product.slug,
          customerName: nameToUse || "Aurum Haus Collector",
          customerEmail: emailToUse || "collector@aurumhaus.com",
          quantity: 1,
          shippingAddress: {
            street: street.trim() || "10 Berkeley Square",
            city: city.trim() || "London",
            postalCode: postalCode.trim() || "W1J 6AA",
            country: country || "United Kingdom",
          },
          paymentMethod: method,
          cardDetails: {
            last4: cardNumber.replace(/\D/g, "").slice(-4) || "4242",
          },
        });

        setCompletedOrder(result.order);
        setGeneratedEmails({
          customer: result.customerEmail,
          admin: result.adminEmail,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Payment processing error occurred. Please try again.");
      } finally {
        setProcessing(null);
      }
    }, 1100);
  };

  // -------------------------------------------------------------
  // CONFIRMATION VIEW
  // -------------------------------------------------------------
  if (completedOrder) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <SiteHeader />

        <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-16 lg:py-24">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2 ring-1 ring-emerald-500/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="eyebrow text-accent tracking-[0.25em]">Maison Order Confirmed</p>
            <h1 className="font-display text-4xl sm:text-5xl leading-tight">
              Thank you, {completedOrder.customerName}<em className="italic font-light">.</em>
            </h1>
            <p className="text-muted-foreground font-light max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Your order <span className="text-foreground font-medium">{completedOrder.id}</span> has been confirmed by our payment gateway. Your piece is entering atelier preparation.
            </p>
          </div>

          {/* ORDER CARD */}
          <div className="bg-secondary/40 border border-border/80 p-6 sm:p-8 space-y-6 rounded-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border/60 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 bg-background border border-border/40 overflow-hidden flex-shrink-0">
                  <img src={completedOrder.productImage} alt={completedOrder.productName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{completedOrder.productName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{completedOrder.finish}</p>
                  <p className="text-xs text-accent mt-2 font-medium uppercase tracking-wider">
                    {completedOrder.paymentMethod === "card" && "Paid via Debit/Credit Card"}
                    {completedOrder.paymentMethod === "apple_pay" && "Paid via Apple Pay"}
                    {completedOrder.paymentMethod === "google_pay" && "Paid via Google Pay"}
                    {completedOrder.paymentMethod === "paypal" && "Paid via PayPal"}
                  </p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="font-display text-2xl font-light">£{completedOrder.total}</p>
                <p className="text-[11px] text-muted-foreground tracking-wider uppercase">Duties & Taxes Included</p>
              </div>
            </div>

            {/* AUTOMATED EMAIL DISPATCH BANNER */}
            <div className="p-5 bg-background border border-accent/30 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent font-medium">
                <Sparkles className="w-4 h-4 text-accent" />
                Automated Confirmation Emails Dispatched
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As configured, the system has automatically dispatched both the customer confirmation receipt to <strong>{completedOrder.customerEmail}</strong> and the internal sale notification to <strong>admin@aurumhaus.com</strong>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setEmailModalType("customer")}
                  className="px-4 py-2 bg-secondary text-foreground hover:bg-secondary/80 text-xs eyebrow border border-border flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  Inspect Customer Confirmation Email
                </button>
                <button
                  onClick={() => setEmailModalType("admin")}
                  className="px-4 py-2 bg-secondary text-foreground hover:bg-secondary/80 text-xs eyebrow border border-border flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-accent" />
                  Inspect Admin Sale Alert Email
                </button>
              </div>
            </div>

            {/* SHIPPING DESTINATION */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-muted-foreground border-t border-border/40 pt-4">
              <div>
                <span className="eyebrow block text-foreground mb-1">Shipping To</span>
                <p className="text-foreground/90">{completedOrder.customerName}</p>
                <p>{completedOrder.shippingAddress.street}</p>
                <p>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.postalCode}</p>
                <p>{completedOrder.shippingAddress.country}</p>
              </div>
              <div>
                <span className="eyebrow block text-foreground mb-1">Delivery Timeline</span>
                <p className="text-foreground/90 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" /> 24-48h Atelier Hand-Finishing
                </p>
                <p className="mt-1">Express Courier: 2-3 Business Days</p>
                <p className="text-[11px] text-muted-foreground/80 mt-1">Insured white-glove signature tracking</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admin"
              className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background hover:bg-accent hover:text-foreground text-xs uppercase tracking-widest font-medium transition-all text-center flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-4 h-4" />
              View in Admin Dashboard
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 border border-border hover:bg-secondary text-xs uppercase tracking-widest font-medium transition-all text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        {/* EMAIL INSPECTOR MODAL */}
        {emailModalType && generatedEmails && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-background border border-border w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50">
                <div>
                  <span className="eyebrow text-accent text-[10px]">
                    {emailModalType === "customer" ? "Customer Order Confirmation Email" : "Admin Internal Sale Alert"}
                  </span>
                  <h3 className="font-display text-lg">
                    {emailModalType === "customer" ? generatedEmails.customer.subject : generatedEmails.admin.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setEmailModalType(null)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 bg-muted/40 border-b border-border text-xs text-muted-foreground flex justify-between">
                <span><strong>To:</strong> {emailModalType === "customer" ? generatedEmails.customer.recipient : generatedEmails.admin.recipient}</span>
                <span><strong>Sent:</strong> Just now</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-[#F7F6F3]">
                <iframe
                  title="Email Preview"
                  srcDoc={emailModalType === "customer" ? generatedEmails.customer.htmlBody : generatedEmails.admin.htmlBody}
                  className="w-full h-[520px] border-0 bg-transparent"
                />
              </div>
              <div className="p-4 border-t border-border flex justify-end">
                <button
                  onClick={() => setEmailModalType(null)}
                  className="px-6 py-2 bg-foreground text-background eyebrow text-xs hover:bg-accent hover:text-foreground transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        <SiteFooter />
      </div>
    );
  }

  // -------------------------------------------------------------
  // CHECKOUT FORM VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1300px] w-full px-6 lg:px-12 py-12 lg:py-20 flex-1">
        <button
          onClick={() => navigate({ to: "/product/$slug", params: { slug: product.slug } })}
          className="eyebrow text-muted-foreground hover:text-foreground mb-8 text-xs flex items-center gap-2 transition-colors"
        >
          ← Return to {product.name}
        </button>

        <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-start">
          
          {/* LEFT: PAYMENT GATEWAYS */}
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-accent mb-2">Secure Payment</p>
              <h1 className="font-display text-4xl md:text-5xl">Select Payment Method</h1>
              <p className="text-muted-foreground font-light text-sm mt-2">
                All transactions are encrypted with 256-bit atelier security. Choose your preferred checkout method.
              </p>
            </div>

            {/* STOCK INDICATOR */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase">
              <span className={`w-2 h-2 rounded-full ${currentStock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              {currentStock > 10 && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">In Stock · {currentStock} pieces available in this atelier batch</span>
              )}
              {currentStock > 0 && currentStock <= 10 && (
                <span className="text-amber-500 font-medium">Low Stock Alert: Only {currentStock} pieces remaining</span>
              )}
              {currentStock <= 0 && (
                <span className="text-red-500 font-medium">Sold Out · Current Batch Exhausted</span>
              )}
            </div>

            {/* PAYMENT TABS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3.5 text-center border transition-all text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "card"
                    ? "border-foreground bg-secondary font-semibold ring-1 ring-foreground"
                    : "border-border hover:border-foreground/50 opacity-75"
                }`}
              >
                <CreditCard className="w-5 h-5 text-accent" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("apple_pay")}
                className={`p-3.5 text-center border transition-all text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "apple_pay"
                    ? "border-foreground bg-secondary font-semibold ring-1 ring-foreground"
                    : "border-border hover:border-foreground/50 opacity-75"
                }`}
              >
                <AppleLogo />
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("google_pay")}
                className={`p-3.5 text-center border transition-all text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "google_pay"
                    ? "border-foreground bg-secondary font-semibold ring-1 ring-foreground"
                    : "border-border hover:border-foreground/50 opacity-75"
                }`}
              >
                <GoogleLogo />
                <span>Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`p-3.5 text-center border transition-all text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 ${
                  paymentMethod === "paypal"
                    ? "border-foreground bg-secondary font-semibold ring-1 ring-foreground"
                    : "border-border hover:border-foreground/50 opacity-75"
                }`}
              >
                <PayPalLogo />
                <span>PayPal</span>
              </button>
            </div>

            {/* CARD FORM */}
            {paymentMethod === "card" && (
              <div className="border border-border p-6 sm:p-8 space-y-6 bg-secondary/20">
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <span className="eyebrow text-xs text-foreground font-medium">Credit or Debit Card</span>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                    <span>VISA</span>
                    <span>MC</span>
                    <span>AMEX</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="eyebrow text-muted-foreground block mb-2 text-xs">Cardholder Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div>
                    <label className="eyebrow text-muted-foreground block mb-2 text-xs">Email Address (for order receipt)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor.vance@example.com"
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div>
                    <label className="eyebrow text-muted-foreground block mb-2 text-xs">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full bg-background border border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                      <CreditCard className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="eyebrow text-muted-foreground block mb-2 text-xs">Expires (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-background border border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow text-muted-foreground block mb-2 text-xs">Security CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="888"
                        className="w-full bg-background border border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="eyebrow text-muted-foreground block mb-2 text-xs">Delivery Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="14 Palace Green, Kensington"
                      className="w-full bg-background border border-border px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="eyebrow text-muted-foreground block mb-2 text-xs">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="London"
                        className="w-full bg-background border border-border px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow text-muted-foreground block mb-2 text-xs">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="W8 4QA"
                        className="w-full bg-background border border-border px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={processing !== null || currentStock <= 0}
                  onClick={() => handleCompletePayment("card")}
                  className="w-full py-4 bg-foreground text-background eyebrow text-xs tracking-widest font-semibold hover:bg-accent hover:text-foreground transition-all duration-300 disabled:opacity-50 shadow-md"
                >
                  {processing === "card" ? "Processing atelier authorization…" : `Authorise & Pay · £${total}`}
                </button>
              </div>
            )}

            {/* APPLE PAY BUTTON */}
            {paymentMethod === "apple_pay" && (
              <div className="border border-border p-6 sm:p-8 space-y-6 bg-secondary/20 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <p className="eyebrow text-xs text-accent">Apple Pay Instant Checkout</p>
                  <p className="text-sm font-light text-muted-foreground">
                    Complete your purchase instantly with Touch ID or Face ID. Shipping address and payment method will be verified automatically from your Apple Wallet.
                  </p>
                  <div className="text-xs text-muted-foreground font-mono bg-background p-3 border border-border/60">
                    Express Dispatch · London Atelier Delivery in 2-3 Business Days
                  </div>
                </div>

                <button
                  type="button"
                  disabled={processing !== null || currentStock <= 0}
                  onClick={() => handleCompletePayment("apple_pay")}
                  className="w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 bg-black text-white rounded-md hover:bg-zinc-900 transition-colors disabled:opacity-50 shadow-lg text-sm font-medium tracking-wide"
                >
                  {processing === "apple_pay" ? (
                    "Authenticating with Apple Pay…"
                  ) : (
                    <>
                      <AppleLogo /> Pay with Apple Pay · £{total}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* GOOGLE PAY BUTTON */}
            {paymentMethod === "google_pay" && (
              <div className="border border-border p-6 sm:p-8 space-y-6 bg-secondary/20 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <p className="eyebrow text-xs text-accent">Google Pay 1-Click Checkout</p>
                  <p className="text-sm font-light text-muted-foreground">
                    Authorise quickly using your Google Account. Your delivery address and payment cards on Google Wallet are securely transferred.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={processing !== null || currentStock <= 0}
                  onClick={() => handleCompletePayment("google_pay")}
                  className="w-full max-w-md mx-auto flex items-center justify-center gap-2.5 py-4 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-md text-sm font-medium tracking-wide"
                >
                  {processing === "google_pay" ? (
                    "Connecting to Google Pay…"
                  ) : (
                    <>
                      <GoogleLogo /> Buy with Google Pay · £{total}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* PAYPAL BUTTON */}
            {paymentMethod === "paypal" && (
              <div className="border border-border p-6 sm:p-8 space-y-6 bg-secondary/20 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <p className="eyebrow text-xs text-accent">PayPal Express Checkout</p>
                  <p className="text-sm font-light text-muted-foreground">
                    Log in to your PayPal account to pay with your balance, linked bank account, or PayPal Credit.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={processing !== null || currentStock <= 0}
                  onClick={() => handleCompletePayment("paypal")}
                  className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 bg-[#FFC439] text-[#003087] rounded-full hover:brightness-95 transition-all disabled:opacity-50 shadow-md text-sm font-bold tracking-wide"
                >
                  {processing === "paypal" ? (
                    "Redirecting to PayPal…"
                  ) : (
                    <>
                      <PayPalLogo />
                    </>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm" role="alert">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-muted-foreground/80 font-light pt-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Includes 12-Month Atelier Craftsmanship Warranty and complimentary worldwide express delivery.</span>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="bg-secondary/40 border border-border/80 p-8 self-start space-y-6">
            <p className="eyebrow text-accent">Order Summary</p>

            <div className="flex gap-4 pb-6 border-b border-border/60">
              <div className="w-24 h-28 bg-background border border-border/40 overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl leading-tight">{product.name}</h2>
                <p className="text-xs text-muted-foreground font-light mt-1">{product.finish}</p>
                <p className="font-display text-lg mt-3">{product.price}</p>
                {product.compareAtPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-1">{product.compareAtPrice}</span>
                )}
              </div>
            </div>

            <dl className="space-y-3 py-2 text-sm font-light">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>£{product.priceValue}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Worldwide Express Courier</dt>
                <dd className="text-accent font-medium">Complimentary</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated Duties & Tax (10%)</dt>
                <dd>£{tax}</dd>
              </div>
            </dl>

            <div className="flex items-baseline justify-between pt-6 border-t border-border/60">
              <span className="eyebrow text-foreground">Total</span>
              <span className="font-display text-3xl font-light">£{total}</span>
            </div>

            <div className="pt-4 border-t border-border/40 text-[11px] text-muted-foreground font-light space-y-2">
              <p>• Hand-finished in London & Paris</p>
              <p>• Ships within 24-48 hours in luxury presentation box</p>
              <p>• 14-day return privilege</p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current inline-block" aria-hidden="true">
      <path d="M16.365 12.65c-.02-2.06 1.683-3.05 1.76-3.098-.96-1.404-2.456-1.597-2.99-1.618-1.273-.128-2.485.75-3.132.75-.647 0-1.643-.732-2.703-.711-1.39.02-2.673.808-3.39 2.052-1.446 2.506-.37 6.215 1.038 8.247.687.99 1.505 2.103 2.582 2.063 1.036-.041 1.428-.67 2.68-.67 1.252 0 1.604.67 2.703.65 1.117-.02 1.823-1.013 2.508-2.006.79-1.15 1.115-2.265 1.135-2.323-.025-.012-2.18-.836-2.2-3.336zM14.4 6.42c.572-.694.957-1.66.852-2.622-.823.033-1.82.547-2.41 1.24-.53.616-.993 1.6-.868 2.545.918.07 1.854-.469 2.426-1.163z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 inline-block" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function PayPalLogo() {
  return (
    <span className="font-display italic text-lg normal-case tracking-normal">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009cde]">Pal</span>
    </span>
  );
}
