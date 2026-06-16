export type WidgetKey =
  | "weather" | "energy" | "music" | "temp" | "alarm" | "scenes" | "cameras"
  | "clock" | "air" | "favorites";

export type WidgetSize = "s" | "m" | "l";

export type LayoutItem = { key: WidgetKey; size: WidgetSize };

const STORAGE_KEY = "aurora.dashboard.layout.v1";

export const DEFAULT_LAYOUT: LayoutItem[] = [
  { key: "weather", size: "m" },
  { key: "energy", size: "m" },
  { key: "alarm", size: "m" },
  { key: "scenes", size: "m" },
  { key: "temp", size: "m" },
  { key: "music", size: "m" },
  { key: "cameras", size: "l" },
];

export function loadLayout(): LayoutItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LAYOUT;
    const parsed = JSON.parse(raw) as LayoutItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_LAYOUT;
    return parsed;
  } catch {
    return DEFAULT_LAYOUT;
  }
}

export function saveLayout(layout: LayoutItem[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch {}
}

export function resetLayout() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

export const sizeToColSpan: Record<WidgetSize, string> = {
  s: "lg:col-span-1",
  m: "lg:col-span-2",
  l: "lg:col-span-4",
};

export const nextSize: Record<WidgetSize, WidgetSize> = { s: "m", m: "l", l: "s" };
