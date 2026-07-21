import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Welcome to Aurum Haus. I'm the maison concierge — here around the clock. Ask me about the collection, pre-orders, engraving, or shipping.",
};

const SUGGESTIONS = [
  "When does pre-order ship?",
  "What finishes are available?",
  "Do you ship internationally?",
];

export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              res.status === 429
                ? "The concierge is at capacity for a moment. Please try again shortly."
                : res.status === 402
                ? "The concierge is momentarily unavailable. Please write to the atelier via the Contact page."
                : "I'm having trouble reaching the atelier. Please try again in a moment.",
          },
        ]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      let acc = "";
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(chunk, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I'm having trouble reaching the atelier. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close concierge" : "Open concierge"}
        className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-2xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[60] w-[min(92vw,380px)] h-[min(78vh,560px)] bg-background border border-border shadow-2xl flex flex-col origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Aurum Haus concierge"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-accent text-accent-foreground">
          <p className="eyebrow text-primary/70">Aurum Haus</p>
          <p className="font-display text-lg leading-tight">The Concierge <span className="italic font-light text-accent-foreground/70 text-sm">· 24/7</span></p>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              {m.role === "assistant" ? (
                <p className="text-sm text-foreground font-light leading-relaxed whitespace-pre-wrap">
                  {m.content}
                  {loading && i === messages.length - 1 && !m.content && (
                    <span className="inline-flex gap-1 ml-1">
                      <span className="h-1 w-1 rounded-full bg-foreground/50 animate-pulse" />
                      <span className="h-1 w-1 rounded-full bg-foreground/50 animate-pulse [animation-delay:150ms]" />
                      <span className="h-1 w-1 rounded-full bg-foreground/50 animate-pulse [animation-delay:300ms]" />
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-sm bg-accent text-accent-foreground px-4 py-2 rounded-sm max-w-[85%] font-light leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </p>
              )}
            </div>
          ))}
          {loading && messages[messages.length - 1]?.role === "user" && (
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-pulse [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-pulse [animation-delay:300ms]" />
            </span>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] tracking-wide border border-border px-3 py-1.5 hover:bg-secondary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-border p-3 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the concierge…"
            disabled={loading}
            className="flex-1 bg-transparent px-3 py-2 text-sm font-light outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="h-9 w-9 flex-shrink-0 flex items-center justify-center bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
