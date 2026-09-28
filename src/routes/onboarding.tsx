import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingPage, type JourneyInput } from "@/lifearena/OnboardingPage";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search["name"] === "string" ? search["name"] : "Alex Mercer",
    handle: typeof search["handle"] === "string" ? search["handle"] : "alexmercer",
  }),
  head: () => ({
    meta: [
      { title: "Build Your Journey — LifeArena" },
      {
        name: "description",
        content: "Choose your focus, goal, pace, and motivation in LifeArena.",
      },
      { property: "og:title", content: "Build Your Journey — LifeArena" },
      {
        property: "og:description",
        content: "Choose your focus, goal, pace, and motivation in LifeArena.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingRoute,
});

function OnboardingRoute() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { user } = useAuth();

  const saveOnboarding = async (data: JourneyInput) => {
    if (!user) {
      // Session expired or was never established (e.g. email confirmation is
      // still pending) — send them to log in instead of failing silently.
      navigate({ to: "/login", replace: true });
      return;
    }

    // Identity for the profile row comes from the authenticated Supabase user
    // — never from browser search params, which aren't trustworthy. The auth
    // trigger already creates this row from the same signup metadata, but
    // upserting here keeps it correct even if that metadata changes later.
    const metadata = user.user_metadata as Record<string, unknown> | null | undefined;
    const rawName = metadata?.["full_name"];
    const rawHandle = metadata?.["handle"];
    const metadataName = typeof rawName === "string" ? rawName.trim() : "";
    const metadataHandle = typeof rawHandle === "string" ? rawHandle.trim() : "";
    const emailLocalPart = user.email?.split("@")[0]?.trim() ?? "";
    const profileName = metadataName || emailLocalPart || "Explorer";
    const profileUsername = metadataHandle || emailLocalPart || user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, name: profileName, username: profileUsername }, { onConflict: "id" });

    if (profileError) {
      throw new Error(profileError.message);
    }

    const { error: onboardingError } = await supabase.from("onboarding_responses").upsert(
      {
        user_id: user.id,
        goal: data.goal,
        domain: data.domain,
        duration: data.duration,
        weekly_time: data.commitment,
        motivation: data.motivation,
      },
      { onConflict: "user_id" },
    );

    if (onboardingError) {
      throw new Error(onboardingError.message);
    }

    navigate({ to: "/generating", search: { ...search, ...data } });
  };

  return <OnboardingPage onBack={() => navigate({ to: "/signup" })} onComplete={saveOnboarding} />;
}
