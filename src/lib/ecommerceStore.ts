import { products as defaultProducts, Product, solPrimary, auraPrimary, noirPrimary, onyxPrimary, medallionsFlatlay } from "./products";
import { useEffect, useState, useSyncExternalStore } from "react";

export type { Product };

export type InventoryRecord = {
  slug: string;
  name: string;
  finish: string;
  stock: number;
  lowStockThreshold: number;
  lastUpdated: string;
};

export type Order = {
  id: string;
  orderNumber: number;
  productSlug: string;
  productName: string;
  finish: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "card" | "apple_pay" | "google_pay" | "paypal";
  paymentGatewayReference: string;
  status: "confirmed" | "processing" | "shipped" | "cancelled";
  createdAt: string;
};

export type EmailLog = {
  id: string;
  type: "customer_confirmation" | "admin_sale_alert";
  recipient: string;
  sender: string;
  subject: string;
  orderId: string;
  htmlBody: string;
  sentAt: string;
};

// STORAGE KEYS
const STORAGE_KEYS = {
  PRODUCTS: "ah_ecommerce_products_v4",
  INVENTORY: "ah_ecommerce_inventory_v3",
  ORDERS: "ah_ecommerce_orders_v2",
  EMAILS: "ah_ecommerce_email_logs_v2",
  AUTH: "ah_ecommerce_admin_auth_v2",
};

// EVENT NAME FOR REACTIVITY
const UPDATE_EVENT = "ah_ecommerce_store_changed";

function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

