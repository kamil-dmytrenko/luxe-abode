import { useState } from "react";
import { Circle, Maximize2, Mic, MicOff, Pause, Play, Video } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { cameras } from "@/lib/mock-data";

export default function Cameras() {
  const [selected, setSelected] = useState(cameras[0]);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  return (
    <div>
      <PageHeader eyebrow="Monitoring" title="Kamery" subtitle="Podgląd na żywo, nagrania i sterowanie." />
      <div className="grid grid-cols-1 gap-4 px-5 pb-6 lg:grid-cols-3 lg:px-10">
        <div className="lg:col-span-2">
          <div className="premium-card !p-0 overflow-hidden">
            <div className="relative aspect-video" style={{ background: selected.preview }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
              {/* Faux scanlines */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px)" }} />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">
                <Circle className={`h-2 w-2 ${selected.recording ? "fill-rose-500 text-rose-500 animate-pulse" : "fill-muted text-muted"}`} />
                {selected.online ? "LIVE" : "OFFLINE"} · {selected.name}
              </div>
              <div className="absolute right-4 top-4 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">14:42:18</div>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur">
                <button onClick={() => setPlaying(!playing)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => setMuted(!muted)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                  {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><Video className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Maximize2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div className="mt-4 premium-card">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Oś czasu — dziś</div>
            <div className="relative h-10 overflow-hidden rounded-xl bg-white/[0.04]">
              <div className="absolute inset-y-0 left-[15%] w-[3%] bg-rose-500/60" />
              <div className="absolute inset-y-0 left-[35%] w-[2%] bg-rose-500/60" />
              <div className="absolute inset-y-0 left-[55%] w-[5%] bg-amber-500/60" />
              <div className="absolute inset-y-0 left-[78%] w-[1%] bg-rose-500/60" />
              <div className="absolute inset-y-0 left-[60%] w-px bg-primary" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Wszystkie kamery</div>
          {cameras.map((c) => (
            <button key={c.id} onClick={() => setSelected(c)} className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition ${selected.id === c.id ? "border-primary/40 bg-primary/5" : "border-border"}`}>
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-xl" style={{ background: c.preview }}>
                <div className="absolute inset-0 bg-black/30" />
                <Circle className={`absolute left-1.5 top-1.5 h-1.5 w-1.5 ${c.online ? "fill-success text-success" : "fill-muted text-muted"}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.location} · {c.online ? "online" : "offline"}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
