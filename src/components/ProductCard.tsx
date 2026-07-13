import { Link } from "@tanstack/react-router";

type Props = {
  slug?: string;
  image: string;
  name: string;
  finish: string;
  price: string;
};

export function ProductCard({ slug, image, name, finish, price }: Props) {
  const to = slug ? `/product/${slug}` : "#";
  return (
    <Link to={to} className="group block cursor-pointer">
      <article>
        <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-5">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 right-4 bg-background/95 text-foreground py-3 eyebrow text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            View piece
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-display text-xl leading-tight">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1 font-light">{finish}</p>
          </div>
          <span className="font-display text-lg">{price}</span>
        </div>
      </article>
    </Link>
  );
}
