import { useState } from "react";
import { Bell, Home, Moon, ShieldCheck, ShieldOff, Plane, Lock } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const sensors = [
  { id: "z1", name: "Drzwi wejściowe", zone: "Parter", state: "Zamknięte", ok: true },
  { id: "z2", name: "Okno salon", zone: "Parter", state: "Zamknięte", ok: true },
  { id: "z3", name: "Okno sypialnia", zone: "Piętro", state: "Uchylone", ok: false },
  { id: "z4", name: "Garaż", zone: "Garaż", state: "Zamknięte", ok: true },
  { id: "z5", name: "Ruch — salon", zone: "Parter", state: "Bez ruchu", ok: true },
  { id: "z6", name: "Ruch — hol", zone: "Parter", state: "Bez ruchu", ok: true },
  { id: "z7", name: "Dym — kuchnia", zone: "Parter", state: "OK", ok: true },
  { id: "z8", name: "Zalanie — łazienka", zone: "Piętro", state: "OK", ok: true },
];

const modes = [
  { id: "disarmed", label: "Rozbrojony", icon: ShieldOff, color: "from-zinc-500 to-zinc-700" },
  { id: "home", label: "Dom", icon: Home, color: "from-emerald-500 to-teal-600" },
  { id: "night", label: "Noc", icon: Moon, color: "from-indigo-500 to-violet-600" },
  { id: "away", label: "Wyjście", icon: Plane, color: "from-amber-500 to-rose-600" },
] as const;

export default function Alarm() {
  const [mode, setMode] = useState<typeof modes[number]["id"]>("home");
  const current = modes.find((m) => m.id === mode)!;
  return (
    <div>
      <PageHeader eyebrow="Bezpieczeństwo" title="Alarm" subtitle="System uzbrojenia i czujniki w pełnej kontroli." />

      <div className="grid grid-cols-1 gap-4 px-5 pb-6 lg:grid-cols-3 lg:px-10">
        <div className="premium-card relative overflow-hidden lg:col-span-2">
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${current.color} opacity-30 blur-3xl transition-all duration-700`} />
          <div className="relative flex items-center gap-5">
            <div className={`grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br ${current.color} shadow-glow`}>
              <current.icon className="h-12 w-12 text-white" strokeWidth={1.6} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Tryb</div>
              <div className="font-display text-3xl font-semibold">{current.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">Uzbrojony od 14:42 · 7/8 czujników OK</div>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-4 gap-2">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} className={`flex flex-col items-center gap-2 rounded-2xl border py-3 transition ${mode === m.id ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                <m.icon className="h-5 w-5" />
                <span className="text-xs">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="relative mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Czujniki online</div>
              <div className="stat-num text-2xl font-semibold">12/12</div>
            </div>
            <div className="rounded-2xl border border-border bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Otwarte</div>
              <div className="stat-num text-2xl font-semibold text-warning">1</div>
            </div>
            <div className="rounded-2xl border border-border bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Zdarzeń dziś</div>
              <div className="stat-num text-2xl font-semibold">3</div>
            </div>
          </div>
        </div>

        <div className="premium-card">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Bell className="h-3.5 w-3.5" /> Ostatnie zdarzenia</div>
          <div className="mt-3 space-y-3">
            {[
              { t: "14:42", m: "Tryb zmieniony: Dom" },
              { t: "12:18", m: "Ruch — hol" },
              { t: "09:05", m: "Drzwi wejściowe otwarte" },
              { t: "Wczoraj", m: "Tryb: Wyjście aktywny" },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">{e.m}</div>
                <div className="text-xs text-muted-foreground">{e.t}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 py-3 text-sm text-destructive-foreground">
            <Lock className="h-4 w-4" /> Wezwij ochronę
          </button>
        </div>
      </div>

      <div className="px-5 pb-10 lg:px-10">
        <h3 className="mb-3 font-display text-sm font-medium uppercase tracking-widest text-muted-foreground">Czujniki</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {sensors.map((s) => (
            <div key={s.id} className="premium-card !p-4 flex items-center gap-3">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.ok ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">{s.zone}</div>
              </div>
              <div className={`text-xs ${s.ok ? "text-success" : "text-warning"}`}>{s.state}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
