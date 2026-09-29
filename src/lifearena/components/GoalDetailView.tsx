import React from "react";
import type { Goal } from "@/lib/database.types";

interface GoalDetailViewProps {
  goal: Goal | undefined;
  onBackToGoals: () => void;
  onGenerateJourney: (goal: Goal) => void;
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({
  goal,
  onBackToGoals,
  onGenerateJourney,
}) => {
  if (!goal) {
    return (
      <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
        <button
          onClick={onBackToGoals}
          className="self-start flex items-center gap-1.5 text-[#a5b0c8] hover:text-[#ffc174] font-label-md text-label-md transition-colors cursor-pointer mb-space-lg"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Goals
        </button>
        <div className="flex flex-col items-center text-center gap-space-sm py-space-xl px-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34]/40">
          <span className="material-symbols-outlined text-[36px] text-[#a5b0c8]/60">
            search_off
          </span>
          <h2 className="font-headline-md text-headline-md text-[#dfe2ef]">Goal not found</h2>
          <p className="font-body-sm text-[13px] text-[#a5b0c8] max-w-sm">
            This goal may have been removed. Head back to your goals list.
          </p>
        </div>
      </div>
    );
  }

  const targetDate = formatDate(goal.target_date);
  const createdDate = formatDate(goal.created_at);

  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-space-xs text-[#a5b0c8] font-label-md text-label-md mb-space-lg">
        <button
          onClick={onBackToGoals}
          className="flex items-center gap-1.5 hover:text-[#ffc174] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Goals
        </button>
        <span className="text-[#a5b0c8]/40">/</span>
        <span className="text-[#ffc174] font-headline-sm text-headline-sm truncate max-w-xs">
          {goal.title}
        </span>
      </nav>

      {/* Hero Header Block */}
      <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-[#262a34]/50 mb-space-xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#ffc174]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            {goal.category && (
              <span className="px-space-sm py-space-xs rounded bg-[#262a34] font-label-sm text-label-sm text-[#ffc174] uppercase tracking-widest border border-[#f59e0b]/20">
                {goal.category}
              </span>
            )}
            <span
              className={`px-1.5 py-0.5 rounded font-mono text-[10px] uppercase ${
                goal.status === "active"
                  ? "bg-[#56e5a9]/20 text-[#56e5a9]"
                  : "bg-[#262a34] text-[#a5b0c8]"
              }`}
            >
              {goal.status}
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef] tracking-tight">
            {goal.title}
          </h1>

          {goal.description && (
            <p className="font-body-md text-body-md text-[#a5b0c8] max-w-2xl">{goal.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-space-lg mt-space-xs">
            {targetDate && (
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase tracking-wider">
                  Target Date
                </span>
                <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                  {targetDate}
                </span>
              </div>
            )}
            {createdDate && (
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase tracking-wider">
                  Created
                </span>
                <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                  {createdDate}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onGenerateJourney(goal)}
            className="self-start mt-space-sm flex items-center gap-1.5 px-space-lg py-space-sm rounded-lg bg-[#f59e0b] hover:bg-[#ffb95f] text-[#472a00] font-bold font-label-lg text-label-lg transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Generate My Journey
          </button>
        </div>
      </div>
    </div>
  );
};
