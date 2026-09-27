import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Flag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commitments, durations, focusAreas, motivations } from "./flow-data";

export type JourneyInput = {
  goal: string;
  domain: string;
  duration: string;
  commitment: string;
  motivation: string;
};

export function OnboardingPage({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: (data: JourneyInput) => void;
}) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(["coding", "fitness"]);
  const [goal, setGoal] = useState("Become a full-stack developer");
  const [duration, setDuration] = useState("3 months");
  const [commitment, setCommitment] = useState("45 mins / day");
  const [motivation, setMotivation] = useState("Mastery & Competence");
  const labels = ["Focus Area", "Your Goal", "Daily Time", "Motivation"];

  const back = () => (step === 1 ? onBack() : setStep((value) => value - 1));
  const next = () =>
    step < 4
      ? setStep((value) => value + 1)
      : onComplete({ goal, domain: selected[0] ?? "coding", duration, commitment, motivation });
  const toggleArea = (id: string) =>
    setSelected((areas) =>
      areas.includes(id)
        ? areas.filter((area) => area !== id)
        : areas.length < 3
          ? [...areas, id]
          : areas,
    );

  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={back}>
              <ArrowLeft /> Back
            </Button>
            <div className="rounded-full bg-card px-4 py-2 font-display text-sm font-bold text-primary">
              0{step} <span className="text-muted-foreground">/ 04</span>
            </div>
            <Button
              variant="ghost"
              onClick={() =>
                onComplete({
                  goal,
                  domain: selected[0] ?? "coding",
                  duration,
                  commitment,
                  motivation,
                })
              }
            >
              Save & Exit
            </Button>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-card">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${step * 25}%` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {labels.map((label, index) => (
              <button
                type="button"
                onClick={() => setStep(index + 1)}
                key={label}
                className={`rounded-md p-2 text-left text-xs transition ${step === index + 1 ? "bg-muted text-primary" : "text-muted-foreground hover:bg-card"}`}
              >
                <b className="block text-[10px] uppercase">Step {index + 1}</b>
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>
        </header>

        <section className="animate-fade-in" key={step}>
          {step === 1 && (
            <>
              <p className="text-xs font-bold uppercase text-primary">
                Start with one or two areas
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                What do you want to improve?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose up to three areas where you want to make progress first.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {focusAreas.map((area) => {
                  const active = selected.includes(area.id);
                  return (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => toggleArea(area.id)}
                      className={`relative min-h-40 rounded-lg border p-5 text-left transition ${active ? "border-primary bg-muted shadow-[0_0_22px_var(--glow-primary)]" : "border-transparent bg-card hover:border-border hover:bg-muted"}`}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={`flex size-10 items-center justify-center rounded-md bg-background ${active ? "text-primary" : "text-foreground"}`}
                        >
                          <area.icon className="size-5" />
                        </span>
                        <span
                          className={`flex size-5 items-center justify-center rounded ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          {active && <Check className="size-3" />}
                        </span>
                      </div>
                      <h2 className="mt-6 font-display font-semibold">{area.label}</h2>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {area.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-xs font-bold uppercase text-primary">Define the target</p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                What are you working toward?
              </h1>
              <div className="mt-8 rounded-lg bg-card p-5 sm:p-7">
                <label className="text-sm font-semibold">
                  Your Goal
                  <input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="mt-3 h-14 w-full rounded-md border border-border bg-background px-4 text-lg outline-none focus:border-primary"
                  />
                </label>
                <p className="mt-6 text-sm font-semibold">When would you like to achieve this?</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {durations.map((item) => (
                    <Button
                      type="button"
                      key={item}
                      variant={duration === item ? "default" : "secondary"}
                      onClick={() => setDuration(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-xs font-bold uppercase text-primary">Commitment cadence</p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                How much time can you give?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Consistency over intensity. Choose a pace you can protect.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {commitments.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => setCommitment(item.value)}
                    className={`min-h-52 rounded-lg border p-6 text-left transition ${commitment === item.value ? "border-primary bg-muted shadow-[0_0_22px_var(--glow-primary)]" : "border-transparent bg-card hover:border-border"}`}
                  >
                    <Clock3
                      className={
                        commitment === item.value ? "text-primary" : "text-muted-foreground"
                      }
                    />
                    <h2 className="mt-8 font-display text-xl font-semibold">{item.value}</h2>
                    <p className="mt-1 text-xs font-bold uppercase text-primary">{item.title}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <p className="text-xs font-bold uppercase text-primary">Intrinsic fuel</p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                What keeps you moving?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose the motivation that best matches your drive.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {motivations.map((item, index) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => setMotivation(item.value)}
                    className={`min-h-40 rounded-lg border p-6 text-left transition ${motivation === item.value ? "border-primary bg-muted shadow-[0_0_22px_var(--glow-primary)]" : "border-transparent bg-card hover:border-border"}`}
                  >
                    {index % 2 ? (
                      <ShieldCheck className="text-primary" />
                    ) : (
                      <Flag className="text-primary" />
                    )}
                    <h2 className="mt-5 font-display text-xl font-semibold">{item.value}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
        <div className="sticky bottom-4 mt-8 flex items-center justify-between gap-4 rounded-lg border border-border bg-background/90 p-4 shadow-2xl backdrop-blur-xl">
          <div>
            <b className="text-sm">
              {step === 1 ? `${selected.length} areas selected` : labels[step - 1]}
            </b>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {step === 1
                ? focusAreas
                    .filter((area) => selected.includes(area.id))
                    .map((area) => area.label)
                    .join(", ")
                : goal}
            </p>
          </div>
          <Button
            onClick={next}
            disabled={(step === 1 && !selected.length) || (step === 2 && !goal.trim())}
            className="h-12 px-6 font-bold"
          >
            {step === 4 ? "Build My Journey" : `Continue to Step ${step + 1}`} <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
