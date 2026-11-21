import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const messageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(500),
  })
  .strict();

const chatRequestSchema = z
  .object({
    messages: z.array(messageSchema).min(1).max(8),
  })
  .strict();

const SYSTEM_PROMPT = `You are the Aurum Haus concierge — a warm, refined, quietly luxurious 24/7 assistant for Aurum Haus.

Aurum Haus makes a single object exceptionally well: a hand-finished bag holder in signature finishes — Aurum Haus Sol (£80), Aurum Haus Aura (£80), Aurum Haus Noir (£80), Aurum Haus Onyx (£90), and The Trio Suite (£200). Each single piece weighs 113g, is made of solid brass, holds up to 7.5kg, and is finished by a single artisan in the atelier. The collection launches on 4 December 2026.

Shipping is complimentary express worldwide (2–4 business days), duties prepaid. Returns accepted within 30 days.

Tone: understated, gracious, never salesy. Short paragraphs. Never use emojis. If asked something outside the brand's scope, gently redirect. If a question needs a human, invite them to write to the atelier via support@aurumhaus.com or the Contact page.`;

// In-memory sliding-window IP rate limiter
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipRateMap.get(ip);
  if (!record || now > record.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const clientIp =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for") ||
          "unknown";

        if (!checkRateLimit(clientIp)) {
          return new Response("Too many requests. Please wait a moment before sending another message.", {
            status: 429,
            headers: { "Retry-After": "60" },
          });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("The concierge is temporarily resting. Please write to support@aurumhaus.com.", {
            status: 503,
          });
        }

        let jsonBody: unknown;
        try {
          jsonBody = await request.json();
        } catch {
          return new Response("Invalid request payload", { status: 400 });
        }

        const parseResult = chatRequestSchema.safeParse(jsonBody);
        if (!parseResult.success) {
          return new Response("Invalid message format or message length exceeded", { status: 400 });
        }

        // 8-second outbound timeout to prevent worker execution hang
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3.5-flash",
              stream: true,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...parseResult.data.messages,
              ],
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!upstream.ok || !upstream.body) {
            return new Response("Our concierge is temporarily unavailable. Please reach out to support@aurumhaus.com.", {
              status: upstream.status || 502,
            });
          }

          // Transform OpenAI-style SSE into plain text chunks
          const reader = upstream.body.getReader();
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();
          let buffer = "";

          const stream = new ReadableStream({
            async pull(ctrl) {
              const { value, done } = await reader.read();
              if (done) {
                ctrl.close();
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
                  if (delta) ctrl.enqueue(encoder.encode(delta));
                } catch {
                  // Ignore malformed chunks
                }
              }
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache, no-transform",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch {
          clearTimeout(timeoutId);
          return new Response("Concierge connection timed out. Please try again.", { status: 504 });
        }
      },
    },
  },
});
