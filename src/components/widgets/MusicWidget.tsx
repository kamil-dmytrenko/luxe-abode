import { Pause, Play, SkipBack, SkipForward, Youtube } from "lucide-react";
import { useState } from "react";

export default function MusicWidget() {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="premium-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Teraz odtwarzane</div>
        <Youtube className="h-4 w-4 text-rose-500" />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-700">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 to-transparent" />
          <div className="absolute inset-0 grid place-items-center text-2xl">🎷</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">Late Night Lounge Jazz</div>
          <div className="truncate text-xs text-muted-foreground">Aurora Sounds · YouTube</div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/5 rounded-full bg-gradient-primary" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>1:42</span><span>4:18</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="grid h-10 w-10 place-items-center rounded-full glass ripple">
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform active:scale-95"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-full glass ripple">
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
