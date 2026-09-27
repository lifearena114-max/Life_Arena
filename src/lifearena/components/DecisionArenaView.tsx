import React, { useState } from "react";
import { TOP_CONTRIBUTORS } from "../data/mockData";
import { DecisionPoll, UserProfile } from "../types";

interface DecisionArenaViewProps {
  user: UserProfile;
  polls: DecisionPoll[];
  onVote: (pollId: string, option: "A" | "B") => void;
  onOpenAskModal: () => void;
}

export const DecisionArenaView: React.FC<DecisionArenaViewProps> = ({
  user,
  polls,
  onVote,
  onOpenAskModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [perspectives, setPerspectives] = useState<{ [pollId: string]: string[] }>({
    "d-spotlight": [
      "Series A will push you out of your comfort zone. The learning speed is incomparable!",
      "Make sure to calculate dilution. 0.2% can become 0.04% after Series B/C.",
    ],
  });
  const [commentInput, setCommentInput] = useState<{ [pollId: string]: string }>({});
  const [activeCommentPollId, setActiveCommentPollId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "trending", label: "Trending 🔥" },
    { id: "career", label: "Career" },
    { id: "tech", label: "Tech & Code" },
    { id: "money", label: "Money" },
    { id: "lifestyle", label: "Health & Lifestyle" },
    { id: "mine", label: "My Decisions" },
  ];

  const filteredPolls = polls.filter((p) => {
    if (selectedCategory === "all" || selectedCategory === "trending") return true;
    return p.category === selectedCategory;
  });

  const spotlightPoll = polls.find((p) => p.isSpotlight) || polls[0];
  const feedPolls = filteredPolls.filter((p) => p.id !== spotlightPoll?.id);

  const handleAddPerspective = (pollId: string) => {
    const text = commentInput[pollId]?.trim();
    if (!text) return;

    setPerspectives((prev) => ({
      ...prev,
      [pollId]: [...(prev[pollId] || []), text],
    }));
    setCommentInput((prev) => ({ ...prev, [pollId]: "" }));
  };

  return (
    <div className="flex flex-col w-full px-space-lg py-space-lg text-[#dfe2ef]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg pb-space-md border-b border-[#262a34]/50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3131c0]/20 text-[#c0c1ff] font-label-sm text-label-sm border border-[#3131c0]/40">
              <span className="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse" />
              4,892 active minds online
            </span>
            <span className="text-[#a5b0c8] font-label-sm text-label-sm">
              • Collective Intelligence
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-[#dfe2ef] tracking-tight">
            Decision Arena
          </h1>
          <p className="font-body-md text-body-md text-[#a5b0c8] max-w-3xl">
            Leverage crowd wisdom, algorithmic Bayesian modeling, and real-world outcomes to
            navigate high-stakes life dilemmas.
          </p>
        </div>

        <button
          onClick={onOpenAskModal}
          className="self-start md:self-auto flex items-center gap-space-xs px-space-lg py-space-md rounded-lg bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-label-lg text-label-lg shadow-[0px_0px_24px_-4px_rgba(245,158,11,0.35)] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Ask the Arena</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-space-sm mb-space-lg no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#f59e0b] text-[#472a00] font-bold shadow-[0_0_16px_rgba(245,158,11,0.3)]"
                : "bg-[#181b25] text-[#a5b0c8] hover:text-[#dfe2ef] hover:bg-[#262a34] border border-[#262a34]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Split Grid (8 cols / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: Spotlight & Feed (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          {/* Spotlight Dilemma Card */}
          {spotlightPoll && (
            <div className="relative overflow-hidden rounded-xl bg-[#1c1f29] p-space-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-[#ffc174]/30">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ffc174]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Author & Header */}
              <div className="flex items-start justify-between gap-space-md mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <img
                    src={spotlightPoll.author.avatar}
                    alt={spotlightPoll.author.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#ffc174]/40"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                        {spotlightPoll.author.name}
                      </span>
                      {spotlightPoll.author.badge && (
                        <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#ffc174] font-label-sm text-[10px] font-bold">
                          {spotlightPoll.author.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                      {spotlightPoll.author.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs">
                  <span className="px-space-sm py-1 rounded-full bg-[#f59e0b]/10 text-[#ffc174] font-label-sm text-label-sm border border-[#f59e0b]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174] animate-ping" />
                    Spotlight Deliberation
                  </span>
                </div>
              </div>

              {/* Dilemma Question */}
              <h2 className="font-headline-lg text-headline-lg text-[#dfe2ef] tracking-tight mb-space-xs">
                {spotlightPoll.question}
              </h2>
              <p className="font-body-md text-body-md text-[#a5b0c8] mb-space-lg">
                {spotlightPoll.description}
              </p>

              {/* Voting Bars */}
              <div className="flex flex-col gap-space-sm mb-space-lg">
                {/* Option A */}
                <div
                  onClick={() => onVote(spotlightPoll.id, "A")}
                  className={`relative overflow-hidden rounded-xl bg-[#181b25] p-space-md flex items-center justify-between cursor-pointer border transition-all ${
                    spotlightPoll.userVoted === "A"
                      ? "border-[#ffc174] ring-1 ring-[#ffc174]"
                      : "border-[#262a34] hover:border-[#ffc174]/40"
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#f59e0b]/20 transition-all duration-700"
                    style={{ width: `${spotlightPoll.optionA.percent}%` }}
                  />
                  <div className="relative z-10 flex items-start gap-space-sm">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-all ${
                        spotlightPoll.userVoted === "A"
                          ? "border-[#ffc174] bg-[#ffc174]"
                          : "border-[#a5b0c8]"
                      }`}
                    >
                      {spotlightPoll.userVoted === "A" && (
                        <span className="material-symbols-outlined text-[14px] text-[#472a00] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                        {spotlightPoll.optionA.text}
                      </span>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                        {spotlightPoll.optionA.subtext}
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-end">
                    <span className="font-stat-counter text-stat-counter text-[#ffc174]">
                      {spotlightPoll.optionA.percent}%
                    </span>
                    <span className="font-label-sm text-label-sm text-[#a5b0c8]">
                      {spotlightPoll.optionA.votes} votes
                    </span>
                  </div>
                </div>

                {/* Option B */}
                <div
                  onClick={() => onVote(spotlightPoll.id, "B")}
                  className={`relative overflow-hidden rounded-xl bg-[#181b25] p-space-md flex items-center justify-between cursor-pointer border transition-all ${
                    spotlightPoll.userVoted === "B"
                      ? "border-[#c0c1ff] ring-1 ring-[#c0c1ff]"
                      : "border-[#262a34] hover:border-[#c0c1ff]/40"
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#3131c0]/25 transition-all duration-700"
                    style={{ width: `${spotlightPoll.optionB.percent}%` }}
                  />
                  <div className="relative z-10 flex items-start gap-space-sm">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-all ${
                        spotlightPoll.userVoted === "B"
                          ? "border-[#c0c1ff] bg-[#c0c1ff]"
                          : "border-[#a5b0c8]"
                      }`}
                    >
                      {spotlightPoll.userVoted === "B" && (
                        <span className="material-symbols-outlined text-[14px] text-[#1000a9] font-bold">
                          check
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                        {spotlightPoll.optionB.text}
                      </span>
                      <span className="font-body-sm text-[12px] text-[#a5b0c8]">
                        {spotlightPoll.optionB.subtext}
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-end">
                    <span className="font-stat-counter text-stat-counter text-[#c0c1ff]">
                      {spotlightPoll.optionB.percent}%
                    </span>
                    <span className="font-label-sm text-label-sm text-[#a5b0c8]">
                      {spotlightPoll.optionB.votes} votes
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Arena Synthesis Callout */}
              <div className="p-space-md rounded-xl bg-[#0a0e17] border border-[#262a34] flex flex-col gap-space-xs mb-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs text-[#c0c1ff]">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                      AI Arena Synthesis (Deterministic Model v4.2)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#56e5a9]">98.2% Confidence</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#dfe2ef] leading-relaxed">
                  {spotlightPoll.aiInsight}
                </p>
              </div>

              {/* Action Buttons & Comments Toggle */}
              <div className="flex items-center justify-between pt-space-xs border-t border-[#262a34]/40">
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={() =>
                      setActiveCommentPollId(
                        activeCommentPollId === spotlightPoll.id ? null : spotlightPoll.id,
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] font-label-md text-label-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>{perspectives[spotlightPoll.id]?.length || 0} Perspectives</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Dilemma link copied to clipboard!");
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#a5b0c8] hover:text-[#dfe2ef] hover:bg-[#262a34] font-label-md text-label-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span>Share</span>
                  </button>
                </div>

                <div className="font-label-sm text-label-sm text-[#a5b0c8]">
                  Total Votes:{" "}
                  <strong className="text-[#dfe2ef]">{spotlightPoll.totalVotes}</strong>
                </div>
              </div>

              {/* Perspective Comments Box */}
              {activeCommentPollId === spotlightPoll.id && (
                <div className="mt-space-md pt-space-md border-t border-[#262a34] flex flex-col gap-space-sm">
                  <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                    Community Perspectives
                  </span>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
                    {(perspectives[spotlightPoll.id] || []).map((persp, idx) => (
                      <div
                        key={idx}
                        className="p-space-sm rounded-lg bg-[#181b25] text-body-sm font-body-sm text-[#dfe2ef] border border-[#262a34]"
                      >
                        {persp}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Add your objective perspective..."
                      value={commentInput[spotlightPoll.id] || ""}
                      onChange={(e) =>
                        setCommentInput({ ...commentInput, [spotlightPoll.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddPerspective(spotlightPoll.id);
                      }}
                      className="flex-1 bg-[#0a0e17] text-[#dfe2ef] text-[13px] px-3 py-2 rounded-lg border border-[#262a34] focus:border-[#f59e0b] outline-none"
                    />
                    <button
                      onClick={() => handleAddPerspective(spotlightPoll.id)}
                      className="px-4 py-2 bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Community Decisions Feed */}
          <div className="flex flex-col gap-space-md">
            <h3 className="font-headline-lg text-headline-lg text-[#dfe2ef]">
              Community Deliberations
            </h3>

            {feedPolls.map((poll) => (
              <div
                key={poll.id}
                className="rounded-xl bg-[#1c1f29] p-space-lg shadow-sm border border-[#262a34]/60 flex flex-col gap-space-sm hover:border-[#262a34] transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <img
                      src={poll.author.avatar}
                      alt={poll.author.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-[#262a34]"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-[#dfe2ef] font-semibold">
                        {poll.author.name}
                      </span>
                      <span className="font-body-sm text-[11px] text-[#a5b0c8]">
                        {poll.author.role} • {poll.author.timeAgo}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#a5b0c8] font-label-sm text-[11px] uppercase">
                    {poll.category}
                  </span>
                </div>

                <h4 className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                  {poll.question}
                </h4>
                <p className="font-body-sm text-body-sm text-[#a5b0c8]">{poll.description}</p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm my-space-xs">
                  {/* Option A */}
                  <div
                    onClick={() => onVote(poll.id, "A")}
                    className={`relative overflow-hidden rounded-lg bg-[#181b25] p-space-sm flex items-center justify-between cursor-pointer border ${
                      poll.userVoted === "A" ? "border-[#ffc174]" : "border-[#262a34]"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#f59e0b]/20 transition-all duration-500"
                      style={{ width: `${poll.optionA.percent}%` }}
                    />
                    <span className="relative z-10 font-label-md text-label-md text-[#dfe2ef] truncate">
                      {poll.optionA.text}
                    </span>
                    <span className="relative z-10 font-stat-counter text-[14px] text-[#ffc174]">
                      {poll.optionA.percent}%
                    </span>
                  </div>

                  {/* Option B */}
                  <div
                    onClick={() => onVote(poll.id, "B")}
                    className={`relative overflow-hidden rounded-lg bg-[#181b25] p-space-sm flex items-center justify-between cursor-pointer border ${
                      poll.userVoted === "B" ? "border-[#c0c1ff]" : "border-[#262a34]"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#3131c0]/20 transition-all duration-500"
                      style={{ width: `${poll.optionB.percent}%` }}
                    />
                    <span className="relative z-10 font-label-md text-label-md text-[#dfe2ef] truncate">
                      {poll.optionB.text}
                    </span>
                    <span className="relative z-10 font-stat-counter text-[14px] text-[#c0c1ff]">
                      {poll.optionB.percent}%
                    </span>
                  </div>
                </div>

                {/* AI Brief Insight */}
                <div className="p-space-xs px-space-sm rounded bg-[#0a0e17] text-[11px] text-[#a5b0c8] flex items-center gap-1.5 border border-[#262a34]/40">
                  <span className="material-symbols-outlined text-[14px] text-[#c0c1ff]">
                    auto_awesome
                  </span>
                  <span className="truncate">
                    <strong className="text-[#c0c1ff]">AI Synthesis:</strong> {poll.aiInsight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Arena Stats & Leaderboard (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* User Wisdom & Impact Card */}
          <div className="bg-[#1c1f29] rounded-xl p-space-lg shadow-sm border border-[#262a34]/50 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-[#a5b0c8] uppercase tracking-wider">
                Arena Impact
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#56e5a9]/10 text-[#56e5a9] font-label-sm text-[11px] font-bold">
                Top 6% Contributor
              </span>
            </div>

            <div className="flex items-baseline gap-space-xs">
              <span className="font-stat-counter text-[36px] text-[#ffc174] font-bold">
                {user.wisdomScore}%
              </span>
              <span className="font-body-md text-body-md text-[#a5b0c8]">Wisdom Score</span>
            </div>

            <div className="grid grid-cols-2 gap-space-sm pt-space-xs border-t border-[#262a34]">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                  {user.perspectivesCount}
                </span>
                <span className="font-label-sm text-[11px] text-[#a5b0c8]">Perspectives</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-[#56e5a9]">
                  {user.upvotedAnswersCount}
                </span>
                <span className="font-label-sm text-[11px] text-[#a5b0c8]">Upvoted Solutions</span>
              </div>
            </div>
          </div>

          {/* Top Contributors This Week */}
          <div className="bg-[#1c1f29] rounded-xl p-space-lg shadow-sm border border-[#262a34]/50 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm text-[#dfe2ef]">
                Top Contributors This Week
              </h4>
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">
                leaderboard
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {TOP_CONTRIBUTORS.map((c) => (
                <div
                  key={c.rank}
                  className="flex items-center justify-between p-space-xs rounded-lg hover:bg-[#262a34] transition-colors"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-5 text-center font-stat-counter text-[14px] text-[#ffc174]">
                      #{c.rank}
                    </span>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#262a34]"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-[#dfe2ef] font-medium">
                        {c.name}
                      </span>
                      <span className="font-body-sm text-[11px] text-[#a5b0c8]">{c.role}</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-mono text-[#56e5a9]">+{c.upvotes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arena Stats */}
          <div className="bg-[#1c1f29] rounded-xl p-space-md flex items-center justify-between border border-[#262a34]/50">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[#30c88f] text-[24px]">task_alt</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-[#dfe2ef]">
                  1,280 Decisions Resolved
                </span>
                <span className="font-body-sm text-[11px] text-[#a5b0c8]">
                  98.4% outcome satisfaction
                </span>
              </div>
            </div>
          </div>

          {/* High-Yield Poll Tips Box */}
          <div className="p-space-md rounded-xl bg-[#181b25] border border-[#262a34] flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-[#ffc174] uppercase font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
              Formulating High-Yield Dilemmas
            </span>
            <p className="font-body-sm text-[12px] text-[#a5b0c8] leading-relaxed">
              Include specific financial numbers, time horizons, and trade-offs. Precise dilemmas
              generate 3.4x more rigorous community analysis and deterministic model evaluations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
