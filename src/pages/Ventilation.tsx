import { useMemo, useState } from "react";
import {
  Wind, Fan, Snowflake, Leaf, Filter, Gauge, Activity, AlertTriangle,
  Moon, PartyPopper, Plane, Zap, Power, Settings2, ArrowDown, ArrowUp,
  ThermometerSun, ThermometerSnowflake, Droplets, Clock, RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart,
} from "recharts";
import { hrv as initialHrv, roomSensors, hrvHistory, type HrvMode } from "@/lib/mock-data";

const modeMeta: { id: HrvMode; label: string; icon: typeof Fan; tone: string }[] = [
  { id: "auto", label: "Auto", icon: Settings2, tone: "text-primary" },
  { id: "boost", label: "Boost", icon: Zap, tone: "text-amber-300" },
  { id: "night", label: "Noc", icon: Moon, tone: "text-indigo-300" },
  { id: "party", label: "Impreza", icon: PartyPopper, tone: "text-fuchsia-300" },
  { id: "away", label: "Wyjście", icon: Plane, tone: "text-sky-300" },
  { id: "off", label: "Wył.", icon: Power, tone: "text-muted-foreground" },
];

function co2Tone(v: number) {
  if (v < 600) return { label: "Świeże", chip: "bg-success/15 text-success border-success/30", bar: "from-emerald-400 to-success" };
  if (v < 900) return { label: "OK", chip: "bg-amber-500/15 text-amber-300 border-amber-400/30", bar: "from-amber-400 to-orange-400" };
  if (v < 1200) return { label: "Wysokie", chip: "bg-orange-500/15 text-orange-300 border-orange-400/30", bar: "from-orange-400 to-rose-400" };
  return { label: "Alarm", chip: "bg-destructive/15 text-destructive border-destructive/30", bar: "from-rose-500 to-destructive" };
}
function vocTone(v: number) {
  if (v < 0.4) return { label: "Niskie", chip: "bg-success/15 text-success border-success/30" };
  if (v < 0.6) return { label: "Średnie", chip: "bg-amber-500/15 text-amber-300 border-amber-400/30" };
  return { label: "Wysokie", chip: "bg-destructive/15 text-destructive border-destructive/30" };
}

