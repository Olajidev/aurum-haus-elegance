import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";

import heroOutdoor from "@/assets/hero-outdoor.jpg.asset.json";
import aurumProductHero from "@/assets/aurum-product-hero.jpg.asset.json";
import himCafeNew from "@/assets/him-cafe-new.png.asset.json";
import heirloomWarm from "@/assets/heirloom-warm.png.asset.json";
import packagingImg from "@/assets/aurum-packaging.jpg.asset.json";
import slideBagRestaurant from "@/assets/slideshow-bag-restaurant.png.asset.json";

const slides = [
  {
    image: heroOutdoor.url,
    alt: "Aurum Haus bag holder in an outdoor setting",
    title: "Out in the world",
    num: "01",
  },
  {
    image: aurumProductHero.url,
    alt: "A close-up of the Aurum Haus signature bag holder",
    title: "The finer details",
    num: "02",
  },
  {
    image: himCafeNew.url,
    alt: "Aurum Haus bag holder accompanying a café visit",
    title: "An everyday ritual",
    num: "03",
  },
  {
    image: heirloomWarm.url,
    alt: "Aurum Haus bag holder in warm golden-hour light",
    title: "A modern heirloom",
    num: "04",
  },
  {
    image: packagingImg.url,
    alt: "Aurum Haus signature gift packaging",
    title: "Beautifully presented",
    num: "05",
  },
  {
    image: slideBagRestaurant.url,
    alt: "Aurum Haus bag holder suspending a bag at a restaurant table",
    title: "A seat at the table",
    num: "06",
  },
];

export function AurumJournalCarousel() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const next = (index + slides.length) % slides.length;
    setActive(next);
    if (scrollRef.current) {
      const children = scrollRef.current.children;
      if (children[next]) {
        (children[next] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-7">
          <div>
            <p className="eyebrow mb-3 text-muted-foreground">The Aurum journal</p>
            <h2 id="gallery-heading" className="font-display text-4xl leading-tight tracking-normal md:text-5xl">
              Life, <em className="italic font-light">with Aurum.</em>
            </h2>
          </div>
          <span aria-live="polite" aria-label={`Photograph ${active + 1} of 6`} className="text-xs tabular-nums text-muted-foreground font-mono">
            0{active + 1} — 06
          </span>
        </div>

        {/* CAROUSEL REGION */}
        <div className="relative" role="region" aria-roledescription="carousel" aria-label="Aurum Haus photo gallery">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 lg:gap-8 pb-4"
          >
            {slides.map((s, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[48%] lg:basis-[31%] snap-start"
              >
                <figure className="min-w-0">
                  <div
                    onClick={() => setLightbox(i)}
                    className="group relative block aspect-[4/5] md:aspect-auto md:h-[380px] lg:h-[480px] w-full overflow-hidden bg-muted cursor-pointer"
                  >
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center bg-background/90 text-foreground transition-opacity opacity-0 group-hover:opacity-100 shadow-md">
                      <Maximize2 className="h-4 w-4 stroke-[1.5]" />
                    </span>
                  </div>
                  <figcaption className="mt-4 flex items-center justify-between gap-3 text-sm text-foreground">
                    <span className="font-display text-base">{s.title}</span>
                    <span className="text-xs tabular-nums text-muted-foreground font-mono">{s.num}</span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          {/* CONTROLS (PILLS + ARROWS) */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            {/* Slide Indicator Pills */}
            <div className="flex gap-2 items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to photograph ${i + 1}`}
                  className="py-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollTo(active - 1)}
                aria-label="Previous gallery slide"
                className="h-10 w-10 border border-border bg-background hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-4 w-4 stroke-[1.5]" />
              </button>
              <button
                onClick={() => scrollTo(active + 1)}
                aria-label="Next gallery slide"
                className="h-10 w-10 border border-border bg-background hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <ArrowRight className="h-4 w-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <img
            src={slides[lightbox].image}
            alt={slides[lightbox].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + slides.length) % slides.length);
            }}
            aria-label="Previous"
            className="absolute left-6 text-white text-3xl bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % slides.length);
            }}
            aria-label="Next"
            className="absolute right-6 text-white text-3xl bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            →
          </button>
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-white eyebrow bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}
