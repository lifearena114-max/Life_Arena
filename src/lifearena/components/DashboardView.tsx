import React, { useEffect, useState } from "react";
import type { Goal } from "@/lib/database.types";
import { NavScreen, Quest, SquadActivity, UserProfile } from "../types";

interface DashboardViewProps {
  user: UserProfile;
  quests: Quest[];
  squadActivities: SquadActivity[];
  goals: Goal[];
  goalsLoading: boolean;
  goalsError: string | null;
  onToggleQuest: (questId: string) => void;
  onCheerSquad: (activityId: string) => void;
  onNavigate: (screen: NavScreen) => void;
  onOpenReflection: (quest: Quest) => void;
  onOpenSpeedQuest: () => void;
  onDailyCheckin: () => void;
  onOpenAskArena: () => void;
  onOpenCreateGoal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  quests,
  squadActivities,
  goals,
  goalsLoading,
  goalsError,
  onToggleQuest,
  onCheerSquad,
  onNavigate,
  onOpenReflection,
  onOpenSpeedQuest,
  onDailyCheckin,
  onOpenAskArena,
  onOpenCreateGoal,
}) => {
  // Timer state for Quest 2
  const [timerSeconds, setTimerSeconds] = useState(18 * 60 + 42);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds < 30 * 60) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Preview Poll state in Decision Arena widget
  const [votedOption, setVotedOption] = useState<"A" | "B" | null>(null);
  const [previewVotesA, setPreviewVotesA] = useState(58);
  const [previewVotesB, setPreviewVotesB] = useState(42);

  const handleVotePreview = (opt: "A" | "B") => {
    if (votedOption === opt) return;
    setVotedOption(opt);
    if (opt === "A") {
      setPreviewVotesA(60);
      setPreviewVotesB(40);
    } else {
      setPreviewVotesA(55);
      setPreviewVotesB(45);
    }
  };

  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1360px] mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
        {/* Hero Greeting & Executive Summary */}
        <section className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] border border-[#262a34]/50">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#ffc174]/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-[#3131c0]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262a34] text-[#ffc174] font-label-sm text-label-sm uppercase tracking-wider shadow-[0px_0px_16px_-2px_rgba(249,115,22,0.25)] border border-[#f59e0b]/20">
                  <span className="w-2 h-2 rounded-full bg-[#ffc174] animate-pulse" />
                  Live Arena Cycle #48
                </span>
                <span className="text-[#a5b0c8] font-label-md text-label-md">Q3 Sprint</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef] tracking-tight">
                Good morning, {user.name}{" "}
                <span className="inline-block transform hover:rotate-12 transition-transform duration-300">
                  ⚡
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-[#a5b0c8]">
                Ready for today&apos;s quests? You&apos;re on an unbroken{" "}
                <span className="text-[#ffc174] font-semibold">{user.streakDays}-day roll</span>.
                You have 3 high-yield objectives queued.
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-space-sm">
              <button
                onClick={onDailyCheckin}
                className="group flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] transition-all shadow-sm cursor-pointer border border-[#31353f]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#56e5a9]">
                  check_circle
                </span>
                <span className="font-label-lg text-label-lg">Daily Check-in</span>
                <span className="px-1.5 py-0.5 rounded bg-[#1c1f29] text-[#a5b0c8] text-[10px] font-mono border border-[#31353f]">
                  ⌘D
                </span>
              </button>
              <button
                onClick={onOpenSpeedQuest}
                className="group flex items-center gap-space-sm px-space-lg py-space-sm rounded-lg bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-lg text-label-lg shadow-[0px_0px_24px_-4px_rgba(245,158,11,0.35)] transition-all cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Speed Quest</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Top Key Metrics Row (3-Column Tactical Bento) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1: Level & XP */}
          <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-lg flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 group hover:bg-[#262a34]/80 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#a5b0c8]">
                  Tier Classification
                </span>
                <div className="flex items-baseline gap-space-xs mt-1">
                  <span className="font-stat-counter text-stat-counter text-[#dfe2ef]">
                    LVL 0{user.level}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#ffc174]">
                    {user.levelTitle}
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffc174] shadow-[0px_0px_16px_-2px_rgba(245,158,11,0.2)]">
                <span className="material-symbols-outlined text-[24px]">military_tech</span>
              </div>
            </div>

            <div className="mt-space-lg flex flex-col gap-space-xs">
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-[#dfe2ef] font-semibold">
                  {user.currentXp.toLocaleString()}{" "}
                  <span className="text-[#a5b0c8] font-normal">
                    / {user.targetXp.toLocaleString()} XP
                  </span>
                </span>
                <span className="text-[#56e5a9] font-mono text-[11px]">
                  +{user.targetXp - user.currentXp} XP to {user.nextLevelTitle}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e17] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#f59e0b] via-[#ffc174] to-[#56e5a9] rounded-full relative transition-all duration-500"
                  style={{ width: `${Math.round((user.currentXp / user.targetXp) * 100)}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-label-sm text-[#a5b0c8] mt-1">
                <span>Progress: {((user.currentXp / user.targetXp) * 100).toFixed(1)}%</span>
                <span>Est. Promotion: 2 Days</span>
              </div>
            </div>
          </div>

          {/* Card 2: Streak & Momentum */}
          <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-lg flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 group hover:bg-[#262a34]/80 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#a5b0c8]">
                  Momentum Index
                </span>
                <div className="flex items-baseline gap-space-xs mt-1">
                  <span className="font-stat-counter text-stat-counter text-[#ffc174]">
                    {user.streakDays}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                    Day Streak
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-lg bg-[#262a34] flex items-center justify-center text-[#f59e0b] shadow-[0px_0px_16px_-2px_rgba(249,115,22,0.35)]">
                <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
              </div>
            </div>

            <div className="mt-space-lg flex flex-col gap-space-sm">
              <div className="flex justify-between items-center text-[#a5b0c8] font-label-sm text-label-sm">
                <span>Weekly Vector (Mon - Sun)</span>
                <span className="text-[#dfe2ef]">
                  PB: <strong className="text-[#ffc174]">{user.bestStreakDays}d</strong>
                </span>
              </div>

              {/* 7-Day Grid */}
              <div className="grid grid-cols-7 gap-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                  const isPastChecked = idx < 4;
                  const isToday = idx === 4; // Friday in mockup
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span
                        className={`text-[10px] font-label-sm ${
                          isToday ? "text-[#ffc174] font-bold" : "text-[#a5b0c8]"
                        }`}
                      >
                        {day}
                      </span>
                      {isPastChecked ? (
                        <div className="w-full h-7 rounded bg-[#30c88f]/30 flex items-center justify-center text-[#56e5a9] shadow-[0_0_8px_rgba(48,200,143,0.3)]">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        </div>
                      ) : isToday ? (
                        <div className="w-full h-7 rounded bg-[#f59e0b] text-[#472a00] flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.5)] animate-pulse">
                          •
                        </div>
                      ) : (
                        <div className="w-full h-7 rounded bg-[#0a0e17] flex items-center justify-center text-[#a5b0c8]/40 border border-[#262a34]/30">
                          <span className="text-[10px] font-mono">0</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 3: Active Focus Goal */}
          <div
            onClick={() => onNavigate("ai-journeys-quests")}
            className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-lg flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 group hover:bg-[#262a34]/80 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col min-w-0 pr-space-sm">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#c0c1ff]">
                    Primary Anchor
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#a5b0c8] font-mono text-[10px]">
                    P2 / 4
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-[#dfe2ef] mt-1 truncate">
                  {user.primaryAnchor}
                </h2>
              </div>
              <div className="w-11 h-11 rounded-lg bg-[#262a34] flex items-center justify-center text-[#c0c1ff] shadow-[0px_0px_16px_-2px_rgba(192,193,255,0.2)] flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">terminal</span>
              </div>
            </div>

            <div className="mt-space-lg flex flex-col gap-space-xs">
              <div className="flex justify-between items-baseline font-label-md text-label-md">
                <span className="text-[#dfe2ef] truncate">
                  Next:{" "}
                  <strong className="text-[#ffc174] font-medium">{user.primaryAnchorPhase}</strong>
                </span>
                <span className="text-[#c0c1ff] font-stat-counter text-[16px] flex-shrink-0">
                  {user.primaryAnchorProgress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e17] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#c0c1ff] rounded-full relative"
                  style={{ width: `${user.primaryAnchorProgress}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-label-sm text-[#a5b0c8] mt-1">
                <span>Milestone 04 of 09</span>
                <span className="text-[#c0c1ff] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Focus Phase{" "}
                  <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Split Layout (7fr / 5fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Primary Column (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-xl">
            {/* Today's Quests Module */}
            <section className="rounded-xl bg-[#1c1f29] p-space-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-[#262a34]/40">
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-sm">
                    <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
                      Today&apos;s Quests
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#262a34] text-[#ffc174] font-label-sm text-label-sm">
                      {completedCount} of {quests.length} Completed
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#a5b0c8]">
                    Execute routine drills to secure daily streak multiplier
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[#56e5a9] bg-[#30c88f]/10 border border-[#30c88f]/30 px-2.5 py-1 rounded-md font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span>+150 XP today</span>
                </div>
              </div>

              {/* Quest List */}
              <div className="flex flex-col gap-space-sm">
                {/* Quest 1 (Completed) */}
                <div className="group relative flex items-center justify-between p-space-md rounded-lg bg-[#181b25] border border-[#262a34]/50 transition-all">
                  <div className="flex items-center gap-space-md min-w-0">
                    <button
                      onClick={() => onToggleQuest("q1")}
                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                        quests[0]?.completed
                          ? "bg-[#56e5a9] text-[#003824]"
                          : "bg-[#0a0e17] text-transparent hover:text-[#56e5a9]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-label-lg text-label-lg truncate ${
                            quests[0]?.completed
                              ? "line-through text-[#a5b0c8]/60"
                              : "text-[#dfe2ef]"
                          }`}
                        >
                          {quests[0]?.title || "Complete JavaScript lesson"}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#30c88f]/20 text-[#56e5a9] font-label-sm text-[10px]">
                          Coding
                        </span>
                      </div>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8]/50">
                        {quests[0]?.scope || "Core Scope: Array methods & reduce patterns"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm flex-shrink-0 ml-space-md">
                    <span className="font-stat-counter text-[14px] text-[#56e5a9]">+50 XP</span>
                    <span className="text-[#a5b0c8]/40 material-symbols-outlined text-[18px]">
                      lock
                    </span>
                  </div>
                </div>

                {/* Quest 2 (Active / In-Progress with Live Timer) */}
                <div
                  className={`relative overflow-hidden flex flex-col p-space-md rounded-lg bg-[#262a34] shadow-md border border-[#31353f] transition-all ${
                    quests[1]?.completed ? "opacity-80" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-space-md min-w-0">
                      <button
                        onClick={() => onToggleQuest("q2")}
                        className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                          quests[1]?.completed
                            ? "bg-[#56e5a9] text-[#003824]"
                            : "bg-[#0a0e17] text-transparent hover:text-[#56e5a9] border border-[#31353f]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </button>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-headline-sm text-headline-sm truncate ${
                              quests[1]?.completed
                                ? "line-through text-[#a5b0c8]"
                                : "text-[#dfe2ef]"
                            }`}
                          >
                            {quests[1]?.title || "Practice coding for 30 minutes"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#30c88f]/20 text-[#56e5a9] font-label-sm text-[10px]">
                            Coding
                          </span>
                          {!quests[1]?.completed && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174] animate-ping" />
                          )}
                        </div>
                        <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                          {quests[1]?.scope ||
                            "Focus: Algorithm optimization & LeetCode challenges"}
                        </span>
                      </div>
                    </div>
                    <span className="font-stat-counter text-[14px] text-[#ffc174] flex-shrink-0 ml-space-md">
                      +75 XP
                    </span>
                  </div>

                  {/* Live Timer Strip */}
                  <div className="flex items-center justify-between bg-[#0a0e17] p-space-sm rounded-lg mt-1 border border-[#181b25]">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[20px] text-[#ffc174]">
                        timer
                      </span>
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                          {formatTimer(timerSeconds)}
                        </span>
                        <span className="text-[#a5b0c8] text-[11px]">/ 30:00</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="flex items-center gap-1 px-3 py-1 rounded bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-md text-label-md transition-all cursor-pointer font-semibold"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {timerRunning ? "pause" : "play_arrow"}
                        </span>
                        <span>{timerRunning ? "Pause" : "Resume"}</span>
                      </button>
                      <button
                        onClick={() => onToggleQuest("q2")}
                        className={`px-2.5 py-1 rounded font-label-md text-label-md transition-all cursor-pointer ${
                          quests[1]?.completed
                            ? "bg-[#56e5a9]/20 text-[#56e5a9]"
                            : "bg-[#1c1f29] hover:bg-[#353943] text-[#a5b0c8]"
                        }`}
                      >
                        {quests[1]?.completed ? "Completed" : "Mark Done"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quest 3 (Pending - Mindset with Reflection Prompt) */}
                <div className="group flex items-center justify-between p-space-md rounded-lg bg-[#181b25] hover:bg-[#262a34] border border-[#262a34]/50 transition-all">
                  <div className="flex items-center gap-space-md min-w-0">
                    <button
                      onClick={() => onToggleQuest("q3")}
                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                        quests[2]?.completed
                          ? "bg-[#56e5a9] text-[#003824]"
                          : "bg-[#0a0e17] text-transparent hover:text-[#56e5a9] border border-[#31353f]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-label-lg text-label-lg truncate ${
                            quests[2]?.completed ? "line-through text-[#a5b0c8]" : "text-[#dfe2ef]"
                          }`}
                        >
                          {quests[2]?.title || "Write today's reflection"}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#3131c0]/40 text-[#c0c1ff] font-label-sm text-[10px]">
                          Mindset
                        </span>
                      </div>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                        {quests[2]?.reflectionSaved
                          ? `Saved: "${quests[2].reflectionSaved.slice(0, 45)}..."`
                          : quests[2]?.scope}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm flex-shrink-0 ml-space-md">
                    <span className="font-stat-counter text-[14px] text-[#a5b0c8]">+25 XP</span>
                    <button
                      onClick={() => {
                        const quest = quests[2];
                        if (quest) onOpenReflection(quest);
                      }}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-label-md text-label-md transition-all cursor-pointer border border-[#31353f]"
                    >
                      <span>{quests[2]?.reflectionSaved ? "Edit Note" : "Open Prompt"}</span>
                      <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    </button>
                  </div>
                </div>

                {/* Quest 4 (Pending - Health) */}
                <div className="group flex items-center justify-between p-space-md rounded-lg bg-[#181b25] hover:bg-[#262a34] border border-[#262a34]/50 transition-all">
                  <div className="flex items-center gap-space-md min-w-0">
                    <button
                      onClick={() => onToggleQuest("q4")}
                      className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                        quests[3]?.completed
                          ? "bg-[#56e5a9] text-[#003824]"
                          : "bg-[#0a0e17] text-transparent hover:text-[#56e5a9] border border-[#31353f]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-label-lg text-label-lg truncate ${
                            quests[3]?.completed ? "line-through text-[#a5b0c8]" : "text-[#dfe2ef]"
                          }`}
                        >
                          {quests[3]?.title || "Hydration & Posture check"}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#30c88f]/20 text-[#56e5a9] font-label-sm text-[10px]">
                          Health
                        </span>
                      </div>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                        {quests[3]?.scope ||
                          "Target: Drink 500ml water + 2min shoulder decompression"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm flex-shrink-0 ml-space-md">
                    <span className="font-stat-counter text-[14px] text-[#a5b0c8]">+15 XP</span>
                    <button
                      onClick={() => onToggleQuest("q4")}
                      aria-label="Mark Quest Done"
                      className={`w-8 h-8 rounded flex items-center justify-center transition-all cursor-pointer ${
                        quests[3]?.completed
                          ? "bg-[#56e5a9] text-[#003824]"
                          : "bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Goals Module (real, persisted goals) */}
            <section className="rounded-xl bg-[#1c1f29] p-space-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-[#262a34]/40">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#c0c1ff]">
                  Your Goals
                </span>
                <button
                  onClick={onOpenCreateGoal}
                  className="flex items-center gap-1 px-space-sm py-1.5 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#ffc174] font-label-md text-label-md transition-all cursor-pointer border border-[#31353f]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  New Goal
                </button>
              </div>

              {goalsError && (
                <div className="text-sm text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 rounded-lg p-3">
                  {goalsError}
                </div>
              )}

              {goalsLoading ? (
                <div className="flex items-center gap-2 text-[#a5b0c8] text-sm py-space-md">
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  Loading your goals…
                </div>
              ) : goals.length === 0 ? (
                <div className="flex flex-col items-center text-center gap-space-xs py-space-lg text-[#a5b0c8]">
                  <span className="material-symbols-outlined text-[28px] text-[#a5b0c8]/60">
                    flag
                  </span>
                  <p className="font-body-sm text-[13px]">
                    No goals yet. Create your first one to start your journey.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-space-sm">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-start justify-between gap-space-sm bg-[#181b25] border border-[#262a34]/60 rounded-xl p-space-md"
                    >
                      <div className="flex flex-col min-w-0 gap-0.5">
                        <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold truncate">
                          {goal.title}
                        </span>
                        {goal.description && (
                          <span className="text-[12px] text-[#a5b0c8] line-clamp-2">
                            {goal.description}
                          </span>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {goal.category && (
                            <span className="px-1.5 py-0.5 rounded bg-[#262a34] text-[#c0c1ff] font-mono text-[10px]">
                              {goal.category}
                            </span>
                          )}
                          {goal.target_date && (
                            <span className="text-[11px] text-[#a5b0c8]">
                              Target: {goal.target_date}
                            </span>
                          )}
                        </div>
                      </div>
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
                  ))}
                </div>
              )}
            </section>

            {/* Current Goal Journey Snapshot Module */}
            <section className="rounded-xl bg-[#1c1f29] p-space-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 flex flex-col gap-space-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#c0c1ff]">
                      Active Strategic Path
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]" />
                    <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                      Phase 2: Frontend Mastery
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef] mt-1">
                    Full-Stack Development Path
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate("ai-journeys-quests")}
                  className="self-start md:self-auto flex items-center gap-1.5 px-space-md py-space-sm rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#ffc174] font-label-lg text-label-lg transition-all cursor-pointer border border-[#31353f]"
                >
                  <span>Continue Journey</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              {/* Interactive Milestone Roadmap */}
              <div className="relative mt-space-md pt-space-sm pb-space-xs">
                {/* Connecting Base Line */}
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-[#31353f]" />
                <div className="absolute top-8 left-8 w-[50%] h-0.5 bg-gradient-to-r from-[#56e5a9] to-[#f59e0b]" />

                <div className="grid grid-cols-4 gap-space-sm relative z-10">
                  {/* Milestone 1 */}
                  <div className="flex flex-col items-center text-center gap-space-xs">
                    <div className="w-10 h-10 rounded-full bg-[#56e5a9] text-[#003824] flex items-center justify-center font-bold text-sm shadow-[0_0_16px_rgba(48,200,143,0.4)]">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <span className="font-label-md text-label-md text-[#dfe2ef] mt-1 font-semibold">
                      ES6+ &amp; DOM
                    </span>
                    <span className="text-[11px] font-label-sm text-[#56e5a9]">Completed</span>
                  </div>

                  {/* Milestone 2 */}
                  <div className="flex flex-col items-center text-center gap-space-xs">
                    <div className="w-10 h-10 rounded-full bg-[#56e5a9] text-[#003824] flex items-center justify-center font-bold text-sm shadow-[0_0_16px_rgba(48,200,143,0.4)]">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <span className="font-label-md text-label-md text-[#dfe2ef] mt-1 font-semibold">
                      CSS &amp; Tailwind
                    </span>
                    <span className="text-[11px] font-label-sm text-[#56e5a9]">Completed</span>
                  </div>

                  {/* Milestone 3 (Current Active) */}
                  <div
                    onClick={() => onNavigate("ai-journeys-quests")}
                    className="flex flex-col items-center text-center gap-space-xs cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-[#472a00] flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                    </div>
                    <span className="font-label-md text-label-md text-[#ffc174] mt-1 font-bold">
                      React &amp; Hooks
                    </span>
                    <span className="text-[11px] font-label-sm text-[#ffb95f]">
                      In Progress (75%)
                    </span>
                  </div>

                  {/* Milestone 4 */}
                  <div className="flex flex-col items-center text-center gap-space-xs opacity-60">
                    <div className="w-10 h-10 rounded-full bg-[#31353f] text-[#a5b0c8] flex items-center justify-center font-bold text-sm">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </div>
                    <span className="font-label-md text-label-md text-[#a5b0c8] mt-1">
                      REST &amp; Express
                    </span>
                    <span className="text-[11px] font-label-sm text-[#a5b0c8]">Locked</span>
                  </div>
                </div>
              </div>

              {/* Active Sprint Capsule */}
              <div className="flex items-center justify-between p-space-md rounded-lg bg-[#0a0e17] mt-space-xs border border-[#262a34]">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[#ffc174] text-[22px]">
                    play_circle
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-[#dfe2ef]">
                      Immediate Drill: Custom Hook Architecture
                    </span>
                    <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                      Building a debounced input query hook with clean up effects
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("ai-journeys-quests")}
                  className="px-3 py-1.5 rounded bg-[#ffc174] text-[#472a00] font-label-md text-label-md hover:bg-[#ffb95f] transition-all cursor-pointer font-bold"
                >
                  Resume 8m
                </button>
              </div>
            </section>
          </div>

          {/* Secondary Column (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-xl">
            {/* Decision Arena Preview Card */}
            <section className="rounded-xl bg-[#1c1f29] p-space-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">
                    balance
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
                    Decision Arena
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#3131c0]/40 text-[#c0c1ff] font-label-sm text-label-sm border border-[#3131c0]/60">
                  Live Deliberation
                </span>
              </div>

              <div className="p-space-md rounded-lg bg-[#181b25] border border-[#262a34]/50 flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-[#a5b0c8]">
                    Posted by Alex R. • 3 hrs ago
                  </span>
                  <span className="font-label-sm text-[11px] text-[#56e5a9] flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
                    142 votes
                  </span>
                </div>

                <h4 className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                  &quot;Should I focus entirely on React fundamentals or jump directly into Next.js
                  fullstack?&quot;
                </h4>

                {/* Poll Options Preview */}
                <div className="flex flex-col gap-space-xs mt-space-xs">
                  {/* Option A */}
                  <div
                    onClick={() => handleVotePreview("A")}
                    className={`relative overflow-hidden rounded-lg bg-[#262a34] p-space-sm flex items-center justify-between cursor-pointer hover:bg-[#353943] transition-all border ${
                      votedOption === "A" ? "border-[#c0c1ff]" : "border-transparent"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#3131c0]/30 transition-all duration-500"
                      style={{ width: `${previewVotesA}%` }}
                    />
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-[#c0c1ff] flex items-center justify-center">
                        {votedOption === "A" && (
                          <span className="w-2 h-2 rounded-full bg-[#c0c1ff]" />
                        )}
                      </span>
                      <span className="font-label-md text-label-md text-[#dfe2ef] font-medium">
                        React (Master pure fundamentals)
                      </span>
                    </div>
                    <span className="relative z-10 font-stat-counter text-[14px] text-[#c0c1ff] font-bold">
                      {previewVotesA}%
                    </span>
                  </div>

                  {/* Option B */}
                  <div
                    onClick={() => handleVotePreview("B")}
                    className={`relative overflow-hidden rounded-lg bg-[#262a34] p-space-sm flex items-center justify-between cursor-pointer hover:bg-[#353943] transition-all border ${
                      votedOption === "B" ? "border-[#c0c1ff]" : "border-transparent"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#3131c0]/15 transition-all duration-500"
                      style={{ width: `${previewVotesB}%` }}
                    />
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-[#a5b0c8]/40 flex items-center justify-center">
                        {votedOption === "B" && (
                          <span className="w-2 h-2 rounded-full bg-[#c0c1ff]" />
                        )}
                      </span>
                      <span className="font-label-md text-label-md text-[#a5b0c8] font-medium">
                        Next.js (Jump into framework)
                      </span>
                    </div>
                    <span className="relative z-10 font-stat-counter text-[14px] text-[#a5b0c8] font-bold">
                      {previewVotesB}%
                    </span>
                  </div>
                </div>

                {/* AI Perspective Badge & Callout */}
                <div className="p-space-sm rounded-lg bg-[#0a0e17] border border-[#262a34] flex items-start gap-space-sm mt-space-xs">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[20px] flex-shrink-0 mt-0.5">
                    auto_awesome
                  </span>
                  <p className="font-body-sm text-[12px] text-[#dfe2ef] leading-relaxed">
                    <strong className="text-[#c0c1ff] font-semibold">AI Synthesis:</strong>{" "}
                    Deepening pure React component lifecycles yields a 30% faster mental model
                    before handling Next.js server components and hydration boundaries.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-space-xs mt-space-xs">
                  <button
                    onClick={() => onNavigate("decision-arena")}
                    className="px-space-md py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-md text-label-md transition-all cursor-pointer font-bold"
                  >
                    Cast Your Vote
                  </button>
                  <button
                    onClick={onOpenAskArena}
                    className="flex items-center gap-1 text-[#a5b0c8] hover:text-[#dfe2ef] font-label-md text-label-md transition-colors cursor-pointer"
                  >
                    <span>Ask the Arena</span>
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </section>

            {/* People in your Arena (Squad Feed) */}
            <section className="rounded-xl bg-[#1c1f29] p-space-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef]">Squad Feed</h3>
                  <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                    Live momentum from your cohort
                  </span>
                </div>
                <button
                  onClick={() => onNavigate("squads")}
                  className="text-[#ffc174] font-label-md text-label-md hover:underline cursor-pointer"
                >
                  View Squad (12)
                </button>
              </div>

              <div className="flex flex-col gap-space-sm">
                {squadActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-space-sm rounded-lg bg-[#181b25] border border-[#262a34]/50 hover:bg-[#262a34] transition-all"
                  >
                    <div className="flex items-center gap-space-sm min-w-0">
                      <img
                        src={act.authorAvatar}
                        alt={act.authorName}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-[#262a34]"
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold truncate">
                            {act.authorName}
                          </span>
                          {act.specialBadge ? (
                            <span className="text-[#ffc174] text-[11px] font-semibold">
                              {act.specialBadge}
                            </span>
                          ) : (
                            <span className="text-[#56e5a9] text-[11px] font-mono">
                              +{act.xpReward} XP
                            </span>
                          )}
                        </div>
                        <span className="font-body-sm text-[12px] text-[#a5b0c8] truncate">
                          {act.action}
                        </span>
                        <span className="text-[10px] text-[#a5b0c8]/50">{act.timeAgo}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onCheerSquad(act.id)}
                      className={`px-2.5 py-1 rounded text-[12px] font-label-sm flex items-center gap-1 transition-all flex-shrink-0 cursor-pointer ${
                        act.userCheered
                          ? "bg-[#f59e0b] text-[#472a00] font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                          : "bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef]"
                      }`}
                    >
                      <span>🙌</span>
                      <span>{act.cheersCount}</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
