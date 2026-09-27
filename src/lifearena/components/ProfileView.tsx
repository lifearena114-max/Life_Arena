import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onResetDemo: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onResetDemo,
}) => {
  const [editingName, setEditingName] = useState(user.name);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: editingName });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Hero */}
        <div className="flex flex-col gap-1 border-b border-[#262a34]/50 pb-space-lg">
          <div className="flex items-center gap-2 text-[#ffc174] font-label-sm text-label-sm uppercase font-bold tracking-wider">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Operator Identity &amp; System Calibration</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
            Start building your life.
          </h1>
          <p className="font-body-md text-body-md text-[#a5b0c8]">
            Turn your goals into dynamic roadmaps with daily quests, adaptive AI pacing, and
            collective arena decision-making.
          </p>
        </div>

        {/* 2-Column Split: Operator Card & Calibration Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Operator Identity Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="relative overflow-hidden rounded-2xl bg-[#1c1f29] p-space-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-[#ffc174]/30">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ffc174]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-space-md border-b border-[#262a34]/60 mb-space-md">
                <span className="text-[11px] font-mono text-[#a5b0c8] uppercase tracking-wider">
                  LifeArena // Operator Card #007
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#56e5a9]/15 text-[#56e5a9] font-label-sm text-[11px] font-bold border border-[#56e5a9]/30">
                  Calibrated
                </span>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-space-md mb-space-lg">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#ffc174]/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                />
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">{user.name}</h2>
                    <span className="text-body-sm text-[#a5b0c8]">{user.handle}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-headline-sm text-headline-sm text-[#ffc174]">
                      LVL 0{user.level} {user.levelTitle}
                    </span>
                    <span className="text-[#a5b0c8] text-[12px]">• {user.streakDays}d Streak</span>
                  </div>
                </div>
              </div>

              {/* XP Progress Section */}
              <div className="p-space-md rounded-xl bg-[#0a0e17] border border-[#262a34] flex flex-col gap-2 mb-space-md">
                <div className="flex justify-between text-body-sm">
                  <span className="text-[#a5b0c8]">Arena Experience:</span>
                  <span className="text-[#dfe2ef] font-bold">
                    {user.currentXp.toLocaleString()} / {user.targetXp.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#181b25] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f59e0b] to-[#56e5a9] rounded-full"
                    style={{ width: `${(user.currentXp / user.targetXp) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#a5b0c8]">
                  <span>Tier: 81.6%</span>
                  <span className="text-[#56e5a9] font-mono">
                    +{user.targetXp - user.currentXp} XP to {user.nextLevelTitle}
                  </span>
                </div>
              </div>

              {/* Operator Quote of the Day */}
              <div className="p-space-md rounded-xl bg-[#181b25] border border-[#262a34] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ffc174] text-[20px] mt-0.5">
                  format_quote
                </span>
                <div className="flex flex-col">
                  <p className="text-[13px] text-[#dfe2ef] italic">
                    &quot;The secret of getting ahead is getting started.&quot;
                  </p>
                  <span className="text-[11px] text-[#a5b0c8] mt-1">— Mark Twain</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-space-md">
              <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col">
                <span className="text-[11px] font-label-sm text-[#a5b0c8] uppercase">
                  Longest Streak
                </span>
                <span className="font-stat-counter text-stat-counter text-[#ffc174] mt-1">
                  {user.bestStreakDays} Days
                </span>
              </div>
              <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col">
                <span className="text-[11px] font-label-sm text-[#a5b0c8] uppercase">
                  Wisdom Score
                </span>
                <span className="font-stat-counter text-stat-counter text-[#56e5a9] mt-1">
                  {user.wisdomScore}%
                </span>
              </div>
              <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col">
                <span className="text-[11px] font-label-sm text-[#a5b0c8] uppercase">
                  Active Anchor
                </span>
                <span className="font-headline-sm text-headline-sm text-[#c0c1ff] mt-1 truncate">
                  {user.primaryAnchor}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Personalization (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Persona Settings */}
            <div className="p-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-space-md">
              <h3 className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                Operator Customization
              </h3>

              <form onSubmit={handleSaveName} className="flex flex-col gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-[#a5b0c8]">Display Name</label>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-[#0a0e17] text-[#dfe2ef] px-3 py-2 rounded-lg border border-[#262a34] focus:border-[#f59e0b] outline-none text-body-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-label-md text-label-md transition-colors cursor-pointer"
                >
                  {isSaved ? 'Name Updated!' : 'Save Name'}
                </button>
              </form>

              <div className="pt-space-sm border-t border-[#262a34] flex flex-col gap-space-xs">
                <span className="text-[12px] text-[#a5b0c8]">Preset Switcher:</span>
                <div className="flex gap-2">
                  {['Ashwani', 'Alex Mercer', 'Devon'].map((name) => (
                    <button
                      key={name}
                      onClick={() => onUpdateUser({ name })}
                      className="px-3 py-1 rounded bg-[#0a0e17] hover:bg-[#262a34] text-xs text-[#dfe2ef] border border-[#262a34] cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset / Demo Sandbox */}
            <div className="p-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-[#dfe2ef]">Sandbox Controls</h3>
              <p className="text-[12px] text-[#a5b0c8]">
                Reset mock quests, streak counters, and decision votes back to the pristine initial
                state.
              </p>
              <button
                onClick={onResetDemo}
                className="py-2.5 px-4 rounded-lg bg-[#31353f] hover:bg-red-900/40 hover:text-red-300 text-[#a5b0c8] font-label-md text-label-md transition-all cursor-pointer border border-[#262a34]"
              >
                Reset Demo State
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
