import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "@/components/PageHeader";
import { energyBreakdown, energyDaily, energyHourly } from "@/lib/mock-data";
import { TrendingDown, TrendingUp, Zap, Sun, PiggyBank } from "lucide-react";

const Stat = ({ icon: Icon, label, value, sub, up }: any) => (
  <div className="premium-card">
    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow"><Icon className="h-4 w-4" /></div>
    </div>
    <div className="stat-num mt-2 text-3xl font-semibold">{value}</div>
    <div className={`mt-1 flex items-center gap-1 text-xs ${up ? "text-warning" : "text-success"}`}>
      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />} {sub}
    </div>
  </div>
);

export default function Energy() {
  return (
    <div>
      <PageHeader eyebrow="Inteligentny pomiar" title="Monitoring energii" subtitle="Pełna kontrola nad zużyciem, produkcją solarną i kosztami." />

      <div className="grid grid-cols-2 gap-3 px-5 lg:grid-cols-4 lg:px-10">
        <Stat icon={Zap} label="Dziś" value="28.4 kWh" sub="-12% vs. wczoraj" />
        <Stat icon={Sun} label="Solar" value="18.6 kWh" sub="+22% vs. wczoraj" up />
        <Stat icon={PiggyBank} label="Koszt" value="14,82 zł" sub="-8% w tym tyg." />
        <Stat icon={Zap} label="Pobór teraz" value="1.42 kW" sub="-5% średnia" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-5 pb-6 pt-3 lg:grid-cols-3 lg:px-10">
        <div className="premium-card lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Dzień — godzinowo</div>
              <div className="mt-1 font-display text-lg">Zużycie vs. produkcja</div>
            </div>
            <div className="flex gap-1 text-xs">
              {["Dzień", "Tydzień", "Miesiąc"].map((t, i) => (
                <button key={t} className={`rounded-lg px-2.5 py-1 ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={energyHourly}>
                <defs>
                  <linearGradient id="u" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(38 95% 65%)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(38 95% 65%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152 65% 52%)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(152 65% 52%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ background: "hsl(230 25% 8%)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area type="monotone" dataKey="solar" stroke="hsl(152 65% 52%)" fill="url(#s)" strokeWidth={2} />
                <Area type="monotone" dataKey="use" stroke="hsl(38 95% 65%)" fill="url(#u)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Podział zużycia</div>
          <div className="mt-1 font-display text-lg">Tydzień</div>
          <div className="relative h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={energyBreakdown} dataKey="value" innerRadius={60} outerRadius={88} paddingAngle={3} stroke="none">
                  {energyBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(230 25% 8%)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Łącznie</div>
                <div className="stat-num text-2xl font-semibold">182 kWh</div>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {energyBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                <span className="flex-1">{d.name}</span>
                <span className="stat-num text-muted-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card lg:col-span-3">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Tydzień</div>
              <div className="font-display text-lg">Bilans dzienny</div>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={energyDaily}>
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{ background: "hsl(230 25% 8%)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="use" fill="hsl(38 95% 65%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="solar" fill="hsl(152 65% 52%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
