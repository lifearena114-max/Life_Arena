import {
  BookOpen,
  BriefcaseBusiness,
  CircleDollarSign,
  Dumbbell,
  Ellipsis,
  HeartPulse,
  Laptop,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export const focusAreas = [
  {
    id: "career",
    label: "Career",
    icon: BriefcaseBusiness,
    description: "Advance your role, transition careers, or build durable professional influence.",
  },
  {
    id: "coding",
    label: "Coding & Technology",
    icon: Laptop,
    description: "Build skills, master frameworks, and ship production-grade software.",
  },
  {
    id: "learning",
    label: "Learning",
    icon: BookOpen,
    description: "Master complex subjects, read deeply, and synthesize mental models faster.",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Dumbbell,
    description: "Build strength, athletic endurance, and unbreakable physical energy.",
  },
  {
    id: "health",
    label: "Health",
    icon: HeartPulse,
    description: "Optimize sleep, nutrition, active recovery, and metabolic vitality.",
  },
  {
    id: "money",
    label: "Money",
    icon: CircleDollarSign,
    description: "Budget with discipline, invest systematically, and build runway.",
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Zap,
    description: "Beat procrastination, protect deep focus, and execute consistently.",
  },
  {
    id: "confidence",
    label: "Confidence",
    icon: Sparkles,
    description: "Overcome self-doubt, articulate high-stakes thoughts, and take bold bets.",
  },
  {
    id: "growth",
    label: "Personal Growth",
    icon: Target,
    description: "Cultivate clarity of intent, emotional balance, and internal discipline.",
  },
  {
    id: "other",
    label: "Other Domain",
    icon: Ellipsis,
    description: "Define your own custom goal or focus area.",
  },
] as const;

export const durations = ["30 days", "3 months", "6 months", "1 year", "No deadline"];
export const commitments = [
  {
    value: "15 mins / day",
    title: "Micro Momentum",
    description: "A sustainable rhythm for building a zero-drop habit.",
  },
  {
    value: "45 mins / day",
    title: "High Impact Core",
    description: "The sweet spot for accelerated mastery and tangible projects.",
  },
  {
    value: "90+ mins / day",
    title: "Intensive Sprint",
    description: "Deep work for major pivots, launches, and ambitious targets.",
  },
];
export const motivations = [
  {
    value: "Mastery & Competence",
    description: "Become exceptionally skilled and gain deep command.",
  },
  {
    value: "Freedom & Autonomy",
    description: "Build optionality and own your schedule and standards.",
  },
  {
    value: "Impact & Contribution",
    description: "Create meaningful work that improves life for others.",
  },
  {
    value: "Momentum & Identity",
    description: "Become the person who consistently follows through.",
  },
];

export function titleCaseGoal(goal: string) {
  if (!goal.trim()) return "Become a Full-Stack Developer";
  return goal.trim().replace(/\b\w/g, (letter) => letter.toUpperCase());
}
