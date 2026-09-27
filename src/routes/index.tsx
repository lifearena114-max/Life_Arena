import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/lifearena/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeArena — Turn Your Goals Into a Journey" },
      { name: "description", content: "LifeArena turns your biggest goal into an AI-built journey with daily quests, streaks, and a squad." },
      { property: "og:title", content: "LifeArena — Turn Your Goals Into a Journey" },
      { property: "og:description", content: "LifeArena turns your biggest goal into an AI-built journey with daily quests, streaks, and a squad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
