import { DecisionPoll, Quest, RoadmapPhase, SquadActivity, UserProfile } from "../types";

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1UkMIf5OChmPYPh1euOCxZI4wZDZHImRQK32nXkkdHVgpuM58Ir_k1T7-4M4yAWvtmLBUtJjvigYt8iUi57hMNQVBsPqzkus-nYk-QwyWtC0GnC_ezQ2644n4oy6D6Nk7rv1ra79I_8IulEodlCts2xPQsnWkq7v-hSLsWkCVlMTFdyLPIGlcMtrCVt6sDTJqmIiaIHTyCoP_xEseWHXlowRK64uFSwzRM2HhZBjpMZ0PQJt78NJVME4bU",
  userAshwani:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-QkXEuu5s47G6zybRBjskx_djPesttIRd4jvCLzdK9MzYJdgRTPqbwGPHD3IWbpb6gdQXxGa13dkoLM79IxuA3an_p_AYnLcVwJo4XSM7fXjewq25QFPMmr3i-reRiMsdyUvkmHt_L3xTHe1fYPcMXV8Sii7U6uhK5ObUs49sl4M0gZRHhhz7DEgaPJQPuJLSnun7BCTkpbMG5p66vY7eOEtM_zneSyTFpfqoVHLXHlq6I1Oj43A",
  avatarMaya:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB6psj7UzuQui5Su-UKtrRKNa4T1GPo2jdG09aHFs-xc9ktnF5hJdsEGwsDxKQmenV_vHqn-e8x5DDeXqNMXk9mNDiaszw-j61Y5huAbWl0_HVVoo1KfQBsEkBYCi8Qy_IomR4Fh0Nm6x-u2CvsRM9u7A2g0FUpK3BZLTx7cWlMRhBKF_eRr5lbxqyigct4t4qvAvaJV9H7ulRjv-MY9s8NmM0IvDc-5ixiL6pTyDud4-iyeI4uPO2K",
  avatarDevon:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGPMY_I8Kt4hKWfI23ORBJSwPFhvVFNQ6mj2xJ6vQICy4smYY8HwKm_BcSBwJF-g-2mRYKJBnEJnXD5UFGFzdw-Mrw5BbiceHbTU6aa1VeczO3xxp0PN02Pa4IY8XHSxRGGCYHwxr5L92S7zqkGEBXxWQ1rne37PBt70tIYs12uVppwmhlCqFj2b8eF24_xXoehhTREVuLdnfY32jdXNX48noehNc2GVSOHYDqENckP4UDJj6DCXI_",
  avatarSarah:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDnj5omWS6oFem0_hWAimIZ9oU3GU4EL0nawj52wJiy5iCQSE3CPZw55tv36m-HK0EB9pDX8zY2ENKP0od93dtXbsCp0mjcEuWfYbXP-bfpjRR5LKabW6NBYRNTf0g4PmOrJxGENy9lzpcqFlfXgknSTmHmBdc0C24PN0qnVozbXze-71YWdYVdaS3d6yb0R6HG9twXFXGeWj1lMad0wj-KR6_24hbCtKJyDFExvKsVr2fcqTGx2lz7",
  avatarPriya:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD7SQCoadRYEKmfHeHOT8la_OiJZdfI0MbypKXHTMqZWn0IJ5O8E-jjzWadNtfr61-5Y4IVjPc0DuhP1wKsCY2CEoCeBgMZ-mmh-aI-rXfHayEEjlqlNIdF0Tkwe6fRCCzr5QA5js3VMSsmn1cKPVoSvqvDNzUzF4a-CHWq0UQ86HuzZF8oxLK2HrZKwOHnMng2D-EjJCedtKgIHUr3-pJYN75I97VNvHHzQD-4Axm5lKS_HGGKRluG",
  avatarAlexZhang:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAer2KLq6Lq9o2HLQrnXsjPvhnkPsfT3uPszJPT_rLnZfgLkpAUVJrE6tQgp08mZ7fHqPhMJcUjiqc69VmSdl8CDOwC1awzhaT2hqoyZTRXDvLxjeZHeSvVoQ8n029vrlm9EafuqyECzwa57uHFD4ZfzBXC7WSg2NjiKsALxUUc78NrVO4w7t9ZStZRkdNdf9HU9RTAa9lPSCu8YZwsXfa_OxrdA9HAZSAynz0waLJmBwj4kbV3Kdnq",
  avatarKavita:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC8927U6kTWwG1kuvQ7hnDaZmcNFIc3fsm37o4up-p4IBzExvsR0_Gml2nE7hA-MGWRQ6bU6MZ6b75gfNILdXno81aBc1qOT3rqlrFclXNYhk3XJ0VMgohXEgFQM7A42SyPEl4x70mWUXeRBxX78vynh00bBou3xfIKhCsNuGH37mDIJy0yGeLz6zUbP4kSiIn1FHEcsIo69lzGkcfaEKLKYL7l7G52wOxntSj3rAMV5k0rF0rBxCHC",
  avatarMarcus:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7cxxaov1QdMArlLMltEtsZcwHDA5LIv3_n9cn8-6UZrKK3mXm-Cxo6UDabrD-wctwJxUW7ImoaoT3F33R1DByIDUlmyWdhewb4FtTRZawcmLjAyojHdsskBmm1o7Se5oiKMolZAAilnxgoRaM9TFv7PDvBa7gZMJ3B8T_DNSlwgFoIofhfrQ9mRizdyz3vbOephr7kpxsuyUacQLkNIB0_wG63LsrdOAhjLtAtULAmza1niWtc2Rk",
  avatarElena:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnSAykMtnx-RpzdsTfVt3AeIxHevhZV2ZcMBWHnLtBnxch-LKGkRNPIgb4PrAnX3HYfZXoti2yWjkW_sPu7cWaZh9GV3RQ3FXJzjcXh_MMRVfugL7STh8YjWpGz3OtyyQblsmARD0UhzwQfQZJ2QmRlZD8ZtAGxUZxTTfcEM5pM2iLVYz4l2g84xTRPTwYDkrfKb63zZEDOt1aSCXzVSn8Qux9TFDuBNL60Fv9vokbnqKc4eafwvw-",
  avatarDevonRay:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrPU84Q4ND0d3LRu4LxiGN19YGDmU-sNL-BCzEEKEeJcH1On_gTLck2ywozNNY3gDjWdE2yJEC6Gh6evZJHaGJTx969FBto4pxNsrItSNOqtLbaf6ddhfgdA-MTTZ7A0djUEWv15szdPpg1pdtSBWaJ5TOFyHWVSSwSsyRqCuaGWUUYwUJCvCOHxjJG5BzWtbhVBqVwaOGe0ddy8vqrAXZWG8l8q1kanxhfUlNB4rCiw7bYqDUg3OE",
  avatarTariq:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCp6Vo1HzN_osucmDSZCkyEF-Yadu9AECFEufPkytHCWfvyqFz6d3PdbTsTqW0scIJ-nIdgoeHitrmexYkwK5UkFEq1JNdyJ3SblcIPZmKUI4SeSc68wbKAGQAmzduKeCKVpyZcftPXz0fqa4EriTjP8sCLBhsl0KOZFp-prAvvCvWKgarqm2GN8PFyj9ujZhWiXMdxpo1cl-_ATNbKVPXBiwRdctooLNVYQE6gZSr1vImfpgC60OvF",
  avatarCohortPace:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAAC0W_OLg73fZVzuh1hhXOhVC6DkYIBG0AC51cUxRIWILP9zhP2sJfj07gX0LLcPbSUipIJLtBKjx9zDXSw4Kd2JoCKwyRpHdZV7E8Hd5WZ751TuW1rV0u3J6RF2KITJrnhSaagpp-CC-pyAobFNKgunN2bpKXT80ehMs65M626NtpiLDRx2jo8BgELE7QeR2xfmEIhoZyyCXlIYfhO5iz3QvCRnnrjrS9Mf44MKx3_5iYFEjx7sxE",
};

