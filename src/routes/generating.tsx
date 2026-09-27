import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GeneratingPage } from "@/lifearena/GeneratingPage";

const defaults = {
  name: "Alex Mercer",
  handle: "alexmercer",
  goal: "Become a full-stack developer",
  domain: "coding",
  duration: "3 months",
  commitment: "45 mins / day",
  motivation: "Mastery & Competence",
};
export const Route = createFileRoute("/generating")({
  validateSearch: (search: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [
        key,
        typeof search[key] === "string" ? search[key] : value,
      ]),
    ) as typeof defaults,
  head: () => ({
    meta: [
      { title: "Building Your Journey — LifeArena" },
      { name: "description", content: "LifeArena is creating your personalized growth journey." },
      { property: "og:title", content: "Building Your Journey — LifeArena" },
      {
        property: "og:description",
        content: "LifeArena is creating your personalized growth journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GeneratingRoute,
});
function GeneratingRoute() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  return <GeneratingPage onReady={() => navigate({ to: "/journey-ready", search })} />;
}
