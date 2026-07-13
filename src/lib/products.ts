import trio from "@/assets/trio.jpg";
import goldDetail from "@/assets/gold-detail.jpg";
import whiteOverhead from "@/assets/white-overhead.jpg";

export type Product = {
  slug: string;
  image: string;
  name: string;
  finish: string;
  price: string;
  priceValue: number;
  launchPrice?: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "ivora",
    image: whiteOverhead,
    name: "Ivora",
    finish: "Polished chrome · ivory inlay",
    price: "£70",
    priceValue: 70,
    launchPrice: "£75",
    description:
      "A study in restraint. Mirror-polished chrome cradles a hand-set ivory inlay — the lightest tone in the collection, made for porcelain tables and quiet rooms.",
  },
  {
    slug: "noir",
    image: trio,
    name: "Noir",
    finish: "Black lacquer · onyx leather",
    price: "£70",
    priceValue: 70,
    launchPrice: "£75",
    description:
      "Seven coats of hand-applied black lacquer, finished with a wrap of vegetable-tanned onyx leather. A piece that absorbs light rather than reflecting it.",
  },
  {
    slug: "aurum",
    image: goldDetail,
    name: "Aurum",
    finish: "24k vermeil · antique gold",
    price: "£70",
    priceValue: 70,
    launchPrice: "£75",
    description:
      "The house signature. Solid brass plated in 24k vermeil and rubbed to an antique patina — warm, weighted, and quietly unmistakable.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
