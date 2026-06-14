import { rooms } from "@/lib/mock-data";
import { Droplets } from "lucide-react";

export default function TempWidget() {
  return (
    <div className="premium-card">
      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Temperatura pomieszczeń</div>
      <div className="space-y-2.5">
        {rooms.slice(0, 5).map((r) => (
          <div key={r.id} className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04]"><r.icon className="h-4 w-4 text-primary/80" /></div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{r.name}</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Droplets className="h-3 w-3" /> {r.humidity}%
              </div>
            </div>
            <div className="stat-num text-lg font-semibold">{r.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
