import { ArrowRight, Check, LockKeyhole, Settings2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { titleCaseGoal } from "./flow-data";
import type { JourneyInput } from "./OnboardingPage";

export function JourneyReadyPage({
  journey,
  onEnter,
  onEdit,
}: {
  journey: JourneyInput;
  onEnter: () => void;
  onEdit: () => void;
}) {
  const phases = [
    { name: "Foundations", detail: "Weeks 1–3 · Core concepts & setup" },
    { name: "Applied Mastery", detail: "Weeks 4–6 · Guided practice" },
    { name: "Real-World Build", detail: "Weeks 7–9 · Project execution" },
    { name: "Launch", detail: "Weeks 10–12 · Polish & deliver" },
  ];
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <BrandMark compact />
          <span className="text-xs text-muted-foreground">Overview</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            A
          </span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="text-center">
          <div className="mx-auto mb-7 h-3 w-48 rounded-full bg-muted">
            <div className="h-full w-full animate-[ready_1.2s_ease-out] rounded-full bg-success" />
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Your journey is ready.</h1>
        </div>
        <section className="mt-14 rounded-lg border border-border bg-card p-5 shadow-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded bg-secondary px-2 py-1 text-[10px] font-bold uppercase text-secondary-foreground">
                  {journey.domain.replace("coding", "Coding & Technology")}
                </span>
                <span className="text-xs font-bold text-muted-foreground">Ready</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                {titleCaseGoal(journey.goal)}
              </h2>
            </div>
            <Sparkles className="text-primary" />
          </div>
          <div className="mt-7 grid gap-3 rounded-md bg-background p-3 sm:grid-cols-3">
            <div className="rounded-md bg-card p-4">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Timeline</p>
              <b className="mt-1 block">{journey.duration}</b>
            </div>
            <div className="rounded-md bg-card p-4">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">
                Daily commitment
              </p>
              <b className="mt-1 block">{journey.commitment}</b>
            </div>
            <div className="rounded-md bg-card p-4">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Day 1 boost</p>
              <b className="mt-1 block text-primary">+50 XP</b>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {phases.map((phase, index) => (
              <div
                className={`rounded-md border p-4 ${index === 0 ? "border-primary/50 bg-muted" : "border-transparent bg-background/50"}`}
                key={phase.name}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
                  <span>Phase 0{index + 1}</span>
                  {index === 0 ? (
                    <Check className="size-4 text-primary" />
                  ) : (
                    <LockKeyhole className="size-4" />
                  )}
                </div>
                <h3 className="mt-4 font-display font-semibold">{phase.name}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{phase.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 border-l-4 border-primary bg-muted p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-primary">
                  Today’s first quest • ~30 mins
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  Take the first concrete step toward your goal
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Open your workspace, define success, and complete one focused practice block.
                </p>
              </div>
              <span className="rounded-md bg-background px-4 py-2 text-sm font-bold text-primary">
                +50 XP
              </span>
            </div>
          </div>
        </section>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={onEnter} className="h-12 px-8 font-bold">
            Enter My Journey <ArrowRight />
          </Button>
          <Button onClick={onEdit} variant="secondary" className="h-12 px-6">
            <Settings2 /> Edit Goal & Parameters
          </Button>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Your journey adapts dynamically based on your pace and completed quests.
        </p>
      </div>
    </main>
  );
}
