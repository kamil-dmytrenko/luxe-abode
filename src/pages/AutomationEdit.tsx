import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Play, Save, Workflow, Zap, ChevronRight,
  Clock, Thermometer, MapPin, Sun, Camera, DoorOpen, Activity,
  Lightbulb, Bell, Music, Shield, Blinds as BlindsIcon, Snowflake,
  GitBranch, CheckCircle2, Loader2, Sparkles,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { automations as initial } from "@/lib/mock-data";

type Trigger = { id: string; type: string; label: string; value: string; icon: any };
type Condition = { id: string; type: string; label: string; value: string; icon: any };
type Action = { id: string; type: string; label: string; value: string; icon: any };

const TRIGGERS = [
  { type: "time", label: "O godzinie", icon: Clock, defaultValue: "07:30" },
  { type: "sunset", label: "Zachód słońca", icon: Sun, defaultValue: "−15 min" },
  { type: "sunrise", label: "Wschód słońca", icon: Sun, defaultValue: "+0 min" },
  { type: "temp", label: "Temperatura", icon: Thermometer, defaultValue: "> 24°C" },
  { type: "motion", label: "Wykrycie ruchu", icon: Activity, defaultValue: "Salon" },
  { type: "door", label: "Otwarcie drzwi", icon: DoorOpen, defaultValue: "Wejście" },
  { type: "geo", label: "Lokalizacja", icon: MapPin, defaultValue: "Powrót do domu" },
  { type: "camera", label: "Kamera — zdarzenie", icon: Camera, defaultValue: "Brama wjazdowa" },
];

const CONDITIONS = [
  { type: "time-range", label: "Tylko w godzinach", icon: Clock, defaultValue: "22:00 – 06:00" },
  { type: "day", label: "Tylko w dni", icon: Clock, defaultValue: "Pn–Pt" },
  { type: "presence", label: "Nikogo w domu", icon: MapPin, defaultValue: "Wszyscy poza" },
  { type: "weather", label: "Pogoda", icon: Sun, defaultValue: "Słonecznie" },
  { type: "temp-below", label: "Temperatura poniżej", icon: Thermometer, defaultValue: "18°C" },
];

const ACTIONS = [
  { type: "light", label: "Sterowanie światłem", icon: Lightbulb, defaultValue: "Salon — 60%" },
  { type: "scene", label: "Uruchom scenę", icon: Sparkles, defaultValue: "Dobranoc" },
  { type: "blinds", label: "Rolety", icon: BlindsIcon, defaultValue: "Sypialnia — zamknij" },
  { type: "ac", label: "Klimatyzacja", icon: Snowflake, defaultValue: "Salon — 22°" },
  { type: "alarm", label: "Alarm", icon: Shield, defaultValue: "Uzbrój pełny" },
  { type: "music", label: "Muzyka", icon: Music, defaultValue: "Jazz, 30%" },
  { type: "notify", label: "Powiadomienie", icon: Bell, defaultValue: "Wyślij push" },
];

const newId = () => Math.random().toString(36).slice(2, 9);

