import { Leaf, Wind } from "lucide-react";

export default function AirWidget() {
  const aqi = 28, pm25 = 6, pm10 = 11;
  return (
    <div className="premium-card relative overflow-hidden">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-success/15 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Jakość powietrza</div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="stat-num text-4xl font-semibold">{aqi}</div>
            <div className="text-sm text-success">Doskonała</div>
          </div>
          <div className="mt-3 flex gap-3 text-[11px] text-muted-foreground">
            <span>PM2.5 · {pm25}</span><span>PM10 · {pm10}</span>
          </div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-success/20 text-success">
          <Leaf className="h-5 w-5" />
        </div>
      </div>
      <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-success to-emerald-300" />
      </div>
      <div className="relative mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
        <Wind className="h-3 w-3" /> Wentylacja: tryb auto
      </div>
    </div>
  );
}
