import React from "react";
import type { Goal } from "@/lib/database.types";
import { NavScreen } from "../types";

interface GoalsViewProps {
  goals: Goal[];
  goalsLoading: boolean;
  goalsError: string | null;
  onNavigate: (screen: NavScreen) => void;
  onSelectGoal: (goal: Goal) => void;
  onOpenCreateGoal: () => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  goalsLoading,
  goalsError,
  onNavigate,
  onSelectGoal,
  onOpenCreateGoal,
}) => {
  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-lg">
        <nav className="flex items-center gap-space-xs text-[#a5b0c8] font-label-md text-label-md">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-[#ffc174] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#a5b0c8]/40">/</span>
          <span className="text-[#ffc174] font-headline-sm text-headline-sm">Goals</span>
        </nav>

        <button
          onClick={onOpenCreateGoal}
          className="flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-[#f59e0b] hover:bg-[#ffb95f] text-[#472a00] font-bold font-label-lg text-label-lg transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Goal
        </button>
      </div>

      <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef] tracking-tight mb-space-xs">
        Your Goals
      </h1>
      <p className="font-body-md text-body-md text-[#a5b0c8] mb-space-xl">
        Everything you're currently working toward, saved to your account.
      </p>

      {goalsError && (
        <div className="mb-space-lg text-sm text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 rounded-lg p-4">
          {goalsError}
        </div>
      )}

      {goalsLoading ? (
        <div className="flex items-center gap-2 text-[#a5b0c8] text-sm py-space-xl">
          <span className="material-symbols-outlined text-[18px] animate-spin">
            progress_activity
          </span>
          Loading your goals…
        </div>
      ) : goals.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-space-sm py-space-xl px-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34]/40">
          <span className="material-symbols-outlined text-[36px] text-[#a5b0c8]/60">flag</span>
          <h2 className="font-headline-md text-headline-md text-[#dfe2ef]">No goals yet</h2>
          <p className="font-body-sm text-[13px] text-[#a5b0c8] max-w-sm">
            Create your first goal to start tracking real progress toward it.
          </p>
          <button
            onClick={onOpenCreateGoal}
            className="mt-space-sm flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-[#f59e0b] hover:bg-[#ffb95f] text-[#472a00] font-bold font-label-lg text-label-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onSelectGoal(goal)}
              className="text-left flex flex-col gap-space-xs bg-[#1c1f29] border border-[#262a34]/60 hover:border-[#353943] hover:bg-[#262a34]/50 rounded-xl p-space-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-space-sm">
                <h3 className="font-headline-md text-headline-md text-[#dfe2ef] truncate">
                  {goal.title}
                </h3>
                <span
                  className={`flex-shrink-0 px-1.5 py-0.5 rounded font-mono text-[10px] uppercase ${
                    goal.status === "active"
                      ? "bg-[#56e5a9]/20 text-[#56e5a9]"
                      : "bg-[#262a34] text-[#a5b0c8]"
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              {goal.description && (
                <p className="font-body-sm text-[13px] text-[#a5b0c8] line-clamp-3">
                  {goal.description}
                </p>
              )}

              <div className="flex items-center gap-2 mt-1">
                {goal.category && (
                  <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#c0c1ff] font-mono text-[10px]">
                    {goal.category}
                  </span>
                )}
                {goal.target_date && (
                  <span className="text-[11px] text-[#a5b0c8]">Target: {goal.target_date}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
