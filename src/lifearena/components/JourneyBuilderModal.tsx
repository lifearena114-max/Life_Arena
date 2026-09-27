import React, { useEffect, useState } from "react";

interface JourneyBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJourneyCreated: (goalTitle: string, domain: string) => void;
}

const DOMAINS = [
  {
    id: "coding",
    title: "Coding & Technology",
    icon: "code",
    desc: "Software, web dev, algorithms",
  },
  {
    id: "career",
    title: "Career Acceleration",
    icon: "trending_up",
    desc: "Promotion, leadership, transitions",
  },
  {
    id: "learning",
    title: "Learning & Mastery",
    icon: "school",
    desc: "New skills, books, languages",
  },
  {
    id: "fitness",
    title: "Fitness & Physical",
    icon: "fitness_center",
    desc: "Strength, endurance, running",
  },
  {
    id: "health",
    title: "Health & Vitality",
    icon: "favorite",
    desc: "Nutrition, sleep, longevity",
  },
  { id: "money", title: "Money & Wealth", icon: "payments", desc: "Investing, budgeting, income" },
  {
    id: "productivity",
    title: "Productivity & Focus",
    icon: "timer",
    desc: "Systems, habits, deep work",
  },
  {
    id: "confidence",
    title: "Confidence & Voice",
    icon: "record_voice_over",
    desc: "Public speaking, leadership",
  },
  {
    id: "mindset",
    title: "Mindset & Growth",
    icon: "psychology",
    desc: "Resilience, emotional agility",
  },
];

