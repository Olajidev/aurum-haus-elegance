import { useEffect, useState, useRef } from "react";

type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

interface HeroSlideshowProps {
  slides: Slide[];
  interval?: number;
}

export function HeroSlideshow({ slides, interval = 5500 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const current = slides[active];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (current.type === "video") {
      const v = videoRefs.current[active];
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
        const advance = () => setActive((i) => (i + 1) % slides.length);
        v.onended = advance;
        // fallback in case onended doesn't fire
        timeout = setTimeout(advance, 8000);
      }
    } else {
      timeout = setTimeout(
        () => setActive((i) => (i + 1) % slides.length),
        interval
      );
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [active, slides, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          {slide.type === "image" ? (
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              style={{
                transform: i === active ? "scale(1.05)" : "scale(1)",
                transition: "transform 7000ms ease-out",
              }}
            />
          ) : (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={slide.src}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {/* progress indicators — minimal hairlines */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-px w-10 bg-alabaster/40 relative overflow-hidden"
          >
            <span
              className="absolute inset-0 bg-alabaster origin-left"
              style={{
                transform: i === active ? "scaleX(1)" : i < active ? "scaleX(1)" : "scaleX(0)",
                transition: i === active ? "transform 5500ms linear" : "transform 600ms ease",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
