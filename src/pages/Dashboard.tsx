import { useState } from "react";
import { GripVertical } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import MusicWidget from "@/components/widgets/MusicWidget";
import EnergyWidget from "@/components/widgets/EnergyWidget";
import TempWidget from "@/components/widgets/TempWidget";
import AlarmWidget from "@/components/widgets/AlarmWidget";
import ScenesWidget from "@/components/widgets/ScenesWidget";
import CamerasWidget from "@/components/widgets/CamerasWidget";
import { rooms } from "@/lib/mock-data";

type WidgetKey = "weather" | "energy" | "music" | "temp" | "alarm" | "scenes" | "cameras";

const widgets: Record<WidgetKey, { node: JSX.Element; span: string }> = {
  weather: { node: <WeatherWidget />, span: "lg:col-span-2" },
  energy: { node: <EnergyWidget />, span: "lg:col-span-2" },
  music: { node: <MusicWidget />, span: "lg:col-span-2" },
  temp: { node: <TempWidget />, span: "lg:col-span-2" },
  alarm: { node: <AlarmWidget />, span: "lg:col-span-2" },
  scenes: { node: <ScenesWidget />, span: "lg:col-span-2" },
  cameras: { node: <CamerasWidget />, span: "lg:col-span-4" },
};

const DEFAULT_ORDER: WidgetKey[] = ["weather", "energy", "alarm", "scenes", "temp", "music", "cameras"];

export default function Dashboard() {
  const [order, setOrder] = useState<WidgetKey[]>(DEFAULT_ORDER);
  const [dragging, setDragging] = useState<WidgetKey | null>(null);

  const onDrop = (target: WidgetKey) => {
    if (!dragging || dragging === target) return;
    const next = order.filter((k) => k !== dragging);
    const idx = next.indexOf(target);
    next.splice(idx, 0, dragging);
    setOrder(next);
    setDragging(null);
  };

  const hour = new Date().getHours();
  const greet = hour < 5 ? "Dobrej nocy" : hour < 12 ? "Dzień dobry" : hour < 18 ? "Miłego dnia" : "Dobry wieczór";

  return (
    <div>
      <PageHeader eyebrow={greet} title="Kasia" subtitle="Dom jest w trybie Dzień — wszystko działa stabilnie." />

      {/* Quick rooms */}
      <div className="mb-2 mt-2 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar lg:px-10">
        {rooms.slice(0, 6).map((r) => (
          <button key={r.id} className={`shrink-0 rounded-2xl border border-border bg-gradient-to-br ${r.image} px-4 py-3 text-left transition hover:border-primary/30`}>
            <r.icon className="h-4 w-4 text-foreground/90" />
            <div className="mt-2 text-xs text-foreground/80">{r.name}</div>
            <div className="stat-num text-lg font-semibold">{r.temp}°</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 px-5 pb-6 lg:grid-cols-4 lg:gap-4 lg:px-10">
        {order.map((key) => (
          <div
            key={key}
            draggable
            onDragStart={() => setDragging(key)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(key)}
            className={`group relative ${widgets[key].span} animate-slide-up ${dragging === key ? "opacity-50" : ""}`}
          >
            <button className="absolute right-3 top-3 z-10 hidden h-7 w-7 cursor-grab place-items-center rounded-lg bg-black/40 text-muted-foreground opacity-0 backdrop-blur transition group-hover:opacity-100 lg:grid">
              <GripVertical className="h-3.5 w-3.5" />
            </button>
            {widgets[key].node}
          </div>
        ))}
      </div>
    </div>
  );
}
