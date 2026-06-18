import {
  Bed, Sofa, ChefHat, Bath, Briefcase, Trees, Car, Baby,
  Sun, Moon, Film, Coffee, Plane, PartyPopper, BookOpen, Utensils,
  type LucideIcon,
} from "lucide-react";

export type Room = {
  id: string;
  name: string;
  icon: LucideIcon;
  temp: number;
  humidity: number;
  devicesOn: number;
  devicesTotal: number;
  image: string; // gradient classes
};

export const rooms: Room[] = [
  { id: "living", name: "Salon", icon: Sofa, temp: 22.5, humidity: 45, devicesOn: 4, devicesTotal: 9, image: "from-amber-500/30 to-rose-500/20" },
  { id: "kitchen", name: "Kuchnia", icon: ChefHat, temp: 23.1, humidity: 52, devicesOn: 2, devicesTotal: 7, image: "from-emerald-500/30 to-teal-500/20" },
  { id: "bedroom", name: "Sypialnia", icon: Bed, temp: 21.0, humidity: 48, devicesOn: 1, devicesTotal: 6, image: "from-indigo-500/30 to-violet-500/20" },
  { id: "bathroom", name: "Łazienka", icon: Bath, temp: 24.2, humidity: 65, devicesOn: 0, devicesTotal: 4, image: "from-sky-500/30 to-cyan-500/20" },
  { id: "office", name: "Gabinet", icon: Briefcase, temp: 22.0, humidity: 44, devicesOn: 3, devicesTotal: 5, image: "from-amber-400/30 to-orange-500/20" },
  { id: "kids", name: "Pokój dziecka", icon: Baby, temp: 22.8, humidity: 50, devicesOn: 1, devicesTotal: 4, image: "from-pink-500/30 to-fuchsia-500/20" },
  { id: "garage", name: "Garaż", icon: Car, temp: 16.4, humidity: 58, devicesOn: 0, devicesTotal: 3, image: "from-slate-500/30 to-zinc-500/20" },
  { id: "garden", name: "Ogród", icon: Trees, temp: 14.6, humidity: 72, devicesOn: 2, devicesTotal: 5, image: "from-green-500/30 to-lime-500/20" },
];

export type Light = {
  id: string; name: string; room: string; on: boolean; brightness: number; color: string; type: "ceiling" | "lamp" | "led" | "spot";
};
export const lights: Light[] = [
  { id: "l1", name: "Sufit główny", room: "Salon", on: true, brightness: 78, color: "#FFD89B", type: "ceiling" },
  { id: "l2", name: "Lampa przy kanapie", room: "Salon", on: true, brightness: 45, color: "#FFB36B", type: "lamp" },
  { id: "l3", name: "Taśma LED TV", room: "Salon", on: true, brightness: 60, color: "#7AB8FF", type: "led" },
  { id: "l4", name: "Spoty kuchenne", room: "Kuchnia", on: true, brightness: 90, color: "#FFFFFF", type: "spot" },
  { id: "l5", name: "Wyspa", room: "Kuchnia", on: false, brightness: 0, color: "#FFE7B0", type: "ceiling" },
  { id: "l6", name: "Nocna lampka", room: "Sypialnia", on: true, brightness: 25, color: "#FF9A6B", type: "lamp" },
  { id: "l7", name: "Lustro", room: "Łazienka", on: false, brightness: 0, color: "#FFFFFF", type: "led" },
  { id: "l8", name: "Biurko", room: "Gabinet", on: true, brightness: 70, color: "#FFFFFF", type: "lamp" },
  { id: "l9", name: "Sufitowe", room: "Gabinet", on: true, brightness: 55, color: "#FFE7B0", type: "ceiling" },
  { id: "l10", name: "Lampka nocna", room: "Pokój dziecka", on: true, brightness: 30, color: "#FFB3D9", type: "lamp" },
  { id: "l11", name: "Reflektory", room: "Ogród", on: true, brightness: 85, color: "#7AB8FF", type: "spot" },
  { id: "l12", name: "Tarasowe", room: "Ogród", on: true, brightness: 50, color: "#FFE7B0", type: "led" },
];

