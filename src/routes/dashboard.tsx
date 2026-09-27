import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import DashboardApp from "@/lifearena/DashboardApp";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>) => ({
    goal: typeof search["goal"] === "string" ? search["goal"] : "Full-Stack Dev",
  }),
  head: () => ({
    meta: [
      { title: "Dashboard — LifeArena" },
      {
        name: "description",
        content: "Track quests, progress, decisions, and your LifeArena growth journey.",
      },
      { property: "og:title", content: "Dashboard — LifeArena" },
      {
        property: "og:description",
        content: "Track quests, progress, decisions, and your LifeArena growth journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardRoute,
});

function DashboardRoute() {
  const navigate = useNavigate();
  const { goal } = Route.useSearch();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login", replace: true });
    }
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardApp
      initialGoal={goal}
      onNewGoal={() =>
        navigate({ to: "/onboarding", search: { name: "Alex Mercer", handle: "alexmercer" } })
      }
    />
  );
}
