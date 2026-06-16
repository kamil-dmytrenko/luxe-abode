import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ALL_WIDGET_KEYS, WIDGETS } from "@/lib/widgets-registry";
import type { WidgetKey } from "@/lib/dashboard-storage";
import { Check, Plus } from "lucide-react";

export default function AddWidgetSheet({
  open, onOpenChange, used, onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  used: WidgetKey[];
  onAdd: (key: WidgetKey) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full border-border bg-background/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Dodaj widget</SheetTitle>
          <SheetDescription>Wybierz z biblioteki, aby umieścić go na pulpicie.</SheetDescription>
        </SheetHeader>
        <div className="mt-5 grid grid-cols-1 gap-2 overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {ALL_WIDGET_KEYS.map((k) => {
            const w = WIDGETS[k];
            const isUsed = used.includes(k);
            return (
              <button
                key={k}
                disabled={isUsed}
                onClick={() => onAdd(k)}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left transition ${isUsed ? "border-border opacity-60" : "border-border hover:border-primary/40 hover:bg-white/[0.02]"}`}
              >
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${w.gradient} opacity-40 blur-xl`} />
                <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <w.icon className="h-5 w-5" />
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{w.label}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{w.desc}</div>
                </div>
                <div className="relative">
                  {isUsed ? (
                    <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-[10px] text-success">
                      <Check className="h-3 w-3" /> W użyciu
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-[10px] text-primary">
                      <Plus className="h-3 w-3" /> Dodaj
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
