import { useState } from "react";
import { Play, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { scenes as initial } from "@/lib/mock-data";

export default function Scenes() {
  const [active, setActive] = useState<string | null>("s1");
  const run = (id: string, name: string) => {
    setActive(id);
    toast.success(`Scena "${name}" aktywowana`, { description: "Urządzenia synchronizują stan…" });
  };
  return (
    <div>
      <PageHeader
        eyebrow="Sceny"
        title="Twoje sceny"
        subtitle="Jedno dotknięcie — cały dom się dostraja."
        action={
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-4 py-2 text-sm text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4" /> Nowa scena
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {initial.map((s) => (
          <button
            key={s.id}
            onClick={() => run(s.id, s.name)}
            className={`premium-card text-left transition ${active === s.id ? "border-primary/40 ring-glow" : ""}`}
          >
            <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${s.gradient} opacity-30 blur-2xl`} />
            <div className="relative flex items-center justify-between">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-glow`}>
                <s.icon className="h-7 w-7 text-white" strokeWidth={1.8} />
              </div>
              {active === s.id && (
                <span className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[10px] text-success">
                  <Sparkles className="h-3 w-3" /> Aktywna
                </span>
              )}
            </div>
            <div className="relative mt-4">
              <div className="font-display text-xl font-semibold">{s.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
            </div>
            <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>12 akcji · 3 pomieszczenia</span>
              <span className="flex items-center gap-1 text-primary"><Play className="h-3 w-3" /> Uruchom</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
