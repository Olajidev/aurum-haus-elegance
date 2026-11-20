import promenadeChrome from "@/assets/promenade-black.jpeg.asset.json";
import promenadeTrio from "@/assets/promenade-trio.jpeg.asset.json";
import aurumGold from "@/assets/aurum-gold-hook.png.asset.json";
import aurumSilver from "@/assets/aurum-silver-chrome.png.asset.json";
import aurumOnyx from "@/assets/aurum-gold-onyx.png.asset.json";
import aurumPackaging from "@/assets/aurum-packaging.jpg.asset.json";
import aurumProductHero from "@/assets/aurum-product-hero.jpg.asset.json";
import cafeLifestyle from "@/assets/cafe-lifestyle.png.asset.json";
import heirloomWarm from "@/assets/heirloom-warm.png.asset.json";
import slideBagRestaurant from "@/assets/slideshow-bag-restaurant.png.asset.json";
import aurumChromePiece from "@/assets/aurum-chrome-piece.jpg.asset.json";
import pieceAlabaster from "@/assets/piece-alabaster.jpg.asset.json";
import pieceObsidian from "@/assets/piece-obsidian.jpg.asset.json";
import promenadeChromeReal from "@/assets/promenade-chrome.png.asset.json";
import goldDetail from "@/assets/gold-detail.jpg";
import trioAlt from "@/assets/trio-alt.jpg";
import trioImg from "@/assets/trio.jpg";
import silverOutdoor from "@/assets/silver-outdoor.jpg";
import whiteOverhead from "@/assets/white-overhead.jpg";

import solPrimary from "@/assets/products/sol-primary.jpg";
import auraPrimary from "@/assets/products/aura-primary.jpg";
import auraWalnut from "@/assets/products/aura-walnut.jpg";
import noirPrimary from "@/assets/products/noir-primary.jpg";
import noirWalnut from "@/assets/products/noir-walnut.jpg";
import onyxPrimary from "@/assets/products/onyx-primary.jpg";
import medallionsFlatlay from "@/assets/products/medallions-flatlay.jpg";
import aurumCollectionMedallions from "@/assets/aurum-collection-medallions.jpg";

export {
  solPrimary,
  auraPrimary,
  auraWalnut,
  noirPrimary,
  noirWalnut,
  onyxPrimary,
  medallionsFlatlay,
  aurumCollectionMedallions,
};

export type Product = {
  slug: string;
  image: string;
  gallery: string[];
  name: string;
  finish: string;
  finishCategory: string;
  swatchGradient: string;
  price: string;
  priceValue: number;
  compareAtPrice?: string;
  launchPrice?: string;
  description: string;
  leadParagraph: string;
  specs: string[];
  measurements: {
    width: string;
    height: string;
    hookDrop: string;
    weight: string;
    capacity: string;
  };
  stock?: number;
};

export const hookColors = [
  {
    slug: "aurum-gold",
    label: "Auré",
    colorName: "Aurum Haus Auré (Satin Gold)",
    swatchGradient: "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #92400E 100%)",
  },
  {
    slug: "aurum",
    label: "Écru",
    colorName: "Aurum Haus Écru (Refined Ivory)",
    swatchGradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)",
  },
  {
    slug: "aurum-noir",
    label: "Rêve Noir",
    colorName: "Aurum Haus Rêve Noir (Timeless Black)",
    swatchGradient: "linear-gradient(135deg, #374151 0%, #1F2937 50%, #000000 100%)",
  },
  {
    slug: "ivora",
    label: "Nuit Dorée",
    colorName: "Aurum Haus Nuit Dorée (Black & Gold)",
    swatchGradient: "linear-gradient(135deg, #111827 0%, #D4AF37 100%)",
  },
];

