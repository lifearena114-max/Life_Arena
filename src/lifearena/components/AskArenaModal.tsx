import React, { useState } from "react";
import { DecisionPoll, UserProfile } from "../types";

interface AskArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSubmitDilemma: (newPoll: DecisionPoll) => void;
}

export const AskArenaModal: React.FC<AskArenaModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmitDilemma,
}) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [optionAText, setOptionAText] = useState("");
  const [optionASubtext, setOptionASubtext] = useState("");
  const [optionBText, setOptionBText] = useState("");
  const [optionBSubtext, setOptionBSubtext] = useState("");
  const [category, setCategory] = useState<"career" | "tech" | "lifestyle" | "money">("tech");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !optionAText.trim() || !optionBText.trim()) return;

    const newPoll: DecisionPoll = {
      id: `user-poll-${Date.now()}`,
      author: {
        name: user.name,
        role: `${user.levelTitle} • Just now`,
        timeAgo: "Just now",
        avatar: user.avatar,
        online: true,
      },
      category,
      question: question.trim(),
      description: description.trim() || "Community input requested on this strategic trade-off.",
      totalVotes: 1,
      userVoted: "A",
      optionA: {
        text: optionAText.trim(),
        subtext: optionASubtext.trim() || "First strategic route",
        votes: 1,
        percent: 100,
      },
      optionB: {
        text: optionBText.trim(),
        subtext: optionBSubtext.trim() || "Alternative route",
        votes: 0,
        percent: 0,
      },
      aiInsight:
        "AI Synthesis: Both pathways offer distinct variance in short-term versus long-term returns. Prioritize based on your immediate focus constraint.",
      commentsCount: 0,
    };

    onSubmitDilemma(newPoll);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-space-xl flex flex-col gap-space-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#ffc174]">balance</span>
            <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
              Ask the Decision Arena
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a5b0c8] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#262a34]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-label-sm font-label-sm text-[#a5b0c8]">Domain Category</label>
            <div className="grid grid-cols-4 gap-2">
              {(["career", "tech", "lifestyle", "money"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 text-xs font-label-md rounded-lg border uppercase transition-all ${
                    category === cat
                      ? "bg-[#f59e0b] text-[#472a00] font-bold border-[#f59e0b]"
                      : "bg-[#1c1f29] text-[#a5b0c8] border-[#262a34]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dilemma Question */}
          <div className="flex flex-col gap-1">
            <label className="text-label-sm font-label-sm text-[#dfe2ef] font-semibold">
              The Dilemma Question *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Should I accept an early-stage startup offer or remain at Big Tech?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-3 py-2 rounded-lg border border-[#262a34] focus:border-[#f59e0b] outline-none text-body-sm"
            />
          </div>

          {/* Context / Constraints */}
          <div className="flex flex-col gap-1">
            <label className="text-label-sm font-label-sm text-[#a5b0c8]">
              Context &amp; Trade-offs
            </label>
            <textarea
              rows={2}
              placeholder="Include timeline, financial delta, current skill level, and risk tolerance..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-3 py-2 rounded-lg border border-[#262a34] focus:border-[#f59e0b] outline-none text-body-sm resize-none"
            />
          </div>

          {/* Option A */}
          <div className="p-space-sm rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-2">
            <span className="text-[11px] font-label-sm text-[#ffc174] font-bold">Option A</span>
            <input
              type="text"
              required
              placeholder="e.g. Join the Series A Startup"
              value={optionAText}
              onChange={(e) => setOptionAText(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-3 py-1.5 rounded border border-[#262a34] text-body-sm outline-none"
            />
            <input
              type="text"
              placeholder="Subtext: e.g. Massive ownership and steep learning"
              value={optionASubtext}
              onChange={(e) => setOptionASubtext(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#a5b0c8] px-3 py-1 rounded border border-[#262a34] text-[12px] outline-none"
            />
          </div>

          {/* Option B */}
          <div className="p-space-sm rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-2">
            <span className="text-[11px] font-label-sm text-[#c0c1ff] font-bold">Option B</span>
            <input
              type="text"
              required
              placeholder="e.g. Stay at Big Tech"
              value={optionBText}
              onChange={(e) => setOptionBText(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#dfe2ef] px-3 py-1.5 rounded border border-[#262a34] text-body-sm outline-none"
            />
            <input
              type="text"
              placeholder="Subtext: e.g. Predictable income and work-life balance"
              value={optionBSubtext}
              onChange={(e) => setOptionBSubtext(e.target.value)}
              className="w-full bg-[#0a0e17] text-[#a5b0c8] px-3 py-1 rounded border border-[#262a34] text-[12px] outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#a5b0c8] hover:text-[#dfe2ef] text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold rounded-lg text-label-md shadow-md cursor-pointer"
            >
              Publish to Arena
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
