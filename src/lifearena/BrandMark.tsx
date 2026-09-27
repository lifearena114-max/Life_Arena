import { Hexagon } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="LifeArena">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_22px_var(--glow-primary)]">
        <Hexagon className="size-5" fill="currentColor" />
      </span>
      <span className="font-display text-lg font-bold uppercase text-foreground">LifeArena</span>
      {!compact && <span className="hidden text-[10px] font-bold uppercase text-primary sm:inline">Ecosystem v2.4</span>}
    </div>
  );
}