import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const date = now.toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div className="premium-card relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Czas</div>
          <div className="stat-num mt-2 text-5xl font-semibold leading-none">
            {hh}<span className="text-primary">:</span>{mm}
          </div>
          <div className="mt-2 text-sm capitalize text-muted-foreground">{date}</div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Clock className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
