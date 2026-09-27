import React, { useState } from 'react';

interface SpeedQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSpeedQuest: (xp: number) => void;
}

export const SpeedQuestModal: React.FC<SpeedQuestModalProps> = ({
  isOpen,
  onClose,
  onCompleteSpeedQuest,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleSelect = (idx: number) => {
    setSelectedAnswer(idx);
    const correct = idx === 1; // Option 2 is correct
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => {
        onCompleteSpeedQuest(30);
        onClose();
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#f59e0b]">bolt</span>
            <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef]">Speed Quest Drill</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#a5b0c8] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#262a34]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex items-center justify-between px-space-md py-space-xs rounded-lg bg-[#1c1f29] text-[12px] text-[#a5b0c8]">
          <span>Category: JavaScript Runtime Mechanics</span>
          <span className="text-[#ffc174] font-mono">+30 XP</span>
        </div>

        <div className="p-space-md rounded-xl bg-[#0a0e17] border border-[#262a34] font-mono text-[13px] text-[#dfe2ef]">
          <p className="text-[#a5b0c8] mb-2">// What is the output order?</p>
          <p>console.log(&apos;A&apos;);</p>
          <p>setTimeout(() =&gt; console.log(&apos;B&apos;), 0);</p>
          <p>Promise.resolve().then(() =&gt; console.log(&apos;C&apos;));</p>
          <p>console.log(&apos;D&apos;);</p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-2">
          {[
            { text: 'A, B, C, D', desc: 'Synchronous execution order' },
            { text: 'A, D, C, B', desc: 'Sync stack -&gt; Microtask Queue -&gt; Macrotask Queue' },
            { text: 'A, C, D, B', desc: 'Promise resolves before final synchronous call' },
          ].map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-space-sm rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedAnswer === idx
                  ? isCorrect
                    ? 'bg-[#30c88f]/20 border-[#56e5a9] text-[#56e5a9]'
                    : 'bg-red-500/20 border-red-500 text-red-300'
                  : 'bg-[#1c1f29] border-[#262a34] hover:bg-[#262a34]'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-mono text-[14px] font-bold">{opt.text}</span>
                <span className="text-[11px] text-[#a5b0c8]">{opt.desc}</span>
              </div>
              {selectedAnswer === idx && (
                <span className="material-symbols-outlined text-[20px]">
                  {isCorrect ? 'check_circle' : 'cancel'}
                </span>
              )}
            </div>
          ))}
        </div>

        {isCorrect && (
          <div className="text-center text-label-md text-[#56e5a9] animate-bounce">
            ⚡ Correct! Microtasks resolve before Macrotasks (+30 XP Awarded!)
          </div>
        )}
      </div>
    </div>
  );
};
