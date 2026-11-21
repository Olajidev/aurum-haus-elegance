import { useState } from "react";
import { X, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { DEFAULT_ADMIN_ACCOUNTS, resetAdminPassword } from "@/lib/ecommerceStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export function AdminForgotPasswordModal({ isOpen, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"verify" | "reset" | "done">("verify");
  const [matchedName, setMatchedName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = email.trim().toLowerCase();
    const account = DEFAULT_ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === normalized
    );

    if (!account) {
      setError(
        "Unrecognized administrator email. Only verified atelier accounts (admin@theaurumhaus.com or temi@theaurumhaus.com) may request password recovery."
      );
      return;
    }

    setMatchedName(`${account.name} (${account.role})`);
    setStep("reset");
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    const ok = resetAdminPassword(email.trim().toLowerCase(), newPassword.trim());
    if (ok) {
      setStep("done");
      setTimeout(() => {
        onSuccess(email.trim().toLowerCase());
        onClose();
      }, 1500);
    } else {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#18181A] border border-[#2E2E32] p-8 shadow-2xl relative text-[#F3F3F3]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8E8E93] hover:text-white transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#242426] border border-[#333336] text-[#D4AF37] mb-1">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="font-display text-2xl font-normal text-white">Admin Access Recovery</h2>
          <p className="text-xs text-[#8E8E93]">
            Secure credentials recovery for authorized Aurum Haus administrators.
          </p>
        </div>

        {step === "verify" && (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#AEAEB2] mb-2 font-medium">
                Registered Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="temi@theaurumhaus.com or admin@theaurumhaus.com"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5C158] transition-colors"
            >
              Verify Identity →
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="p-3 bg-[#202025] border border-[#303036] text-xs">
              <span className="text-[#8E8E93]">Verified Administrator:</span>
              <p className="font-semibold text-[#D4AF37] mt-0.5">{matchedName}</p>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">
                New Secure Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#AEAEB2] mb-1 font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-[#121214] border border-[#2C2C2E] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#E5C158] transition-colors"
            >
              Update Password & Return to Sign In
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-display text-xl text-white">Password Updated</h3>
            <p className="text-xs text-[#AEAEB2]">
              Your new password is now active. Returning to sign-in console...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
