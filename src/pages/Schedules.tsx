import { useState } from "react";
import { CalendarClock, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import { schedules as initial } from "@/lib/mock-data";

export default function Schedules() {
  const [items, setItems] = useState(initial);
  const toggle = (id: string) => setItems((s) => s.map((x) => x.id === id ? { ...x, enabled: !x.enabled } : x));
  return (
    <div>
      <PageHeader eyebrow="Czas" title="Harmonogramy" subtitle="Zaplanuj akcje z dokładnością co do minuty."
        action={<button className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-4 py-2 text-sm text-primary-foreground shadow-glow"><Plus className="h-4 w-4" /> Nowy</button>} />
      <div className="space-y-2 px-5 pb-6 lg:px-10">
        {items.map((s) => (
          <div key={s.id} className="premium-card flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <CalendarClock className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.action}</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {s.days.map((d) => (
                  <span key={d} className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-muted-foreground">{d}</span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="stat-num text-2xl font-semibold">{s.time}</div>
              <Switch className="mt-1" checked={s.enabled} onCheckedChange={() => toggle(s.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
