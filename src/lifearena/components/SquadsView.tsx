import React from "react";
import { ASSETS } from "../data/mockData";
import { SquadActivity, UserProfile } from "../types";

interface SquadsViewProps {
  user: UserProfile;
  squadActivities: SquadActivity[];
  onCheerSquad: (activityId: string) => void;
}

export const SquadsView: React.FC<SquadsViewProps> = ({ squadActivities, onCheerSquad }) => {
  const squadMembers = [
    {
      name: "Maya S.",
      role: "Senior Frontend",
      level: 8,
      streak: 15,
      avatar: ASSETS.avatarMaya,
      online: true,
    },
    {
      name: "Devon K.",
      role: "Backend Lead",
      level: 9,
      streak: 22,
      avatar: ASSETS.avatarDevon,
      online: true,
    },
    {
      name: "Sarah L.",
      role: "AI Architect",
      level: 9,
      streak: 19,
      avatar: ASSETS.avatarSarah,
      online: false,
    },
    {
      name: "Elena Rostova",
      role: "Full-Stack Dev",
      level: 7,
      streak: 11,
      avatar: ASSETS.avatarElena,
      online: true,
    },
    {
      name: "Marcus Vance",
      role: "Indie Hacker",
      level: 6,
      streak: 8,
      avatar: ASSETS.avatarMarcus,
      online: false,
    },
  ];

  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md border-b border-[#262a34]/50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-[#30c88f]/20 text-[#56e5a9] font-label-sm text-label-sm border border-[#30c88f]/30">
                Cohort #14 • High Velocity
              </span>
              <span className="text-[#a5b0c8] font-label-sm text-label-sm">
                • 12 Active Members
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef]">Squad Velocity</h1>
            <p className="font-body-md text-body-md text-[#a5b0c8]">
              Accountability loops, shared quest momentum, and cohort milestones.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="flex -space-x-2">
              {squadMembers.slice(0, 4).map((m, i) => (
                <img
                  key={i}
                  src={m.avatar}
                  alt={m.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0f131c]"
                />
              ))}
            </div>
            <span className="font-label-md text-label-md text-[#ffc174] font-bold">+8 others</span>
          </div>
        </div>

        {/* Cohort Sprint Milestone Bar */}
        <div className="p-space-lg rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-space-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174] text-[22px]">flag</span>
              <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                Cohort Weekly Sprint Target: 25,000 XP
              </span>
            </div>
            <span className="font-stat-counter text-[18px] text-[#56e5a9]">19,450 / 25,000 XP</span>
          </div>
          <div className="w-full h-2.5 bg-[#0a0e17] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f59e0b] to-[#56e5a9] rounded-full"
              style={{ width: "78%" }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#a5b0c8]">
            <span>78% achieved</span>
            <span className="text-[#ffc174]">2 days remaining in Cycle #48</span>
          </div>
        </div>

        {/* 2-Column Split: Squad Live Feed + Squad Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Squad Live Feed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
              Live Cohort Activity
            </h2>

            <div className="flex flex-col gap-space-sm">
              {squadActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex items-center justify-between hover:bg-[#262a34]/60 transition-all"
                >
                  <div className="flex items-center gap-space-md min-w-0">
                    <img
                      src={act.authorAvatar}
                      alt={act.authorName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#31353f] flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-[#dfe2ef] truncate">
                          {act.authorName}
                        </span>
                        {act.specialBadge ? (
                          <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#ffc174] text-[10px] font-bold">
                            {act.specialBadge}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-[#56e5a9]">
                            +{act.xpReward} XP
                          </span>
                        )}
                      </div>
                      <span className="font-body-sm text-[13px] text-[#a5b0c8] truncate">
                        {act.action}
                      </span>
                      <span className="text-[11px] text-[#a5b0c8]/50 mt-0.5">{act.timeAgo}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onCheerSquad(act.id)}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                      act.userCheered
                        ? "bg-[#f59e0b] text-[#472a00] font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                        : "bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef]"
                    }`}
                  >
                    <span>🙌</span>
                    <span className="text-sm">{act.cheersCount}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Roster & Leaderboard (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">Squad Roster</h2>

            <div className="flex flex-col gap-space-sm">
              {squadMembers.map((member, i) => (
                <div
                  key={i}
                  className="p-space-sm rounded-xl bg-[#1c1f29] border border-[#262a34] flex items-center justify-between"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-[#262a34]"
                      />
                      {member.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#56e5a9] ring-2 ring-[#1c1f29]" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-[#a5b0c8]">{member.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-md">
                    <span className="text-xs font-mono text-[#ffc174] font-bold">
                      LVL 0{member.level}
                    </span>
                    <span className="text-xs text-[#a5b0c8] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#f59e0b]">
                        local_fire_department
                      </span>
                      {member.streak}d
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
