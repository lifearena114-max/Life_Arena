import React, { useState } from "react";
import { DecisionPoll, NavScreen, Quest, RoadmapPhase } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: Quest[];
  phases: RoadmapPhase[];
  polls: DecisionPoll[];
  onSelectQuest: (quest: Quest) => void;
  onNavigate: (screen: NavScreen) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  quests,
  phases,
  polls,
  onSelectQuest,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredQuests = quests.filter(
    (q) =>
      q.title.toLowerCase().includes(query.toLowerCase()) ||
      q.tag.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredRoadmapItems = phases.flatMap((phase) =>
    phase.items
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ ...item, phaseTitle: phase.title })),
  );

  const filteredPolls = polls.filter(
    (p) =>
      p.question.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#0a0e17]/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#181b25] border border-[#262a34] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#262a34] gap-3">
          <span className="material-symbols-outlined text-[22px] text-[#ffc174]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quests, roadmap milestones, decisions... (Esc to exit)"
            className="w-full bg-transparent text-[#dfe2ef] outline-none font-body-md placeholder:text-[#a5b0c8]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[11px] font-mono px-2 py-1 rounded bg-[#262a34] text-[#a5b0c8]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-space-md flex flex-col gap-space-md max-h-96 overflow-y-auto no-scrollbar">
          {/* Quests */}
          {filteredQuests.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-label-sm text-[#ffc174] uppercase font-bold px-2">
                Quests
              </span>
              {filteredQuests.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuest(q);
                    onClose();
                  }}
                  className="flex items-center justify-between p-space-sm rounded-lg hover:bg-[#262a34] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#56e5a9]">
                      {q.completed ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span className="text-body-sm font-body-sm text-[#dfe2ef]">{q.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#ffc174]">+{q.xp} XP</span>
                </div>
              ))}
            </div>
          )}

          {/* Roadmap Milestones */}
          {filteredRoadmapItems.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-label-sm text-[#c0c1ff] uppercase font-bold px-2">
                Roadmap Milestones
              </span>
              {filteredRoadmapItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate("ai-journeys-quests");
                    onClose();
                  }}
                  className="flex items-center justify-between p-space-sm rounded-lg hover:bg-[#262a34] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">
                      timeline
                    </span>
                    <span className="text-body-sm font-body-sm text-[#dfe2ef]">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[#a5b0c8]">{item.phaseTitle}</span>
                </div>
              ))}
            </div>
          )}

          {/* Decisions */}
          {filteredPolls.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-label-sm text-[#a5b0c8] uppercase font-bold px-2">
                Decision Arena
              </span>
              {filteredPolls.map((poll) => (
                <div
                  key={poll.id}
                  onClick={() => {
                    onNavigate("decision-arena");
                    onClose();
                  }}
                  className="flex items-center justify-between p-space-sm rounded-lg hover:bg-[#262a34] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-[#f59e0b]">
                      balance
                    </span>
                    <span className="text-body-sm font-body-sm text-[#dfe2ef] truncate">
                      {poll.question}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#a5b0c8] flex-shrink-0">
                    {poll.totalVotes} votes
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredQuests.length === 0 &&
            filteredRoadmapItems.length === 0 &&
            filteredPolls.length === 0 && (
              <div className="text-center py-8 text-body-sm text-[#a5b0c8]">
                No matching results found for &quot;{query}&quot;.
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
