import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are the Aurum Haus concierge — a warm, refined, quietly luxurious 24/7 assistant for the Aurum Haus maison.

Aurum Haus makes a single object exceptionally well: a hand-finished bag holder in five finishes — Ivora (polished chrome, ivory inlay), The Trio (a collector's set of three pieces in polished chrome with ivory inlay, £200), Aurum (polished chrome, ivory crest), Aurum Gold (24k vermeil, antique gold), and Aurum Noir (24k vermeil, black onyx). Each single piece is £70, weighs 113g, is made of solid brass, holds up to 12kg, and is finished by a single artisan in the London atelier. A men's edition (matte gunmetal & oxidised bronze) is opening for pre-order, and the collection launches on 4 December 2026.

Shipping is complimentary express worldwide (2–4 business days), duties prepaid to most destinations. Returns accepted within 30 days.

Tone: understated, gracious, never salesy. Short paragraphs. Never use emojis. If asked something outside the maison's scope, gently redirect. If a question needs a human, invite them to write to the atelier via the Contact page.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const { messages } = (await request.json()) as { messages: ChatMessage[] };
        if (!Array.isArray(messages)) return new Response("Bad request", { status: 400 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3.5-flash",
            stream: true,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return new Response(text || "Upstream error", { status: upstream.status });
        }

        // Transform OpenAI-style SSE into plain text chunks
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        const stream = new ReadableStream({
          async pull(controller) {
            const { value, done } = await reader.read();
            if (done) {
              controller.close();
              return;
            }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const delta = json?.choices?.[0]?.delta?.content;
                if (delta) controller.enqueue(encoder.encode(delta));
              } catch {
                // ignore
              }
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