export const INITIAL_USER: UserProfile = {
  name: "Ashwani",
  handle: "@ashwani",
  avatar: ASSETS.userAshwani,
  level: 7,
  levelTitle: "Explorer",
  currentXp: 2450,
  targetXp: 3000,
  nextLevelTitle: "LVL 08 Vanguard",
  streakDays: 12,
  bestStreakDays: 18,
  primaryAnchor: "Full-Stack Dev",
  primaryAnchorPhase: "Build REST API in Express",
  primaryAnchorProgress: 42,
  weeklyStreak: [true, true, true, true, true, false, false], // Mon - Sun
  wisdomScore: 94,
  perspectivesCount: 58,
  upvotedAnswersCount: 42,
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Complete JavaScript lesson",
    tag: "Coding",
    tagType: "coding",
    scope: "Core Scope: Array methods & reduce patterns",
    xp: 50,
    completed: true,
  },
  {
    id: "q2",
    title: "Practice coding for 30 minutes",
    tag: "Coding",
    tagType: "coding",
    scope: "Focus: Algorithm optimization & LeetCode challenges",
    xp: 75,
    completed: false,
    activeTimer: {
      totalSeconds: 30 * 60,
      currentSeconds: 18 * 60 + 46,
      isRunning: true,
    },
  },
  {
    id: "q3",
    title: "Write today's reflection",
    tag: "Mindset",
    tagType: "mindset",
    scope: 'Prompt: "What was your main breakthrough during async debugging?"',
    xp: 25,
    completed: false,
    promptText: "What was your main breakthrough during async debugging?",
  },
  {
    id: "q4",
    title: "Hydration & Posture check",
    tag: "Health",
    tagType: "health",
    scope: "Target: Drink 500ml water + 2min shoulder decompression",
    xp: 15,
    completed: false,
  },
];

