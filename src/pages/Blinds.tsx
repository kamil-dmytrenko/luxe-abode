import { useState } from "react";
import { Blinds as BlindsIcon, ArrowUp, ArrowDown, Square } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import PageHeader from "@/components/PageHeader";
import { blinds as initial } from "@/lib/mock-data";

export default function Blinds() {
  const [items, setItems] = useState(initial);
  const set = (id: string, v: number) => setItems((s) => s.map((b) => b.id === id ? { ...b, position: v } : b));
  return (
    <div>
      <PageHeader
        eyebrow="Rolety"
        title="Sterowanie roletami"
        subtitle="Otwórz, zamknij lub ustaw dokładną pozycję."
        action={
          <div className="flex gap-2">
            <button onClick={() => setItems((s) => s.map((b) => ({ ...b, position: 100 })))} className="rounded-2xl glass px-3 py-2 text-xs flex items-center gap-1.5"><ArrowUp className="h-3.5 w-3.5" /> Wszystkie góra</button>
            <button onClick={() => setItems((s) => s.map((b) => ({ ...b, position: 0 })))} className="rounded-2xl glass px-3 py-2 text-xs flex items-center gap-1.5"><ArrowDown className="h-3.5 w-3.5" /> Wszystkie dół</button>
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {items.map((b) => (
          <div key={b.id} className="premium-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-cool shadow-glow">
                  <BlindsIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.room}</div>
                </div>
              </div>
              <div className="stat-num text-2xl font-semibold">{b.position}%</div>
            </div>

            {/* Visual blind */}
            <div className="mt-4 h-24 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-sky-500/20 to-amber-500/10 relative">
              <div
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-zinc-700 to-zinc-900 transition-all duration-500"
                style={{ height: `${100 - b.position}%` }}
              >
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0 2px, transparent 2px 8px)" }} />
              </div>
            </div>

            <div className="mt-4">
              <Slider value={[b.position]} onValueChange={(v) => set(b.id, v[0])} max={100} step={1} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button onClick={() => set(b.id, 100)} className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1"><ArrowUp className="h-3.5 w-3.5" /> Góra</button>
              <button onClick={() => set(b.id, 50)} className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1"><Square className="h-3.5 w-3.5" /> Stop</button>
              <button onClick={() => set(b.id, 0)} className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1"><ArrowDown className="h-3.5 w-3.5" /> Dół</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
