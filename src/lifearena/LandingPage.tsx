import { ArrowRight, Bolt, Compass, Flame, Scale, Sparkles, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";

const features = [
  { icon: Compass, title: "Goals that hold", body: "Turn a vague ambition into a structured arena with levels, XP, and visible momentum." },
  { icon: Bolt, title: "AI journeys & quests", body: "Your roadmap is generated for your pace and commitment, then broken into daily quests." },
  { icon: Scale, title: "Decision Arena", body: "Stuck on a choice? Put it to your cohort and get an AI perspective alongside real votes." },
  { icon: Users, title: "Squads", body: "Grow beside people chasing the same thing. Streaks are easier when someone is watching." },
];

const steps = [
  { n: "01", title: "Create your profile", body: "Name, handle, and you're in the arena." },
  { n: "02", title: "Answer 4 questions", body: "Focus, goal, pace, and what actually motivates you." },
  { n: "03", title: "Get your journey", body: "A personalized roadmap and your first quest, ready to start." },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <BrandMark compact />
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" className="font-semibold">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="font-bold shadow-[0_0_24px_var(--glow-primary)]">
              <Link to="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Sparkles className="size-3.5" /> Early access
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
            Your life, run like an arena.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            LifeArena turns the goal you keep postponing into an AI-built journey with daily quests,
            streaks, and a squad that keeps you honest.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-7 font-bold shadow-[0_0_28px_var(--glow-primary)]">
              <Link to="/signup">Start your journey <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 bg-card px-7 font-semibold">
              <Link to="/login">I already have an account</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Flame className="size-4 text-primary" /> 12-day average streak</span>
            <span className="inline-flex items-center gap-2"><Users className="size-4 text-primary" /> 8,400 builders in squads</span>
            <span className="inline-flex items-center gap-2"><Bolt className="size-4 text-primary" /> 60k quests completed</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-border bg-card p-7">
              <span className="flex size-11 items-center justify-center rounded-md bg-muted text-primary">
                <feature.icon className="size-5" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8">
          <h2 className="text-center font-display text-3xl font-bold">From idea to first quest in minutes</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n}>
                <p className="font-display text-3xl font-bold text-primary">{step.n}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 text-center sm:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Stop planning. Start levelling.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your first journey takes four questions and about ninety seconds.
        </p>
        <Button asChild size="lg" className="mt-8 h-12 px-8 font-bold shadow-[0_0_28px_var(--glow-primary)]">
          <Link to="/signup">Create your account <ArrowRight /></Link>
        </Button>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <BrandMark compact />
          <p>© {new Date().getFullYear()} LifeArena. Build the life you keep talking about.</p>
        </div>
      </footer>
    </main>
  );
}
