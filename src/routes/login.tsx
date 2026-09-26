import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginPage } from "@/lifearena/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — LifeArena" },
      { name: "description", content: "Log in to LifeArena and pick up your growth journey where you left it." },
      { property: "og:title", content: "Log In — LifeArena" },
      { property: "og:description", content: "Log in to LifeArena and pick up your growth journey where you left it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  const navigate = useNavigate();
  return <LoginPage onContinue={(search) => navigate({ to: "/onboarding", search })} />;
}
