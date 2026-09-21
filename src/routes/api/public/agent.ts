import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import type { Database, Json } from "@/integrations/supabase/types";

const schema = z.object({ threadId: z.string().uuid(), message: z.string().trim().min(1).max(4000) });
const system = `You are ARCOVA, an autonomous financial intelligence agent for tokenized markets on Arc. Never claim guaranteed profit, certainty, or accurate prediction. Use scenario, forecast, model view, confidence, probability, assumptions, risks, catalysts, market regime, and invalidation language. Never invent current prices, volume, performance, holders, TVL, news, transactions, hashes, RPC endpoints, contracts, backing, or issuer facts. No live market, news, asset registry, wallet, or onchain data is attached to this request. State that limitation directly whenever the user asks for current or asset-specific facts. You may explain methodology and construct clearly labeled hypothetical frameworks. Never request private keys or seed phrases. Keep the answer concise, structured, and transparent.`;

export const Route = createFileRoute("/api/public/agent")({
  server: { handlers: { POST: async ({ request }) => {
    const auth = request.headers.get("authorization") ?? "";
    if (!auth.startsWith("Bearer ")) return new Response("Unauthorized", { status: 401 });
    const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) return new Response("Service unavailable", { status: 503 });
    const db = createClient<Database>(url, key, { global: { headers: { Authorization: auth } }, auth: { persistSession: false } });
    const { data: { user } } = await db.auth.getUser(auth.slice(7));
    if (!user) return new Response("Unauthorized", { status: 401 });
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return new Response("Invalid request", { status: 400 });
    const { threadId, message } = parsed.data;
    const { data: thread } = await db.from("agent_threads").select("id").eq("id", threadId).eq("user_id", user.id).maybeSingle();
    if (!thread) return new Response("Thread not found", { status: 404 });
    const since = new Date(Date.now() - 60_000).toISOString();
    const { count } = await db.from("agent_messages").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("role", "user").gte("created_at", since);
    if ((count ?? 0) >= 12) return new Response("Request limit reached. Try again shortly.", { status: 429 });
    const { data: history } = await db.from("agent_messages").select("role,parts").eq("thread_id", threadId).order("created_at").limit(30);
    let answer: string;
    try {
      const apiKey = process.env['LOVABLE_API_KEY'];
      if (!apiKey) throw new Error("AI_UNAVAILABLE");
      const openai = createOpenAI({ apiKey, baseURL: "https://ai.gateway.lovable.dev/v1" });
      const context = (history ?? []).map(item => `${item.role.toUpperCase()}: ${extractText(item.parts)}`).join("\n");
      const result = await generateText({ model: openai("openai/gpt-6-astra"), system, prompt: `${context}\nUSER: ${message}` });
      answer = result.text;
    } catch {
      answer = "The ARCOVA intelligence service is currently unavailable. No market values, news, forecasts, or recommendations have been generated. Please retry when the service and validated data providers are connected.";
    }
    const now = new Date().toISOString();
    const userRow = { id: crypto.randomUUID(), thread_id: threadId, user_id: user.id, role: "user", parts: [{ type: "text", text: message }] as Json, created_at: now, ai_message_id: null };
    const assistantRow = { id: crypto.randomUUID(), thread_id: threadId, user_id: user.id, role: "assistant", parts: [{ type: "text", text: answer }] as Json, created_at: new Date(Date.now() + 1).toISOString(), ai_message_id: null };
    const { error } = await db.from("agent_messages").insert([userRow, assistantRow]);
    if (error) return new Response("Unable to save response", { status: 500 });
    await db.from("agent_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
    return Response.json({ user: userRow, assistant: assistantRow });
  } } },
});

function extractText(parts: Json): string {
  if (!Array.isArray(parts)) return "";
  return parts.map(part => typeof part === "object" && part && "text" in part ? String(part.text) : "").join("");
}