export default function Ventilation() {
  const [state, setState] = useState(initialHrv);

  const setMode = (m: HrvMode) =>
    setState((s) => ({ ...s, mode: m, fanSpeed: m === "boost" ? 90 : m === "night" ? 25 : m === "away" ? 15 : m === "off" ? 0 : 45 }));

  const recover = useMemo(() => {
    const supplyIn = state.probes.find((p) => p.id === "supply-in")!;
    const exhaustIn = state.probes.find((p) => p.id === "exhaust-in")!;
    const supplyOut = state.probes.find((p) => p.id === "supply-out")!;
    const dt = (supplyIn.temp - supplyOut.temp);
    const dtMax = (exhaustIn.temp - supplyOut.temp);
    return dtMax > 0 ? Math.round((dt / dtMax) * 100) : state.recovery;
  }, [state.probes, state.recovery]);

  const alerts: string[] = [];
  if (state.filterUsage > 80) alerts.push("Filtr do wymiany — pozostało < 14 dni");
  const highCo2 = roomSensors.filter((r) => r.co2 >= 1000);
  if (highCo2.length) alerts.push(`Wysokie CO₂ w: ${highCo2.map((r) => r.room).join(", ")}`);

  return (
    <div>
      <PageHeader
        eyebrow="Powietrze"
        title="Wentylacja mechaniczna"
        subtitle="Rekuperator, przepływy, czujniki CO₂ i LZO w pomieszczeniach."
        action={
          <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-xs">
            <Activity className="h-3.5 w-3.5 text-success" />
            <span className="text-muted-foreground">Sprawność</span>
            <span className="font-display text-sm font-semibold">{recover}%</span>
          </div>
        }
      />

      <div className="px-5 pb-6 lg:px-10">
        {/* Top — modes */}
        <div className="premium-card mb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-cool shadow-glow">
                <Fan className={`h-7 w-7 text-white ${state.mode !== "off" ? "animate-spin" : ""}`} style={{ animationDuration: state.mode === "boost" ? "1.2s" : state.mode === "night" ? "5s" : "2.5s" }} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Tryb pracy</div>
                <div className="font-display text-lg font-semibold capitalize">
                  {modeMeta.find((m) => m.id === state.mode)?.label}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">· {state.airflow} m³/h · {state.fanSpeed}%</span>
                </div>
              </div>
            </div>

            <div className="ml-auto flex flex-wrap gap-1.5">
              {modeMeta.map((m) => {
                const active = state.mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass text-muted-foreground hover:text-foreground"}`}
                  >
                    <m.icon className="h-3.5 w-3.5" /> {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Prędkość wentylatora</span>
                <span className="font-display text-foreground">{state.fanSpeed}%</span>
              </div>
              <Slider value={[state.fanSpeed]} min={0} max={100} step={5} onValueChange={(v) => setState((s) => ({ ...s, fanSpeed: v[0], airflow: Math.round(v[0] * 4) }))} />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500/15 text-sky-300"><Snowflake className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm">Bypass letni</div>
                  <div className="text-[11px] text-muted-foreground">Pomija wymiennik gdy chłodniej na zewnątrz</div>
                </div>
              </div>
              <Switch checked={state.bypass} onCheckedChange={(v) => setState((s) => ({ ...s, bypass: v }))} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="premium-card mb-4 flex items-start gap-3 border-amber-400/30 bg-amber-500/5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <div className="text-sm font-medium">Wymaga uwagi</div>
              <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                {alerts.map((a) => <li key={a}>• {a}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Probes + recovery diagram */}
        <div className="mb-4 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="premium-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-base font-semibold">Punkty pomiarowe rekuperatora</div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Activity className="h-3 w-3" /> live</div>
            </div>

            {/* Diagram */}
            <div className="relative grid gap-3 sm:grid-cols-2">
              <ProbeCard probe={state.probes[2]} icon={ThermometerSnowflake} tint="from-sky-500/20 to-indigo-500/5" arrow="in" sub="Czerpnia powietrza" />
              <ProbeCard probe={state.probes[0]} icon={ArrowDown} tint="from-emerald-500/20 to-teal-500/5" arrow="in" sub={`Po odzysku · +${(state.probes[0].temp - state.probes[2].temp).toFixed(1)}°`} />
              <ProbeCard probe={state.probes[1]} icon={ThermometerSun} tint="from-amber-500/20 to-rose-500/5" arrow="out" sub="Z pomieszczeń" />
              <ProbeCard probe={state.probes[3]} icon={ArrowUp} tint="from-slate-500/20 to-zinc-500/5" arrow="out" sub={`Po oddaniu ciepła · ${(state.probes[3].temp - state.probes[1].temp).toFixed(1)}°`} />
            </div>
          </div>

          <div className="premium-card flex flex-col">
            <div className="mb-3 font-display text-base font-semibold">Wydajność</div>
            <div className="grid grid-cols-2 gap-3">
              <KPI label="Odzysk ciepła" value={`${recover}%`} icon={Leaf} tone="text-success" />
              <KPI label="Przepływ" value={`${state.airflow}`} sub="m³/h" icon={Wind} tone="text-sky-300" />
              <KPI label="CO₂ avg" value={`${state.co2Avg}`} sub="ppm" icon={Gauge} tone="text-primary" />
              <KPI label="LZO avg" value={state.vocAvg.toFixed(2)} sub="mg/m³" icon={Droplets} tone="text-accent" />
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-white/[0.02] p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Stan filtra</span>
                <span className="font-display">{state.filterUsage}% · {state.filterDaysLeft}d</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${state.filterUsage > 80 ? "bg-gradient-warm" : "bg-gradient-primary"}`} style={{ width: `${state.filterUsage}%` }} />
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-white/[0.03] py-2 text-xs text-muted-foreground transition hover:text-foreground">
                <RefreshCw className="h-3 w-3" /> Zresetuj licznik po wymianie
              </button>
            </div>
          </div>
        </div>

        {/* Room sensors */}
        <div className="premium-card mb-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="font-display text-base font-semibold">Czujniki w pomieszczeniach</div>
              <div className="text-[11px] text-muted-foreground">CO₂, LZO, temperatura i wilgotność</div>
            </div>
            <div className="text-[11px] text-muted-foreground">{roomSensors.length} czujników</div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {roomSensors.map((s) => {
              const co = co2Tone(s.co2);
              const vo = vocTone(s.voc);
              return (
                <div key={s.id} className="rounded-2xl border border-border bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display text-sm font-semibold">{s.room}</div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className={`rounded-md border px-1.5 py-0.5 ${co.chip}`}>CO₂ · {co.label}</span>
                        <span className={`rounded-md border px-1.5 py-0.5 ${vo.chip}`}>LZO · {vo.label}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-semibold">{s.co2}<span className="ml-1 text-[10px] font-normal text-muted-foreground">ppm</span></div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full bg-gradient-to-r ${co.bar}`} style={{ width: `${Math.min(100, (s.co2 / 1500) * 100)}%` }} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                    <Mini label="Temp" value={`${s.temp.toFixed(1)}°`} />
                    <Mini label="Wilg." value={`${s.humidity}%`} />
                    <Mini label="LZO" value={`${s.voc.toFixed(2)}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 24h history */}
        <div className="premium-card mb-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-display text-base font-semibold">Ostatnie 24h</div>
            <div className="text-[11px] text-muted-foreground">CO₂, wilgotność</div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hrvHistory}>
                  <defs>
                    <linearGradient id="co2g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={3} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={30} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="co2" stroke="hsl(var(--primary))" fill="url(#co2g)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hrvHistory}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={3} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={30} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="humidity" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="premium-card">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-display text-base font-semibold">Harmonogram dnia</div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid gap-2 md:grid-cols-4">
            {state.schedule.map((p) => {
              const m = modeMeta.find((x) => x.id === p.mode)!;
              return (
                <div key={p.time} className="rounded-2xl border border-border bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-semibold">{p.time}</span>
                    <m.icon className={`h-4 w-4 ${m.tone}`} />
                  </div>
                  <div className="text-xs text-muted-foreground">{p.label}</div>
                  <div className="mt-1 text-[11px]">{m.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProbeCard({ probe, icon: Icon, tint, arrow, sub }: { probe: { label: string; temp: number; humidity: number }; icon: typeof Fan; tint: string; arrow: "in" | "out"; sub: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tint} p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{arrow === "in" ? "Nawiew" : "Wywiew"}</div>
          <div className="mt-0.5 text-sm font-medium">{probe.label}</div>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <div className="font-display text-3xl font-semibold">{probe.temp.toFixed(1)}°</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Droplets className="h-3 w-3" /> {probe.humidity}%</div>
      </div>
      <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function KPI({ label, value, sub, icon: Icon, tone }: { label: string; value: string; sub?: string; icon: typeof Fan; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white/[0.02] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className={`h-3 w-3 ${tone}`} /> {label}
      </div>
      <div className="mt-1 font-display text-xl font-semibold">{value} {sub && <span className="text-[10px] font-normal text-muted-foreground">{sub}</span>}</div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] px-2 py-1.5 text-center">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-sm">{value}</div>
    </div>
  );
}
