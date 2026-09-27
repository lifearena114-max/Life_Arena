import React, { useState } from 'react';
import { Quest } from '../types';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  quest: Quest | null;
  onSaveReflection: (questId: string, text: string) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  quest,
  onSaveReflection,
}) => {
  const [reflectionText, setReflectionText] = useState(quest?.reflectionSaved || '');

  if (!isOpen || !quest) return null;

  const handleSave = () => {
    onSaveReflection(quest.id, reflectionText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#c0c1ff]">edit_note</span>
            <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
              Daily Reflection Drill
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a5b0c8] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#262a34]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Prompt Card */}
        <div className="p-space-md rounded-xl bg-[#1c1f29] border border-[#262a34] flex flex-col gap-1">
          <span className="text-[11px] font-label-sm text-[#ffc174] uppercase font-bold">
            Cognitive Prompt
          </span>
          <p className="font-headline-sm text-headline-sm text-[#dfe2ef]">
            {quest.promptText || 'What was your main breakthrough during async debugging?'}
          </p>
        </div>

        {/* Input Area */}
        <textarea
          rows={5}
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="Capture your key insight, mental shift, or debugging pattern discovered today..."
          className="w-full bg-[#0a0e17] text-[#dfe2ef] p-4 rounded-xl border border-[#262a34] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none text-body-md resize-none"
          autoFocus
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[12px] font-mono text-[#56e5a9] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">military_tech</span>
            +25 XP upon completion
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#a5b0c8] hover:text-[#dfe2ef] font-label-md text-label-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-space-lg py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-md text-label-md font-bold transition-all shadow-md cursor-pointer"
            >
              Save Reflection &amp; Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
