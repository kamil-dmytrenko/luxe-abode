import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, Save, X, RotateCcw } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import WidgetFrame from "@/components/dashboard/WidgetFrame";
import AddWidgetSheet from "@/components/dashboard/AddWidgetSheet";
import { WIDGETS } from "@/lib/widgets-registry";
import {
  DEFAULT_LAYOUT, loadLayout, saveLayout, resetLayout,
  sizeToColSpan, nextSize, type LayoutItem, type WidgetKey,
} from "@/lib/dashboard-storage";
import { rooms } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<LayoutItem[]>(() => loadLayout());
  const [draft, setDraft] = useState<LayoutItem[] | null>(null);
  const [dragging, setDragging] = useState<WidgetKey | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const editing = draft !== null;
  const items = draft ?? layout;
  const used = useMemo(() => items.map((i) => i.key), [items]);

  useEffect(() => { saveLayout(layout); }, [layout]);

  const startEdit = () => setDraft([...layout]);
  const cancelEdit = () => { setDraft(null); setDragging(null); };
  const saveEdit = () => {
    if (!draft) return;
    setLayout(draft);
    setDraft(null);
    setDragging(null);
    toast({ title: "Pulpit zapisany", description: "Twój układ widgetów został zaktualizowany." });
  };
  const resetAll = () => {
    resetLayout();
    setLayout(DEFAULT_LAYOUT);
    setDraft([...DEFAULT_LAYOUT]);
    toast({ title: "Przywrócono domyślny pulpit" });
  };

  const onDrop = (target: WidgetKey) => {
    if (!draft || !dragging || dragging === target) return;
    const next = draft.filter((i) => i.key !== dragging);
    const idx = next.findIndex((i) => i.key === target);
    const moved = draft.find((i) => i.key === dragging)!;
    next.splice(idx, 0, moved);
    setDraft(next);
    setDragging(null);
  };

  const removeWidget = (key: WidgetKey) => {
    if (!draft) return;
    setDraft(draft.filter((i) => i.key !== key));
  };
  const resizeWidget = (key: WidgetKey) => {
    if (!draft) return;
    setDraft(draft.map((i) => (i.key === key ? { ...i, size: nextSize[i.size] } : i)));
  };
  const addWidget = (key: WidgetKey) => {
    if (!draft) return;
    if (draft.some((i) => i.key === key)) return;
    setDraft([...draft, { key, size: WIDGETS[key].defaultSize }]);
    setAddOpen(false);
    toast({ title: `Dodano: ${WIDGETS[key].label}` });
  };

  const hour = new Date().getHours();
  const greet = hour < 5 ? "Dobrej nocy" : hour < 12 ? "Dzień dobry" : hour < 18 ? "Miłego dnia" : "Dobry wieczór";

  const headerAction = editing ? (
    <div className="flex gap-2">
      <Button size="sm" variant="ghost" onClick={resetAll} className="gap-1.5">
        <RotateCcw className="h-3.5 w-3.5" /> Reset
      </Button>
      <Button size="sm" variant="outline" onClick={cancelEdit} className="gap-1.5">
        <X className="h-3.5 w-3.5" /> Anuluj
      </Button>
      <Button size="sm" onClick={saveEdit} className="gap-1.5 bg-gradient-primary text-primary-foreground hover:opacity-90">
        <Save className="h-3.5 w-3.5" /> Zapisz
      </Button>
    </div>
  ) : (
    <Button size="sm" variant="outline" onClick={startEdit} className="gap-1.5">
      <Pencil className="h-3.5 w-3.5" /> Edytuj pulpit
    </Button>
  );

  return (
    <div>
      <PageHeader
        eyebrow={editing ? "Tryb edycji" : greet}
        title={editing ? "Dostosuj pulpit" : "Kasia"}
        subtitle={editing
          ? "Przeciągnij, zmień rozmiar lub usuń widgety. Dodaj nowe z biblioteki."
          : "Dom jest w trybie Dzień — wszystko działa stabilnie."}
        action={headerAction}
      />

      {/* Quick rooms */}
      <div className="mb-2 mt-2 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar lg:px-10">
        {rooms.slice(0, 6).map((r) => (
          <button
            key={r.id}
            onClick={() => navigate("/rooms")}
            className={`shrink-0 rounded-2xl border border-border bg-gradient-to-br ${r.image} px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-primary/30`}
          >
            <r.icon className="h-4 w-4 text-foreground/90" />
            <div className="mt-2 text-xs text-foreground/80">{r.name}</div>
            <div className="stat-num text-lg font-semibold">{r.temp}°</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 px-5 pb-6 lg:grid-cols-4 lg:gap-4 lg:px-10">
        {items.map((item) => {
          const meta = WIDGETS[item.key];
          if (!meta) return null;
          return (
            <WidgetFrame
              key={item.key}
              widgetKey={item.key}
              size={item.size}
              route={meta.route}
              editing={editing}
              dragging={dragging === item.key}
              span={sizeToColSpan[item.size]}
              onDragStart={() => setDragging(item.key)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(item.key)}
              onDragEnd={() => setDragging(null)}
              onRemove={() => removeWidget(item.key)}
              onResize={() => resizeWidget(item.key)}
            >
              {meta.render()}
            </WidgetFrame>
          );
        })}

        {editing && (
          <button
            onClick={() => setAddOpen(true)}
            className="group relative grid min-h-[160px] place-items-center rounded-3xl border-2 border-dashed border-primary/30 bg-primary/[0.03] text-primary transition hover:border-primary/60 hover:bg-primary/[0.06] lg:col-span-2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition group-hover:scale-110">
                <Plus className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">Dodaj widget</div>
              <div className="text-[11px] text-muted-foreground">Wybierz z biblioteki</div>
            </div>
          </button>
        )}

        {items.length === 0 && !editing && (
          <div className="col-span-full grid place-items-center rounded-3xl border border-dashed border-border py-16 text-center">
            <div className="text-sm text-muted-foreground">Pulpit jest pusty.</div>
            <Button onClick={startEdit} className="mt-3 bg-gradient-primary text-primary-foreground">Dostosuj pulpit</Button>
          </div>
        )}
      </div>

      <AddWidgetSheet open={addOpen} onOpenChange={setAddOpen} used={used} onAdd={addWidget} />
    </div>
  );
}
