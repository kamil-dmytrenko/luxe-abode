import { cameras } from "@/lib/mock-data";
import { Video, Circle } from "lucide-react";

export default function CamerasWidget() {
  return (
    <div className="premium-card lg:col-span-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Kamery — podgląd</div>
        <span className="text-xs text-primary">Wszystkie →</span>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {cameras.slice(0, 4).map((c) => (
          <div key={c.id} className="group relative aspect-video overflow-hidden rounded-2xl">
            <div className="absolute inset-0" style={{ background: c.preview }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] backdrop-blur">
              <Circle className={`h-2 w-2 ${c.recording ? "fill-rose-500 text-rose-500 animate-pulse" : "fill-muted text-muted"}`} />
              <span>{c.online ? "LIVE" : "OFFLINE"}</span>
            </div>
            <div className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md bg-black/40 backdrop-blur">
              <Video className="h-3 w-3" />
            </div>
            <div className="absolute bottom-2 left-2 text-xs font-medium">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