// -------------------------------------------------------------
// INITIAL SEED DATA
// -------------------------------------------------------------
const INITIAL_INVENTORY: Record<string, number> = {
  "aurum-gold": 50,
  aurum: 45,
  "aurum-noir": 35,
  ivora: 25,
  noir: 15,
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "AH-84192",
    orderNumber: 84192,
    productSlug: "aurum-gold",
    productName: "Aurum Haus Sol",
    finish: "Yellow · 24k vermeil gold",
    productImage: solPrimary,
    quantity: 1,
    unitPrice: 70,
    subtotal: 70,
    tax: 7,
    shipping: 0,
    total: 77,
    customerName: "Lady Victoria Sterling",
    customerEmail: "victoria.sterling@kensington.co.uk",
    shippingAddress: {
      street: "14 Palace Green",
      city: "London",
      postalCode: "W8 4QA",
      country: "United Kingdom",
    },
    paymentMethod: "apple_pay",
    paymentGatewayReference: "APAY_AUTH_8932_VERIFIED",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: "AH-84191",
    orderNumber: 84191,
    productSlug: "ivora",
    productName: "Aurum Haus Onyx",
    finish: "Black & Gold · 24k vermeil with monogram crest",
    productImage: onyxPrimary,
    quantity: 1,
    unitPrice: 70,
    subtotal: 70,
    tax: 7,
    shipping: 0,
    total: 77,
    customerName: "Claire Delacroix",
    customerEmail: "claire.delacroix@avenue-montaigne.fr",
    shippingAddress: {
      street: "28 Avenue Montaigne",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
    paymentMethod: "card",
    paymentGatewayReference: "CARD_STRIPE_CH_90123_CHARGED",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "AH-84189",
    orderNumber: 84189,
    productSlug: "noir",
    productName: "The Trio Suite",
    finish: "Collector's set · 3 signature pieces",
    productImage: medallionsFlatlay,
    quantity: 1,
    unitPrice: 200,
    subtotal: 200,
    tax: 20,
    shipping: 0,
    total: 220,
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia.vanderbilt@manhattan-penthouse.com",
    shippingAddress: {
      street: "740 Park Avenue, Apt 14B",
      city: "New York",
      postalCode: "10021",
      country: "United States",
    },
    paymentMethod: "paypal",
    paymentGatewayReference: "PAYPAL_CAP_5892_COMPLETED",
    status: "shipped",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

// Helper to safely get from localStorage
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    emitChange();
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// -------------------------------------------------------------
// PRODUCTS MANAGEMENT
// -------------------------------------------------------------
export function getProducts(): Product[] {
  return getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, defaultProducts);
}

export function getProductBySlug(slug: string): Product | undefined {
  const current = getProducts();
  return current.find((p) => p.slug === slug);
}

export function saveProduct(product: Product): Product {
  const current = getProducts();
  const index = current.findIndex((p) => p.slug === product.slug);
  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  setLocalItem(STORAGE_KEYS.PRODUCTS, updated);

  // Sync inventory entry if new
  const inv = getInventoryMap();
  if (typeof inv[product.slug] === "undefined") {
    inv[product.slug] = product.stock ?? 25;
    setLocalItem(STORAGE_KEYS.INVENTORY, inv);
  }

  return product;
}

export function deleteProduct(slug: string): boolean {
  const current = getProducts();
  const updated = current.filter((p) => p.slug !== slug);
  setLocalItem(STORAGE_KEYS.PRODUCTS, updated);
  return true;
}

export function resetProductsToDefault(): void {
  setLocalItem(STORAGE_KEYS.PRODUCTS, defaultProducts);
  setLocalItem(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
}

// -------------------------------------------------------------
// INVENTORY MANAGEMENT
// -------------------------------------------------------------
export function getInventoryMap(): Record<string, number> {
  return getLocalItem<Record<string, number>>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
}

export function getProductStock(slug: string): number {
  const map = getInventoryMap();
  if (typeof map[slug] !== "undefined") return map[slug];
  const prod = getProductBySlug(slug);
  return prod?.stock ?? 0;
}

export function setProductStock(slug: string, stock: number): number {
  const map = getInventoryMap();
  const safeStock = Math.max(0, Math.floor(stock));
  map[slug] = safeStock;
  setLocalItem(STORAGE_KEYS.INVENTORY, map);

  // Also update product model stock
  const prods = getProducts();
  const idx = prods.findIndex((p) => p.slug === slug);
  if (idx >= 0) {
    prods[idx] = { ...prods[idx], stock: safeStock };
    setLocalItem(STORAGE_KEYS.PRODUCTS, prods);
  }

  return safeStock;
}

export function adjustProductStock(slug: string, delta: number): number {
  const current = getProductStock(slug);
  return setProductStock(slug, current + delta);
}

// -------------------------------------------------------------
// ORDERS & CONFIRMATIONS
// -------------------------------------------------------------
export function getOrders(): Order[] {
  return getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
}

export function createOrder(params: {
  productSlug: string;
  customerName: string;
  customerEmail: string;
  quantity?: number;
  shippingAddress?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  paymentMethod: "card" | "apple_pay" | "google_pay" | "paypal";
  cardDetails?: {
    last4?: string;
  };
}): { order: Order; customerEmail: EmailLog; adminEmail: EmailLog } {
  const product = getProductBySlug(params.productSlug) || defaultProducts[0];
  const qty = Math.max(1, params.quantity ?? 1);
  const subtotal = product.priceValue * qty;
  const tax = Math.round(subtotal * 0.1);
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const orderNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `AH-${orderNum}`;

  let gatewayRef = "";
  if (params.paymentMethod === "apple_pay") {
    gatewayRef = `APAY_AUTH_${Math.floor(1000 + Math.random() * 9000)}_VERIFIED`;
  } else if (params.paymentMethod === "google_pay") {
    gatewayRef = `GPAY_TOKEN_${Math.floor(1000 + Math.random() * 9000)}_CHARGED`;
  } else if (params.paymentMethod === "paypal") {
    gatewayRef = `PAYPAL_CAP_${Math.floor(1000 + Math.random() * 9000)}_COMPLETED`;
  } else {
    gatewayRef = `CARD_AUTH_${params.cardDetails?.last4 || "4242"}_SUCCESS`;
  }

  const order: Order = {
    id: orderId,
    orderNumber: orderNum,
    productSlug: product.slug,
    productName: product.name,
    finish: product.finish,
    productImage: product.image,
    quantity: qty,
    unitPrice: product.priceValue,
    subtotal,
    tax,
    shipping,
    total,
    customerName: params.customerName.trim(),
    customerEmail: params.customerEmail.trim(),
    shippingAddress: {
      street: params.shippingAddress?.street || "Verified Delivery Address",
      city: params.shippingAddress?.city || "London",
      postalCode: params.shippingAddress?.postalCode || "SW1A 1AA",
      country: params.shippingAddress?.country || "United Kingdom",
    },
    paymentMethod: params.paymentMethod,
    paymentGatewayReference: gatewayRef,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  // 1. Save order to orders store
  const existingOrders = getOrders();
  setLocalItem(STORAGE_KEYS.ORDERS, [order, ...existingOrders]);

  // 2. Automatically update inventory!
  const remainingStock = adjustProductStock(product.slug, -qty);

  // 3. Generate & Dispatch Dual Confirmation Emails (Customer + Admin)
  const customerEmail = generateCustomerConfirmationEmail(order);
  const adminEmail = generateAdminSaleNotificationEmail(order, remainingStock);

  saveEmailLogs([customerEmail, adminEmail]);

  return { order, customerEmail, adminEmail };
}

export function updateOrderStatus(orderId: string, status: Order["status"]): Order | undefined {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], status };
    setLocalItem(STORAGE_KEYS.ORDERS, orders);
    return orders[idx];
  }
  return undefined;
}

