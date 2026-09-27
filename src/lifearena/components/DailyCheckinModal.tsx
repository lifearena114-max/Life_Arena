import React, { useState } from "react";
import { UserProfile } from "../types";

interface DailyCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onConfirmCheckin: () => void;
}

export const DailyCheckinModal: React.FC<DailyCheckinModalProps> = ({
  isOpen,
  onClose,
  user,
  onConfirmCheckin,
}) => {
  const [checked, setChecked] = useState(false);

  if (!isOpen) return null;

  const handleCheck = () => {
    setChecked(true);
    onConfirmCheckin();
    setTimeout(() => {
      onClose();
      setChecked(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-space-xl flex flex-col items-center text-center gap-space-lg">
        <div className="relative w-20 h-20 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174] shadow-[0_0_24px_rgba(245,158,11,0.3)]">
          <span className="material-symbols-outlined text-[42px] animate-bounce">
            local_fire_department
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-[#ffc174] uppercase tracking-wider font-bold">
            Daily Arena Ritual
          </span>
          <h2 className="font-headline-xl text-headline-xl text-[#dfe2ef]">
            Day {user.streakDays + 1} Momentum
          </h2>
          <p className="font-body-md text-body-md text-[#a5b0c8]">
            Commit to today&apos;s cycle, protect your unbroken streak, and bank{" "}
            <strong className="text-[#56e5a9]">+25 XP</strong>.
          </p>
        </div>

        {/* Motivational Vector */}
        <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] w-full text-left flex items-start gap-3">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[20px] mt-0.5">
            format_quote
          </span>
          <p className="text-[12px] text-[#dfe2ef] italic leading-relaxed">
            &quot;We are what we repeatedly do. Excellence, then, is not an act, but a habit.&quot;
          </p>
        </div>

        <button
          onClick={handleCheck}
          disabled={checked}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-headline-sm text-headline-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
        >
          {checked ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Streak Locked (+25 XP)!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Check-in for Day {user.streakDays + 1}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