export const JourneyBuilderModal: React.FC<JourneyBuilderModalProps> = ({
  isOpen,
  onClose,
  onJourneyCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDomain, setSelectedDomain] = useState("coding");
  const [goalTitle, setGoalTitle] = useState("Become a full-stack developer");
  const [timeline, setTimeline] = useState("3 months");
  const [dailyCommitment, setDailyCommitment] = useState("1 Hr / Day");
  const [progressPercent, setProgressPercent] = useState(15);
  const [checkpointsDone, setCheckpointsDone] = useState<number>(0);

  useEffect(() => {
    if (step === 3) {
      setProgressPercent(15);
      setCheckpointsDone(0);

      const t1 = setTimeout(() => {
        setProgressPercent(45);
        setCheckpointsDone(1);
      }, 500);

      const t2 = setTimeout(() => {
        setProgressPercent(75);
        setCheckpointsDone(2);
      }, 1100);

      const t3 = setTimeout(() => {
        setProgressPercent(96);
        setCheckpointsDone(3);
      }, 1600);

      const t4 = setTimeout(() => {
        setProgressPercent(100);
        setCheckpointsDone(4);
        setTimeout(() => setStep(4), 500);
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
    return undefined;
  }, [step]);

  if (!isOpen) return null;

  const handleFinish = () => {
    onJourneyCreated(goalTitle, selectedDomain);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a5b0c8] hover:text-[#dfe2ef] p-1.5 rounded-lg hover:bg-[#262a34] transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* STEP 1: Domain & Goal Selection (Screen B) */}
        {step === 1 && (
          <div className="p-space-xl flex flex-col gap-space-lg overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-[#ffc174] uppercase tracking-wider font-bold">
                Step 1 of 2 • Discovery
              </span>
              <h2 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
                What do you want to improve?
              </h2>
              <p className="font-body-md text-body-md text-[#a5b0c8]">
                Select your core domain to configure the AI roadmap engine.
              </p>
            </div>

            {/* Domain Grid */}
            <div className="grid grid-cols-3 gap-space-sm">
              {DOMAINS.map((dom) => {
                const isSelected = selectedDomain === dom.id;
                return (
                  <div
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom.id)}
                    className={`p-space-md rounded-xl border flex flex-col gap-space-xs cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#262a34] border-[#f59e0b] ring-1 ring-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                        : "bg-[#1c1f29] border-[#262a34]/60 hover:border-[#353943] hover:bg-[#262a34]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`material-symbols-outlined text-[22px] ${
                          isSelected ? "text-[#ffc174]" : "text-[#a5b0c8]"
                        }`}
                      >
                        {dom.icon}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-[#f59e0b] bg-[#f59e0b]" : "border-[#a5b0c8]/40"
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[12px] text-[#472a00] font-bold">
                            check
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold mt-1 leading-tight">
                      {dom.title}
                    </span>
                    <span className="text-[11px] text-[#a5b0c8] line-clamp-1">{dom.desc}</span>
                  </div>
                );
              })}
            </div>

            {/* Goal Input */}
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
                What are you working toward?
              </label>
              <input
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="e.g. Become a full-stack developer"
                className="w-full bg-[#0a0e17] text-[#dfe2ef] px-4 py-3 rounded-xl border border-[#262a34] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none text-body-md"
              />
            </div>

            {/* Timeline Picker */}
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
                Target Timeline
              </label>
              <div className="grid grid-cols-5 gap-2">
                {["30 days", "3 months", "6 months", "1 year", "No deadline"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`py-2 px-1 text-[12px] font-label-md rounded-lg border transition-all cursor-pointer ${
                      timeline === t
                        ? "bg-[#f59e0b] text-[#472a00] font-bold border-[#f59e0b]"
                        : "bg-[#1c1f29] text-[#a5b0c8] border-[#262a34] hover:bg-[#262a34]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-space-lg py-space-sm rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-lg text-label-lg font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
              >
                <span>Continue to Cadence</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Commitment & Cadence */}
        {step === 2 && (
          <div className="p-space-xl flex flex-col gap-space-lg">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-[#ffc174] uppercase tracking-wider font-bold">
                Step 2 of 2 • Intensity &amp; Rhythm
              </span>
              <h2 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
                How much daily focus can you invest?
              </h2>
              <p className="font-body-md text-body-md text-[#a5b0c8]">
                We will balance quest increments to prevent burnout and ensure steady compound
                gains.
              </p>
            </div>

            {/* Daily Commitment options */}
            <div className="grid grid-cols-3 gap-space-md">
              {["30 Mins / Day", "1 Hr / Day", "2+ Hrs / Day"].map((c) => (
                <div
                  key={c}
                  onClick={() => setDailyCommitment(c)}
                  className={`p-space-lg rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    dailyCommitment === c
                      ? "bg-[#262a34] border-[#f59e0b] ring-1 ring-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                      : "bg-[#1c1f29] border-[#262a34] hover:bg-[#262a34]/60"
                  }`}
                >
                  <span className="material-symbols-outlined text-[28px] text-[#ffc174]">
                    schedule
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">{c}</span>
                </div>
              ))}
            </div>

            {/* Execution Archetype */}
            <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[24px] text-[#56e5a9]">
                  offline_bolt
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
                    Execution Vector: High-Yield Sprint
                  </span>
                  <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                    Daily quest loops with active reflection &amp; XP streak multipliers
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#30c88f]/20 text-[#56e5a9] font-label-sm text-[11px] font-bold">
                Adaptive
              </span>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-[#a5b0c8] hover:text-[#dfe2ef] font-label-md text-label-md px-3 py-2 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-space-lg py-space-sm rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-lg text-label-lg font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Synthesize Roadmap</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Animated AI Synthesizer (Screen C) */}
        {step === 3 && (
          <div className="p-space-xl flex flex-col items-center justify-center py-16 gap-space-lg text-center">
            {/* Glowing radar ring */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#262a34] animate-spin border-t-[#f59e0b] border-r-[#56e5a9]" />
              <div className="w-20 h-20 rounded-full bg-[#1c1f29] border border-[#31353f] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <span className="material-symbols-outlined text-[36px] text-[#ffc174] animate-pulse">
                  psychology
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 max-w-sm">
              <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
                Building your journey... {progressPercent}%
              </h2>
              <p className="font-body-sm text-body-sm text-[#a5b0c8]">
                Calibrating milestones, prerequisite graphs, and daily execution loops.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md h-2 bg-[#0a0e17] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#f59e0b] to-[#56e5a9] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checkpoint list */}
            <div className="flex flex-col gap-2 text-left w-full max-w-sm">
              {[
                "Analyzing skill taxonomy & dependencies",
                "Personalizing milestone pacing",
                "Tailoring daily commitment windows",
                "Synthesizing initial quest & streak rewards",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[13px]">
                  {checkpointsDone > idx ? (
                    <span className="material-symbols-outlined text-[18px] text-[#56e5a9]">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px] text-[#a5b0c8]/40 animate-spin">
                      sync
                    </span>
                  )}
                  <span className={checkpointsDone > idx ? "text-[#dfe2ef]" : "text-[#a5b0c8]/50"}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Journey Ready (Screen D) */}
        {step === 4 && (
          <div className="p-space-xl flex flex-col gap-space-lg overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-[#56e5a9]/20 flex items-center justify-center text-[#56e5a9]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#56e5a9] uppercase font-bold">
                  Roadmap Assembled
                </span>
                <h2 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
                  Your journey is ready.
                </h2>
              </div>
            </div>

            {/* Journey Meta Banner */}
            <div className="p-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef]">{goalTitle}</h3>
                <span className="px-2.5 py-1 rounded bg-[#f59e0b]/20 text-[#ffc174] font-label-sm text-[12px] font-bold">
                  {timeline}
                </span>
              </div>
              <div className="flex items-center gap-space-md text-[13px] text-[#a5b0c8]">
                <span>Daily Commitment: {dailyCommitment}</span>
                <span>•</span>
                <span className="text-[#56e5a9] font-bold">Day 1 Boost: +50 XP</span>
              </div>
            </div>

            {/* 4 Phases Preview */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="p-space-sm rounded-lg bg-[#0a0e17] border border-[#262a34] flex flex-col gap-1">
                <span className="text-[11px] font-label-sm text-[#ffc174] font-bold">Phase 01</span>
                <span className="font-label-md text-label-md text-[#dfe2ef]">Core Foundations</span>
                <span className="text-[10px] text-[#a5b0c8]">4 Quests • Fundamentals</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] border border-[#262a34] flex flex-col gap-1">
                <span className="text-[11px] font-label-sm text-[#c0c1ff] font-bold">Phase 02</span>
                <span className="font-label-md text-label-md text-[#dfe2ef]">Active Mastery</span>
                <span className="text-[10px] text-[#a5b0c8]">5 Quests • Applied Drills</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] border border-[#262a34] flex flex-col gap-1">
                <span className="text-[11px] font-label-sm text-[#a5b0c8] font-bold">Phase 03</span>
                <span className="font-label-md text-label-md text-[#dfe2ef]">
                  Systems Architecture
                </span>
                <span className="text-[10px] text-[#a5b0c8]">3 Quests • Advanced Scale</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] border border-[#262a34] flex flex-col gap-1">
                <span className="text-[11px] font-label-sm text-[#56e5a9] font-bold">Phase 04</span>
                <span className="font-label-md text-label-md text-[#dfe2ef]">Capstone Project</span>
                <span className="text-[10px] text-[#a5b0c8]">Final Proof of Mastery</span>
              </div>
            </div>

            {/* Today's First Quest Callout */}
            <div className="p-space-md rounded-xl bg-[#262a34] border border-[#f59e0b]/40 flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[24px] text-[#ffc174]">bolt</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[11px] text-[#ffc174] uppercase font-bold">
                    Today&apos;s First Quest
                  </span>
                  <span className="font-label-lg text-label-lg text-[#dfe2ef]">
                    Initialize Environment &amp; First Prototype
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#56e5a9] bg-[#56e5a9]/10 px-2.5 py-1 rounded">
                +75 XP
              </span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-headline-sm text-headline-sm font-bold shadow-[0_0_24px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            >
              <span>Enter My Journey</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
