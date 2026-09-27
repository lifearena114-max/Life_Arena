import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingPage } from "@/lifearena/OnboardingPage";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>) => ({ name: typeof search["name"] === "string" ? search["name"] : "Alex Mercer", handle: typeof search["handle"] === "string" ? search["handle"] : "alexmercer" }),
  head: () => ({ meta: [{ title: "Build Your Journey — LifeArena" }, { name: "description", content: "Choose your focus, goal, pace, and motivation in LifeArena." }, { property: "og:title", content: "Build Your Journey — LifeArena" }, { property: "og:description", content: "Choose your focus, goal, pace, and motivation in LifeArena." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: OnboardingRoute,
});
function OnboardingRoute() { const navigate = useNavigate(); const search = Route.useSearch(); return <OnboardingPage onBack={() => navigate({ to: "/signup" })} onComplete={(data) => navigate({ to: "/generating", search: { ...search, ...data } })} />; }