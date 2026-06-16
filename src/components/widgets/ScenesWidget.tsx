import { scenes } from "@/lib/mock-data";

export default function ScenesWidget() {
  return (
    <div className="premium-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Szybkie sceny</div>
        <span className="text-xs text-primary">Wszystkie →</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {scenes.slice(0, 4).map((s) => (
          <button key={s.id} onClick={(e) => e.stopPropagation()} className="group relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-3 text-left transition hover:border-primary/30">
            <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-30 blur-xl transition group-hover:opacity-60`} />
            <s.icon className="relative h-5 w-5 text-primary" />
            <div className="relative mt-2 text-sm font-medium">{s.name}</div>
            <div className="relative line-clamp-1 text-[10px] text-muted-foreground">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
