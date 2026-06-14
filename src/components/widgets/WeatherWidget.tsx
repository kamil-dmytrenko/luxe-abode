import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { weather } from "@/lib/mock-data";

const icon = (c: string) => c === "sun" ? Sun : c === "rain" ? CloudRain : Cloud;

export default function WeatherWidget() {
  return (
    <div className="premium-card noise overflow-hidden lg:col-span-2">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-500/10 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pogoda</div>
          <div className="mt-1 font-display text-base font-medium">{weather.city}</div>
          <div className="mt-4 flex items-end gap-2">
            <div className="stat-num text-6xl font-semibold leading-none">{weather.temp}°</div>
            <div className="pb-2 text-xs text-muted-foreground">
              <div>odczuwalna {weather.feels}°</div>
              <div>{weather.hi}° / {weather.lo}°</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{weather.condition}</div>
        </div>
        <div className="grid place-items-center">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/60 to-amber-500/0 blur-xl" />
            <Sun className="relative h-24 w-24 text-amber-300 animate-spin-slow" strokeWidth={1.2} />
          </div>
        </div>
      </div>
      <div className="relative mt-5 flex justify-between gap-2 overflow-x-auto no-scrollbar">
        {weather.forecast.map((f, i) => {
          const Icon = icon(f.c);
          return (
            <div key={i} className="flex min-w-[58px] flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] px-3 py-2">
              <div className="text-[10px] text-muted-foreground">{f.d}</div>
              <Icon className="h-4 w-4 text-amber-300" />
              <div className="stat-num text-sm">{f.t}°</div>
            </div>
          );
        })}
      </div>
      <div className="relative mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Wind className="h-3.5 w-3.5" /> {weather.wind} km/h</span>
        <span>Wilgotność {weather.humidity}%</span>
      </div>
    </div>
  );
}
