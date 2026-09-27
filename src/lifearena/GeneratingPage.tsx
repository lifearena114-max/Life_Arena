import { useEffect, useState } from "react";
import { Check, Hexagon, LoaderCircle } from "lucide-react";
import { BrandMark } from "./BrandMark";

const tasks = ["Analyzing your goal", "Mapping skill dependencies", "Designing weekly phases", "Tailoring your daily cadence", "Finalizing first quest"];

export function GeneratingPage({ onReady }: { onReady: () => void }) {
  const [progress, setProgress] = useState(8);
  useEffect(() => {
    const interval = window.setInterval(() => setProgress((value) => Math.min(100, value + 4)), 90);
    const timeout = window.setTimeout(onReady, 2800);
    return () => { window.clearInterval(interval); window.clearTimeout(timeout); };
  }, [onReady]);
  const complete = Math.floor(progress / 20);
  return <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground"><div className="w-full max-w-xl text-center"><div className="mb-6 flex justify-center"><BrandMark compact /></div><section className="rounded-lg border border-border bg-card p-6 shadow-2xl sm:p-10"><h1 className="font-display text-3xl font-bold">Building your journey...</h1><p className="mt-2 text-sm text-muted-foreground">We’re turning your goal into a practical path forward.</p><div className="relative mx-auto my-8 flex size-36 items-center justify-center rounded-full border-4 border-primary shadow-[0_0_40px_var(--glow-primary)]"><div className="absolute inset-4 rounded-full border border-border" /><Hexagon className="size-12 text-primary" fill="currentColor" /><LoaderCircle className="absolute size-full animate-spin text-primary/30" /><span className="absolute -bottom-9 font-display text-2xl font-bold text-primary">{progress}%</span></div><div className="mt-14 h-2 overflow-hidden rounded-full bg-background"><div className="h-full bg-gradient-to-r from-primary to-success transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-5 space-y-2 text-left">{tasks.map((task, index) => <div key={task} className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm ${index < complete ? "bg-muted text-foreground" : "bg-background/40 text-muted-foreground"}`}>{index < complete ? <Check className="size-4 text-success" /> : <span className="size-4 rounded-full border border-border" />}{task}<span className="ml-auto text-[10px] font-bold uppercase">{index < complete ? "Complete" : index === complete ? "In progress" : "Queued"}</span></div>)}</div></section><p className="mt-6 text-xs font-bold uppercase text-muted-foreground">AI Journey Builder • Creating your plan</p></div></main>;
}