export type Blind = { id: string; name: string; room: string; position: number /* 0 closed, 100 open */ };
export const blinds: Blind[] = [
  { id: "b1", name: "Okno południowe", room: "Salon", position: 85 },
  { id: "b2", name: "Drzwi tarasowe", room: "Salon", position: 100 },
  { id: "b3", name: "Okno kuchenne", room: "Kuchnia", position: 60 },
  { id: "b4", name: "Sypialnia", room: "Sypialnia", position: 0 },
  { id: "b5", name: "Łazienka", room: "Łazienka", position: 40 },
  { id: "b6", name: "Gabinet", room: "Gabinet", position: 70 },
  { id: "b7", name: "Pokój dziecka", room: "Pokój dziecka", position: 50 },
];

export type Heating = { id: string; name: string; room: string; current: number; target: number; mode: "auto" | "manual" | "eco" | "off" };
export const heating: Heating[] = [
  { id: "h1", name: "Salon", room: "Salon", current: 22.5, target: 22, mode: "auto" },
  { id: "h2", name: "Kuchnia", room: "Kuchnia", current: 23.1, target: 22, mode: "auto" },
  { id: "h3", name: "Sypialnia", room: "Sypialnia", current: 21.0, target: 20, mode: "eco" },
  { id: "h4", name: "Łazienka", room: "Łazienka", current: 24.2, target: 24, mode: "auto" },
  { id: "h5", name: "Gabinet", room: "Gabinet", current: 22.0, target: 22, mode: "manual" },
  { id: "h6", name: "Pokój dziecka", room: "Pokój dziecka", current: 22.8, target: 22, mode: "auto" },
  { id: "h7", name: "Garaż", room: "Garaż", current: 16.4, target: 15, mode: "eco" },
];

export type AC = { id: string; name: string; room: string; on: boolean; target: number; fan: "low" | "mid" | "high" | "auto"; mode: "cool" | "heat" | "dry" | "fan" };
export const acs: AC[] = [
  { id: "ac1", name: "Salon", room: "Salon", on: false, target: 23, fan: "auto", mode: "cool" },
  { id: "ac2", name: "Sypialnia", room: "Sypialnia", on: true, target: 21, fan: "low", mode: "cool" },
  { id: "ac3", name: "Gabinet", room: "Gabinet", on: false, target: 22, fan: "mid", mode: "cool" },
];

export type ClimateMode = "auto" | "comfort" | "eco" | "boost" | "off";
export type ClimateZone = {
  id: string;
  room: string;
  current: number;
  humidity: number;
  target: number;
  mode: ClimateMode;
  hasUnderfloor: boolean;
  hasAC: boolean;
  schedule: { time: string; target: number; label: string }[];
  notice?: string;
};

