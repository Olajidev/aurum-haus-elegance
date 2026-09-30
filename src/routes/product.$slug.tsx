import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProduct, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aurum Haus` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Aurum Haus` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-32 flex-1">
        <p className="eyebrow text-accent mb-4">Not found</p>
        <h1 className="font-display text-5xl mb-6">This piece is no longer available.</h1>
        <Link to="/shop" className="eyebrow border-b border-foreground/30 pb-1">
          Return to the collection →
        </Link>
      </section>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-12">
      <p>{error.message}</p>
      <button onClick={reset} className="underline">Try again</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pt-12 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <ProductGallery key={product.slug} images={product.gallery} name={product.name} />

        <div className="flex flex-col justify-center max-w-md">
          <p className="eyebrow text-accent mb-4">Maison Aurum</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-3">
            {product.name}
          </h1>
          <p className="text-muted-foreground font-light mb-8">{product.finish}</p>
          <p className="font-display text-3xl mb-10">{product.price}</p>

          <p className="text-foreground/80 font-light leading-relaxed mb-10">
            {product.description}
          </p>

          <Link
            to="/checkout/$slug"
            params={{ slug: product.slug }}
            className="block text-center px-8 py-4 bg-foreground text-background eyebrow hover:bg-accent hover:text-foreground transition-colors"
          >
            Proceed to checkout
          </Link>

          <div className="mt-10 pt-8 border-t border-border space-y-3 text-sm text-muted-foreground font-light">
            <p>Complimentary worldwide shipping</p>
            <p>Presented in a hand-stitched linen case</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <p className="eyebrow text-accent mb-8">Also from the collection</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-background mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-lg">{p.name}</h3>
                <p className="text-sm text-muted-foreground font-light">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
