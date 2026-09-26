import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignupPage } from "@/lifearena/SignupPage";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join LifeArena — Build Your Growth Journey" },
      { name: "description", content: "Create your LifeArena profile and turn your goals into a practical growth journey." },
      { property: "og:title", content: "Join LifeArena — Build Your Growth Journey" },
      { property: "og:description", content: "Create your LifeArena profile and turn your goals into a practical growth journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupRoute,
});

function SignupRoute() {
  const navigate = useNavigate();
  return <SignupPage onContinue={(search) => navigate({ to: "/onboarding", search })} />;
}