export const climateZones: ClimateZone[] = [
  { id: "z1", room: "Salon", current: 22.5, humidity: 45, target: 22.0, mode: "auto", hasUnderfloor: true, hasAC: true, schedule: [
    { time: "06:30", target: 22, label: "Poranek" }, { time: "09:00", target: 21, label: "Dzień" },
    { time: "17:30", target: 22.5, label: "Wieczór" }, { time: "22:30", target: 20, label: "Noc" },
  ]},
  { id: "z2", room: "Kuchnia", current: 23.1, humidity: 52, target: 22.0, mode: "auto", hasUnderfloor: true, hasAC: false, schedule: [
    { time: "06:30", target: 22, label: "Poranek" }, { time: "09:00", target: 21, label: "Dzień" },
    { time: "17:30", target: 22, label: "Wieczór" }, { time: "22:30", target: 20, label: "Noc" },
  ]},
  { id: "z3", room: "Sypialnia", current: 21.0, humidity: 48, target: 20.0, mode: "eco", hasUnderfloor: true, hasAC: true, schedule: [
    { time: "06:30", target: 21, label: "Poranek" }, { time: "09:00", target: 19, label: "Dzień" },
    { time: "21:00", target: 20, label: "Wieczór" }, { time: "23:00", target: 18.5, label: "Noc" },
  ], notice: "Otwarte okno — wstrzymano grzanie 10 min" },
  { id: "z4", room: "Łazienka", current: 24.2, humidity: 65, target: 24.0, mode: "comfort", hasUnderfloor: true, hasAC: false, schedule: [
    { time: "06:00", target: 25, label: "Poranek" }, { time: "09:00", target: 23, label: "Dzień" },
    { time: "20:00", target: 24, label: "Wieczór" }, { time: "23:00", target: 22, label: "Noc" },
  ]},
  { id: "z5", room: "Gabinet", current: 22.0, humidity: 44, target: 22.0, mode: "auto", hasUnderfloor: true, hasAC: true, schedule: [
    { time: "07:00", target: 22, label: "Poranek" }, { time: "09:00", target: 22, label: "Dzień" },
    { time: "18:00", target: 21, label: "Wieczór" }, { time: "22:00", target: 19, label: "Noc" },
  ]},
  { id: "z6", room: "Pokój dziecka", current: 22.8, humidity: 50, target: 22.0, mode: "auto", hasUnderfloor: true, hasAC: false, schedule: [
    { time: "06:30", target: 22, label: "Poranek" }, { time: "09:00", target: 21, label: "Dzień" },
    { time: "19:00", target: 22, label: "Wieczór" }, { time: "21:00", target: 20.5, label: "Noc" },
  ]},
  { id: "z7", room: "Garaż", current: 16.4, humidity: 58, target: 15.0, mode: "eco", hasUnderfloor: false, hasAC: false, schedule: [
    { time: "06:00", target: 15, label: "Poranek" }, { time: "09:00", target: 15, label: "Dzień" },
    { time: "18:00", target: 15, label: "Wieczór" }, { time: "22:00", target: 14, label: "Noc" },
  ]},
];

export type Scene = { id: string; name: string; desc: string; icon: LucideIcon; gradient: string; active?: boolean };
export const scenes: Scene[] = [
  { id: "s1", name: "Dzień dobry", desc: "Rolety w górę, kawa, łagodne światło", icon: Sun, gradient: "from-amber-400 to-orange-500", active: true },
  { id: "s2", name: "Dobranoc", desc: "Wszystko wyłącz, alarm uzbrojony", icon: Moon, gradient: "from-indigo-500 to-purple-600" },
  { id: "s3", name: "Kino", desc: "Przyciemnione światło, projektor", icon: Film, gradient: "from-rose-500 to-fuchsia-600" },
  { id: "s4", name: "Skupienie", desc: "Tylko biurko, klimatyzacja 22°", icon: BookOpen, gradient: "from-sky-500 to-blue-600" },
  { id: "s5", name: "Kawa", desc: "Spoty 100%, muzyka jazz", icon: Coffee, gradient: "from-amber-600 to-stone-700" },
  { id: "s6", name: "Wyjście", desc: "Wszystko off, alarm full", icon: Plane, gradient: "from-slate-500 to-zinc-700" },
  { id: "s7", name: "Impreza", desc: "Kolorowe LED, głośna muzyka", icon: PartyPopper, gradient: "from-pink-500 to-violet-600" },
  { id: "s8", name: "Kolacja", desc: "Wyspa 60%, świece", icon: Utensils, gradient: "from-orange-500 to-red-600" },
];

export type Camera = { id: string; name: string; location: string; online: boolean; recording: boolean; preview: string };
export const cameras: Camera[] = [
  { id: "c1", name: "Brama wjazdowa", location: "Zewnątrz", online: true, recording: true, preview: "linear-gradient(135deg,#0f1d2e,#1e3a5f)" },
  { id: "c2", name: "Wejście główne", location: "Zewnątrz", online: true, recording: true, preview: "linear-gradient(135deg,#1a1a2e,#0f3460)" },
  { id: "c3", name: "Taras", location: "Zewnątrz", online: true, recording: false, preview: "linear-gradient(135deg,#0d1f1d,#1f4f3a)" },
  { id: "c4", name: "Garaż", location: "Wewnątrz", online: true, recording: true, preview: "linear-gradient(135deg,#222,#444)" },
  { id: "c5", name: "Hol", location: "Wewnątrz", online: false, recording: false, preview: "linear-gradient(135deg,#1c1c2e,#2c2c3e)" },
  { id: "c6", name: "Salon", location: "Wewnątrz", online: true, recording: false, preview: "linear-gradient(135deg,#2e1c2a,#4a2a3e)" },
];

