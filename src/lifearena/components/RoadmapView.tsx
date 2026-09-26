import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { NavScreen, RoadmapPhase, UserProfile } from '../types';

interface RoadmapViewProps {
  user: UserProfile;
  phases: RoadmapPhase[];
  onNavigate: (screen: NavScreen) => void;
  onClaimMilestone: (phaseId: string) => void;
  onStartQuest: (questTitle: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  phases,
  onNavigate,
  onClaimMilestone,
  onStartQuest,
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenSuccess, setRegenSuccess] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [customMilestoneName, setCustomMilestoneName] = useState('');
  const [activePhases, setActivePhases] = useState<RoadmapPhase[]>(phases);

  const handleRegeneratePace = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setRegenSuccess(true);
      setTimeout(() => setRegenSuccess(false), 3000);
    }, 1400);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMilestoneName.trim()) return;

    setActivePhases((prev) =>
      prev.map((phase) => {
        if (phase.id === 'phase-2') {
          return {
            ...phase,
            items: [
              ...phase.items,
              {
                id: `custom-${Date.now()}`,
                title: customMilestoneName.trim(),
                completed: false,
                xp: 50,
              },
            ],
          };
        }
        return phase;
      })
    );
    setCustomMilestoneName('');
    setShowAddMilestone(false);
  };

  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-md">
        <nav className="flex items-center gap-space-xs text-[#a5b0c8] font-label-md text-label-md">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#ffc174] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#a5b0c8]/40">/</span>
          <button
            onClick={() => onNavigate('goals')}
            className="hover:text-[#ffc174] transition-colors cursor-pointer"
          >
            Goals
          </button>
          <span className="text-[#a5b0c8]/40">/</span>
          <span className="text-[#a5b0c8]">Full-Stack Developer</span>
          <span className="text-[#a5b0c8]/40">/</span>
          <span className="text-[#ffc174] font-headline-sm text-headline-sm">
            AI Journey Roadmap
          </span>
        </nav>

        {/* AI Generation Pill */}
        <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-[#3131c0]/20 border border-[#3131c0]/40 shadow-[0_0_16px_rgba(99,102,241,0.2)]">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[16px] animate-pulse">
            auto_awesome
          </span>
          <span className="font-label-sm text-label-sm text-[#c0c1ff]">
            AI-Synthesized Adaptive Journey • Synced 2d ago via Velocity Matrix
          </span>
        </div>
      </div>

      {/* Hero Header Block */}
      <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-[#262a34]/50 mb-space-xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#ffc174]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 bg-[#56e5a9]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-xl">
          <div className="flex flex-col gap-space-sm max-w-2xl">
            <div className="flex items-center gap-space-sm">
              <span className="px-space-sm py-space-xs rounded bg-[#262a34] font-label-sm text-label-sm text-[#ffc174] uppercase tracking-widest border border-[#f59e0b]/20">
                Target Career Track
              </span>
              <span className="text-[#a5b0c8] font-label-sm text-label-sm flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#56e5a9]" /> Tier 1
                Architecture
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef] tracking-tight">
              Become a Full-Stack Developer
            </h1>
            <p className="font-body-md text-body-md text-[#a5b0c8]">
              Adaptive algorithmic roadmap balancing frontend systems, asynchronous runtime
              mechanics, relational data modeling, and production-grade DevOps.
            </p>
          </div>

          {/* Action Hero Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
            <div className="flex flex-col justify-center px-space-md py-space-sm bg-[#181b25] rounded-lg border border-[#262a34] shadow-sm">
              <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase tracking-wider">
                Estimated Finish
              </span>
              <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                Week 5 <span className="text-[#a5b0c8] font-body-sm text-body-sm">/ 12 Weeks</span>
              </span>
            </div>

            <button
              onClick={() => onStartQuest('React Hooks & State Management')}
              className="group relative flex items-center justify-center gap-space-sm px-space-lg py-space-md rounded-lg bg-[#f59e0b] text-[#472a00] font-label-lg text-label-lg shadow-[0px_0px_24px_-4px_rgba(245,158,11,0.35)] hover:bg-[#ffc174] transition-all duration-300 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                bolt
              </span>
              <span>Start Today&apos;s Quest: React Hooks</span>
              <span className="px-space-xs py-0.5 rounded bg-[#0a0e17]/30 font-label-sm text-label-sm font-bold text-[#472a00]">
                +75 XP
              </span>
            </button>
          </div>
        </div>

        {/* Journey Meta Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md mt-space-xl pt-space-md border-t border-[#262a34]/60">
          {/* Stat 1 */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex justify-between items-baseline">
              <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
                Overall Progress
              </span>
              <span className="font-stat-counter text-stat-counter text-[#ffc174]">42%</span>
            </div>
            <div className="w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#f59e0b] via-[#ffc174] to-[#56e5a9] rounded-full relative"
                style={{ width: '42%' }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col justify-center pl-space-md">
            <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
              Quests Completed
            </span>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-[#dfe2ef]">24</span>
              <span className="font-label-md text-label-md text-[#a5b0c8]">/ 58 Quests</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col justify-center pl-space-md">
            <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
              Total Experience
            </span>
            <div className="flex items-center gap-space-xs text-[#56e5a9]">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span className="font-headline-lg text-headline-lg text-[#56e5a9] font-bold">
                +2,150 XP
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col justify-center pl-space-md">
            <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
              Velocity Pace
            </span>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">speed</span>
              <span className="font-label-lg text-label-lg text-[#dfe2ef]">1.2 quests/day</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#56e5a9]">
              On schedule (+4d ahead)
            </span>
          </div>

          {/* Stat 5 */}
          <div className="flex flex-col justify-center pl-space-md col-span-2 md:col-span-1">
            <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
              Consistency Pulse
            </span>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#f59e0b] animate-ping" />
              <span className="font-label-lg text-label-lg text-[#dfe2ef]">Optimal Focus</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#a5b0c8]">
              Peak state @ 09:00 AM
            </span>
          </div>
        </div>
      </div>

      {/* Layout: 4-Phase Timeline + AI Mentor Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Timeline Section (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl relative">
          {/* Phase 1: Completed */}
          <div className="relative bg-[#1c1f29] rounded-xl p-space-lg shadow-sm border border-[#262a34]/60">
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-[#56e5a9]/15 flex items-center justify-center text-[#56e5a9] shadow-[0_0_12px_rgba(86,229,169,0.2)]">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#56e5a9] uppercase tracking-wider">
                    Phase 01 • Finished
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
                    JavaScript Foundations
                  </h2>
                </div>
              </div>
              <span className="px-space-sm py-space-xs rounded-full bg-[#56e5a9]/10 text-[#56e5a9] font-label-md text-label-md border border-[#56e5a9]/20">
                100% Completed
              </span>
            </div>

            {/* Quests Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm my-space-md">
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] border border-[#262a34]/40">
                <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm line-through text-[#a5b0c8]/70">
                  Variables &amp; Data Types
                </span>
              </div>
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] border border-[#262a34]/40">
                <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm line-through text-[#a5b0c8]/70">
                  Modern Functions &amp; Scope
                </span>
              </div>
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] border border-[#262a34]/40">
                <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm line-through text-[#a5b0c8]/70">
                  ES6 Modules &amp; Async JS
                </span>
              </div>
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] border border-[#262a34]/40">
                <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm line-through text-[#a5b0c8]/70">
                  DOM Manipulation &amp; Events
                </span>
              </div>
            </div>

            {/* Milestone Claim Badge */}
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-[#262a34]/60 border border-[#262a34] mt-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">
                  workspace_premium
                </span>
                <span className="font-label-md text-label-md text-[#dfe2ef]">
                  Milestone Mastered: Vanilla JS Core
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-space-sm py-space-xs rounded font-bold">
                +300 XP Awarded
              </span>
            </div>
          </div>

          {/* Connector Pulse */}
          <div className="flex justify-center -my-space-md relative z-10">
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#56e5a9] to-[#f59e0b]" />
          </div>

          {/* Phase 2: In Progress (Active Focus) */}
          <div className="relative bg-[#1c1f29] rounded-xl p-space-lg shadow-[0_0_32px_-6px_rgba(245,158,11,0.2)] border border-[#f59e0b]/40">
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] shadow-[0_0_16px_rgba(245,158,11,0.3)]">
                  <span className="material-symbols-outlined text-[24px]">trending_up</span>
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm text-[#ffc174] uppercase tracking-wider font-bold">
                      Phase 02 • Currently Active
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
                    Frontend Mastery
                  </h2>
                </div>
              </div>
              <span className="px-space-sm py-space-xs rounded-full bg-[#f59e0b]/20 text-[#ffc174] font-label-md text-label-md border border-[#f59e0b]/40 font-semibold">
                55% In Progress
              </span>
            </div>

            {/* Progress Mini Line */}
            <div className="w-full h-1.5 bg-[#0a0e17] rounded-full overflow-hidden mb-space-md">
              <div className="h-full bg-[#f59e0b] w-[55%]" />
            </div>

            {/* Quests Grid with High-Priority Active Card */}
            <div className="flex flex-col gap-space-sm">
              {/* Item 1: Done */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] border border-[#262a34]/40">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                    check_circle
                  </span>
                  <span className="font-body-sm text-body-sm line-through text-[#a5b0c8]/70">
                    React Architecture &amp; JSX Syntax
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-[#a5b0c8]/50">+50 XP</span>
              </div>

              {/* Item 2: CURRENT ACTIVE QUEST */}
              <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-[#262a34] shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[#31353f]">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f59e0b] shadow-[0_0_12px_#f59e0b]" />
                <div className="flex items-center gap-space-md mb-space-sm sm:mb-0 pl-space-xs">
                  <div className="w-6 h-6 rounded-md bg-[#f59e0b] flex items-center justify-center text-[#472a00] shadow-[0_0_8px_rgba(245,158,11,0.5)] font-bold">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm text-[#ffc174] uppercase font-bold">
                        Current Active Quest
                      </span>
                      <span className="font-label-sm text-label-sm text-[#a5b0c8]">• 45 mins</span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                      React Hooks &amp; State Management
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-md">
                  <span className="font-label-md text-label-md text-[#ffc174] bg-[#ffc174]/10 border border-[#ffc174]/20 px-space-sm py-space-xs rounded font-bold">
                    +75 XP
                  </span>
                  <button
                    onClick={() => onStartQuest('React Hooks & State Management')}
                    className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-[#f59e0b] text-[#472a00] font-label-md text-label-md shadow-md hover:bg-[#ffc174] transition-all cursor-pointer font-bold"
                  >
                    <span>Continue Quest</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Item 3: Up Next */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-[#181b25] text-[#dfe2ef] border border-[#262a34]/40">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[#a5b0c8] text-[20px]">
                    radio_button_unchecked
                  </span>
                  <span className="font-body-sm text-body-sm text-[#dfe2ef]">
                    External APIs &amp; TanStack Query
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-[#a5b0c8]">
                  Up Next • +60 XP
                </span>
              </div>

              {/* Item 4: Locked */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-[#181b25]/40 text-[#a5b0c8]/40 border border-[#262a34]/20">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span className="font-body-sm text-body-sm">
                    Tailwind CSS &amp; Design Systems
                  </span>
                </div>
                <span className="font-label-sm text-label-sm">Requires Hooks Module</span>
              </div>

              {/* Custom milestones added by user */}
              {activePhases[1]?.items.slice(4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-space-sm rounded-lg bg-[#181b25] text-[#dfe2ef] border border-[#262a34]"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
                      flag
                    </span>
                    <span className="font-body-sm text-body-sm text-[#dfe2ef]">{item.title}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#56e5a9]">
                    Custom • +{item.xp || 50} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center -my-space-md relative z-10">
            <div className="w-0.5 h-8 bg-[#31353f]" />
          </div>

          {/* Phase 3: Upcoming */}
          <div className="relative bg-[#1c1f29]/70 rounded-xl p-space-lg shadow-sm border border-[#262a34]/40">
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-[#262a34] flex items-center justify-center text-[#a5b0c8]">
                  <span className="material-symbols-outlined text-[24px]">database</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase tracking-wider">
                    Phase 03 • Upcoming
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-[#a5b0c8]">
                    Backend &amp; Database Architecture
                  </h2>
                </div>
              </div>
              <span className="px-space-sm py-space-xs rounded-full bg-[#262a34] text-[#a5b0c8] font-label-md text-label-md border border-[#31353f]">
                Estimated: Week 7
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm opacity-60">
              <div className="p-space-sm rounded-lg bg-[#181b25] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Node &amp; Express REST</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#181b25] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Postgres &amp; Prisma</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#181b25] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>JWT &amp; Security</span>
              </div>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center -my-space-md relative z-10">
            <div className="w-0.5 h-8 bg-[#31353f]" />
          </div>

          {/* Phase 4: Locked Capstone */}
          <div className="relative bg-[#1c1f29]/40 rounded-xl p-space-lg shadow-sm border border-[#262a34]/30">
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-[#0a0e17] flex items-center justify-center text-[#a5b0c8]/40 border border-[#262a34]/30">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-[#a5b0c8]/60 uppercase tracking-wider">
                    Phase 04 • Capstone
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-[#a5b0c8]/70">
                    Full-Stack SaaS Production Project
                  </h2>
                </div>
              </div>
              <span className="px-space-sm py-space-xs rounded-full bg-[#0a0e17] text-[#a5b0c8]/50 font-label-md text-label-md border border-[#262a34]/30">
                Locked Milestone
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm opacity-40">
              <div className="p-space-sm rounded-lg bg-[#0a0e17] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]/30">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Full-Stack SaaS Blueprint</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]/30">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>CI/CD Vercel &amp; Render</span>
              </div>
              <div className="p-space-sm rounded-lg bg-[#0a0e17] text-body-sm font-body-sm text-[#a5b0c8] flex items-center gap-space-xs border border-[#262a34]/30">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Live Portfolio &amp; Demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel / Drawer: AI Mentor & Dynamics (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Adaptive AI Mentor Insights Card */}
          <div className="relative overflow-hidden bg-[#1c1f29] rounded-xl p-space-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-[#262a34]/50">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-[#3131c0]/20 flex items-center justify-center text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#dfe2ef]">
                  Adaptive AI Mentor
                </h3>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-[#c0c1ff]/10 text-[#c0c1ff] font-label-sm text-label-sm border border-[#c0c1ff]/20">
                Active Agent
              </span>
            </div>

            {/* Mentor Recommendations */}
            <div className="flex flex-col gap-space-md mb-space-lg">
              <div className="p-space-md rounded-lg bg-[#181b25] border border-[#262a34] flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-[#ffc174] font-label-sm text-label-sm uppercase font-bold">
                  <span className="material-symbols-outlined text-[16px]">auto_graph</span>
                  <span>Velocity Adjustment</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#a5b0c8]">
                  Based on your <strong className="text-[#dfe2ef]">12-day streak</strong> and rapid
                  syntax quiz scores in Phase 1, the AI has accelerated Phase 2 by{' '}
                  <span className="text-[#56e5a9] font-bold">4 days</span>.
                </p>
              </div>

              <div className="p-space-md rounded-lg bg-[#181b25] border border-[#262a34] flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-[#c0c1ff] font-label-sm text-label-sm uppercase font-bold">
                  <span className="material-symbols-outlined text-[16px]">alarm</span>
                  <span>Focus Recommendation</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#a5b0c8]">
                  Optimal cognitive retention window:{' '}
                  <strong className="text-[#dfe2ef]">9:00 AM – 11:30 AM</strong>. You solve
                  complex debugging challenges 38% faster during this timeframe.
                </p>
              </div>
            </div>

            {/* Dynamic Action Buttons */}
            <div className="flex flex-col gap-space-sm">
              <button
                onClick={handleRegeneratePace}
                disabled={isRegenerating}
                className="w-full flex items-center justify-center gap-space-sm px-space-md py-space-sm rounded-lg bg-[#262a34] text-[#dfe2ef] font-label-md text-label-md hover:bg-[#353943] transition-all shadow-sm cursor-pointer border border-[#31353f]"
              >
                {isRegenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px] text-[#c0c1ff]">
                      sync
                    </span>
                    <span>Recalibrating Learning Velocity...</span>
                  </>
                ) : regenSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[#56e5a9] text-[18px]">
                      check
                    </span>
                    <span className="text-[#56e5a9]">Pace Synchronized!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[#c0c1ff] text-[18px]">
                      tune
                    </span>
                    <span>Regenerate Pace with AI</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowAddMilestone(!showAddMilestone)}
                className="w-full flex items-center justify-center gap-space-sm px-space-md py-space-sm rounded-lg bg-[#181b25] text-[#a5b0c8] font-label-md text-label-md hover:text-[#dfe2ef] hover:bg-[#262a34] transition-all cursor-pointer border border-[#262a34]"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add Custom Milestone</span>
              </button>

              {/* Custom Milestone Form */}
              {showAddMilestone && (
                <form
                  onSubmit={handleAddMilestone}
                  className="p-space-sm rounded-lg bg-[#181b25] border border-[#31353f] flex flex-col gap-2 mt-1"
                >
                  <input
                    type="text"
                    value={customMilestoneName}
                    onChange={(e) => setCustomMilestoneName(e.target.value)}
                    placeholder="e.g. Master Zustand State"
                    className="w-full bg-[#0a0e17] text-[#dfe2ef] text-[12px] px-3 py-1.5 rounded border border-[#262a34] focus:border-[#f59e0b] outline-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddMilestone(false)}
                      className="text-[11px] text-[#a5b0c8] hover:text-[#dfe2ef] px-2 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-[11px] bg-[#f59e0b] text-[#472a00] font-bold px-3 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Weekly Target Matrix */}
          <div className="bg-[#1c1f29] rounded-xl p-space-lg shadow-sm border border-[#262a34]/50">
            <div className="flex items-center justify-between mb-space-md">
              <h4 className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                Weekly Target Matrix
              </h4>
              <span className="font-label-sm text-label-sm text-[#a5b0c8]">Week 5 of 12</span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Item 1 */}
              <div>
                <div className="flex justify-between text-body-sm font-body-sm mb-1">
                  <span className="text-[#a5b0c8]">Hooks: useState &amp; useEffect</span>
                  <span className="text-[#56e5a9] font-bold">100%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div className="h-full bg-[#56e5a9] w-full" />
                </div>
              </div>

              {/* Item 2 */}
              <div>
                <div className="flex justify-between text-body-sm font-body-sm mb-1">
                  <span className="text-[#a5b0c8]">Advanced Context &amp; Reducers</span>
                  <span className="text-[#f59e0b] font-bold">60%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f59e0b] w-[60%]" />
                </div>
              </div>

              {/* Item 3 */}
              <div>
                <div className="flex justify-between text-body-sm font-body-sm mb-1">
                  <span className="text-[#a5b0c8]">Custom Hooks Lifecycle</span>
                  <span className="text-[#a5b0c8] font-bold">15%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0a0e17] rounded-full overflow-hidden">
                  <div className="h-full bg-[#31353f] w-[15%]" />
                </div>
              </div>
            </div>

            {/* Daily Activity Density */}
            <div className="mt-space-lg pt-space-md border-t border-[#262a34] flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase">
                Daily Activity Density (XP / Day)
              </span>
              <svg className="w-full h-12" fill="none" viewBox="0 0 280 48">
                <path
                  d="M 0 38 L 40 32 L 80 40 L 120 18 L 160 26 L 200 12 L 240 8 L 280 14"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="240" cy="8" r="4" fill="#ffc174" />
              </svg>
              <div className="flex justify-between text-[#a5b0c8] font-label-sm text-label-sm">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Quick Peer Comparison Card */}
          <div className="bg-[#1c1f29] rounded-xl p-space-md flex items-center justify-between shadow-sm border border-[#262a34]/50">
            <div className="flex items-center gap-space-sm">
              <img
                src={ASSETS.avatarCohortPace}
                alt="Cohort Pace"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#f59e0b]"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-[#dfe2ef]">
                  Top 5% Cohort Pace
                </span>
                <span className="font-body-sm text-body-sm text-[#a5b0c8]">
                  4.2 hours ahead of median
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#ffc174] text-[20px]">
              military_tech
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