export const products: Product[] = [
  {
    slug: "aurum-gold",
    image: solPrimary,
    gallery: [
      solPrimary,
      aurumCollectionMedallions,
    ],
    name: "Aurum Haus Auré",
    finish: "Satin Gold · Gold rim · Satin-gold surface · White monogram",
    finishCategory: "Auré",
    swatchGradient: "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #92400E 100%)",
    price: "£80",
    priceValue: 80,
    launchPrice: "£80",
    stock: 50,
    description:
      "An expression of understated elegance. Featuring a warm satin-gold surface framed by a polished gold finish, Auré is distinguished by the signature Aurum Haus monogram in crisp white.",
    leadParagraph:
      "The bold one. A warm mustard top with a gold rim and a crisp white monogram. Bright enough to stand out, elegant enough to gift. Designed to keep your handbag elevated and within reach, Auré seamlessly combines everyday functionality with timeless sophistication.",
    specs: [
      "Load tested to 7.5kg (16.5 lbs) - Tested for strength and everyday reliability",
      "Refined Gold Finish - A satin-gold surface complemented by polished gold detailing",
      "Compact & Portable - Designed for effortless everyday use",
      "Secure Hold - Designed to keep your handbag elevated and within reach",
      "Branding: Signature Aurum Haus Monogram",
      "Accessories: Aurum Haus Protective Pouch & Cleaning Cloth",
      "Complimentary UK delivery, 12-Month Warranty & 14-Day Easy Returns",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g",
      capacity: "7.5 kg / 16.5 lbs",
    },
  },
  {
    slug: "aurum",
    image: auraPrimary,
    gallery: [
      auraPrimary,
      auraWalnut,
      aurumCollectionMedallions,
    ],
    name: "Aurum Haus Écru",
    finish: "Refined Ivory · Silver rim · Ivory leather-look surface · Black monogram",
    finishCategory: "Écru",
    swatchGradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)",
    price: "£80",
    priceValue: 80,
    launchPrice: "£80",
    stock: 45,
    description:
      "A celebration of effortless refinement. Featuring a soft ivory leather-look surface, polished silver detailing and the signature Aurum Haus monogram in contrasting black, Écru embodies timeless elegance.",
    leadParagraph:
      "Beautifully considered, effortlessly versatile. Featuring a soft ivory leather-look surface, polished silver detailing and the signature Aurum Haus monogram in contrasting black. Designed to keep your most treasured handbag pristine and off the floor.",
    specs: [
      "Load tested to 7.5kg (16.5 lbs) - Tested for strength and everyday reliability",
      "Refined Silver Finish - Polished silver detailing with soft ivory surface",
      "Compact & Portable - Designed for effortless everyday carry",
      "Secure Hold - Designed to keep your handbag elevated and within reach",
      "Branding: Signature Aurum Haus Monogram in contrasting black",
      "Accessories: Aurum Haus Protective Pouch & Cleaning Cloth",
      "Complimentary UK delivery, 12-Month Warranty & 14-Day Easy Returns",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g",
      capacity: "7.5 kg / 16.5 lbs",
    },
  },
  {
    slug: "aurum-noir",
    image: noirPrimary,
    gallery: [
      noirPrimary,
      noirWalnut,
      aurumCollectionMedallions,
    ],
    name: "Aurum Haus Rêve Noir",
    finish: "Timeless Black · Black rim · Black leather-look surface · White monogram",
    finishCategory: "Rêve Noir",
    swatchGradient: "linear-gradient(135deg, #374151 0%, #1F2937 50%, #000000 100%)",
    price: "£80",
    priceValue: 80,
    launchPrice: "£80",
    stock: 35,
    description:
      "Understated by design, effortless in style. Featuring a sleek black finish, a rich leather-look surface and the signature Aurum Haus monogram in crisp white, Rêve Noir embodies contemporary sophistication.",
    leadParagraph:
      "A timeless essential for everyday elegance. Understated by design, effortless in style. Featuring a sleek black finish, a rich leather-look surface and the signature Aurum Haus monogram in crisp white. Designed to keep your handbag gracefully suspended wherever you dine.",
    specs: [
      "Load tested to 7.5kg (16.5 lbs) - Tested for strength and everyday reliability",
      "Sleek Black Finish - Rich leather-look surface with crisp white monogram",
      "Compact & Portable - Folds flat for clutch bags and pockets",
      "Secure Hold - High-grade protective anti-slip table pad",
      "Branding: Signature Aurum Haus Monogram in crisp white",
      "Accessories: Aurum Haus Protective Pouch & Cleaning Cloth",
      "Complimentary UK delivery, 12-Month Warranty & 14-Day Easy Returns",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g",
      capacity: "7.5 kg / 16.5 lbs",
    },
  },
  {
    slug: "ivora",
    image: onyxPrimary,
    gallery: [
      onyxPrimary,
      aurumCollectionMedallions,
    ],
    name: "Aurum Haus Nuit Dorée",
    finish: "Black & Gold · Gold rim · Black leather-look surface · Dotted-gold monogram",
    finishCategory: "Nuit Dorée",
    swatchGradient: "linear-gradient(135deg, #111827 0%, #D4AF37 100%)",
    price: "£90",
    priceValue: 90,
    launchPrice: "£90",
    stock: 25,
    description:
      "A signature expression of modern elegance. Featuring a polished gold finish, a rich black leather-look surface and the distinctive Aurum Haus monogram in delicate dotted gold, Nuit Dorée brings effortless sophistication to every setting.",
    leadParagraph:
      "An enduring statement of refined luxury. Featuring a polished gold finish, a rich black leather-look surface and the distinctive Aurum Haus monogram in delicate dotted gold. Made for statement tables and delicate designer bags.",
    specs: [
      "Load tested to 7.5kg (16.5 lbs) - Tested for strength and everyday reliability",
      "Polished Gold Finish - Rich black leather-look surface with dotted-gold monogram",
      "Compact & Portable - Folds smoothly into protective pouch",
      "Secure Hold - Protective table grip safe on glass, marble, and wood",
      "Branding: Distinctive Aurum Haus monogram in delicate dotted gold",
      "Accessories: Aurum Haus Protective Pouch & Cleaning Cloth",
      "Complimentary UK delivery, 12-Month Warranty & 14-Day Easy Returns",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g",
      capacity: "7.5 kg / 16.5 lbs",
    },
  },
  {
    slug: "noir",
    image: medallionsFlatlay,
    gallery: [
      medallionsFlatlay,
      solPrimary,
      auraPrimary,
      noirPrimary,
      onyxPrimary,
      aurumCollectionMedallions,
    ],
    name: "The Trio Suite",
    finish: "Collector's set · 3 signature finishes",
    finishCategory: "The Trio Set",
    swatchGradient: "linear-gradient(135deg, #D4AF37 0%, #D1D5DB 50%, #111827 100%)",
    price: "£220",
    priceValue: 220,
    stock: 15,
    description:
      "The collector's set. Three hand-finished pieces in polished chrome, satin gold, and black & gold — presented together in our deluxe presentation case.",
    leadParagraph:
      "The complete collector's suite. Three hand-finished pieces presented together in our signature presentation box. The ultimate luxury gift for yourself or someone whose collection demands the best.",
    specs: [
      "Includes 3 distinct hand-finished pieces from Edit n°1",
      "Each piece tested to support up to 7.5 kg / 16.5 lbs",
      "Includes Aurum Haus protective pouches and cleaning cloths",
      "Special collector's suite price",
      "Complimentary UK delivery",
      "12-Month Atelier Warranty on all pieces",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches (per piece)",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g each",
      capacity: "7.5 kg / 16.5 lbs each",
    },
  },
  {
    slug: "rose-gold",
    image: aurumGold.url,
    gallery: [
      aurumGold.url,
      aurumProductHero.url,
      goldDetail,
      heirloomWarm.url,
      slideBagRestaurant.url,
      aurumPackaging.url,
    ],
    name: "Aurum Rose Gold",
    finish: "Rose gold plating · warm blush sheen",
    finishCategory: "Rose Gold",
    swatchGradient: "linear-gradient(135deg, #FAD0C4 0%, #E89B88 50%, #C46D5E 100%)",
    price: "£80",
    priceValue: 80,
    launchPrice: "£80",
    description:
      "Embrace modern femininity and classic allure with the Aurum Haus in Rose Gold, featuring stunning rose gold-color plating hand-polished to a mirror luster.",
    leadParagraph:
      "Embrace the modern femininity and classic allure of the Aurum Haus in Rose Gold, featuring a stunning rose gold-color plating over solid brass. The Aurum Haus® bag holder is specifically engineered for your precious designer handbags. The innovative atelier design combined with weighted solid brass makes Aurum safe to use on delicate evening clutches and structured heavier bags alike.",
    specs: [
      "Stunning Rose Gold electroplating with anti-tarnish protective coat",
      "Holds up to 7.5 kg / 16.5 lbs on any standard table edge",
      "Tried & tested on delicate designer leathers (Hermès, Chanel, Dior, Bottega)",
      "Precision portable & foldable mechanism for evening clutches",
      "Weighted solid brass core for balance and stability",
      "Nano-grip silicone table pad prevents slips and protects delicate marble, glass, and wood",
      "Includes signature Aurum Haus presentation box, protective pouch and cleaning cloth",
      "12-Month Atelier Craftsmanship Warranty & 14-Day Easy Returns",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "Approximately 113g",
      capacity: "7.5 kg / 16.5 lbs",
    },
  },
];

export const getProduct = (slug: string) => {
  const aliasMap: Record<string, string> = {
    "aurum-aure": "aurum-gold",
    "aurum-ecru": "aurum",
    "aurum-reve-noir": "aurum-noir",
    "aurum-nuit-doree": "ivora",
    "aure": "aurum-gold",
    "ecru": "aurum",
    "reve-noir": "aurum-noir",
    "nuit-doree": "ivora",
  };
  const resolvedSlug = aliasMap[slug] || slug;
  return products.find((p) => p.slug === resolvedSlug || p.slug === slug);
};
