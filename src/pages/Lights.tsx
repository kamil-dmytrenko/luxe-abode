import { useState } from "react";
import { Lightbulb, Power } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import { lights as initial } from "@/lib/mock-data";

const palette = ["#FFFFFF", "#FFE7B0", "#FFB36B", "#FF9A6B", "#FF6B9A", "#9A6BFF", "#6B9AFF", "#7AB8FF"];

export default function Lights() {
  const [items, setItems] = useState(initial);
  const allOn = items.some((l) => l.on);

  const toggle = (id: string) => setItems((s) => s.map((l) => l.id === id ? { ...l, on: !l.on, brightness: !l.on && l.brightness === 0 ? 60 : l.brightness } : l));
  const setBrightness = (id: string, b: number) => setItems((s) => s.map((l) => l.id === id ? { ...l, brightness: b, on: b > 0 } : l));
  const setColor = (id: string, c: string) => setItems((s) => s.map((l) => l.id === id ? { ...l, color: c } : l));

  const groups = Array.from(new Set(items.map((l) => l.room)));

  return (
    <div>
      <PageHeader
        eyebrow="Oświetlenie"
        title="Światła"
        subtitle={`${items.filter((l) => l.on).length} z ${items.length} włączonych`}
        action={
          <button
            onClick={() => setItems((s) => s.map((l) => ({ ...l, on: !allOn, brightness: !allOn ? 70 : 0 })))}
            className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-4 py-2 text-sm text-primary-foreground shadow-glow"
          >
            <Power className="h-4 w-4" /> {allOn ? "Wyłącz wszystkie" : "Włącz wszystkie"}
          </button>
        }
      />
      <div className="space-y-6 px-5 pb-6 lg:px-10">
        {groups.map((room) => (
          <section key={room} className="animate-fade-in">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-sm font-medium uppercase tracking-widest text-muted-foreground">{room}</h3>
              <span className="text-xs text-muted-foreground">{items.filter((l) => l.room === room && l.on).length} / {items.filter((l) => l.room === room).length}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {items.filter((l) => l.room === room).map((l) => (
                <div key={l.id} className={`premium-card transition ${l.on ? "" : "opacity-70"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="relative grid h-12 w-12 place-items-center rounded-2xl transition-all"
                        style={{
                          background: l.on ? `radial-gradient(circle at 30% 30%, ${l.color}cc, ${l.color}22 70%)` : "hsl(var(--muted))",
                          boxShadow: l.on ? `0 0 30px -4px ${l.color}80` : undefined,
                        }}
                      >
                        <Lightbulb className="h-5 w-5" style={{ color: l.on ? "#fff" : "hsl(var(--muted-foreground))" }} />
                      </div>
                      <div>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{l.type === "led" ? "Taśma LED" : l.type === "ceiling" ? "Sufitowe" : l.type === "spot" ? "Spoty" : "Lampa"}</div>
                      </div>
                    </div>
                    <Switch checked={l.on} onCheckedChange={() => toggle(l.id)} />
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Jasność</span>
                      <span className="stat-num font-medium">{l.brightness}%</span>
                    </div>
                    <Slider value={[l.brightness]} onValueChange={(v) => setBrightness(l.id, v[0])} max={100} step={1} />
                  </div>

                  <div className="mt-4 flex gap-1.5">
                    {palette.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(l.id, c)}
                        aria-label={c}
                        className={`h-6 w-6 rounded-full ring-2 transition ${l.color === c ? "ring-primary scale-110" : "ring-transparent"}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
