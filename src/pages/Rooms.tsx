import { Link } from "react-router-dom";
import { Droplets, Lightbulb, ThermometerSun } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { rooms } from "@/lib/mock-data";

export default function Rooms() {
  return (
    <div>
      <PageHeader eyebrow="Dom" title="Pomieszczenia" subtitle="Wszystkie strefy w jednym widoku." />
      <div className="grid grid-cols-1 gap-3 px-5 pb-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {rooms.map((r) => (
          <Link key={r.id} to={`/rooms/${r.id}`} className={`premium-card relative overflow-hidden bg-gradient-to-br ${r.image}`}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur"><r.icon className="h-6 w-6 text-white" /></div>
              <div className="text-right">
                <div className="stat-num text-3xl font-semibold">{r.temp}°</div>
                <div className="text-[11px] text-foreground/70 flex items-center justify-end gap-1"><Droplets className="h-3 w-3" /> {r.humidity}%</div>
              </div>
            </div>
            <div className="relative mt-6">
              <div className="font-display text-xl font-semibold">{r.name}</div>
              <div className="mt-1 flex items-center gap-3 text-xs text-foreground/80">
                <span className="flex items-center gap-1"><Lightbulb className="h-3 w-3" /> {r.devicesOn}/{r.devicesTotal}</span>
                <span className="flex items-center gap-1"><ThermometerSun className="h-3 w-3" /> Auto</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
