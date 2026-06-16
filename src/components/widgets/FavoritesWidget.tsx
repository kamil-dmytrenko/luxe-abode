import { Lightbulb, Blinds, Thermometer, Sparkles } from "lucide-react";

const favs = [
  { id: "f1", name: "Salon · Sufit", icon: Lightbulb, status: "78%", on: true },
  { id: "f2", name: "Rolety taras", icon: Blinds, status: "100%", on: true },
  { id: "f3", name: "Sypialnia · klimat", icon: Thermometer, status: "21°", on: true },
  { id: "f4", name: "Scena Kino", icon: Sparkles, status: "Aktywuj", on: false },
];

export default function FavoritesWidget() {
  return (
    <div className="premium-card">
      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Ulubione</div>
      <div className="grid grid-cols-2 gap-2">
        {favs.map((f) => (
          <button
            key={f.id}
            onClick={(e) => e.stopPropagation()}
            className="group flex items-center gap-2 rounded-2xl border border-border bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-primary/30"
          >
            <div className={`grid h-9 w-9 place-items-center rounded-xl ${f.on ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-white/[0.04] text-muted-foreground"}`}>
              <f.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-medium">{f.name}</div>
              <div className="text-[10px] text-muted-foreground">{f.status}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
