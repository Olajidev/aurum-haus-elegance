import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
};

interface HeroDissolveProps {
  slides: HeroSlide[];
  interval?: number;
}

export function HeroDissolve({ slides, interval = 6500 }: HeroDissolveProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [active, slides.length, interval]);

  return (
    <section className="relative h-[88vh] min-h-[640px] overflow-hidden">
      {/* Image layers — dissolving cross-fade with slow Ken Burns drift */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-full object-cover"
            style={{
              transform: i === active ? "scale(1.06)" : "scale(1)",
              transition: "transform 8000ms ease-out",
            }}
          />
        </div>
      ))}

      {/* Vignette with subtle left gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-obsidian/20 to-transparent pointer-events-none" />

      {/* Copy layers — cross-fade with slight lift */}
      <div className="relative h-full mx-auto max-w-[1500px] px-6 lg:px-12 flex flex-col justify-end pb-16 sm:pb-20 text-alabaster z-10">
        <div className="relative min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-x-0 bottom-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : "translateY(14px)",
                pointerEvents: i === active ? "auto" : "none",
              }}
              aria-hidden={i !== active}
            >
              {s.eyebrow && (
                <p className="eyebrow text-accent/90 mb-3 tracking-[0.25em] text-xs font-medium uppercase drop-shadow-sm">
                  {s.eyebrow}
                </p>
              )}
              {s.title && (
                <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-2xl font-normal drop-shadow-md">
                  {s.title}
                </div>
              )}
              {s.body && (
                <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-alabaster/90 font-light leading-relaxed drop-shadow-sm">
                  {s.body}
                </p>
              )}
              {(s.primary || s.secondary) && (
                <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                  {s.primary && (
                    <Link
                      to={s.primary.to}
                      className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#F5F4F0] text-[#1A1A1A] hover:bg-accent hover:text-foreground text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm"
                    >
                      {s.primary.label}
                    </Link>
                  )}
                  {s.secondary && (
                    <Link
                      to={s.secondary.to}
                      className="px-6 sm:px-8 py-3.5 sm:py-4 border border-alabaster/70 bg-black/25 text-alabaster hover:bg-alabaster/20 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm"
                    >
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators — hairlines */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-px w-10 bg-alabaster/30 relative overflow-hidden"
            >
              <span
                className="absolute inset-0 bg-alabaster origin-left"
                style={{
                  transform:
                    i === active ? "scaleX(1)" : i < active ? "scaleX(1)" : "scaleX(0)",
                  transition:
                    i === active ? `transform ${6500}ms linear` : "transform 600ms ease",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
