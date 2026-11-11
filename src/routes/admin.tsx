import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  useEcommerceStore,
  loginAdmin,
  logoutAdmin,
  saveProduct,
  deleteProduct,
  resetProductsToDefault,
  setProductStock,
  adjustProductStock,
  updateOrderStatus,
  deleteOrder,
  Product,
  Order,
  EmailLog,
} from "@/lib/ecommerceStore";
import {
  solPrimary,
  auraPrimary,
  auraWalnut,
  noirPrimary,
  noirWalnut,
  onyxPrimary,
  medallionsFlatlay,
} from "@/lib/products";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Lock,
  Mail,
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  Sliders,
  DollarSign,
  Layers,
  Eye,
  X,
  CreditCard,
  ShieldCheck,
  Check,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Atelier Admin Dashboard — Aurum Haus" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type TabType = "overview" | "products" | "inventory" | "orders" | "emails";

function AdminPage() {
  const navigate = useNavigate();
  const { products, orders, inventory, emailLogs, isAdmin } = useEcommerceStore();

  // Auth form state
  const [emailInput, setEmailInput] = useState("admin@aurumhaus.com");
  const [passInput, setPassInput] = useState("aurum2026");
  const [authError, setAuthError] = useState<string | null>(null);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Search & Filters
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderGatewayFilter, setOrderGatewayFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Product Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Email Inspector Modal
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

  // -------------------------------------------------------------
  // AUTHENTICATION VIEW (IF NOT SIGNED IN)
  // -------------------------------------------------------------
  if (!isAdmin) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError(null);
      const ok = loginAdmin(emailInput, passInput);
      if (!ok) {
        setAuthError("Invalid credentials. Please verify your email and password.");
      }
    };

    const handleFillDemo = () => {
      setEmailInput("admin@aurumhaus.com");
      setPassInput("aurum2026");
      setAuthError(null);
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#111111] text-[#F3F3F3] p-6 selection:bg-[#D4AF37] selection:text-black">
        <div className="w-full max-w-md bg-[#18181A] border border-[#2A2A2D] p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#242426] border border-[#333336] text-[#D4AF37] mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Maison Aurum Haus</p>
            <h1 className="font-display text-3xl font-normal text-white">Atelier Admin Sign In</h1>
            <p className="text-xs text-[#8E8E93] font-light leading-relaxed">
              Restricted management console for product catalog, live inventory tracking, orders, and dispatched emails.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#AEAEB2] mb-2 font-medium">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@aurumhaus.com"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#AEAEB2] mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5C158] transition-colors shadow-md"
            >
              Sign In to Atelier Dashboard
            </button>

            <div className="pt-2 flex items-center justify-between text-xs text-[#8E8E93]">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#D4AF37] hover:underline"
              >
                Auto-fill credentials
              </button>
              <Link to="/" className="hover:text-white transition-colors">
                ← Return to storefront
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#262628] text-center text-[11px] text-[#636366]">
            Credentials: <span className="text-[#AEAEB2]">admin@aurumhaus.com</span> / <span className="text-[#AEAEB2]">aurum2026</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CALCULATE METRICS
  // -------------------------------------------------------------
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.quantity, 0);
  const lowStockCount = products.filter((p) => {
    const stock = inventory[p.slug] ?? p.stock ?? 0;
    return stock <= 10;
  }).length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== "all" && o.status !== orderFilter) return false;
    if (orderGatewayFilter !== "all" && o.paymentMethod !== orderGatewayFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#E5E5E7] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* ATELIER ADMIN TOP HEADER */}
      <header className="border-b border-[#222225] bg-[#141416] sticky top-0 z-30">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-display text-lg tracking-[0.2em] text-white">AURUM HAUS</span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold rounded">
                ADMIN
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs text-[#8E8E93] border-l border-[#28282B] pl-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Storefront Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/shop"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#2E2E32] text-[#AEAEB2] hover:text-white hover:border-[#444] transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                if (confirm("Reset products and stock to atelier photoshoot defaults?")) {
                  resetProductsToDefault();
                }
              }}
              title="Reset products & stock to initial state"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 border border-[#2E2E32] text-[#AEAEB2] hover:text-white hover:border-[#444] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[#28282B]">
              <span className="hidden md:inline text-xs text-[#8E8E93]">admin@aurumhaus.com</span>
              <button
                onClick={() => logoutAdmin()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F23] hover:bg-red-950/60 hover:text-red-300 border border-[#2E2E32] text-[#AEAEB2] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD TAB BAR */}
      <nav className="border-b border-[#222225] bg-[#17171A]">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12 flex gap-1 sm:gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#D4AF37] text-white bg-[#1F1F24]"
                : "border-transparent text-[#8E8E93] hover:text-[#D1D1D6]"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "products"
                ? "border-[#D4AF37] text-white bg-[#1F1F24]"
                : "border-transparent text-[#8E8E93] hover:text-[#D1D1D6]"
            }`}
          >
            <Package className="w-4 h-4 text-[#D4AF37]" />
            Products Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "inventory"
                ? "border-[#D4AF37] text-white bg-[#1F1F24]"
                : "border-transparent text-[#8E8E93] hover:text-[#D1D1D6]"
            }`}
          >
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            Live Inventory
            {lowStockCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                {lowStockCount} low
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "border-[#D4AF37] text-white bg-[#1F1F24]"
                : "border-transparent text-[#8E8E93] hover:text-[#D1D1D6]"
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
            Gateway Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("emails")}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "emails"
                ? "border-[#D4AF37] text-white bg-[#1F1F24]"
                : "border-transparent text-[#8E8E93] hover:text-[#D1D1D6]"
            }`}
          >
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            Dispatched Emails ({emailLogs.length})
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 mx-auto max-w-[1500px] w-full px-6 lg:px-12 py-8 space-y-8">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-[#161619] border border-[#26262A] p-5 lg:p-6 space-y-2">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="font-display text-3xl lg:text-4xl text-white">£{totalRevenue}</p>
                <p className="text-[11px] text-emerald-400">All gateway settled transactions</p>
              </div>

              <div className="bg-[#161619] border border-[#26262A] p-5 lg:p-6 space-y-2">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Orders Processed</span>
                  <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="font-display text-3xl lg:text-4xl text-white">{totalOrdersCount}</p>
                <p className="text-[11px] text-[#8E8E93]">Average value: £{avgOrderValue}</p>
              </div>

              <div className="bg-[#161619] border border-[#26262A] p-5 lg:p-6 space-y-2">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Pieces Sold</span>
                  <Package className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="font-display text-3xl lg:text-4xl text-white">{totalUnitsSold}</p>
                <p className="text-[11px] text-[#8E8E93]">Across 5 catalog editions</p>
              </div>

              <div className="bg-[#161619] border border-[#26262A] p-5 lg:p-6 space-y-2">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span className="text-[11px] uppercase tracking-wider font-medium">Stock Health</span>
                  <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? "text-amber-400" : "text-emerald-400"}`} />
                </div>
                <p className={`font-display text-3xl lg:text-4xl ${lowStockCount > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                  {lowStockCount > 0 ? `${lowStockCount} Low` : "Healthy"}
                </p>
                <p className="text-[11px] text-[#8E8E93]">Real-time atelier inventory</p>
              </div>
            </div>

            {/* TWO-COLUMN LOWER SECTION */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* RECENT ORDERS FEED (2 COLUMNS) */}
              <div className="lg:col-span-2 bg-[#161619] border border-[#26262A] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-white">Recent Confirmed Orders</h3>
                    <p className="text-xs text-[#8E8E93] mt-1">Confirmed directly by card, Apple Pay, Google Pay, or PayPal</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-[#242428]">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={order.productImage} alt={order.productName} className="w-10 h-10 object-cover bg-black border border-[#333]" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{order.id}</span>
                            <span className="text-[#8E8E93]">· {order.customerName}</span>
                          </div>
                          <p className="text-[#8E8E93] text-[11px] mt-0.5">{order.productName} · {order.finish}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-between sm:justify-end">
                        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#222226] text-[#AEAEB2] border border-[#333]">
                          {order.paymentMethod.replace("_", " ")}
                        </span>
                        <span className="font-display text-sm text-white">£{order.total}</span>
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${
                          order.status === "shipped"
                            ? "bg-purple-900/30 text-purple-300 border border-purple-800/40"
                            : "bg-emerald-900/30 text-emerald-300 border border-emerald-800/40"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ATELIER ACTIONS & LOW STOCK ALERTS (1 COLUMN) */}
              <div className="space-y-6">
                <div className="bg-[#161619] border border-[#26262A] p-6 space-y-4">
                  <h3 className="font-display text-lg text-white">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsAddProductOpen(true)}
                      className="w-full py-2.5 px-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Product
                    </button>
                    <button
                      onClick={() => setActiveTab("inventory")}
                      className="w-full py-2.5 px-4 bg-[#202025] hover:bg-[#282830] border border-[#303036] text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Sliders className="w-4 h-4 text-[#D4AF37]" />
                      Manage Inventory & Stock
                    </button>
                    <button
                      onClick={() => setActiveTab("emails")}
                      className="w-full py-2.5 px-4 bg-[#202025] hover:bg-[#282830] border border-[#303036] text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      Inspect Dispatched Emails
                    </button>
                  </div>
                </div>

                {/* LOW STOCK ALERT BOX */}
                <div className="bg-[#161619] border border-[#26262A] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    Inventory Alert Status
                  </div>
                  <div className="space-y-2 pt-1 text-xs">
                    {products.map((p) => {
                      const stock = inventory[p.slug] ?? p.stock ?? 0;
                      return (
                        <div key={p.slug} className="flex items-center justify-between py-1 border-b border-[#242428] last:border-0">
                          <span className="text-[#AEAEB2] truncate max-w-[150px]">{p.name}</span>
                          <span className={`font-mono font-semibold ${stock <= 10 ? "text-amber-400" : "text-emerald-400"}`}>
                            {stock} in stock
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PRODUCTS CATALOG (CRUD) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-white">Product Catalog Management</h2>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Upload, modify prices, edit specifications, or delete products. All edits update live across the entire website instantly.
                </p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-5 py-2.5 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </button>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => {
                const stock = inventory[p.slug] ?? p.stock ?? 0;
                return (
                  <div key={p.slug} className="bg-[#161619] border border-[#26262A] flex flex-col group overflow-hidden">
                    <div className="relative aspect-[4/3] bg-black overflow-hidden border-b border-[#242428]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-black/80 text-white backdrop-blur border border-white/20">
                          {p.price}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold backdrop-blur border ${
                          stock <= 0
                            ? "bg-red-950/80 text-red-300 border-red-700/50"
                            : stock <= 10
                            ? "bg-amber-950/80 text-amber-300 border-amber-700/50"
                            : "bg-emerald-950/80 text-emerald-300 border-emerald-700/50"
                        }`}>
                          {stock} in stock
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">{p.finishCategory || "Edition"}</span>
                        <h3 className="font-display text-xl text-white mt-1">{p.name}</h3>
                        <p className="text-xs text-[#8E8E93] mt-0.5">{p.finish}</p>
                        <p className="text-xs text-[#AEAEB2] mt-3 line-clamp-2 font-light leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#242428] flex items-center justify-between text-xs">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="px-3 py-1.5 bg-[#202025] hover:bg-[#282830] border border-[#303036] text-white flex items-center gap-1.5 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                deleteProduct(p.slug);
                              }
                            }}
                            className="px-3 py-1.5 bg-[#202025] hover:bg-red-950/60 hover:text-red-300 border border-[#303036] text-[#8E8E93] flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        <Link
                          to="/product/$slug"
                          params={{ slug: p.slug }}
                          target="_blank"
                          className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <span>Preview</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: LIVE INVENTORY MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "inventory" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display text-2xl text-white">Live Inventory & Variation Stock</h2>
              <p className="text-xs text-[#8E8E93] mt-1">
                Automated stock tracking. When customers make a purchase, remaining stock is automatically deducted in real-time. Use the restock buttons below to replenish atelier allocations.
              </p>
            </div>

            <div className="bg-[#161619] border border-[#26262A] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1C1C20] text-[#8E8E93] uppercase tracking-wider border-b border-[#26262A]">
                    <tr>
                      <th className="py-4 px-6">Product & Variation</th>
                      <th className="py-4 px-4">Finish</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Current Stock</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242428]">
                    {products.map((p) => {
                      const stock = inventory[p.slug] ?? p.stock ?? 0;
                      return (
                        <tr key={p.slug} className="hover:bg-[#1A1A1E] transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 object-cover bg-black border border-[#333]" />
                              <div>
                                <p className="font-semibold text-white">{p.name}</p>
                                <p className="text-[11px] text-[#8E8E93] font-mono">slug: {p.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#AEAEB2]">{p.finish}</td>
                          <td className="py-4 px-4 font-display text-sm text-white">{p.price}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                value={stock}
                                onChange={(e) => setProductStock(p.slug, parseInt(e.target.value) || 0)}
                                className="w-16 bg-[#121214] border border-[#303036] px-2 py-1 text-sm font-mono text-white text-center focus:outline-none focus:border-[#D4AF37]"
                              />
                              <span className="text-[#8E8E93]">units</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 text-[10px] uppercase font-semibold rounded border ${
                              stock <= 0
                                ? "bg-red-950/60 text-red-300 border-red-800/40"
                                : stock <= 10
                                ? "bg-amber-950/60 text-amber-300 border-amber-800/40"
                                : "bg-emerald-950/60 text-emerald-300 border-emerald-800/40"
                            }`}>
                              {stock <= 0 ? "Depleted / Sold Out" : stock <= 10 ? "Low Stock Alert" : "In Stock"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => adjustProductStock(p.slug, 5)}
                                className="px-2.5 py-1 bg-[#202025] hover:bg-[#2A2A30] border border-[#303036] text-white text-[11px] font-medium transition-colors"
                              >
                                +5
                              </button>
                              <button
                                onClick={() => adjustProductStock(p.slug, 10)}
                                className="px-2.5 py-1 bg-[#202025] hover:bg-[#2A2A30] border border-[#303036] text-white text-[11px] font-medium transition-colors"
                              >
                                +10
                              </button>
                              <button
                                onClick={() => adjustProductStock(p.slug, 25)}
                                className="px-2.5 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold transition-colors"
                              >
                                +25 Batch
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: ORDERS & GATEWAY CONFIRMATIONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-white">Payment Gateway Orders</h2>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Every product order confirmed by card, Apple Pay, Google Pay, or PayPal is automatically logged here.
                </p>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search orders or customer…"
                    className="bg-[#161619] border border-[#2E2E32] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <select
                  value={orderGatewayFilter}
                  onChange={(e) => setOrderGatewayFilter(e.target.value)}
                  className="bg-[#161619] border border-[#2E2E32] px-3 py-1.5 text-xs text-[#AEAEB2] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">All Gateways</option>
                  <option value="card">Debit/Credit Card</option>
                  <option value="apple_pay">Apple Pay</option>
                  <option value="google_pay">Google Pay</option>
                  <option value="paypal">PayPal</option>
                </select>

                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-[#161619] border border-[#2E2E32] px-3 py-1.5 text-xs text-[#AEAEB2] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                </select>
              </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="bg-[#161619] border border-[#26262A] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1C1C20] text-[#8E8E93] uppercase tracking-wider border-b border-[#26262A]">
                    <tr>
                      <th className="py-4 px-6">Order ID & Date</th>
                      <th className="py-4 px-4">Customer</th>
                      <th className="py-4 px-4">Piece</th>
                      <th className="py-4 px-4">Gateway</th>
                      <th className="py-4 px-4">Total</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242428]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#8E8E93]">
                          No orders found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#1A1A1E] transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-semibold text-white">{order.id}</span>
                            <p className="text-[11px] text-[#8E8E93] mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-medium text-white">{order.customerName}</p>
                            <p className="text-[11px] text-[#8E8E93]">{order.customerEmail}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <img src={order.productImage} alt={order.productName} className="w-8 h-8 object-cover bg-black border border-[#333]" />
                              <div>
                                <p className="font-medium text-white">{order.productName}</p>
                                <p className="text-[11px] text-[#8E8E93]">{order.finish}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-[#222226] text-[#AEAEB2] border border-[#333]">
                              {order.paymentMethod.replace("_", " ")}
                            </span>
                            <p className="text-[10px] text-[#666] font-mono mt-0.5 truncate max-w-[120px]">
                              {order.paymentGatewayReference}
                            </p>
                          </td>
                          <td className="py-4 px-4 font-display text-sm text-white">
                            £{order.total}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${
                              order.status === "shipped"
                                ? "bg-purple-900/30 text-purple-300 border border-purple-800/40"
                                : "bg-emerald-900/30 text-emerald-300 border border-emerald-800/40"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {order.status !== "shipped" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, "shipped")}
                                  className="px-2.5 py-1 bg-[#202025] hover:bg-purple-950/40 hover:text-purple-300 border border-[#303036] text-[#AEAEB2] text-[11px] transition-colors"
                                >
                                  Mark Shipped
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  const email = emailLogs.find((e) => e.orderId === order.id);
                                  if (email) setSelectedEmail(email);
                                  else alert("Email record archived.");
                                }}
                                className="px-2.5 py-1 bg-[#202025] hover:bg-[#2A2A30] border border-[#303036] text-[#D4AF37] text-[11px] transition-colors"
                              >
                                View Email
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: AUTOMATED EMAIL LOGS (DUAL EMAILS) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "emails" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-display text-2xl text-white">Automated Atelier Email Logs</h2>
              <p className="text-xs text-[#8E8E93] mt-1">
                Every purchase automatically triggers two emails: a Customer Confirmation Receipt and an Admin Sale Notification with real-time stock alert. Click any email to preview its luxury responsive layout.
              </p>
            </div>

            <div className="bg-[#161619] border border-[#26262A] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1C1C20] text-[#8E8E93] uppercase tracking-wider border-b border-[#26262A]">
                    <tr>
                      <th className="py-4 px-6">Email Type</th>
                      <th className="py-4 px-4">Recipient</th>
                      <th className="py-4 px-4">Subject</th>
                      <th className="py-4 px-4">Order Ref</th>
                      <th className="py-4 px-4">Timestamp</th>
                      <th className="py-4 px-6 text-right">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242428]">
                    {emailLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#8E8E93]">
                          No dispatched emails logged in this session yet. Complete a checkout to see dual automated emails generated instantly.
                        </td>
                      </tr>
                    ) : (
                      emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#1A1A1E] transition-colors">
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded border ${
                              log.type === "customer_confirmation"
                                ? "bg-blue-950/60 text-blue-300 border-blue-800/40"
                                : "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40"
                            }`}>
                              {log.type === "customer_confirmation" ? "Customer Receipt" : "Admin Alert"}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono text-[#AEAEB2]">{log.recipient}</td>
                          <td className="py-4 px-4 text-white font-medium max-w-xs truncate">{log.subject}</td>
                          <td className="py-4 px-4 font-mono text-[#8E8E93]">{log.orderId}</td>
                          <td className="py-4 px-4 text-[#8E8E93]">
                            {new Date(log.sentAt).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedEmail(log)}
                              className="px-3 py-1 bg-[#202025] hover:bg-[#D4AF37] hover:text-black border border-[#303036] text-white text-[11px] transition-colors"
                            >
                              Inspect HTML
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* ADD NEW PRODUCT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isAddProductOpen && (
        <ProductModal
          onClose={() => setIsAddProductOpen(false)}
          onSave={(newProd) => {
            saveProduct(newProd);
            setIsAddProductOpen(false);
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* EDIT PRODUCT MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingProduct && (
        <ProductModal
          initialProduct={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updated) => {
            saveProduct(updated);
            setEditingProduct(null);
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* EMAIL INSPECTOR MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-[#2E2E32] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[#28282C] flex items-center justify-between bg-[#141416]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                  {selectedEmail.type === "customer_confirmation" ? "Customer Order Confirmation Email" : "Admin Internal Sale Alert Email"}
                </span>
                <h3 className="font-display text-lg text-white">{selectedEmail.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-1 text-[#8E8E93] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-[#1F1F24] border-b border-[#28282C] text-xs text-[#AEAEB2] flex justify-between">
              <span><strong>Recipient:</strong> {selectedEmail.recipient}</span>
              <span><strong>Order:</strong> {selectedEmail.orderId}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-[#0A0A0C]">
              <iframe
                title="Email Preview"
                srcDoc={selectedEmail.htmlBody}
                className="w-full h-[540px] border-0 bg-transparent rounded"
              />
            </div>
            <div className="p-4 border-t border-[#28282C] flex justify-end">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-6 py-2 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// PRODUCT ADD / EDIT MODAL COMPONENT
// -------------------------------------------------------------
function ProductModal({
  initialProduct,
  onClose,
  onSave,
}: {
  initialProduct?: Product;
  onClose: () => void;
  onSave: (prod: Product) => void;
}) {
  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [finish, setFinish] = useState(initialProduct?.finish || "");
  const [finishCategory, setFinishCategory] = useState(initialProduct?.finishCategory || "Signature");
  const [priceValue, setPriceValue] = useState<number>(initialProduct?.priceValue || 70);
  const [compareAtPrice, setCompareAtPrice] = useState(initialProduct?.compareAtPrice || "£95");
  const [stock, setStock] = useState<number>(initialProduct?.stock || 30);
  const [imageUrl, setImageUrl] = useState(initialProduct?.image || solPrimary);
  const [description, setDescription] = useState(
    initialProduct?.description || "Hand-finished solid brass luxury bag holder."
  );
  const [leadParagraph, setLeadParagraph] = useState(
    initialProduct?.leadParagraph ||
      "The house signature. Solid brass plated in 24k vermeil and hand-rubbed to an antique patina. Designed to keep your most treasured bags safe, elevated, and off restaurant floors."
  );

  const handleAutoSlug = (text: string) => {
    setName(text);
    if (!initialProduct) {
      setSlug(
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    const saved: Product = {
      slug: slug.trim(),
      name: name.trim(),
      finish: finish.trim() || "Signature finish",
      finishCategory: finishCategory.trim() || "Signature",
      swatchGradient: initialProduct?.swatchGradient || "linear-gradient(135deg, #D4AF37 0%, #111827 100%)",
      price: `£${priceValue}`,
      priceValue: priceValue,
      compareAtPrice: compareAtPrice.trim() || undefined,
      launchPrice: initialProduct?.launchPrice || `£${priceValue}`,
      stock: stock,
      image: imageUrl,
      gallery: initialProduct?.gallery || [imageUrl, medallionsFlatlay],
      description: description.trim(),
      leadParagraph: leadParagraph.trim(),
      specs: initialProduct?.specs || [
        "Certified weight tolerance tested up to 10 kg / 22 lbs",
        "Weighted solid brass core for balanced stability",
        "Nano-grip silicone table pad safe on marble, glass, and wood",
        "Presented in gold-embossed presentation gift box",
        "12-Month Atelier Craftsmanship Warranty",
      ],
      measurements: initialProduct?.measurements || {
        width: "5.0 cm / 2.0 inches",
        height: "1.1 cm / 0.45 inches",
        hookDrop: "8.5 cm / 3.3 inches",
        weight: "113 grams / 4.0 ounces",
        capacity: "10 kg / 22.0 lbs",
      },
    };

    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#18181B] border border-[#2E2E32] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-[#28282C] flex items-center justify-between bg-[#141416]">
          <h3 className="font-display text-xl text-white">
            {initialProduct ? `Edit: ${initialProduct.name}` : "Add New Atelier Piece"}
          </h3>
          <button onClick={onClose} className="p-1 text-[#8E8E93] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Product Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleAutoSlug(e.target.value)}
                placeholder="e.g. Aurum Haus Étoile"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">URL Slug</label>
              <input
                type="text"
                required
                disabled={!!initialProduct}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="aurum-etoile"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white disabled:opacity-50 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Price (£)</label>
              <input
                type="number"
                min={1}
                required
                value={priceValue}
                onChange={(e) => setPriceValue(parseInt(e.target.value) || 0)}
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Compare Price</label>
              <input
                type="text"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="£95"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Stock Units</label>
              <input
                type="number"
                min={0}
                required
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Finish Category</label>
              <input
                type="text"
                value={finishCategory}
                onChange={(e) => setFinishCategory(e.target.value)}
                placeholder="Sol / Aura / Noir / Onyx"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Finish Details</label>
              <input
                type="text"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                placeholder="Yellow · 24k vermeil gold"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* IMAGE SELECTION / PRESET PICKER */}
          <div>
            <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Product Image Asset</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Asset URL"
              className="w-full bg-[#121214] border border-[#2C2C2E] px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-[#D4AF37] mb-2"
            />
            <p className="text-[11px] text-[#8E8E93] mb-2">Or select from photoshoot presets:</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { label: "Sol (Yellow)", img: solPrimary },
                { label: "Aura (White)", img: auraPrimary },
                { label: "Aura Walnut", img: auraWalnut },
                { label: "Noir (Black)", img: noirPrimary },
                { label: "Noir Walnut", img: noirWalnut },
                { label: "Onyx (B&G)", img: onyxPrimary },
                { label: "Trio Flatlay", img: medallionsFlatlay },
              ].map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.img)}
                  className={`flex items-center gap-1.5 p-1.5 border text-[10px] transition-colors whitespace-nowrap ${
                    imageUrl === preset.img ? "border-[#D4AF37] bg-[#222]" : "border-[#333] hover:border-[#555]"
                  }`}
                >
                  <img src={preset.img} alt={preset.label} className="w-5 h-5 object-cover" />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Short Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#121214] border border-[#2C2C2E] p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">Lead Atelier Paragraph</label>
            <textarea
              rows={3}
              value={leadParagraph}
              onChange={(e) => setLeadParagraph(e.target.value)}
              className="w-full bg-[#121214] border border-[#2C2C2E] p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-4 border-t border-[#28282C] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#202025] hover:bg-[#282830] text-[#AEAEB2] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#D4AF37] text-black font-semibold uppercase tracking-wider hover:bg-[#E5C158] transition-colors"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
