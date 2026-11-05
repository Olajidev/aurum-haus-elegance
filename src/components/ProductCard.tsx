import { Link } from "@tanstack/react-router";

type Props = {
  slug?: string;
  image: string;
  name: string;
  finish?: string;
  price: string;
  compareAtPrice?: string;
};

export function ProductCard({
  slug,
  image,
  name,
  finish: _finish,
  price,
  compareAtPrice,
}: Props) {
  const to = slug ? `/product/${slug}` : "#";

  return (
    <Link to={to} className="group block cursor-pointer">
      <article className="space-y-4">
        {/* BIG HIGH-IMPACT IMAGE WRAPPER (CLEAN — NO BADGES) */}
        <div className="relative overflow-hidden bg-[#FBFBFA] border border-border/40 aspect-[3/4]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* HOVER QUICK VIEW STRIP */}
          <div className="absolute inset-x-3 bottom-3 bg-foreground/90 backdrop-blur-sm text-background py-3 text-center text-xs tracking-widest uppercase font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View Piece & Colors →
          </div>
        </div>

        {/* TYPOGRAPHY UNDERNEATH (CLEAN QUIET LUXURY — NO STARS OR REVIEW COUNTS) */}
        <div className="text-center space-y-1.5 pt-0.5">
          <h3 className="font-display text-sm tracking-widest uppercase text-foreground group-hover:text-accent transition-colors font-medium">
            {name.toUpperCase()}
          </h3>

          {/* PRICE BLOCK */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium text-sm text-foreground">
              {price}
            </span>
            {compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through font-light">
                {compareAtPrice}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