export const INITIAL_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: "Phase 01 • Finished",
    title: "JavaScript Foundations",
    status: "completed",
    statusLabel: "100% Completed",
    progressPercent: 100,
    items: [
      { id: "p1-1", title: "Variables & Data Types", completed: true },
      { id: "p1-2", title: "Modern Functions & Scope", completed: true },
      { id: "p1-3", title: "ES6 Modules & Async JS", completed: true },
      { id: "p1-4", title: "DOM Manipulation & Events", completed: true },
    ],
    milestoneBonus: {
      title: "Vanilla JS Core",
      xp: 300,
      awarded: true,
    },
  },
  {
    id: "phase-2",
    phaseNumber: "Phase 02 • Currently Active",
    title: "Frontend Mastery",
    status: "active",
    statusLabel: "55% In Progress",
    progressPercent: 55,
    items: [
      { id: "p2-1", title: "React Architecture & JSX Syntax", completed: true, xp: 50 },
      {
        id: "p2-2",
        title: "React Hooks & State Management",
        completed: false,
        active: true,
        duration: "45 mins",
        xp: 75,
      },
      { id: "p2-3", title: "External APIs & TanStack Query", completed: false, xp: 60 },
      { id: "p2-4", title: "Tailwind CSS & Design Systems", completed: false, locked: true },
    ],
  },
  {
    id: "phase-3",
    phaseNumber: "Phase 03 • Upcoming",
    title: "Backend & Database Architecture",
    status: "upcoming",
    statusLabel: "Estimated: Week 7",
    progressPercent: 0,
    items: [
      { id: "p3-1", title: "Node & Express REST", completed: false },
      { id: "p3-2", title: "Postgres & Prisma", completed: false },
      { id: "p3-3", title: "JWT & Security", completed: false },
    ],
  },
  {
    id: "phase-4",
    phaseNumber: "Phase 04 • Capstone",
    title: "Full-Stack SaaS Production Project",
    status: "locked",
    statusLabel: "Locked Milestone",
    progressPercent: 0,
    items: [
      { id: "p4-1", title: "Full-Stack SaaS Blueprint", completed: false, locked: true },
      { id: "p4-2", title: "CI/CD Vercel & Render", completed: false, locked: true },
      { id: "p4-3", title: "Live Portfolio & Demo", completed: false, locked: true },
    ],
  },
];

