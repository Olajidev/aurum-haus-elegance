import { useEffect, useState, type MouseEvent } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);

  const go = (d: number) => setActive((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`aspect-square w-20 shrink-0 overflow-hidden bg-secondary border transition-all ${
              i === active ? "border-foreground opacity-100" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div
        className="relative flex-1 bg-secondary aspect-[3/4] overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setLightbox(true)}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${name} view ${i + 1}`}
            style={{ transformOrigin: origin }}
            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            } ${i === active && zoom ? "scale-[1.8]" : "scale-100"}`}
          />
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >←</button>
        <button
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >→</button>
        <span className="absolute bottom-3 left-3 eyebrow bg-background/90 text-foreground px-3 py-1.5">
          {active + 1} / {images.length} · Hover to zoom
        </span>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(false)}
        >
          <img
            src={images[active]}
            alt={name}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="absolute left-6 text-background text-3xl">←</button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="absolute right-6 text-background text-3xl">→</button>
          <button onClick={() => setLightbox(false)} aria-label="Close" className="absolute top-6 right-6 text-background eyebrow">Close ✕</button>
        </div>
      )}
    </div>
  );
}
