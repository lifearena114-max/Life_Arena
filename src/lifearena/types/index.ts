export type NavScreen =
  "home" | "goals" | "ai-journeys-quests" | "decision-arena" | "squads" | "profile";

export interface Quest {
  id: string;
  title: string;
  tag: string;
  tagType: "coding" | "mindset" | "health" | "career";
  scope: string;
  xp: number;
  completed: boolean;
  activeTimer?: {
    totalSeconds: number;
    currentSeconds: number;
    isRunning: boolean;
  };
  promptText?: string;
  reflectionSaved?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: string;
  title: string;
  status: "completed" | "active" | "upcoming" | "locked";
  statusLabel: string;
  progressPercent?: number;
  items: {
    id: string;
    title: string;
    completed: boolean;
    locked?: boolean;
    active?: boolean;
    duration?: string;
    xp?: number;
  }[];
  milestoneBonus?: {
    title: string;
    xp: number;
    awarded: boolean;
  };
}

export interface DecisionPoll {
  id: string;
  author: {
    name: string;
    role: string;
    timeAgo: string;
    avatar: string;
    badge?: string;
    online?: boolean;
  };
  category: "career" | "tech" | "lifestyle" | "money" | "mine";
  question: string;
  description: string;
  totalVotes: number;
  userVoted?: "A" | "B";
  optionA: {
    text: string;
    subtext: string;
    votes: number;
    percent: number;
  };
  optionB: {
    text: string;
    subtext: string;
    votes: number;
    percent: number;
  };
  aiInsight: string;
  commentsCount: number;
  isSpotlight?: boolean;
}

export interface SquadActivity {
  id: string;
  authorName: string;
  authorAvatar: string;
  xpReward: number;
  action: string;
  timeAgo: string;
  cheersCount: number;
  userCheered?: boolean;
  specialBadge?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  targetXp: number;
  nextLevelTitle: string;
  streakDays: number;
  bestStreakDays: number;
  primaryAnchor: string;
  primaryAnchorPhase: string;
  primaryAnchorProgress: number;
  weeklyStreak: boolean[]; // Mon - Sun (index 0 to 6)
  wisdomScore: number;
  perspectivesCount: number;
  upvotedAnswersCount: number;
}