export type Schedule = { id: string; name: string; time: string; days: string[]; enabled: boolean; action: string };
export const schedules: Schedule[] = [
  { id: "sc1", name: "Poranna rolada", time: "06:45", days: ["Pn", "Wt", "Śr", "Cz", "Pt"], enabled: true, action: "Rolety: otwórz 80%" },
  { id: "sc2", name: "Ciepła łazienka", time: "06:30", days: ["Pn", "Wt", "Śr", "Cz", "Pt"], enabled: true, action: "Grzanie łazienki: 24°" },
  { id: "sc3", name: "Wieczorne LED", time: "21:00", days: ["Codziennie"], enabled: true, action: "Scena: Kino" },
  { id: "sc4", name: "Tryb nocny", time: "23:30", days: ["Codziennie"], enabled: true, action: "Scena: Dobranoc" },
  { id: "sc5", name: "Podlewanie ogrodu", time: "05:30", days: ["Pn", "Śr", "Pt", "Nd"], enabled: false, action: "Nawadnianie: 15 min" },
];

export type Automation = { id: string; name: string; trigger: string; action: string; enabled: boolean };
export const automations: Automation[] = [
  { id: "a1", name: "Przy zachodzie słońca", trigger: "Zmierzch (~19:42)", action: "Włącz oświetlenie ogrodu", enabled: true },
  { id: "a2", name: "Nikogo w domu", trigger: "Geofence — wszyscy poza", action: "Tryb Wyjście + alarm", enabled: true },
  { id: "a3", name: "Wykrycie ruchu — noc", trigger: "Kamera + 23:00-06:00", action: "Notyfikacja + nagranie", enabled: true },
  { id: "a4", name: "Wysokie zużycie energii", trigger: "Pobór > 6 kW", action: "Powiadomienie push", enabled: true },
  { id: "a5", name: "Otwarte okno + grzanie", trigger: "Czujnik okno + grzejnik on", action: "Wyłącz grzanie 15 min", enabled: true },
  { id: "a6", name: "Przyjazd do domu", trigger: "Geofence — wjazd 200 m", action: "Brama + światła wejścia", enabled: false },
];

export const energyHourly = Array.from({ length: 24 }).map((_, h) => ({
  hour: `${h}:00`,
  use: +(1.2 + Math.sin((h - 6) / 3.5) * 0.9 + (h > 17 && h < 23 ? 1.4 : 0) + Math.random() * 0.3).toFixed(2),
  solar: h >= 6 && h <= 19 ? +(Math.max(0, Math.sin(((h - 6) / 13) * Math.PI)) * 3.5 + Math.random() * 0.2).toFixed(2) : 0,
}));

export const energyDaily = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((d, i) => ({
  day: d,
  use: +(22 + Math.random() * 8).toFixed(1),
  solar: +(14 + Math.random() * 10).toFixed(1),
  cost: +(11 + Math.random() * 6).toFixed(2),
}));

export const energyBreakdown = [
  { name: "Ogrzewanie", value: 38, color: "#F59E0B" },
  { name: "Klimat", value: 14, color: "#38BDF8" },
  { name: "Światła", value: 12, color: "#A78BFA" },
  { name: "AGD", value: 22, color: "#34D399" },
  { name: "Inne", value: 14, color: "#94A3B8" },
];

