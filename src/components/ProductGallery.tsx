import { useEffect, useState, type MouseEvent } from "react";

export function ProductGallery({
  images,
  name,
  finish,
}: {
  images: string[];
  name: string;
  finish?: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);

  // Reset to first image whenever product/images change
  useEffect(() => {
    setActive(0);
  }, [images]);

  const go = (d: number) =>
    setActive((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${
        ((e.clientY - r.top) / r.height) * 100
      }%`
    );
  };

  const multi = images.length > 1;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* MAIN LARGE VIEWER */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-h-[750px] bg-[#161616] overflow-hidden cursor-zoom-in group border border-border/40"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setLightbox(true)}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${name} — ${finish || "Finish"} view ${i + 1}`}
            style={{ transformOrigin: origin }}
            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            } ${i === active && zoom ? "scale-[1.8]" : "scale-100"}`}
          />
        ))}

        {/* Feature badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          <span className="eyebrow bg-background/90 backdrop-blur-md text-foreground px-3 py-1.5 text-[10px] tracking-widest border border-border/50 uppercase">
            Tested to 10kg / 22 lbs
          </span>
        </div>

        {/* Navigation arrows */}
        {multi && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/85 backdrop-blur-md text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all shadow-md"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/85 backdrop-blur-md text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all shadow-md"
            >
              →
            </button>
          </>
        )}

        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
          <span className="eyebrow bg-background/90 backdrop-blur-md text-foreground px-3 py-1.5 text-[10px] tracking-widest border border-border/50">
            {multi ? `${active + 1} / ${images.length} · ` : ""}Hover to zoom
          </span>
        </div>
      </div>

      {/* THUMBNAILS CAROUSEL / ROW */}
      {multi && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square w-20 sm:w-24 shrink-0 overflow-hidden bg-secondary border transition-all ${
                i === active
                  ? "border-foreground ring-1 ring-foreground opacity-100 scale-[0.98]"
                  : "border-border/60 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(false)}
        >
          <img
            src={images[active]}
            alt={name}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
          {multi && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous"
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full text-2xl transition-colors"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full text-2xl transition-colors"
              >
                →
              </button>
            </>
          )}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-6 right-6 text-white text-sm eyebrow bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
}
