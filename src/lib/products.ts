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
};

export const hookColors = [
  {
    slug: "aurum-gold",
    label: "Sol",
    colorName: "Aurum Haus Sol (Yellow)",
    swatchGradient: "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #92400E 100%)",
  },
  {
    slug: "aurum",
    label: "Aura",
    colorName: "Aurum Haus Aura (White)",
    swatchGradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)",
  },
  {
    slug: "aurum-noir",
    label: "Noir",
    colorName: "Aurum Haus Noir (Black)",
    swatchGradient: "linear-gradient(135deg, #374151 0%, #1F2937 50%, #000000 100%)",
  },
  {
    slug: "ivora",
    label: "Onyx",
    colorName: "Aurum Haus Onyx (Black & Gold)",
    swatchGradient: "linear-gradient(135deg, #111827 0%, #D4AF37 100%)",
  },
];

export const products: Product[] = [
  {
    slug: "aurum-gold",
    image: aurumGold.url,
    gallery: [
      aurumGold.url,
      goldDetail,
      heirloomWarm.url,
      aurumProductHero.url,
      slideBagRestaurant.url,
      aurumPackaging.url,
    ],
    name: "Aurum Haus Sol",
    finish: "Yellow · 24k vermeil gold",
    finishCategory: "Sol",
    swatchGradient: "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #92400E 100%)",
    price: "£70",
    priceValue: 70,
    compareAtPrice: "£95",
    launchPrice: "£75",
    description:
      "The house signature. Solid brass plated in 24k vermeil and hand-rubbed to an antique patina — warm, weighted, and unmistakable at the table.",
    leadParagraph:
      "The house signature. Solid brass plated in 24k vermeil and hand-rubbed to an antique patina. The Aurum Haus® bag holder combines weighted structural integrity with refined European jewellery craft. Designed to keep your most treasured bags safe, elevated, and off restaurant floors.",
    specs: [
      "24k vermeil electroplating with hand-rubbed antique finish",
      "Certified weight tolerance tested up to 10 kg / 22 lbs",
      "Tried & tested on delicate lambskin, caviar leather, and exotic skins",
      "Engineered foldable silhouette slips into clutch bags or pockets",
      "Balanced 113g weighted solid brass core prevents tipping",
      "Protective micro-suction anti-slip pad safe on all luxury dining surfaces",
      "Presented in gold-embossed rigid gift packaging with suede pouch",
      "12-Month Atelier Craftsmanship Warranty",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "113 grams / 4.0 ounces",
      capacity: "10 kg / 22.0 lbs",
    },
  },
  {
    slug: "aurum",
    image: aurumSilver.url,
    gallery: [
      aurumSilver.url,
      aurumChromePiece.url,
      silverOutdoor,
      promenadeChromeReal.url,
      aurumProductHero.url,
      aurumPackaging.url,
    ],
    name: "Aurum Haus Aura",
    finish: "White · polished chrome & ivory",
    finishCategory: "Aura",
    swatchGradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #9CA3AF 100%)",
    price: "£70",
    priceValue: 70,
    compareAtPrice: "£95",
    launchPrice: "£75",
    description:
      "The house signature in its lightest form. Mirror-polished chrome crowned with the hand-set ivory AH crest — quietly unmistakable at the table.",
    leadParagraph:
      "The house signature in its architectural form. High-gloss mirror chrome paired with the hand-set ivory monogram crest. Crafted for contemporary dining and clean lines, this piece brings effortless security to your handbag whenever you dine.",
    specs: [
      "High-spec mirror chrome electroplating with scratch-resistant gloss seal",
      "Engineered load-bearing arc tested up to 10 kg / 22 lbs",
      "Zero-marking anti-slip pad safe on glass, marble, and lacquered wood",
      "Compact collapsible design for effortless daily carry",
      "113g solid brass core ensures stable pendulum balance",
      "Includes velvet-lined rigid presentation box and travel dust pouch",
      "12-Month Atelier Guarantee",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "113 grams / 4.0 ounces",
      capacity: "10 kg / 22.0 lbs",
    },
  },
  {
    slug: "aurum-noir",
    image: promenadeChrome.url,
    gallery: [
      promenadeChrome.url,
      pieceObsidian.url,
      aurumPackaging.url,
      heirloomWarm.url,
    ],
    name: "Aurum Haus Noir",
    finish: "Black · satin obsidian finish",
    finishCategory: "Noir",
    swatchGradient: "linear-gradient(135deg, #374151 0%, #1F2937 50%, #000000 100%)",
    price: "£70",
    priceValue: 70,
    compareAtPrice: "£95",
    launchPrice: "£75",
    description:
      "The evening edition. Solid brass plated in 24k vermeil, set with a hand-polished black onyx crest — the house signature after dark.",
    leadParagraph:
      "The evening edition. Solid brass plated in 24k vermeil and crowned with a genuine hand-cut black onyx crest. Designed for candlelit bistros, opera evenings, and late suppers, Aurum Noir keeps your bag gracefully suspended by your side.",
    specs: [
      "24k vermeil body with hand-polished genuine black onyx stone crest",
      "Tested load capacity of 10 kg / 22 lbs",
      "Gentle hook radius preserves wide shoulder straps and delicate chains",
      "Folds flat into a sleek circular pebble silhouette",
      "Non-slip silicone stabilizer ensures safe hold on table surfaces",
      "Presented in gold-foil unboxing gift suite with cream suede pouch",
      "12-Month Atelier Craftsmanship Warranty",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "113 grams / 4.0 ounces",
      capacity: "10 kg / 22.0 lbs",
    },
  },
  {
    slug: "ivora",
    image: aurumOnyx.url,
    gallery: [
      aurumOnyx.url,
      goldDetail,
      pieceObsidian.url,
      aurumPackaging.url,
      cafeLifestyle.url,
    ],
    name: "Aurum Haus Onyx",
    finish: "Black & Gold · 24k vermeil with monogram crest",
    finishCategory: "Onyx",
    swatchGradient: "linear-gradient(135deg, #111827 0%, #D4AF37 100%)",
    price: "£70",
    priceValue: 70,
    compareAtPrice: "£95",
    launchPrice: "£75",
    description:
      "The monogram luxury edition. Solid brass plated in 24k vermeil, crowned with an artisan black and gold monogram emblem.",
    leadParagraph:
      "The monogram luxury edition. Solid brass plated in 24k vermeil, crowned with an artisan black and gold monogram emblem. Made for couture bags and statement tables, Aurum Onyx suspends your handbag with unmatched presence.",
    specs: [
      "24k vermeil body with artisan monogram embossed crest",
      "10 kg / 22 lbs load capacity tested with filled designer bags",
      "Compact foldable design with zero pinch points",
      "High-grip protective under-table stabilizer",
      "Delivered in our signature gold-embossed presentation box",
      "12-Month Atelier Craftsmanship Warranty",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "113 grams / 4.0 ounces",
      capacity: "10 kg / 22.0 lbs",
    },
  },
  {
    slug: "noir",
    image: promenadeTrio.url,
    gallery: [
      promenadeTrio.url,
      trioImg,
      trioAlt,
      aurumPackaging.url,
      slideBagRestaurant.url,
    ],
    name: "The Trio Suite",
    finish: "Collector's set · 3 signature pieces",
    finishCategory: "The Trio Set",
    swatchGradient: "linear-gradient(135deg, #D4AF37 0%, #D1D5DB 50%, #111827 100%)",
    price: "£200",
    priceValue: 200,
    compareAtPrice: "£240",
    description:
      "The collector's set. Three hand-finished pieces in polished chrome, 24k vermeil gold, and black onyx — presented together in our deluxe collector's presentation case.",
    leadParagraph:
      "The complete collector's suite. Three hand-finished pieces in 24k vermeil gold, polished chrome, and black onyx, presented together in our signature triple-compartment presentation box. The ultimate luxury gift for yourself or someone whose collection demands the best.",
    specs: [
      "Includes 3 distinct hand-finished pieces: Gold, Chrome, and Onyx",
      "Each piece tested to support up to 10 kg / 22 lbs",
      "Triple suede travel pouches and collector's gift presentation box included",
      "Special collector's suite price (Save £40 compared to individual pieces)",
      "Express worldwide shipping included complimentary",
      "12-Month Atelier Craftsmanship Warranty on all pieces",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches (per piece)",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "339 grams total (113g each)",
      capacity: "10 kg / 22.0 lbs each",
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
    price: "£70",
    priceValue: 70,
    compareAtPrice: "£95",
    launchPrice: "£75",
    description:
      "Embrace modern femininity and classic allure with the Aurum Haus in Rose Gold, featuring stunning rose gold-color plating hand-polished to a mirror luster.",
    leadParagraph:
      "Embrace the modern femininity and classic allure of the Aurum Haus in Rose Gold, featuring a stunning rose gold-color plating over solid brass. The Aurum Haus® bag holder is specifically engineered for your precious designer handbags. The innovative atelier design combined with weighted solid brass makes Aurum safe to use on delicate evening clutches and structured heavier bags alike.",
    specs: [
      "Stunning Rose Gold electroplating with anti-tarnish protective coat",
      "Holds up to 10 kg / 22 lbs on any standard table edge",
      "Tried & tested on delicate designer leathers (Hermès, Chanel, Dior, Bottega)",
      "Precision portable & foldable mechanism for evening clutches",
      "Weighted solid brass core for balance and stability",
      "Nano-grip silicone table pad prevents slips and protects delicate marble, glass, and wood",
      "Includes signature Aurum Haus gold-foil rigid box and cream suede travel pouch",
      "12-Month Atelier Craftsmanship Warranty",
    ],
    measurements: {
      width: "5.0 cm / 2.0 inches",
      height: "1.1 cm / 0.45 inches",
      hookDrop: "8.5 cm / 3.3 inches",
      weight: "113 grams / 4.0 ounces",
      capacity: "10 kg / 22.0 lbs",
    },
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
