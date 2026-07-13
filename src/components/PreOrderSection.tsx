import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// Launch target: second week of August 2026 (Friday, Aug 14, 2026 at 09:00 UTC)
export const LAUNCH_DATE = new Date("2026-08-14T09:00:00Z");

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

export function PreOrderSection({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { days, hours, minutes, seconds, ready } = useCountdown(LAUNCH_DATE);
  const bg = variant === "dark" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground";

  return (
    <section className={bg}>
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12 py-16 lg:py-20 text-center">
        <p className="eyebrow text-accent mb-4">Pre-Order · Before Launch</p>
        <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-2xl mx-auto">
          Ships the second week of <em className="italic font-light">August.</em>
        </h2>

        <div className="mt-10 flex justify-center gap-3 md:gap-6" aria-live="polite">
          <Unit value={ready ? days : 0} label="Days" />
          <Unit value={ready ? hours : 0} label="Hours" />
          <Unit value={ready ? minutes : 0} label="Minutes" />
          <Unit value={ready ? seconds : 0} label="Seconds" />
        </div>

        <div className="mt-10">
          <Link to="/pre-order" className="inline-block px-8 py-4 bg-foreground text-background hover:bg-accent hover:text-foreground transition-colors eyebrow">
            Reserve Your Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