export const INITIAL_DECISIONS: DecisionPoll[] = [
  {
    id: "d-spotlight",
    isSpotlight: true,
    author: {
      name: "Priya M.",
      role: "Senior Analyst • 1h ago",
      timeAgo: "1h ago",
      avatar: ASSETS.avatarPriya,
      badge: "Pro Member",
      online: true,
    },
    category: "career",
    question:
      '"Should I take a Series A startup offer with lower base + equity, or stay at a steady Big Tech company?"',
    description:
      "I have 4 years of experience. The startup has 18 months runway and high growth, but Big Tech offers great work-life balance and steady $160k.",
    totalVotes: 490,
    optionA: {
      text: "Join the Series A Startup",
      subtext: "High ownership, massive learning curve, equity upside",
      votes: 284,
      percent: 58,
    },
    optionB: {
      text: "Stay at Big Tech",
      subtext: "Guaranteed stability, 40hr work week, $160k base",
      votes: 206,
      percent: 42,
    },
    aiInsight:
      "If your risk tolerance allows for potential short-term volatility, Series A accelerates ownership and learning density by approximately ~2.5x. However, ensure liquidation preference clauses (1x non-participating preferred) and equity vesting schedules are thoroughly vetted prior to resignation.",
    commentsCount: 48,
  },
  {
    id: "d-react-next",
    author: {
      name: "Alex Zhang",
      role: "Tech Lead",
      timeAgo: "3 hrs ago",
      avatar: ASSETS.avatarAlexZhang,
    },
    category: "tech",
    question: "Should I focus on mastering React or jump straight into Next.js 14?",
    description:
      "Debating whether deep-diving pure React component patterns is worth the upfront time before jumping directly to Server Actions and SSR.",
    totalVotes: 92,
    optionA: {
      text: "Option A: React Core",
      subtext: "Master pure lifecycles & client components",
      votes: 59,
      percent: 64,
    },
    optionB: {
      text: "Option B: Next.js App Router",
      subtext: "Build full-stack SSR apps immediately",
      votes: 33,
      percent: 36,
    },
    aiInsight:
      "Solid fundamentals in React state and re-rendering prevent deep architectural confusion in Next.js Server Components.",
    commentsCount: 32,
  },
  {
    id: "d-relocate",
    author: {
      name: "Kavita S.",
      role: "Product Designer",
      timeAgo: "5 hrs ago",
      avatar: ASSETS.avatarKavita,
    },
    category: "lifestyle",
    question:
      "Relocating to Bangalore for an in-office tech community vs staying remote in tier-2 city with lower expenses?",
    description:
      "Evaluating serendipitous tech community network against saving 40% of salary by staying remote in a calm Tier-2 environment.",
    totalVotes: 175,
    optionA: {
      text: "Option A: Move to Bangalore",
      subtext: "Accelerated in-person serendipity & events",
      votes: 86,
      percent: 49,
    },
    optionB: {
      text: "Option B: Stay Remote",
      subtext: "Higher savings rate, lower daily fatigue",
      votes: 89,
      percent: 51,
    },
    aiInsight:
      "High-density serendipity yields non-linear career jumps early in a journey, but net savings drop ~40%.",
    commentsCount: 64,
  },
  {
    id: "d-open-source",
    author: {
      name: "Marcus Vance",
      role: "Indie Hacker",
      timeAgo: "8 hrs ago",
      avatar: ASSETS.avatarMarcus,
    },
    category: "tech",
    question:
      "Should I launch my side project as open-source with paid hosted tier, or purely private SaaS?",
    description:
      "Considering distribution velocity via GitHub stars versus protectability and charging upfront for closed-source tooling.",
    totalVotes: 63,
    optionA: {
      text: "Option A: Open Core",
      subtext: "Bottom-up community adoption, paid hosting",
      votes: 45,
      percent: 72,
    },
    optionB: {
      text: "Option B: Closed SaaS",
      subtext: "100% proprietary code, classic B2B model",
      votes: 18,
      percent: 28,
    },
    aiInsight:
      "Open source drives bottom-up developer trust and zero CAC distribution, but demands disciplined API boundary design.",
    commentsCount: 19,
  },
];

export const INITIAL_SQUAD_ACTIVITY: SquadActivity[] = [
  {
    id: "s1",
    authorName: "Maya S.",
    authorAvatar: ASSETS.avatarMaya,
    xpReward: 100,
    action: 'Crushed "10km Morning Run"',
    timeAgo: "14m ago",
    cheersCount: 14,
    userCheered: false,
  },
  {
    id: "s2",
    authorName: "Devon K.",
    authorAvatar: ASSETS.avatarDevon,
    xpReward: 80,
    action: 'Mastered "System Design Primer"',
    timeAgo: "1h ago",
    cheersCount: 8,
    userCheered: false,
  },
  {
    id: "s3",
    authorName: "Sarah L.",
    authorAvatar: ASSETS.avatarSarah,
    xpReward: 150,
    action: 'Promoted to Level 9 "Architect"',
    timeAgo: "2h ago",
    cheersCount: 32,
    userCheered: true,
    specialBadge: "Promotion 🏆",
  },
];

export const TOP_CONTRIBUTORS = [
  {
    rank: 1,
    name: "Devon Ray",
    role: "VP Engineering",
    avatar: ASSETS.avatarDevonRay,
    upvotes: 412,
  },
  {
    rank: 2,
    name: "Elena Rostova",
    role: "Angel Investor",
    avatar: ASSETS.avatarElena,
    upvotes: 389,
  },
  {
    rank: 3,
    name: "Tariq J.",
    role: "System Architect",
    avatar: ASSETS.avatarTariq,
    upvotes: 340,
  },
];
