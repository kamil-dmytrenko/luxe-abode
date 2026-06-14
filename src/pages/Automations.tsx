import { useState } from "react";
import { Workflow, Plus, Zap, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import { automations as initial } from "@/lib/mock-data";

export default function Automations() {
  const [items, setItems] = useState(initial);
  const toggle = (id: string) => setItems((s) => s.map((x) => x.id === id ? { ...x, enabled: !x.enabled } : x));
  return (
    <div>
      <PageHeader eyebrow="Inteligencja" title="Automatyzacje" subtitle="Reguły IF / THEN — twój dom myśli za ciebie."
        action={<button className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-4 py-2 text-sm text-primary-foreground shadow-glow"><Plus className="h-4 w-4" /> Nowa automatyzacja</button>} />

      <div className="grid grid-cols-1 gap-3 px-5 pb-6 lg:grid-cols-2 lg:px-10">
        {items.map((a) => (
          <div key={a.id} className={`premium-card transition ${a.enabled ? "" : "opacity-70"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-cool shadow-glow">
                  <Workflow className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{a.name}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">JEŻELI</span>
                    <span className="text-muted-foreground">{a.trigger}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">WTEDY</span>
                    <span className="text-muted-foreground">{a.action}</span>
                  </div>
                </div>
              </div>
              <Switch checked={a.enabled} onCheckedChange={() => toggle(a.id)} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary" /> Uruchomiona 42×</span>
              <span>Ostatnio: 2h temu</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
