import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { checkAdminAuth, loginAdmin } from "@/lib/ecommerceStore";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Atelier Admin Sign In — Aurum Haus" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("admin@aurumhaus.com");
  const [passInput, setPassInput] = useState("aurum2026");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (checkAdminAuth()) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const ok = loginAdmin(emailInput, passInput);
    if (ok) {
      navigate({ to: "/admin" });
    } else {
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
