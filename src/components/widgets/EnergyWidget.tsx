import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { energyHourly } from "@/lib/mock-data";
import { TrendingDown, Zap } from "lucide-react";

export default function EnergyWidget() {
  const today = energyHourly.reduce((s, h) => s + h.use, 0).toFixed(1);
  return (
    <div className="premium-card lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Zużycie energii dziś</div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="stat-num text-4xl font-semibold">{today}</div>
            <div className="text-sm text-muted-foreground">kWh</div>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-success">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>-12% vs. wczoraj</span>
          </div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Zap className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 h-32">
        <ResponsiveContainer>
          <AreaChart data={energyHourly}>
            <defs>
              <linearGradient id="useGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 95% 65%)" stopOpacity={0.7} />
                <stop offset="100%" stopColor="hsl(38 95% 65%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152 65% 52%)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="hsl(152 65% 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" hide />
            <Tooltip contentStyle={{ background: "hsl(230 25% 8%)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            <Area type="monotone" dataKey="solar" stroke="hsl(152 65% 52%)" fill="url(#solarGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="use" stroke="hsl(38 95% 65%)" fill="url(#useGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Zużycie</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Solar</span>
      </div>
    </div>
  );
}
