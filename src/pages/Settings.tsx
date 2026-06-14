import { Bell, Globe, HelpCircle, Lock, LogOut, Moon, Shield, User, Wifi, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/PageHeader";

const sections = [
  {
    title: "Konto",
    items: [
      { icon: User, label: "Profil użytkownika", value: "Kasia Nowak" },
      { icon: Shield, label: "Bezpieczeństwo i 2FA", value: "Włączone", on: true },
      { icon: Lock, label: "Zmień hasło", value: "" },
    ],
  },
  {
    title: "Preferencje",
    items: [
      { icon: Moon, label: "Tryb ciemny", value: "Auto", toggle: true },
      { icon: Bell, label: "Powiadomienia push", value: "", toggle: true },
      { icon: Globe, label: "Język", value: "Polski" },
    ],
  },
  {
    title: "System",
    items: [
      { icon: Wifi, label: "Sieć i Hub", value: "Aurora Hub · OK", on: true },
      { icon: HelpCircle, label: "Pomoc i wsparcie", value: "" },
      { icon: LogOut, label: "Wyloguj", value: "", danger: true },
    ],
  },
];

export default function Settings() {
  return (
    <div>
      <PageHeader eyebrow="Konfiguracja" title="Ustawienia" subtitle="Profil, bezpieczeństwo, integracje i preferencje." />

      <div className="px-5 pb-6 lg:px-10">
        <div className="premium-card mb-4 flex items-center gap-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-primary text-3xl text-primary-foreground shadow-glow">K</div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success ring-4 ring-background" />
          </div>
          <div className="flex-1">
            <div className="font-display text-xl font-semibold">Kasia Nowak</div>
            <div className="text-xs text-muted-foreground">kasia@aurora.home · Administrator</div>
            <div className="mt-2 flex gap-2 text-[10px]">
              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-primary">Aurora+</span>
              <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-muted-foreground">12 urządzeń</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {sections.map((s) => (
            <div key={s.title}>
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{s.title}</div>
              <div className="premium-card !p-0 divide-y divide-border">
                {s.items.map((it: any) => (
                  <button key={it.label} className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.02]">
                    <div className={`grid h-9 w-9 place-items-center rounded-xl ${it.danger ? "bg-destructive/15 text-destructive" : "bg-white/[0.04] text-primary"}`}>
                      <it.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${it.danger ? "text-destructive" : ""}`}>{it.label}</div>
                      {it.value && <div className="text-[11px] text-muted-foreground">{it.value}</div>}
                    </div>
                    {it.toggle ? <Switch defaultChecked /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center text-[11px] text-muted-foreground">Aurora Home · v 4.2.1 · build 2026.06</div>
        </div>
      </div>
    </div>
  );
}
