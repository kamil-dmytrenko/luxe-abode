import { useState } from "react";
import { Snowflake, Wind, Droplets, Sun, Minus, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import { acs as initial } from "@/lib/mock-data";

const modeMeta = [
  { id: "cool", label: "Chłód", icon: Snowflake },
  { id: "heat", label: "Ciepło", icon: Sun },
  { id: "dry", label: "Osusz", icon: Droplets },
  { id: "fan", label: "Went.", icon: Wind },
] as const;

export default function Climate() {
  const [items, setItems] = useState(initial);
  const toggle = (id: string) => setItems((s) => s.map((a) => a.id === id ? { ...a, on: !a.on } : a));
  const setTarget = (id: string, t: number) => setItems((s) => s.map((a) => a.id === id ? { ...a, target: Math.max(16, Math.min(30, t)) } : a));
  const setMode = (id: string, m: typeof initial[number]["mode"]) => setItems((s) => s.map((a) => a.id === id ? { ...a, mode: m } : a));
  const setFan = (id: string, f: typeof initial[number]["fan"]) => setItems((s) => s.map((a) => a.id === id ? { ...a, fan: f } : a));

  return (
    <div>
      <PageHeader eyebrow="Klimat" title="Klimatyzacja" subtitle="Sterowanie jednostkami split — tryby, nadmuch, temperatura." />
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {items.map((a) => (
          <div key={a.id} className={`premium-card transition ${a.on ? "" : "opacity-75"}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{a.room}</div>
                <div className="font-display text-xl font-semibold">Split unit</div>
              </div>
              <Switch checked={a.on} onCheckedChange={() => toggle(a.id)} />
            </div>

            <div className="relative my-5 grid place-items-center rounded-3xl bg-gradient-cool/20 py-6">
              <div className={`absolute inset-0 rounded-3xl ${a.on ? "bg-gradient-cool/30" : "bg-muted/20"} blur-xl`} />
              <div className="relative text-center">
                <div className="stat-num text-6xl font-semibold leading-none">{a.target}°</div>
                <div className="mt-2 text-xs text-muted-foreground">Tryb: {modeMeta.find((m) => m.id === a.mode)?.label} · Wentylator: {a.fan}</div>
              </div>
              {a.on && (
                <div className="absolute bottom-2 right-3 flex gap-1">
                  {[0,1,2].map((i) => <span key={i} className="h-1 w-3 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setTarget(a.id, a.target - 1)} className="grid h-10 w-10 place-items-center rounded-full glass"><Minus className="h-4 w-4" /></button>
              <button onClick={() => setTarget(a.id, a.target + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-cool text-white shadow-glow"><Plus className="h-4 w-4" /></button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {modeMeta.map((m) => (
                <button key={m.id} onClick={() => setMode(a.id, m.id)} className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-[10px] transition ${a.mode === m.id ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted-foreground"}`}>
                  <m.icon className="h-3.5 w-3.5" /> {m.label}
                </button>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {(["auto","low","mid","high"] as const).map((f) => (
                <button key={f} onClick={() => setFan(a.id, f)} className={`rounded-xl border py-1.5 text-[10px] transition ${a.fan === f ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{f}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