function ChipPicker<T extends { type: string; label: string; icon: any; defaultValue: string }>({
  title, options, onPick,
}: { title: string; options: T[]; onPick: (o: T) => void }) {
  return (
    <div className="mt-3 rounded-2xl border border-border bg-background/40 p-3">
      <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.type}
            onClick={() => onPick(o)}
            className="group flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 text-xs transition hover:border-primary/50 hover:bg-primary/10"
          >
            <o.icon className="h-3.5 w-3.5 text-primary" />
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Block({
  icon: Icon, badge, badgeColor, item, onChange, onDelete,
}: {
  icon: any; badge: string; badgeColor: string;
  item: { id: string; label: string; value: string };
  onChange: (v: string) => void; onDelete: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 transition hover:border-primary/40">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-cool shadow-glow">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeColor}`}>{badge}</span>
          <span className="truncate text-sm font-medium">{item.label}</span>
        </div>
        <Input
          value={item.value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 h-8 border-transparent bg-transparent px-0 text-xs text-muted-foreground focus-visible:ring-0"
        />
      </div>
      <button onClick={onDelete} className="rounded-lg p-2 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function AutomationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = useMemo(() => initial.find((a) => a.id === id), [id]);

  const [name, setName] = useState(existing?.name ?? "Nowa automatyzacja");
  const [enabled, setEnabled] = useState(existing?.enabled ?? true);
  const [priority, setPriority] = useState([3]);
  const [matchAll, setMatchAll] = useState(true);

  const [triggers, setTriggers] = useState<Trigger[]>([
    { id: newId(), type: "time", label: "O godzinie", value: "07:30", icon: Clock },
  ]);
  const [conditions, setConditions] = useState<Condition[]>([
    { id: newId(), type: "day", label: "Tylko w dni", value: "Pn–Pt", icon: Clock },
  ]);
  const [actions, setActions] = useState<Action[]>([
    { id: newId(), type: "scene", label: "Uruchom scenę", value: "Dzień dobry", icon: Sparkles },
    { id: newId(), type: "blinds", label: "Rolety", value: "Salon — otwórz 80%", icon: BlindsIcon },
  ]);

  const [showT, setShowT] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showA, setShowA] = useState(false);

  const [runState, setRunState] = useState<"idle" | "running" | "done">("idle");
  const [runStep, setRunStep] = useState(-1);

  const addItem = (kind: "t" | "c" | "a", o: any) => {
    const item = { id: newId(), type: o.type, label: o.label, value: o.defaultValue, icon: o.icon };
    if (kind === "t") { setTriggers((s) => [...s, item]); setShowT(false); }
    if (kind === "c") { setConditions((s) => [...s, item]); setShowC(false); }
    if (kind === "a") { setActions((s) => [...s, item]); setShowA(false); }
  };

  const simulate = async () => {
    setRunState("running");
    const steps = [...triggers, ...conditions, ...actions];
    for (let i = 0; i < steps.length; i++) {
      setRunStep(i);
      await new Promise((r) => setTimeout(r, 550));
    }
    setRunState("done");
    setRunStep(steps.length);
    setTimeout(() => { setRunState("idle"); setRunStep(-1); }, 2200);
  };

  const save = () => {
    toast.success("Automatyzacja zapisana", { description: `${name} • ${actions.length} akcji` });
    setTimeout(() => navigate("/automations"), 600);
  };

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Inteligencja"
        title={existing ? "Edycja automatyzacji" : "Nowa automatyzacja"}
        subtitle="Zdefiniuj wyzwalacze, warunki i akcje. Sprawdź podgląd uruchomienia."
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Wróć
            </button>
            <button onClick={save} className="flex items-center gap-2 rounded-2xl bg-gradient-primary px-4 py-2 text-sm text-primary-foreground shadow-glow">
              <Save className="h-4 w-4" /> Zapisz
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 px-5 pb-6 lg:grid-cols-3 lg:px-10">
        {/* Lewa kolumna: meta */}
        <div className="space-y-4 lg:col-span-1">
          <div className="premium-card">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <Workflow className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Nazwa</div>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 border-0 bg-transparent px-0 font-display text-lg font-semibold focus-visible:ring-0" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-background/40 px-3 py-2">
              <span className="text-sm">Aktywna</span>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background/40 px-3 py-2">
              <span className="text-sm">Wymagaj wszystkich warunków</span>
              <Switch checked={matchAll} onCheckedChange={setMatchAll} />
            </div>
            <div className="mt-3 rounded-xl border border-border bg-background/40 px-3 py-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Priorytet</span>
                <span className="text-muted-foreground">{priority[0]}/5</span>
              </div>
              <Slider value={priority} onValueChange={setPriority} min={1} max={5} step={1} />
            </div>
          </div>

          <div className="premium-card">
            <div className="mb-3 flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <div className="font-display text-base font-semibold">Podgląd uruchomienia</div>
            </div>
            <p className="text-xs text-muted-foreground">Symulacja przebiegu reguły krok po kroku.</p>
            <button
              onClick={simulate}
              disabled={runState === "running"}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-warm px-4 py-2.5 text-sm font-medium text-white shadow-glow disabled:opacity-60"
            >
              {runState === "running" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
              {runState === "running" ? "Uruchamianie…" : "Uruchom teraz"}
            </button>

            <div className="mt-4 space-y-2">
              {[
                ...triggers.map((x) => ({ ...x, kind: "JEŻELI", color: "text-accent" })),
                ...conditions.map((x) => ({ ...x, kind: "GDY", color: "text-amber-400" })),
                ...actions.map((x) => ({ ...x, kind: "WTEDY", color: "text-primary" })),
              ].map((s, i) => {
                const active = runStep === i;
                const done = runStep > i || runState === "done";
                return (
                  <div key={s.id} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${active ? "border-primary bg-primary/10 shadow-glow" : done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-background/40"}`}>
                    {done ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> : <span className="h-3.5 w-3.5 rounded-full border border-border" />}
                    <span className={`font-semibold ${s.color}`}>{s.kind}</span>
                    <span className="truncate text-muted-foreground">{s.label}: {s.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prawa kolumna: reguły */}
        <div className="space-y-4 lg:col-span-2">
          {/* Triggers */}
          <div className="premium-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">Jeżeli</span>
                <span className="text-sm text-muted-foreground">Wyzwalacze</span>
              </div>
              <button onClick={() => setShowT((v) => !v)} className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:border-primary/50">
                <Plus className="h-3 w-3" /> Dodaj
              </button>
            </div>
            <div className="space-y-2">
              {triggers.map((t) => (
                <Block key={t.id} icon={t.icon} badge="Trigger" badgeColor="bg-accent/10 text-accent" item={t}
                  onChange={(v) => setTriggers((s) => s.map((x) => x.id === t.id ? { ...x, value: v } : x))}
                  onDelete={() => setTriggers((s) => s.filter((x) => x.id !== t.id))}
                />
              ))}
              {triggers.length === 0 && <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Brak wyzwalaczy</div>}
            </div>
            {showT && <ChipPicker title="Wybierz wyzwalacz" options={TRIGGERS} onPick={(o) => addItem("t", o)} />}
          </div>

          <div className="flex items-center gap-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">
            <GitBranch className="h-3 w-3" /> Sprawdź warunki <ChevronRight className="h-3 w-3" />
          </div>

          {/* Conditions */}
          <div className="premium-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400">Gdy</span>
                <span className="text-sm text-muted-foreground">Warunki ({matchAll ? "wszystkie" : "dowolny"})</span>
              </div>
              <button onClick={() => setShowC((v) => !v)} className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:border-primary/50">
                <Plus className="h-3 w-3" /> Dodaj
              </button>
            </div>
            <div className="space-y-2">
              {conditions.map((c) => (
                <Block key={c.id} icon={c.icon} badge="Warunek" badgeColor="bg-amber-400/10 text-amber-400" item={c}
                  onChange={(v) => setConditions((s) => s.map((x) => x.id === c.id ? { ...x, value: v } : x))}
                  onDelete={() => setConditions((s) => s.filter((x) => x.id !== c.id))}
                />
              ))}
              {conditions.length === 0 && <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Bez warunków — zawsze wykonuj</div>}
            </div>
            {showC && <ChipPicker title="Wybierz warunek" options={CONDITIONS} onPick={(o) => addItem("c", o)} />}
          </div>

          <div className="flex items-center gap-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">
            <ChevronRight className="h-3 w-3" /> Wykonaj akcje
          </div>

          {/* Actions */}
          <div className="premium-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">Wtedy</span>
                <span className="text-sm text-muted-foreground">Akcje</span>
              </div>
              <button onClick={() => setShowA((v) => !v)} className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:border-primary/50">
                <Plus className="h-3 w-3" /> Dodaj
              </button>
            </div>
            <div className="space-y-2">
              {actions.map((a) => (
                <Block key={a.id} icon={a.icon} badge="Akcja" badgeColor="bg-primary/10 text-primary" item={a}
                  onChange={(v) => setActions((s) => s.map((x) => x.id === a.id ? { ...x, value: v } : x))}
                  onDelete={() => setActions((s) => s.filter((x) => x.id !== a.id))}
                />
              ))}
              {actions.length === 0 && <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Dodaj przynajmniej jedną akcję</div>}
            </div>
            {showA && <ChipPicker title="Wybierz akcję" options={ACTIONS} onPick={(o) => addItem("a", o)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
