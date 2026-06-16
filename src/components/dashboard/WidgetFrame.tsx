import { Maximize2, X, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { WidgetKey, WidgetSize } from "@/lib/dashboard-storage";

export default function WidgetFrame({
  widgetKey, size, route, editing, dragging, span,
  onDragStart, onDragOver, onDrop, onDragEnd,
  onRemove, onResize, children,
}: {
  widgetKey: WidgetKey;
  size: WidgetSize;
  route: string | null;
  editing: boolean;
  dragging: boolean;
  span: string;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onResize: () => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (editing) return;
    if (route) navigate(route);
  };

  return (
    <div
      draggable={editing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (!editing && route && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          navigate(route);
        }
      }}
      role={!editing && route ? "button" : undefined}
      tabIndex={!editing && route ? 0 : -1}
      className={`group relative animate-slide-up ${span} ${
        editing
          ? "cursor-grab rounded-3xl ring-1 ring-dashed ring-primary/40"
          : route
          ? "cursor-pointer transition-transform hover:-translate-y-0.5"
          : ""
      } ${dragging ? "scale-[0.98] opacity-50" : ""}`}
      data-widget={widgetKey}
    >
      {editing && (
        <>
          <div className="absolute right-2 top-2 z-20 flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onResize(); }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
              aria-label="Zmień rozmiar"
              title={`Rozmiar: ${size.toUpperCase()}`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-foreground backdrop-blur transition hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Usuń"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-muted-foreground backdrop-blur">
              <GripVertical className="h-3.5 w-3.5" />
            </div>
          </div>
          <span className="pointer-events-none absolute left-2 top-2 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary backdrop-blur">
            {size}
          </span>
        </>
      )}
      <div className={editing ? "pointer-events-none" : ""}>{children}</div>
    </div>
  );
}
