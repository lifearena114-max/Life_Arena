import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  setback: z.string().trim().min(3).max(2000),
  goal: z.string().max(300).optional(),
  quests: z.array(z.string().max(200)).max(20).optional(),
  phases: z.array(z.string().max(200)).max(20).optional(),
});

const SYSTEM = `You are LifeArena's journey coach. The user describes a setback or a change in priorities.
Recommend practical, specific, kind updates to their journey. Respond ONLY with a JSON object (no markdown fences) of shape:
{"summary": string (2 sentences max, empathetic and direct),
 "adjustments": [{"title": string (short action, max 8 words), "why": string (1 sentence), "type": "add" | "pause" | "adjust", "tag": "coding" | "mindset" | "health" | "career", "xp": number (10-100)}]}
Give 3 to 5 adjustments.`;

export const Route = createFileRoute("/api/recalibrate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success)
          return Response.json(
            { error: "Please describe what happened (at least a few words)." },
            { status: 400 },
          );
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });
        const d = parsed.data;
        const userMsg = `Primary goal: ${d.goal ?? "unknown"}
Current quests: ${(d.quests ?? []).join("; ") || "none"}
Roadmap phases: ${(d.phases ?? []).join("; ") || "none"}
What happened / what changed: ${d.setback}`;

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              instructions: SYSTEM,
              input: userMsg,
              stream: true,
              store: false,
              reasoning: { effort: "low", summary: "auto" },
              include: ["reasoning.encrypted_content"],
            }),
          });
          if (!upstream.ok) {
            const text = await upstream.text().catch(() => "");
            let message = "The coach couldn't respond right now.";
            if (upstream.status === 429)
              message = "Too many requests — please try again in a moment.";
            else if (upstream.status === 402)
              message = "AI credits are used up for this workspace. Add credits to continue.";
            else {
              try {
                message = JSON.parse(text)?.error?.message ?? message;
              } catch {
                /* keep default */
              }
            }
            return Response.json({ error: message }, { status: upstream.status });
          }
          const headers = new Headers({ "Content-Type": "text/event-stream" });
          upstream.headers.forEach((v, k) => {
            if (k.toLowerCase().startsWith("x-lovable-aig-")) headers.set(k, v);
          });
          return new Response(upstream.body, { status: 200, headers });
        } catch (e) {
          if (request.signal.aborted) return new Response(null, { status: 499 });
          throw e;
        }
      },
    },
  },
});
