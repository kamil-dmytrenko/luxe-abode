import { ShieldCheck } from "lucide-react";

export default function AlarmWidget() {
  return (
    <div className="premium-card relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-success/15 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-success/15">
          <ShieldCheck className="h-7 w-7 text-success" />
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success ring-2 ring-background animate-pulse-glow" />
        </div>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.2em] text-success/80">Stan</div>
          <div className="font-display text-lg font-semibold">Uzbrojony · Dom</div>
          <div className="text-[11px] text-muted-foreground">Wszystkie czujniki online · 12/12</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Dom", "Noc", "Wyjście"].map((m, i) => (
          <button key={m} className={`rounded-xl border px-3 py-2 text-xs transition ${i === 0 ? "border-success/40 bg-success/10 text-success" : "border-border text-muted-foreground hover:text-foreground"}`}>{m}</button>
        ))}
      </div>
    </div>
  );
}
