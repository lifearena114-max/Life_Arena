import React from "react";
import { NavScreen, UserProfile } from "../types";
import { BrandMark } from "../BrandMark";

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  user: UserProfile;
  onOpenNewGoal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate, user }) => {
  const navItems = [
    { id: "home", label: "Home", icon: "grid_view" },
    { id: "goals", label: "Goals", icon: "explore" },
    { id: "ai-journeys-quests", label: "AI Journeys / Quests", icon: "bolt" },
    { id: "decision-arena", label: "Decision Arena", icon: "balance" },
    { id: "squads", label: "Squads", icon: "group" },
    { id: "profile", label: "Profile", icon: "account_circle" },
  ];

  const xpPercent = Math.min(100, Math.round((user.currentXp / user.targetXp) * 100));

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#181b25] z-50 flex flex-col justify-between p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-r border-[#262a34]/40">
      <div className="flex flex-col gap-space-lg">
        {/* Logo */}
        <div
          className="flex items-center gap-space-sm px-space-xs cursor-pointer select-none group"
          onClick={() => onNavigate("home")}
        >
          <BrandMark compact />
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as NavScreen)}
                className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-all text-left w-full ${
                  isActive
                    ? "bg-[#f59e0b] text-[#472a00] font-headline-sm font-semibold shadow-[0px_0px_20px_-4px_rgba(245,158,11,0.35)]"
                    : "text-[#a5b0c8] hover:bg-[#262a34] hover:text-[#dfe2ef]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-lg text-label-lg">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Level Progress & Operator Card */}
      <div className="flex flex-col gap-space-sm pt-space-md">
        {/* Tier & XP Mini Card */}
        <div className="bg-[#1c1f29] p-space-md rounded-xl flex flex-col gap-space-sm shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)] border border-[#262a34]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-[#ffc174] uppercase">
                LVL 0{user.level}
              </span>
              <span className="font-body-sm text-body-sm text-[#a5b0c8]">{user.levelTitle}</span>
            </div>
            <div className="flex items-center gap-space-xs bg-[#262a34] px-space-sm py-space-xs rounded-full shadow-[0px_0px_16px_-2px_rgba(249,115,22,0.35)]">
              <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">
                local_fire_department
              </span>
              <span className="font-label-sm text-label-sm text-[#ffc174] font-bold">
                {user.streakDays}d Streak
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <div className="w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#f59e0b] to-[#56e5a9] rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-[#a5b0c8]">
              <span>{user.currentXp.toLocaleString()} XP</span>
              <span>{user.targetXp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div
          className="flex items-center justify-between p-space-sm rounded-lg bg-[#262a34]/60 hover:bg-[#262a34] transition-colors cursor-pointer"
          onClick={() => onNavigate("profile")}
        >
          <div className="flex items-center gap-space-sm">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f59e0b]/40"
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-[#dfe2ef] leading-tight">
                {user.name}
              </span>
              <span className="font-label-sm text-label-sm text-[#56e5a9] leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
                Online
              </span>
            </div>
          </div>
          <button
            aria-label="User Options"
            className="text-[#a5b0c8] hover:text-[#dfe2ef] transition-colors p-space-xs rounded-md hover:bg-[#31353f]"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
