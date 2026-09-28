import React, { useState } from "react";
import { Quest, RoadmapPhase, UserProfile } from "../types";

interface Adjustment {
  title: string;
  why: string;
  type: "add" | "pause" | "adjust";
  tag: Quest["tagType"];
  xp: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  quests: Quest[];
  phases: RoadmapPhase[];
  onApply: (quest: Quest) => void;
}

const TYPE_META = {
  add: { icon: "add_circle", label: "Add" },
  pause: { icon: "pause_circle", label: "Pause" },
  adjust: { icon: "tune", label: "Adjust" },
} as const;

async function readStream(res: Response): Promise<string> {
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "response.output_text.delta") text += evt.delta;
        if (evt.type === "response.failed" || evt.type === "error")
          throw new Error(
            evt.response?.error?.message ?? evt.message ?? "The coach stopped unexpectedly.",
          );
      } catch (e) {
        if (e instanceof Error && !(e instanceof SyntaxError)) throw e;
      }
    }
  }
  return text;
}

export const RecalibrateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  quests,
  phases,
  onApply,
}) => {
  const [setback, setSetback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [items, setItems] = useState<Adjustment[]>([]);
  const [applied, setApplied] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setback.trim().length < 3 || loading) return;
    setLoading(true);
    setError(null);
    setItems([]);
    setSummary("");
    setApplied(new Set());
    try {
      const res = await fetch("/api/recalibrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setback,
          goal: user.primaryAnchor,
          quests: quests.slice(0, 20).map((q) => q.title),
          phases: phases.slice(0, 20).map((p) => `${p.title} (${p.status})`),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "The coach couldn’t respond right now.");
      }
      const text = await readStream(res);
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("The coach gave an unexpected answer. Please try again.");
      const data = JSON.parse(match[0]);
      setSummary(String(data.summary ?? ""));
      setItems(
        (Array.isArray(data.adjustments) ? data.adjustments : [])
          .slice(0, 5)
          .map((a: Adjustment) => ({
            title: String(a.title ?? "Update"),
            why: String(a.why ?? ""),
            type: ["add", "pause", "adjust"].includes(a.type) ? a.type : "adjust",
            tag: ["coding", "mindset", "health", "career"].includes(a.tag) ? a.tag : "mindset",
            xp: Math.min(100, Math.max(10, Number(a.xp) || 30)),
          })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const apply = (a: Adjustment, i: number) => {
    onApply({
      id: `recal-${Date.now()}-${i}`,
      title: a.title,
      tag: a.tag.toUpperCase(),
      tagType: a.tag,
      scope: a.why,
      xp: a.xp,
      completed: false,
    });
    setApplied((s) => new Set(s).add(i));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#ffc174]">route</span>
            <h2 className="text-xl font-bold text-[#dfe2ef]">Recalibrate my journey</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a5b0c8] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#262a34]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <p className="text-sm text-[#a5b0c8]">
          Had a setback, or your priorities shifted? Tell the coach what happened and get practical
          updates to your journey.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <textarea
            autoFocus
            value={setback}
            onChange={(e) => setSetback(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="e.g. I got sick for a week and missed all my coding quests, and now I want to focus more on job applications."
            className="w-full bg-[#0f131c] border border-[#262a34] rounded-xl p-3 text-sm text-[#dfe2ef] placeholder:text-[#5b6478] focus:outline-none focus:border-[#f59e0b]"
          />
          <button
            type="submit"
            disabled={loading || setback.trim().length < 3}
            className="self-end flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b] text-[#0f131c] font-bold text-sm disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}
            >
              {loading ? "progress_activity" : "auto_awesome"}
            </span>
            {loading ? "Thinking…" : "Get recommendations"}
          </button>
        </form>

        {error && (
          <div className="text-sm text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 rounded-lg p-3">
            {error}
          </div>
        )}

        {summary && (
          <p className="text-sm text-[#dfe2ef] border-l-2 border-[#f59e0b] pl-3">{summary}</p>
        )}

        {items.length > 0 && (
          <div className="flex flex-col gap-2">
            {items.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#1c1f29] border border-[#262a34] rounded-xl p-3"
              >
                <span className="material-symbols-outlined text-[20px] text-[#ffc174] mt-0.5">
                  {TYPE_META[a.type].icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#dfe2ef]">{a.title}</span>
                    <span className="text-[10px] uppercase tracking-wide text-[#a5b0c8] bg-[#262a34] px-1.5 py-0.5 rounded">
                      {TYPE_META[a.type].label} · {a.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#a5b0c8] mt-1">{a.why}</p>
                </div>
                <button
                  onClick={() => apply(a, i)}
                  disabled={applied.has(i)}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border border-[#f59e0b]/60 text-[#ffc174] hover:bg-[#f59e0b]/10 disabled:opacity-50"
                >
                  {applied.has(i) ? "Added" : `Add +${a.xp} XP`}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
