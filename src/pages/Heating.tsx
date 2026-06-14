import { useState } from "react";
import { Flame, Leaf, Power, Settings2, Minus, Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { heating as initial } from "@/lib/mock-data";

const modes = [
  { id: "auto", label: "Auto", icon: Settings2 },
  { id: "manual", label: "Manualny", icon: Flame },
  { id: "eco", label: "Eco", icon: Leaf },
  { id: "off", label: "Wył.", icon: Power },
] as const;

export default function Heating() {
  const [items, setItems] = useState(initial);
  const setTarget = (id: string, t: number) => setItems((s) => s.map((h) => h.id === id ? { ...h, target: Math.max(10, Math.min(30, t)) } : h));
  const setMode = (id: string, m: typeof initial[number]["mode"]) => setItems((s) => s.map((h) => h.id === id ? { ...h, mode: m } : h));
  return (
    <div>
      <PageHeader eyebrow="Klimat" title="Ogrzewanie" subtitle="Strefowe sterowanie temperaturą — komfort i oszczędność." />
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {items.map((h) => {
          const diff = h.target - h.current;
          return (
            <div key={h.id} className="premium-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{h.room}</div>
                  <div className="font-display text-xl font-semibold mt-1">{h.name}</div>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm shadow-glow">
                  <Flame className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Big dial */}
              <div className="relative mx-auto my-5 grid h-48 w-48 place-items-center">
                <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
                  <circle cx="100" cy="100" r="86" stroke="hsl(var(--border))" strokeWidth="10" fill="none" />
                  <circle
                    cx="100" cy="100" r="86" stroke="url(#warm)" strokeWidth="10" fill="none"
                    strokeLinecap="round" strokeDasharray={`${(h.target / 30) * 540} 540`}
                  />
                  <defs>
                    <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="hsl(38 95% 65%)" />
                      <stop offset="100%" stopColor="hsl(0 75% 55%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Cel</div>
                  <div className="stat-num text-5xl font-semibold leading-none">{h.target}°</div>
                  <div className="mt-1 text-xs text-muted-foreground">teraz {h.current}° {diff !== 0 && (<span className={diff > 0 ? "text-amber-400" : "text-sky-400"}>· {diff > 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}°</span>)}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setTarget(h.id, h.target - 0.5)} className="grid h-10 w-10 place-items-center rounded-full glass"><Minus className="h-4 w-4" /></button>
                <button onClick={() => setTarget(h.id, h.target + 0.5)} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow"><Plus className="h-4 w-4" /></button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-1.5">
                {modes.map((m) => (
                  <button key={m.id} onClick={() => setMode(h.id, m.id)} className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-[10px] transition ${h.mode === m.id ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                    <m.icon className="h-3.5 w-3.5" /> {m.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