export const weather = {
  city: "Warszawa",
  temp: 18,
  feels: 17,
  condition: "Częściowe zachmurzenie",
  hi: 22,
  lo: 11,
  humidity: 56,
  wind: 12,
  forecast: [
    { d: "Teraz", t: 18, c: "cloud" },
    { d: "16:00", t: 19, c: "sun" },
    { d: "17:00", t: 19, c: "sun" },
    { d: "18:00", t: 17, c: "cloud" },
    { d: "19:00", t: 15, c: "cloud" },
    { d: "20:00", t: 14, c: "rain" },
  ],
};

export const intercomCalls = [
  { id: "ic1", time: "Dzisiaj, 14:22", from: "Brama wjazdowa", status: "missed" as const },
  { id: "ic2", time: "Dzisiaj, 09:15", from: "Wejście główne", status: "answered" as const },
  { id: "ic3", time: "Wczoraj, 18:40", from: "Brama wjazdowa", status: "answered" as const },
  { id: "ic4", time: "Wczoraj, 12:05", from: "Brama wjazdowa", status: "missed" as const },
];

// ============= Ventilation (HRV / Rekuperacja) =============

export type HrvMode = "auto" | "away" | "boost" | "night" | "party" | "off";
export type HrvProbe = { id: "supply-in" | "exhaust-in" | "supply-out" | "exhaust-out"; label: string; temp: number; humidity: number };

export const hrv = {
  mode: "auto" as HrvMode,
  fanSpeed: 45, // %
  bypass: false, // letni bypass
  recovery: 86, // sprawność rekuperacji %
  airflow: 180, // m3/h
  filterUsage: 62, // %
  filterDaysLeft: 47,
  co2Avg: 612,
  vocAvg: 0.32, // mg/m3
  energySaved: 4.2, // kWh dzisiaj
  schedule: [
    { time: "06:30", mode: "boost" as HrvMode, label: "Poranek" },
    { time: "09:00", mode: "auto" as HrvMode, label: "Dzień" },
    { time: "18:00", mode: "auto" as HrvMode, label: "Wieczór" },
    { time: "22:30", mode: "night" as HrvMode, label: "Noc" },
  ],
  probes: [
    { id: "supply-in", label: "Nawiew (dom)", temp: 21.4, humidity: 42 },
    { id: "exhaust-in", label: "Wywiew (dom)", temp: 22.6, humidity: 48 },
    { id: "supply-out", label: "Czerpnia (zewn.)", temp: 6.8, humidity: 78 },
    { id: "exhaust-out", label: "Wyrzutnia (zewn.)", temp: 9.2, humidity: 71 },
  ] as HrvProbe[],
};

export type RoomSensor = {
  id: string; room: string; co2: number; voc: number; temp: number; humidity: number; pm25?: number;
};
export const roomSensors: RoomSensor[] = [
  { id: "rs1", room: "Salon", co2: 720, voc: 0.41, temp: 22.5, humidity: 45, pm25: 6 },
  { id: "rs2", room: "Sypialnia", co2: 980, voc: 0.55, temp: 21.0, humidity: 48, pm25: 7 },
  { id: "rs3", room: "Pokój dziecka", co2: 845, voc: 0.38, temp: 22.8, humidity: 50, pm25: 5 },
  { id: "rs4", room: "Łazienka", co2: 520, voc: 0.62, temp: 24.2, humidity: 65 },
  { id: "rs5", room: "WC", co2: 480, voc: 0.71, temp: 22.4, humidity: 58 },
  { id: "rs6", room: "Siłownia", co2: 1120, voc: 0.48, temp: 20.6, humidity: 55, pm25: 4 },
  { id: "rs7", room: "Gabinet", co2: 690, voc: 0.34, temp: 22.0, humidity: 44, pm25: 5 },
];

export const hrvHistory = Array.from({ length: 24 }).map((_, h) => ({
  hour: `${h}:00`,
  co2: Math.round(500 + Math.sin((h - 4) / 3) * 120 + (h >= 22 || h <= 6 ? 250 : 0) + Math.random() * 60),
  voc: +(0.25 + Math.sin((h - 8) / 4) * 0.15 + Math.random() * 0.05).toFixed(2),
  humidity: Math.round(44 + Math.sin(h / 4) * 6 + Math.random() * 3),
}));
