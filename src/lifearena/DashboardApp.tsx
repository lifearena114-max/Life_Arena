import React, { useEffect, useState } from "react";
import { AskArenaModal } from "./components/AskArenaModal";
import { RecalibrateModal } from "./components/RecalibrateModal";
import { DailyCheckinModal } from "./components/DailyCheckinModal";
import { CreateGoalModal } from "./components/CreateGoalModal";
import { DashboardView } from "./components/DashboardView";
import { DecisionArenaView } from "./components/DecisionArenaView";
import { GoalsView } from "./components/GoalsView";
import { Header } from "./components/Header";
import { JourneyBuilderModal } from "./components/JourneyBuilderModal";
import { useGoals } from "./hooks/useGoals";
import { ProfileView } from "./components/ProfileView";
import { ReflectionModal } from "./components/ReflectionModal";
import { RoadmapView } from "./components/RoadmapView";
import { SearchModal } from "./components/SearchModal";
import { Sidebar } from "./components/Sidebar";
import { SpeedQuestModal } from "./components/SpeedQuestModal";
import { SquadsView } from "./components/SquadsView";
import {
  INITIAL_DECISIONS,
  INITIAL_QUESTS,
  INITIAL_ROADMAP_PHASES,
  INITIAL_SQUAD_ACTIVITY,
  INITIAL_USER,
} from "./data/mockData";
import { DecisionPoll, NavScreen, Quest, RoadmapPhase, SquadActivity, UserProfile } from "./types";
import type { Goal } from "@/lib/database.types";

