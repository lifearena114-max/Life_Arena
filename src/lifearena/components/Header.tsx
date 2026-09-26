import React, { useState } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenNewGoal: () => void;
  onNavigateProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenSearch,
  onOpenNewGoal,
  onNavigateProfile,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Streak Milestone Unlocked!',
      desc: 'You reached 12 consecutive days. +50 XP bonus earned.',
      time: '10m ago',
      unread: true,
      icon: 'local_fire_department',
      color: 'text-[#f59e0b]',
    },
    {
      id: 'n2',
      title: 'Squad Cheer Received',
      desc: 'Sarah L. high-fived your latest milestone!',
      time: '45m ago',
      unread: true,
      icon: 'waving_hand',
      color: 'text-[#56e5a9]',
    },
    {
      id: 'n3',
      title: 'New Arena Deliberation',
      desc: 'Priya M. posted a high-stakes Career decision.',
      time: '1h ago',
      unread: false,
      icon: 'balance',
      color: 'text-[#c0c1ff]',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const hasUnread = notifications.some((n) => n.unread);

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#0f131c]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-[#262a34]/40 z-40 flex items-center justify-between px-space-lg">
      {/* Search Bar Input */}
      <div className="flex items-center gap-space-md w-full max-w-lg">
        <div
          onClick={onOpenSearch}
          className="relative w-full flex items-center cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-space-md text-[20px] text-[#a5b0c8] group-hover:text-[#ffc174] transition-colors pointer-events-none">
            search
          </span>
          <input
            type="text"
            readOnly
            onClick={onOpenSearch}
            placeholder="Search quests, goals, decisions... ⌘K"
            className="w-full bg-[#181b25] text-[#dfe2ef] placeholder:text-[#a5b0c8] font-body-sm text-body-sm pl-11 pr-space-md py-space-sm rounded-lg border border-[#262a34]/60 focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none transition-all cursor-pointer group-hover:bg-[#1c1f29]"
          />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-space-md relative">
        {/* New Goal Button */}
        <button
          onClick={onOpenNewGoal}
          className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-[#f59e0b] text-[#472a00] font-label-lg text-label-lg shadow-[0px_0px_24px_-4px_rgba(245,158,11,0.35)] hover:bg-[#ffc174] transition-all cursor-pointer font-semibold active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Goal</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-space-sm rounded-lg text-[#a5b0c8] hover:text-[#dfe2ef] hover:bg-[#262a34] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0px_0px_8px_rgba(245,158,11,0.8)] animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-[#1c1f29] rounded-xl border border-[#262a34] shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-space-md flex flex-col gap-space-sm z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-[#262a34]">
                <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">Notifications</span>
                {hasUnread && (
                  <button
                    onClick={markAllRead}
                    className="font-label-sm text-label-sm text-[#ffc174] hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-space-xs max-h-64 overflow-y-auto no-scrollbar">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-space-sm p-space-sm rounded-lg transition-colors ${
                      n.unread ? 'bg-[#262a34]/70' : 'hover:bg-[#262a34]/40'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] mt-0.5 ${n.color}`}>
                      {n.icon}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-[#dfe2ef]">{n.title}</span>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8] leading-tight">
                        {n.desc}
                      </span>
                      <span className="text-[10px] text-[#a5b0c8]/50 mt-1">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          onClick={onNavigateProfile}
          className="flex items-center gap-space-sm cursor-pointer p-space-xs rounded-full hover:bg-[#262a34] transition-colors"
          title="Open Profile"
        >
          <img
            src={user.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#f59e0b]/50 hover:ring-[#f59e0b] transition-all"
          />
        </div>
      </div>
    </header>
  );
};
