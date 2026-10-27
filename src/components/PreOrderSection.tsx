import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import preorderProduct from "@/assets/preorder-product.jpeg.asset.json";

// Launch target: 4 December 2026 at 09:00 UTC
export const LAUNCH_DATE = new Date("2026-12-04T09:00:00Z");

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, ready: now !== null };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[64px] md:min-w-[80px]">
      <span className="font-display text-3xl md:text-5xl tabular-nums leading-none">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="eyebrow text-[10px] md:text-xs mt-2 opacity-70">{label}</span>
    </div>
  );
}

export function PreOrderSection() {
  const { days, hours, minutes, seconds, ready } = useCountdown(LAUNCH_DATE);

  return (
    <section className="bg-accent text-accent-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left — pre-order details */}
        <div className="order-last lg:order-first flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24">
          <p className="eyebrow mb-6 opacity-70">Pre-Order · Before Launch</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-xl">
            A quieter piece,
            <br />
            <em className="italic font-light">reserved for you.</em>
          </h2>

          <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed opacity-80">
            The same 113g of hand-finished brass, ready to ship the first week of
            December. Secure yours before the launch and skip the queue.
          </p>

          <div className="mt-10 flex gap-3 md:gap-6" aria-live="polite">
            <Unit value={ready ? days : 0} label="Days" />
            <Unit value={ready ? hours : 0} label="Hours" />
            <Unit value={ready ? minutes : 0} label="Minutes" />
            <Unit value={ready ? seconds : 0} label="Seconds" />
          </div>

          <div className="mt-12">
            <Link
              to="/pre-order"
              className="eyebrow inline-flex items-center gap-3 border-b border-current pb-2 hover:opacity-70 transition-opacity"
            >
              Reserve Your Collection
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right — product image */}
        <div className="order-first lg:order-last relative min-h-[60vh] lg:min-h-[80vh] overflow-hidden">
          <img
            src={preorderProduct.url}
            alt="Aurum Haus bag holder in use — hand-finished antique gold"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
