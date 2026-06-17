import { useMemo, useState } from "react";
import {
  Flame, Snowflake, Minus, Plus, Settings2, Leaf, Zap, Power, X,
  Thermometer, Droplets, Sun, Cloud, AlertCircle, Plane, Moon, Home, Clock,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { climateZones as initial, type ClimateZone, type ClimateMode } from "@/lib/mock-data";

type Season = "auto" | "summer" | "winter";

type Source = "heating" | "cooling" | "idle" | "hybrid";

const seasonMeta: Record<Season, { label: string; icon: typeof Sun }> = {
  auto: { label: "Auto", icon: Cloud },
  summer: { label: "Lato", icon: Sun },
  winter: { label: "Zima", icon: Snowflake },
};

const modeMeta: { id: ClimateMode; label: string; icon: typeof Settings2 }[] = [
  { id: "auto", label: "Auto", icon: Settings2 },
  { id: "comfort", label: "Komfort", icon: Home },
  { id: "eco", label: "Eco", icon: Leaf },
  { id: "boost", label: "Boost", icon: Zap },
  { id: "off", label: "Wył.", icon: Power },
];

function effectiveSeason(s: Season): "summer" | "winter" {
  if (s !== "auto") return s;
  const m = new Date().getMonth(); // 0=Jan
  return m >= 4 && m <= 8 ? "summer" : "winter";
}

function computeSource(z: ClimateZone, season: Season): Source {
  if (z.mode === "off") return "idle";
  const delta = z.target - z.current;
  const hysteresis = z.mode === "eco" ? 1.0 : 0.3;
  if (z.mode === "boost" && Math.abs(delta) > 0.3) {
    return delta > 0 ? "heating" : "cooling";
  }
  if (Math.abs(delta) <= hysteresis) return "idle";
  if (delta > 0) return z.hasUnderfloor ? "heating" : "idle";
  // delta < 0 — cooling
  return z.hasAC ? "cooling" : "idle";
}

function sourceLabel(s: Source, z: ClimateZone): string {
  if (s === "heating") return "Podłogówka grzeje";
  if (s === "cooling") return "Klimatyzacja chłodzi";
  if (s === "hybrid") return "Hybrydowo (boost)";
  if (!z.hasUnderfloor && !z.hasAC) return "Brak źródeł";
  return "Komfort — bezczynny";
}

function sourceTone(s: Source): { from: string; to: string; ring: string; chip: string; icon: typeof Flame } {
  if (s === "heating") return { from: "from-amber-500/25", to: "to-rose-500/10", ring: "ring-amber-400/30", chip: "text-amber-300 bg-amber-500/10 border-amber-400/30", icon: Flame };
  if (s === "cooling") return { from: "from-sky-500/25", to: "to-indigo-500/10", ring: "ring-sky-400/30", chip: "text-sky-300 bg-sky-500/10 border-sky-400/30", icon: Snowflake };
  return { from: "from-white/[0.04]", to: "to-white/[0.02]", ring: "ring-white/10", chip: "text-muted-foreground bg-white/[0.04] border-white/10", icon: Thermometer };
}

function etaMinutes(z: ClimateZone, s: Source): number | null {
  if (s === "idle") return null;
  const delta = Math.abs(z.target - z.current);
  if (delta < 0.2) return null;
  // ~0.4°/min for cooling, 0.25°/min for floor heating
  const rate = s === "cooling" ? 0.4 : 0.25;
  return Math.max(2, Math.round(delta / rate * 4));
}

function powerWatts(z: ClimateZone, s: Source): number {
  if (s === "heating") return 850 + Math.round(Math.abs(z.target - z.current) * 200);
  if (s === "cooling") return 700 + Math.round(Math.abs(z.target - z.current) * 250);
  return 0;
}

export default function Climate() {
  const [zones, setZones] = useState<ClimateZone[]>(initial);
  const [season, setSeason] = useState<Season>("auto");
  const [vacation, setVacation] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  const setTarget = (id: string, t: number) => setZones((s) => s.map((z) => z.id === id ? { ...z, target: Math.round(Math.max(16, Math.min(28, t)) * 2) / 2 } : z));
  const setMode = (id: string, m: ClimateMode) => setZones((s) => s.map((z) => z.id === id ? { ...z, mode: m } : z));
  const applyAll = (target: number, mode: ClimateMode = "auto") => setZones((s) => s.map((z) => ({ ...z, target, mode })));

  const eff = effectiveSeason(season);

  const stats = useMemo(() => {
    const avgT = zones.reduce((a, z) => a + z.current, 0) / zones.length;
    const avgTarget = zones.reduce((a, z) => a + z.target, 0) / zones.length;
    let heatingCount = 0, coolingCount = 0, kw = 0;
    zones.forEach((z) => {
      const s = computeSource(z, season);
      if (s === "heating") heatingCount++;
      if (s === "cooling") coolingCount++;
      kw += powerWatts(z, s);
    });
    const dominant: Source = heatingCount > coolingCount ? "heating" : coolingCount > 0 ? "cooling" : "idle";
    return { avgT, avgTarget, heatingCount, coolingCount, kw: kw / 1000, dominant };
  }, [zones, season]);

  const detail = zones.find((z) => z.id === detailId) ?? null;

  return (
    <div>
      <PageHeader
        eyebrow="Komfort"
        title="Klimat"
        subtitle="Jedna temperatura zadana — system sam wybiera podłogówkę lub klimatyzację."
        action={
          <div className="flex items-center gap-2">
            <div className="glass flex items-center gap-1 rounded-2xl p-1">
              {(Object.keys(seasonMeta) as Season[]).map((s) => {
                const Icon = seasonMeta[s].icon;
                const active = season === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {seasonMeta[s].label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setVacation((v) => !v)}
              className={`glass flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs transition ${vacation ? "border-amber-400/40 text-amber-300" : "text-muted-foreground"}`}
            >
              <Plane className="h-3.5 w-3.5" /> Wakacje
            </button>
          </div>
        }
      />

      {/* Global status + presets */}
      <div className="px-5 lg:px-10">
        <div className="premium-card mb-4 overflow-hidden">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl ${
                stats.dominant === "heating" ? "bg-gradient-warm" :
                stats.dominant === "cooling" ? "bg-gradient-cool" : "bg-white/[0.05]"
              } shadow-glow`}>
                {stats.dominant === "heating" ? <Flame className="h-6 w-6 text-white" /> :
                 stats.dominant === "cooling" ? <Snowflake className="h-6 w-6 text-white" /> :
                 <Thermometer className="h-6 w-6 text-muted-foreground" />}
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Stan domu</div>
                <div className="font-display text-lg font-semibold">
                  {stats.dominant === "heating" ? "Dom grzeje" : stats.dominant === "cooling" ? "Dom chłodzi" : "Komfort"}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">· {stats.kw.toFixed(2)} kW</span>
                </div>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label="Średnia" value={`${stats.avgT.toFixed(1)}°`} sub={`cel ${stats.avgTarget.toFixed(1)}°`} />
              <Stat label="Grzanie" value={`${stats.heatingCount}`} sub={`stref`} />
              <Stat label="Chłodzenie" value={`${stats.coolingCount}`} sub={`stref`} />
              <Stat label="Sezon" value={eff === "summer" ? "Lato" : "Zima"} sub={season === "auto" ? "auto" : "ręcznie"} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Preset icon={Home} label="Wszędzie 21°" onClick={() => applyAll(21, "comfort")} />
            <Preset icon={Moon} label="Tryb nocny" onClick={() => applyAll(19, "eco")} />
            <Preset icon={Plane} label="Wyjście (Eco)" onClick={() => applyAll(17, "eco")} />
            <Preset icon={Zap} label="Wracam (Boost)" onClick={() => setZones((s) => s.map((z) => ({ ...z, target: 22, mode: "boost" })))} />
          </div>
        </div>
      </div>

      {/* Zones grid */}
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {zones.map((z) => {
          const src = computeSource(z, season);
          const tone = sourceTone(src);
          const SrcIcon = tone.icon;
          const eta = etaMinutes(z, src);
          const watts = powerWatts(z, src);
          const breathing = src !== "idle" && z.mode !== "off";
          return (
            <button
              key={z.id}
              onClick={() => setDetailId(z.id)}
              className={`premium-card group relative overflow-hidden text-left transition hover:scale-[1.005] ${z.mode === "off" ? "opacity-70" : ""}`}
            >
              {/* Reactive background */}
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.from} ${tone.to} ${breathing ? "animate-pulse" : ""}`} style={{ animationDuration: "4s" }} />

              <div className="relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{z.room}</div>
                    <div className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] ${tone.chip}`}>
                      <SrcIcon className="h-3 w-3" /> {sourceLabel(src, z)}
                      {eta && <span className="opacity-70">· ~{eta} min</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    {z.hasUnderfloor && <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5">Podłog.</span>}
                    {z.hasAC && <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5">AC</span>}
                  </div>
                </div>

                {/* Dial */}
                <div className="relative mx-auto my-4 grid h-44 w-44 place-items-center">
                  <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-[135deg]">
                    <circle cx="100" cy="100" r="84" stroke="hsl(var(--border))" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${(270/360)*528} 528`} />
                    <circle
                      cx="100" cy="100" r="84"
                      stroke={src === "cooling" ? "url(#cool)" : "url(#warm)"}
                      strokeWidth="10" fill="none" strokeLinecap="round"
                      strokeDasharray={`${((z.target - 16) / 12) * (270/360) * 528} 528`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(38 95% 65%)" />
                        <stop offset="100%" stopColor="hsl(0 75% 55%)" />
                      </linearGradient>
                      <linearGradient id="cool" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="hsl(190 95% 65%)" />
                        <stop offset="100%" stopColor="hsl(230 85% 65%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cel</div>
                    <div className="stat-num text-5xl font-semibold leading-none">{z.target.toFixed(1)}°</div>
                    <div className="mt-1 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                      <span>teraz {z.current.toFixed(1)}°</span>
                      <span className="flex items-center gap-0.5"><Droplets className="h-3 w-3" />{z.humidity}%</span>
                    </div>
                  </div>
                </div>

                {/* +/- */}
                <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setTarget(z.id, z.target - 0.5)} className="grid h-10 w-10 place-items-center rounded-full glass transition hover:scale-105"><Minus className="h-4 w-4" /></button>
                  <div className="text-[11px] text-muted-foreground">
                    {watts > 0 ? `${watts} W · ${(watts*0.0008).toFixed(2)} zł/h` : "0 W"}
                  </div>
                  <button onClick={() => setTarget(z.id, z.target + 0.5)} className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-glow transition hover:scale-105 ${src === "cooling" ? "bg-gradient-cool" : "bg-gradient-warm"}`}><Plus className="h-4 w-4" /></button>
                </div>

                {/* Mode pills */}
                <div className="mt-4 grid grid-cols-5 gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {modeMeta.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(z.id, m.id)}
                      className={`flex flex-col items-center gap-1 rounded-xl border py-1.5 text-[10px] transition ${z.mode === m.id ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      <m.icon className="h-3.5 w-3.5" /> {m.label}
                    </button>
                  ))}
                </div>

                {/* Mini schedule */}
                <div className="mt-3 flex items-center gap-1.5 overflow-hidden">
                  {z.schedule.map((p, i) => (
                    <div key={i} className="flex-1 rounded-lg bg-white/[0.03] px-2 py-1.5 text-center">
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{p.time}</div>
                      <div className="stat-num text-xs font-semibold">{p.target}°</div>
                    </div>
                  ))}
                </div>

                {z.notice && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-200">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{z.notice}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail sheet */}
      <Sheet open={!!detail} onOpenChange={(o) => !o && setDetailId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto border-sidebar-border bg-sidebar p-0 sm:max-w-lg">
          {detail && <ZoneDetail zone={detail} season={season} onClose={() => setDetailId(null)} onChange={(z) => setZones((s) => s.map((x) => x.id === z.id ? z : x))} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="stat-num text-lg font-semibold leading-tight">{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Preset({ icon: Icon, label, onClick }: { icon: typeof Sun; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="glass flex items-center gap-2 rounded-2xl px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground">
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function ZoneDetail({ zone, season, onClose, onChange }: { zone: ClimateZone; season: Season; onClose: () => void; onChange: (z: ClimateZone) => void }) {
  const src = computeSource(zone, season);
  const tone = sourceTone(src);
  const SrcIcon = tone.icon;

  // 24h history mock
  const history = useMemo(() => {
    const hours = Array.from({ length: 24 }).map((_, h) => h);
    return hours.map((h) => {
      const outdoor = 10 + Math.sin((h - 6) / 24 * Math.PI * 2) * 6;
      const target = zone.schedule.reduce((acc, p) => {
        const ph = parseInt(p.time.split(":")[0]);
        return h >= ph ? p.target : acc;
      }, zone.target);
      const current = target + Math.sin(h / 3) * 0.4 + (Math.random() - 0.5) * 0.3;
      return { h: `${h}:00`, current: +current.toFixed(2), target, outdoor: +outdoor.toFixed(1) };
    });
  }, [zone]);

  const sources: { id: "auto" | "heating-only" | "cooling-only" | "hybrid"; label: string }[] = [
    { id: "auto", label: "Auto (system decyduje)" },
    { id: "heating-only", label: "Tylko podłogówka" },
    { id: "cooling-only", label: "Tylko klimatyzacja" },
    { id: "hybrid", label: "Hybryda (szybciej)" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/50 bg-sidebar/80 px-5 py-4 backdrop-blur-xl">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Strefa</div>
          <div className="font-display text-xl font-semibold">{zone.room}</div>
        </div>
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-2xl glass"><X className="h-4 w-4" /></button>
      </div>

      <div className="space-y-4 p-5">
        <div className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${tone.from} ${tone.to} p-5`}>
          <div className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] ${tone.chip}`}>
            <SrcIcon className="h-3 w-3" /> {sourceLabel(src, zone)}
          </div>
          <div className="mt-3 flex items-end gap-4">
            <div className="stat-num text-5xl font-semibold leading-none">{zone.target.toFixed(1)}°</div>
            <div className="pb-1 text-xs text-muted-foreground">teraz {zone.current.toFixed(1)}° · {zone.humidity}% wilg.</div>
          </div>
        </div>

        <div className="premium-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Ostatnie 24h</div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <Dot c="hsl(var(--primary))" /> aktualna
              <Dot c="hsl(38 95% 65%)" /> cel
              <Dot c="hsl(190 95% 65%)" /> na zew.
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} interval={3} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Area dataKey="current" stroke="hsl(var(--primary))" fill="url(#g1)" strokeWidth={2} />
                <Area dataKey="target" stroke="hsl(38 95% 65%)" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                <Area dataKey="outdoor" stroke="hsl(190 95% 65%)" fill="none" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card">
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Źródła w tej strefie</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-amber-400" /> <span className="text-sm">Ogrzewanie podłogowe</span></div>
              <Switch checked={zone.hasUnderfloor} onCheckedChange={(v) => onChange({ ...zone, hasUnderfloor: v })} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-3 py-2.5">
              <div className="flex items-center gap-2"><Snowflake className="h-4 w-4 text-sky-400" /> <span className="text-sm">Klimatyzacja (split)</span></div>
              <Switch checked={zone.hasAC} onCheckedChange={(v) => onChange({ ...zone, hasAC: v })} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {sources.map((s) => (
              <button key={s.id} className="rounded-xl border border-border bg-white/[0.02] px-3 py-2 text-left text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Harmonogram dnia</div>
            <button className="text-[11px] text-primary">Edytuj</button>
          </div>
          <div className="space-y-2">
            {zone.schedule.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04]"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                <div className="flex-1">
                  <div className="text-sm">{p.label}</div>
                  <div className="text-[11px] text-muted-foreground">{p.time}</div>
                </div>
                <div className="stat-num text-base font-semibold">{p.target}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />;
}