export default function App({
  initialGoal,
  onNewGoal,
}: {
  initialGoal?: string;
  onNewGoal: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>("home");
  const [user, setUser] = useState<UserProfile>(() => ({
    ...INITIAL_USER,
    primaryAnchor: initialGoal || INITIAL_USER.primaryAnchor,
  }));
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>(INITIAL_ROADMAP_PHASES);
  const [polls, setPolls] = useState<DecisionPoll[]>(INITIAL_DECISIONS);
  const [squadActivities, setSquadActivities] = useState<SquadActivity[]>(INITIAL_SQUAD_ACTIVITY);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);
  const [isSpeedQuestOpen, setIsSpeedQuestOpen] = useState(false);
  const [isAskArenaOpen, setIsAskArenaOpen] = useState(false);
  const [isJourneyBuilderOpen, setIsJourneyBuilderOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const { goals, loading: goalsLoading, error: goalsError, createGoal } = useGoals();
  const [isRecalOpen, setIsRecalOpen] = useState(false);
  const [activeReflectionQuest, setActiveReflectionQuest] = useState<Quest | null>(null);

  // Floating Toast State
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Global Keyboard Shortcuts (⌘K for search, ⌘D for daily check-in)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        setIsCheckinOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Quest toggle handler
  const handleToggleQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const nextCompleted = !q.completed;
          if (nextCompleted) {
            setUser((u) => ({
              ...u,
              currentXp: u.currentXp + q.xp,
            }));
            showToast("Quest Completed! ⚡", `+${q.xp} XP added to your tier progress.`);
          } else {
            setUser((u) => ({
              ...u,
              currentXp: Math.max(0, u.currentXp - q.xp),
            }));
          }
          return { ...q, completed: nextCompleted };
        }
        return q;
      }),
    );
  };

  // Squad Cheer handler
  const handleCheerSquad = (activityId: string) => {
    setSquadActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          const cheered = !act.userCheered;
          const newCount = cheered ? act.cheersCount + 1 : act.cheersCount - 1;
          if (cheered) {
            showToast("High-Five Sent! 🙌", `Cheered on ${act.authorName} (+5 Community XP).`);
          }
          return { ...act, userCheered: cheered, cheersCount: newCount };
        }
        return act;
      }),
    );
  };

  // Vote on Decision Poll
  const handleVotePoll = (pollId: string, option: "A" | "B") => {
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id === pollId) {
          if (p.userVoted === option) return p; // already voted for this option

          let newVotesA = p.optionA.votes;
          let newVotesB = p.optionB.votes;

          if (p.userVoted === "A") newVotesA -= 1;
          if (p.userVoted === "B") newVotesB -= 1;

          if (option === "A") newVotesA += 1;
          if (option === "B") newVotesB += 1;

          const total = newVotesA + newVotesB;
          const percentA = Math.round((newVotesA / total) * 100);
          const percentB = 100 - percentA;

          showToast(
            "Vote Registered! ⚖️",
            `Your perspective helped calibrate the collective arena.`,
          );

          return {
            ...p,
            userVoted: option,
            totalVotes: total,
            optionA: { ...p.optionA, votes: newVotesA, percent: percentA },
            optionB: { ...p.optionB, votes: newVotesB, percent: percentB },
          };
        }
        return p;
      }),
    );
  };

  // Save Reflection
  const handleSaveReflection = (questId: string, text: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          return { ...q, reflectionSaved: text, completed: true };
        }
        return q;
      }),
    );
    setUser((u) => ({ ...u, currentXp: u.currentXp + 25 }));
    showToast("Reflection Logged! 🧠", "+25 XP earned. Mental model updated.");
  };

  // Speed quest finish
  const handleCompleteSpeedQuest = (xp: number) => {
    setUser((u) => ({ ...u, currentXp: u.currentXp + xp }));
    showToast("Speed Drill Crushed! ⚡", `+${xp} XP awarded to your velocity multiplier.`);
  };

  // Daily Checkin confirm
  const handleConfirmCheckin = () => {
    setUser((u) => ({
      ...u,
      streakDays: u.streakDays + 1,
      currentXp: u.currentXp + 25,
      weeklyStreak: [true, true, true, true, true, true, false],
    }));
    showToast("Day Checked In! 🔥", `Streak boosted to ${user.streakDays + 1} days (+25 XP).`);
  };

  // Journey Created via Wizard
  const handleJourneyCreated = (title: string) => {
    setUser((u) => ({
      ...u,
      primaryAnchor: title,
      primaryAnchorPhase: "Core Foundations & Architecture",
      primaryAnchorProgress: 10,
      currentXp: u.currentXp + 50,
    }));
    showToast("New AI Journey Initialized! 🚀", `Roadmap for "${title}" synthesized (+50 XP).`);
    setCurrentScreen("ai-journeys-quests");
  };

  // Select a real, persisted goal (from GoalsView). This only updates which
  // goal is highlighted as the current focus in the existing mock UI state —
  // it does not attach a roadmap, since AI journey generation for a real
  // goal isn't implemented yet.
  const handleSelectGoal = (goal: Goal) => {
    setUser((u) => ({
      ...u,
      primaryAnchor: goal.title,
    }));
    setCurrentScreen("home");
  };

  // Reset Demo state
  const handleResetDemo = () => {
    setUser(INITIAL_USER);
    setQuests(INITIAL_QUESTS);
    setRoadmapPhases(INITIAL_ROADMAP_PHASES);
    setPolls(INITIAL_DECISIONS);
    setSquadActivities(INITIAL_SQUAD_ACTIVITY);
    showToast("Demo State Reset", "Sandbox refreshed to pristine mock state.");
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        user={user}
        onOpenNewGoal={onNewGoal}
      />

      {/* Main Container Offset by Sidebar */}
      <div className="flex-1 ml-72 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          user={user}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNewGoal={onNewGoal}
          onNavigateProfile={() => setCurrentScreen("profile")}
        />

        {/* Content Area offset by Header Height */}
        <main className="mt-16 pb-16 flex-1 flex flex-col">
          {currentScreen === "home" && (
            <DashboardView
              user={user}
              quests={quests}
              squadActivities={squadActivities}
              goals={goals}
              goalsLoading={goalsLoading}
              goalsError={goalsError}
              onToggleQuest={handleToggleQuest}
              onCheerSquad={handleCheerSquad}
              onNavigate={setCurrentScreen}
              onOpenReflection={(q) => setActiveReflectionQuest(q)}
              onOpenSpeedQuest={() => setIsSpeedQuestOpen(true)}
              onDailyCheckin={() => setIsCheckinOpen(true)}
              onOpenAskArena={() => setIsAskArenaOpen(true)}
              onOpenCreateGoal={() => setIsCreateGoalOpen(true)}
            />
          )}

          {currentScreen === "goals" && (
            <GoalsView
              goals={goals}
              goalsLoading={goalsLoading}
              goalsError={goalsError}
              onNavigate={setCurrentScreen}
              onSelectGoal={handleSelectGoal}
              onOpenCreateGoal={() => setIsCreateGoalOpen(true)}
            />
          )}

          {currentScreen === "ai-journeys-quests" && (
            <RoadmapView
              user={user}
              phases={roadmapPhases}
              onNavigate={setCurrentScreen}
              onClaimMilestone={(phaseId) => {
                showToast("Milestone Claimed!", `Phase bonus awarded (+300 XP).`);
              }}
              onStartQuest={(questTitle) => {
                showToast("Quest Resumed ⚡", `Active drill: ${questTitle}`);
                setCurrentScreen("home");
              }}
            />
          )}

          {currentScreen === "decision-arena" && (
            <DecisionArenaView
              user={user}
              polls={polls}
              onVote={handleVotePoll}
              onOpenAskModal={() => setIsAskArenaOpen(true)}
            />
          )}

          {currentScreen === "squads" && (
            <SquadsView
              user={user}
              squadActivities={squadActivities}
              onCheerSquad={handleCheerSquad}
            />
          )}

          {currentScreen === "profile" && (
            <ProfileView
              user={user}
              onUpdateUser={(updated) => setUser((u) => ({ ...u, ...updated }))}
              onResetDemo={handleResetDemo}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        quests={quests}
        phases={roadmapPhases}
        polls={polls}
        onSelectQuest={(q) => {
          setCurrentScreen("home");
        }}
        onNavigate={(screen) => setCurrentScreen(screen)}
      />

      <DailyCheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        user={user}
        onConfirmCheckin={handleConfirmCheckin}
      />

      <ReflectionModal
        isOpen={!!activeReflectionQuest}
        onClose={() => setActiveReflectionQuest(null)}
        quest={activeReflectionQuest}
        onSaveReflection={handleSaveReflection}
      />

      <SpeedQuestModal
        isOpen={isSpeedQuestOpen}
        onClose={() => setIsSpeedQuestOpen(false)}
        onCompleteSpeedQuest={handleCompleteSpeedQuest}
      />

      <AskArenaModal
        isOpen={isAskArenaOpen}
        onClose={() => setIsAskArenaOpen(false)}
        user={user}
        onSubmitDilemma={(newPoll) => {
          setPolls([newPoll, ...polls]);
          showToast("Dilemma Published! ⚖️", "Community and Bayesian model are analyzing options.");
          setCurrentScreen("decision-arena");
        }}
      />

      <JourneyBuilderModal
        isOpen={isJourneyBuilderOpen}
        onClose={() => setIsJourneyBuilderOpen(false)}
        onJourneyCreated={handleJourneyCreated}
      />

      <CreateGoalModal
        isOpen={isCreateGoalOpen}
        onClose={() => setIsCreateGoalOpen(false)}
        onCreate={async (input) => {
          const goal = await createGoal(input);
          showToast("Goal Created! 🎯", `"${goal.title}" was added to your goals.`);
          return goal;
        }}
      />

      <RecalibrateModal
        isOpen={isRecalOpen}
        onClose={() => setIsRecalOpen(false)}
        user={user}
        quests={quests}
        phases={roadmapPhases}
        onApply={(q) => {
          setQuests((prev) => [q, ...prev]);
          showToast("Journey updated 🧭", `Added: ${q.title}`);
        }}
      />

      <button
        onClick={() => setIsRecalOpen(true)}
        className="fixed bottom-6 left-80 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1f29] border border-[#f59e0b]/50 text-[#ffc174] font-bold text-sm shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-[#262a34]"
      >
        <span className="material-symbols-outlined text-[18px]">route</span>
        Had a setback?
      </button>

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1c1f29] border border-[#f59e0b]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-space-md py-space-sm rounded-xl animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174]">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-[#dfe2ef] font-bold">
              {toastMessage.title}
            </span>
            <span className="text-[12px] text-[#a5b0c8]">{toastMessage.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
}
