import promenadeChrome from "@/assets/promenade-black.jpeg.asset.json";
import promenadeTrio from "@/assets/promenade-trio.jpeg.asset.json";
import aurumChrome from "@/assets/aurum-chrome-piece.jpg.asset.json";

export type Product = {
  slug: string;
  image: string;
  gallery: string[];
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
    image: promenadeChrome.url,
    gallery: [promenadeChrome.url],
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
    image: promenadeTrio.url,
    gallery: [promenadeTrio.url],
    name: "The Trio",
    finish: "Polished chrome · ivory inlay",
    price: "£200",
    priceValue: 200,
    description:
      "The collector's set. Three hand-finished pieces in polished chrome with ivory inlay, presented together — the full ritual in one quiet gesture.",
  },
  {
    slug: "aurum",
    image: aurumChrome.url,
    gallery: [aurumChrome.url],
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
