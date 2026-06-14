import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Blinds, Lightbulb, Thermometer, Wind } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import PageHeader from "@/components/PageHeader";
import { blinds, heating, lights, rooms } from "@/lib/mock-data";
import { useState } from "react";

export default function RoomDetail() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id) ?? rooms[0];
  const roomLights = lights.filter((l) => l.room === room.name);
  const roomBlinds = blinds.filter((b) => b.room === room.name);
  const roomHeat = heating.find((h) => h.room === room.name);
  const [target, setTarget] = useState(roomHeat?.target ?? 22);

  return (
    <div>
      <div className="px-5 pt-6 lg:px-10">
        <Link to="/rooms" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Pomieszczenia</Link>
      </div>
      <PageHeader eyebrow={`${room.devicesOn}/${room.devicesTotal} aktywnych`} title={room.name} subtitle={`${room.temp}° · wilgotność ${room.humidity}%`} />

      <div className="grid grid-cols-1 gap-3 px-5 pb-6 lg:grid-cols-3 lg:px-10">
        <div className={`premium-card bg-gradient-to-br ${room.image}`}>
          <div className="text-xs uppercase tracking-widest text-foreground/70">Klimat</div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="stat-num text-5xl font-semibold">{room.temp}°</div>
              <div className="text-xs text-foreground/80">Wilgotność {room.humidity}%</div>
            </div>
            <Thermometer className="h-10 w-10 text-foreground/80" />
          </div>
          {roomHeat && (
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-foreground/80"><span>Cel</span><span className="stat-num">{target}°</span></div>
              <Slider value={[target]} onValueChange={(v) => setTarget(v[0])} min={10} max={30} step={0.5} />
            </div>
          )}
        </div>

        <div className="premium-card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Lightbulb className="h-3.5 w-3.5" /> Światła</div>
            <span className="text-xs text-muted-foreground">{roomLights.filter((l) => l.on).length}/{roomLights.length}</span>
          </div>
          <div className="space-y-2.5">
            {roomLights.map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white/[0.02] p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: l.on ? `radial-gradient(circle at 30% 30%, ${l.color}cc, ${l.color}22 70%)` : "hsl(var(--muted))" }}>
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">{l.name}</div>
                  <div className="text-[11px] text-muted-foreground">{l.brightness}%</div>
                </div>
                <Switch defaultChecked={l.on} />
              </div>
            ))}
            {roomLights.length === 0 && <div className="text-sm text-muted-foreground">Brak świateł.</div>}
          </div>
        </div>

        <div className="premium-card lg:col-span-3">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Blinds className="h-3.5 w-3.5" /> Rolety</div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {roomBlinds.map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-white/[0.02] p-3">
                <div className="flex justify-between"><span className="text-sm">{b.name}</span><span className="stat-num">{b.position}%</span></div>
                <Slider defaultValue={[b.position]} className="mt-2" max={100} step={1} />
              </div>
            ))}
            {roomBlinds.length === 0 && <div className="text-sm text-muted-foreground">Brak rolet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