export function deleteOrder(orderId: string): boolean {
  const orders = getOrders();
  const updated = orders.filter((o) => o.id !== orderId);
  setLocalItem(STORAGE_KEYS.ORDERS, updated);
  return true;
}

// -------------------------------------------------------------
// EMAIL DISPATCHER & LOG VIEWER
// -------------------------------------------------------------
export function getEmailLogs(): EmailLog[] {
  return getLocalItem<EmailLog[]>(STORAGE_KEYS.EMAILS, []);
}

function saveEmailLogs(newLogs: EmailLog[]): void {
  const current = getEmailLogs();
  setLocalItem(STORAGE_KEYS.EMAILS, [...newLogs, ...current]);
}

export function clearEmailLogs(): void {
  setLocalItem(STORAGE_KEYS.EMAILS, []);
}

function formatPaymentMethodLabel(method: Order["paymentMethod"]): string {
  switch (method) {
    case "apple_pay":
      return "Apple Pay";
    case "google_pay":
      return "Google Pay";
    case "paypal":
      return "PayPal";
    case "card":
    default:
      return "Debit/Credit Card";
  }
}

function generateCustomerConfirmationEmail(order: Order): EmailLog {
  const methodLabel = formatPaymentMethodLabel(order.paymentMethod);
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Aurum Haus Atelier Order ${order.id} is Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F6F3; margin: 0; padding: 32px 16px; color: #1A1A1A; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E2DC; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .header { text-align: center; border-bottom: 1px solid #ECEAE5; padding-bottom: 24px; margin-bottom: 32px; }
    .brand { font-size: 20px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; color: #111111; margin: 0; }
    .eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A059; margin-top: 8px; font-weight: 600; }
    .title { font-size: 26px; font-weight: 300; margin: 24px 0 12px 0; color: #111111; }
    .intro { font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 32px; }
    .card { background: #FAF9F6; border: 1px solid #EAE7E1; padding: 20px; margin-bottom: 24px; display: flex; gap: 20px; }
    .thumb { width: 80px; height: 80px; object-fit: cover; background: #EEE; border: 1px solid #DDD; }
    .details { flex: 1; }
    .prod-name { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
    .prod-finish { font-size: 13px; color: #777; margin: 0 0 8px 0; }
    .price-row { display: flex; justify-content: space-between; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #F0EEE9; }
    .total-row { display: flex; justify-content: space-between; font-size: 16px; font-weight: 600; padding: 16px 0 8px 0; }
    .badge { display: inline-block; background: #E8F5E9; color: #2E7D32; font-size: 11px; padding: 4px 8px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
    .footer { text-align: center; border-top: 1px solid #ECEAE5; padding-top: 24px; margin-top: 32px; font-size: 12px; color: #888888; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="brand">AURUM HAUS</h1>
      <p class="eyebrow">Atelier Order Confirmation</p>
    </div>

    <h2 class="title">Thank you for your order, ${order.customerName}.</h2>
    <p class="intro">
      Your signature piece has been securely reserved. Our London atelier has received your order and is preparing your package in our signature gold-embossed presentation box.
    </p>

    <div style="margin-bottom: 24px;">
      <span class="badge">Payment Confirmed · ${methodLabel}</span>
      <span style="font-size: 12px; color: #777; margin-left: 12px;">Ref: ${order.paymentGatewayReference}</span>
    </div>

    <div class="card">
      <div class="details">
        <h3 class="prod-name">${order.productName} (x${order.quantity})</h3>
        <p class="prod-finish">${order.finish}</p>
        <p style="font-size: 13px; color: #222; margin: 0;"><strong>Order Reference:</strong> ${order.id}</p>
      </div>
    </div>

    <div style="border-top: 1px solid #EAE7E1; padding-top: 12px; margin-bottom: 24px;">
      <div class="price-row"><span>Subtotal</span><span>£${order.subtotal}</span></div>
      <div class="price-row"><span>Estimated duties & taxes (10%)</span><span>£${order.tax}</span></div>
      <div class="price-row"><span>Worldwide express courier</span><span>Complimentary</span></div>
      <div class="total-row"><span>Total Paid</span><span>£${order.total}</span></div>
    </div>

    <div style="background: #FAF9F6; border: 1px solid #EAE7E1; padding: 16px; font-size: 13px; line-height: 1.5; color: #555;">
      <strong style="color: #111;">Shipping Destination:</strong><br/>
      ${order.customerName}<br/>
      ${order.shippingAddress.street}<br/>
      ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br/>
      ${order.shippingAddress.country}
    </div>

    <div class="footer">
      <p>Aurum Haus Maison & Atelier · London & Paris</p>
      <p>Questions regarding your shipment? Contact our private concierge at <a href="mailto:concierge@aurumhaus.com" style="color:#C5A059; text-decoration: none;">concierge@aurumhaus.com</a></p>
      <p style="font-size: 11px; color: #AAA;">Each piece is protected by our 12-Month Atelier Craftsmanship Warranty.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return {
    id: `EML-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: "customer_confirmation",
    recipient: order.customerEmail,
    sender: "orders@aurumhaus.com (Aurum Haus Atelier)",
    subject: `Order Confirmed: Your Aurum Haus piece (${order.id})`,
    orderId: order.id,
    htmlBody: html,
    sentAt: new Date().toISOString(),
  };
}

function generateAdminSaleNotificationEmail(order: Order, remainingStock: number): EmailLog {
  const methodLabel = formatPaymentMethodLabel(order.paymentMethod);
  const stockAlertHtml =
    remainingStock <= 10
      ? `<div style="background: #FFF3E0; border: 1px solid #FFE0B2; padding: 12px; color: #E65100; font-weight: 600; margin-bottom: 16px;">
          ⚠️ LOW STOCK WARNING: Only ${remainingStock} unit(s) remaining for ${order.productName}! Please consider restocking.
        </div>`
      : `<div style="background: #E8F5E9; border: 1px solid #C8E6C9; padding: 12px; color: #2E7D32; font-size: 13px; margin-bottom: 16px;">
          ✅ Stock level healthy: ${remainingStock} unit(s) remaining in atelier inventory.
        </div>`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>[NEW SALE] ${order.id} — ${order.productName} (£${order.total})</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #121212; margin: 0; padding: 32px 16px; color: #F0F0F0; }
    .container { max-width: 600px; margin: 0 auto; background: #1C1C1E; border: 1px solid #2C2C2E; padding: 36px; border-radius: 4px; }
    .header { border-bottom: 1px solid #2C2C2E; padding-bottom: 20px; margin-bottom: 24px; }
    .brand { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; color: #D4AF37; margin: 0; }
    .badge { display: inline-block; background: #2E7D32; color: #FFFFFF; font-size: 11px; padding: 4px 10px; font-weight: 600; letter-spacing: 0.05em; border-radius: 3px; }
    .title { font-size: 22px; font-weight: 400; margin: 16px 0 8px 0; color: #FFFFFF; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
    .stat-box { background: #242426; border: 1px solid #333336; padding: 14px; }
    .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E8E93; margin: 0 0 4px 0; }
    .stat-value { font-size: 15px; font-weight: 600; color: #FFFFFF; margin: 0; }
    .footer { text-align: center; border-top: 1px solid #2C2C2E; padding-top: 20px; margin-top: 32px; font-size: 12px; color: #636366; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="brand">AURUM HAUS · MAISON ADMIN</p>
      <div style="margin-top: 10px;">
        <span class="badge">NEW CONFIRMED SALE</span>
        <span style="font-size: 13px; color: #8E8E93; margin-left: 10px;">Gateway: ${methodLabel}</span>
      </div>
    </div>

    <h2 class="title">New order confirmed: ${order.id}</h2>
    <p style="font-size: 14px; color: #AEAEB2; margin-bottom: 20px;">
      Customer <strong>${order.customerName}</strong> (<a href="mailto:${order.customerEmail}" style="color: #D4AF37;">${order.customerEmail}</a>) completed payment for <strong>£${order.total}</strong>.
    </p>

    ${stockAlertHtml}

    <div class="grid">
      <div class="stat-box">
        <p class="stat-label">Item Ordered</p>
        <p class="stat-value">${order.productName}</p>
      </div>
      <div class="stat-box">
        <p class="stat-label">Finish</p>
        <p class="stat-value">${order.finish}</p>
      </div>
      <div class="stat-box">
        <p class="stat-label">Total Charged</p>
        <p class="stat-value" style="color: #34C759;">£${order.total}</p>
      </div>
      <div class="stat-box">
        <p class="stat-label">Remaining Stock</p>
        <p class="stat-value" style="color: ${remainingStock <= 10 ? '#FF9500' : '#FFFFFF'};">${remainingStock} units</p>
      </div>
    </div>

    <div style="background: #242426; border: 1px solid #333336; padding: 16px; margin-top: 16px; font-size: 13px; line-height: 1.6; color: #D1D1D6;">
      <strong style="color: #FFFFFF;">Shipping Address:</strong><br/>
      ${order.customerName}<br/>
      ${order.shippingAddress.street}<br/>
      ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br/>
      ${order.shippingAddress.country}
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <a href="http://localhost:8080/admin" style="display: inline-block; background: #D4AF37; color: #111; font-weight: 600; padding: 12px 24px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; border-radius: 2px;">
        Open Admin Dashboard
      </a>
    </div>

    <div class="footer">
      <p>Automated atelier dispatch alert from Aurum Haus eCommerce Engine.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return {
    id: `EML-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: "admin_sale_alert",
    recipient: "admin@aurumhaus.com (Maison Admin)",
    sender: "system@aurumhaus.com (eCommerce Engine)",
    subject: `[SALE ALERT] ${order.id}: ${order.productName} (£${order.total}) via ${methodLabel}`,
    orderId: order.id,
    htmlBody: html,
    sentAt: new Date().toISOString(),
  };
}

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------
const ADMIN_EMAIL = "admin@aurumhaus.com";
const ADMIN_PASS = "aurum2026";

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const auth = window.localStorage.getItem(STORAGE_KEYS.AUTH);
    return auth === "authenticated_session_token_aurum";
  } catch {
    return false;
  }
}

export function loginAdmin(email: string, pass: string): boolean {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && pass.trim() === ADMIN_PASS) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.AUTH, "authenticated_session_token_aurum");
      emitChange();
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEYS.AUTH);
    emitChange();
  }
}

// -------------------------------------------------------------
// REACT HOOKS FOR LIVE REACTIVITY ACROSS COMPONENTS
// -------------------------------------------------------------
export function useEcommerceStore() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener(UPDATE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(UPDATE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    products: getProducts(),
    orders: getOrders(),
    inventory: getInventoryMap(),
    emailLogs: getEmailLogs(),
    isAdmin: checkAdminAuth(),
    tick,
  };
}
