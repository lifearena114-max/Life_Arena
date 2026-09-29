import React, { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import type { NewGoalInput } from "../hooks/useGoals";

const CATEGORIES = [
  { id: "career", label: "Career" },
  { id: "coding", label: "Coding & Technology" },
  { id: "learning", label: "Learning" },
  { id: "fitness", label: "Fitness" },
  { id: "health", label: "Health" },
  { id: "money", label: "Money" },
  { id: "productivity", label: "Productivity" },
  { id: "confidence", label: "Confidence" },
  { id: "mindset", label: "Mindset" },
];

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (input: NewGoalInput) => Promise<unknown>;
}

export const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setTargetDate("");
    setError("");
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);
    try {
      await onCreate({ title, description, category, targetDate });
      resetAndClose();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Couldn't save that goal. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-[#a5b0c8] hover:text-[#dfe2ef] p-1.5 rounded-lg hover:bg-[#262a34] transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <form
          onSubmit={handleSubmit}
          className="p-space-xl flex flex-col gap-space-lg overflow-y-auto no-scrollbar"
        >
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-[#ffc174] uppercase tracking-wider font-bold">
              New Goal
            </span>
            <h2 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
              What are you working toward?
            </h2>
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Become a full-stack developer"
              maxLength={120}
              autoFocus
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-4 py-3 rounded-xl border border-[#262a34] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none text-body-md"
            />
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
              Description <span className="text-[#a5b0c8] font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra context for this goal"
              rows={3}
              maxLength={2000}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-4 py-3 rounded-xl border border-[#262a34] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none text-body-md resize-none"
            />
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
              Category <span className="text-[#a5b0c8] font-normal">(optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(isSelected ? "" : cat.id)}
                    className={`py-2 px-2 text-[12px] font-label-md rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#f59e0b] text-[#472a00] font-bold border-[#f59e0b]"
                        : "bg-[#1c1f29] text-[#a5b0c8] border-[#262a34] hover:bg-[#262a34]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
              Target Date <span className="text-[#a5b0c8] font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-4 py-3 rounded-xl border border-[#262a34] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none text-body-md [color-scheme:dark]"
            />
          </div>

          {error && (
            <div className="text-sm text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-space-md py-space-sm rounded-lg text-[#a5b0c8] hover:text-[#dfe2ef] font-label-lg text-label-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-[#f59e0b] hover:bg-[#ffb95f] disabled:opacity-50 disabled:cursor-not-allowed text-[#472a00] font-bold font-label-lg text-label-lg transition-all cursor-pointer"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Saving..." : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
