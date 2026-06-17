import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Lightbulb, Blinds, Thermometer, Sparkles, ShieldCheck,
  Zap, Camera, Bell, CalendarClock, Workflow, Settings as SettingsIcon,
  Search, Plus, Home,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/lights", label: "Światła", icon: Lightbulb },
  { to: "/blinds", label: "Rolety", icon: Blinds },
  { to: "/climate", label: "Klimat", icon: Thermometer },
  { to: "/scenes", label: "Sceny", icon: Sparkles },
  { to: "/alarm", label: "Alarm", icon: ShieldCheck },
  { to: "/energy", label: "Energia", icon: Zap },
  { to: "/cameras", label: "Kamery", icon: Camera },
  { to: "/intercom", label: "Domofon", icon: Bell },
  { to: "/schedules", label: "Harmonogramy", icon: CalendarClock },
  { to: "/automations", label: "Automatyzacje", icon: Workflow },
  { to: "/settings", label: "Ustawienia", icon: SettingsIcon },
];

const mobileNav = navItems.slice(0, 4).concat([{ to: "/scenes", label: "Sceny", icon: Sparkles }]);

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
          <Home className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display text-lg font-semibold tracking-tight">Aurora</div>
          <div className="-mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Home</div>
        </div>
      </div>

      <div className="px-4">
        <button className="glass flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition hover:text-foreground">
          <Search className="h-4 w-4" />
          <span>Szukaj…</span>
          <kbd className="ml-auto rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4 no-scrollbar">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
            <item.icon className="h-[18px] w-[18px]" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-border bg-gradient-to-br from-primary/15 to-transparent p-4">
        <div className="text-xs uppercase tracking-widest text-primary/80">Aurora+</div>
        <div className="mt-1 font-display text-base font-semibold">Asystent AI Premium</div>
        <p className="mt-1 text-xs text-muted-foreground">Inteligentne sugestie scen i oszczędności energii.</p>
        <Button size="sm" className="mt-3 w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Włącz</Button>
      </div>
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/50 bg-background/60 px-4 py-3 backdrop-blur-xl safe-top lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-2xl glass">
                <div className="flex flex-col gap-1">
                  <span className="h-0.5 w-4 bg-foreground/80" />
                  <span className="h-0.5 w-3 bg-foreground/80" />
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 border-sidebar-border bg-sidebar p-0">
              <div onClick={() => setOpen(false)}>
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Home className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-sm font-semibold leading-none">Aurora</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Home</div>
            </div>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-2xl glass">
            <Bell className="h-4 w-4" />
          </button>
        </header>

        <main className="flex-1 animate-fade-in pb-28 lg:pb-12">
          <Outlet />
        </main>

        {/* Floating action (mobile) */}
        <button
          aria-label="Dodaj"
          className="fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-glow lg:hidden"
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Bottom nav (mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border/50 bg-background/70 backdrop-blur-xl safe-bottom lg:hidden">
          <div className="mx-auto grid max-w-md grid-cols-5 px-2 py-2">
            {mobileNav.map((item) => {
              const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <NavLink key={item.to} to={item.to} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5">
                  <div className={`grid h-9 w-9 place-items-center rounded-xl transition-all ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"}`}>
                    <item.icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className={`text-[10px] ${active ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
