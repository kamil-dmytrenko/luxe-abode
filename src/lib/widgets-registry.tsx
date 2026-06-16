import {
  CloudSun, Zap, Music, Thermometer, ShieldCheck, Sparkles, Camera,
  Clock, Leaf, Star, type LucideIcon,
} from "lucide-react";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import EnergyWidget from "@/components/widgets/EnergyWidget";
import MusicWidget from "@/components/widgets/MusicWidget";
import TempWidget from "@/components/widgets/TempWidget";
import AlarmWidget from "@/components/widgets/AlarmWidget";
import ScenesWidget from "@/components/widgets/ScenesWidget";
import CamerasWidget from "@/components/widgets/CamerasWidget";
import ClockWidget from "@/components/widgets/ClockWidget";
import AirWidget from "@/components/widgets/AirWidget";
import FavoritesWidget from "@/components/widgets/FavoritesWidget";
import type { WidgetKey, WidgetSize } from "@/lib/dashboard-storage";

export type WidgetMeta = {
  key: WidgetKey;
  label: string;
  desc: string;
  icon: LucideIcon;
  route: string | null;
  defaultSize: WidgetSize;
  render: () => JSX.Element;
  gradient: string;
};

export const WIDGETS: Record<WidgetKey, WidgetMeta> = {
  weather: { key: "weather", label: "Pogoda", desc: "Aktualna pogoda i prognoza", icon: CloudSun, route: null, defaultSize: "m", render: () => <WeatherWidget />, gradient: "from-amber-400/40 to-rose-500/20" },
  energy: { key: "energy", label: "Energia", desc: "Zużycie i produkcja solar", icon: Zap, route: "/energy", defaultSize: "m", render: () => <EnergyWidget />, gradient: "from-amber-500/40 to-orange-500/20" },
  music: { key: "music", label: "Muzyka", desc: "Teraz odtwarzane", icon: Music, route: null, defaultSize: "m", render: () => <MusicWidget />, gradient: "from-rose-500/40 to-fuchsia-600/20" },
  temp: { key: "temp", label: "Temperatury", desc: "Temperatury pomieszczeń", icon: Thermometer, route: "/heating", defaultSize: "m", render: () => <TempWidget />, gradient: "from-sky-500/40 to-indigo-500/20" },
  alarm: { key: "alarm", label: "Alarm", desc: "Stan systemu bezpieczeństwa", icon: ShieldCheck, route: "/alarm", defaultSize: "m", render: () => <AlarmWidget />, gradient: "from-emerald-500/40 to-teal-500/20" },
  scenes: { key: "scenes", label: "Sceny", desc: "Szybkie sceny", icon: Sparkles, route: "/scenes", defaultSize: "m", render: () => <ScenesWidget />, gradient: "from-violet-500/40 to-fuchsia-600/20" },
  cameras: { key: "cameras", label: "Kamery", desc: "Podgląd na żywo", icon: Camera, route: "/cameras", defaultSize: "l", render: () => <CamerasWidget />, gradient: "from-slate-500/40 to-zinc-700/20" },
  clock: { key: "clock", label: "Zegar", desc: "Godzina i data", icon: Clock, route: null, defaultSize: "m", render: () => <ClockWidget />, gradient: "from-indigo-500/40 to-blue-600/20" },
  air: { key: "air", label: "Powietrze", desc: "Jakość powietrza w domu", icon: Leaf, route: null, defaultSize: "m", render: () => <AirWidget />, gradient: "from-emerald-400/40 to-lime-500/20" },
  favorites: { key: "favorites", label: "Ulubione", desc: "Skróty do urządzeń i scen", icon: Star, route: null, defaultSize: "m", render: () => <FavoritesWidget />, gradient: "from-amber-400/40 to-yellow-500/20" },
};

export const ALL_WIDGET_KEYS = Object.keys(WIDGETS) as WidgetKey[];
