import { useState } from "react";
import { Image as ImageIcon, Sparkles } from "lucide-react";

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  filename: string;
  recommendedDimensions: string;
  description: string;
  aspectRatio?: string;
  className?: string;
  overlayContent?: React.ReactNode;
  priority?: boolean;
}

export function ImagePlaceholder({
  src,
  alt = "Aurum Haus visual",
  filename,
  recommendedDimensions,
  description,
  aspectRatio = "aspect-[4/5]",
  className = "",
  overlayContent,
}: ImagePlaceholderProps) {
  const [loadError, setLoadError] = useState(false);

  // If a valid src exists and didn't error, render the actual image
  const hasValidImage = src && !loadError && !src.includes("placeholder-needed");

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#121212] border border-border/40 group ${className}`}
    >
      {hasValidImage ? (
        <>
          <img
            src={src}
            alt={alt}
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {overlayContent}
        </>
      ) : (
        /* ELEGANT ATELIER PLACEHOLDER BOX */
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#181818] via-[#121212] to-[#0D0D0D] text-alabaster select-none">
          {/* Top metadata tag */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-accent border border-accent/30 text-[10px] tracking-widest uppercase font-mono">
              <Sparkles className="h-3 w-3 stroke-[1.5]" />
              Image Needed
            </span>
            <span className="text-[11px] font-mono text-muted-foreground/80 tracking-wider">
              {recommendedDimensions}
            </span>
          </div>

          {/* Center icon & filename prompt */}
          <div className="my-auto text-center space-y-3 px-2">
            <div className="h-12 w-12 mx-auto rounded-full bg-secondary/60 border border-border/50 flex items-center justify-center text-accent/80 group-hover:text-accent group-hover:border-accent transition-colors">
              <ImageIcon className="h-6 w-6 stroke-[1.25]" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-light">
                Save file as
              </p>
              <p className="font-mono text-xs sm:text-sm font-semibold text-accent tracking-wider bg-black/40 py-1.5 px-3 rounded border border-border/40 inline-block">
                {filename}
              </p>
            </div>
            <p className="text-xs text-alabaster/75 font-light leading-relaxed max-w-sm mx-auto">
              {description}
            </p>
          </div>

          {/* Bottom subtle note */}
          <div className="text-center pt-2 border-t border-border/30">
            <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase">
              Drop file into root folder or src/assets
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
