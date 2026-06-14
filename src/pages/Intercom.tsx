import { PhoneCall, PhoneOff, Mic, Video, DoorOpen, Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { intercomCalls } from "@/lib/mock-data";

export default function Intercom() {
  const [ringing, setRinging] = useState(true);

  return (
    <div>
      <PageHeader eyebrow="Domofon" title="Wejście" subtitle="Brama wjazdowa · właśnie teraz" />

      <div className="grid grid-cols-1 gap-4 px-5 pb-6 lg:grid-cols-3 lg:px-10">
        <div className="premium-card !p-0 overflow-hidden lg:col-span-2">
          <div className="relative aspect-video" style={{ background: "linear-gradient(135deg,#0c1a2b,#1a2e4a)" }}>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px)" }} />
            {/* Silhouette */}
            <div className="absolute bottom-0 left-1/2 h-3/4 w-40 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-zinc-700/50 to-zinc-900/80" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              POŁĄCZENIE PRZYCHODZĄCE
            </div>
            <div className="absolute right-4 top-4 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">14:42</div>

            {ringing && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-glow">
                    <PhoneCall className="h-10 w-10" />
                  </div>
                  <div className="mt-3 font-display text-lg">Brama wjazdowa</div>
                  <div className="text-xs text-muted-foreground">dzwoni…</div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3 p-4">
            <button onClick={() => { setRinging(false); toast("Rozmowa odrzucona"); }} className="grid h-14 w-14 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-lg active:scale-95 transition">
              <PhoneOff className="h-6 w-6" />
            </button>
            <button onClick={() => { setRinging(false); toast.success("Połączono"); }} className="grid h-16 w-16 place-items-center rounded-full bg-success text-white shadow-glow active:scale-95 transition">
              <PhoneCall className="h-7 w-7" />
            </button>
            <button onClick={() => toast.success("Brama otwarta")} className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow active:scale-95 transition">
              <DoorOpen className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 px-4 pb-4">
            <button className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1.5"><Mic className="h-3.5 w-3.5" /> Mikrofon</button>
            <button className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1.5"><Video className="h-3.5 w-3.5" /> Wideo</button>
            <button className="rounded-xl glass py-2 text-xs flex items-center justify-center gap-1.5"><Volume2 className="h-3.5 w-3.5" /> Głośnik</button>
          </div>
        </div>

        <div className="premium-card">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Historia połączeń</div>
          <div className="mt-3 space-y-2">
            {intercomCalls.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3">
                <div className={`grid h-9 w-9 place-items-center rounded-xl ${c.status === "missed" ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"}`}>
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{c.from}</div>
                  <div className="text-[11px] text-muted-foreground">{c.time}</div>
                </div>
                <span className={`text-xs ${c.status === "missed" ? "text-destructive" : "text-success"}`}>{c.status === "missed" ? "Nieodebrane" : "Odebrane"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
