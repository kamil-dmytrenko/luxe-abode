import { useState } from "react";
import {
  Bell, Globe, HelpCircle, Lock, LogOut, Moon, Shield, User, Wifi, ChevronRight,
  Smartphone, Mail, Volume2, Palette, MapPin, Database, Trash2, Download, Upload,
  KeyRound, Fingerprint, Eye, EyeOff, Sun, Monitor, Languages, Radio, RefreshCw,
  Zap, Camera, Mic, BellRing, Calendar, CheckCircle2, AlertTriangle, Cpu,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PageHeader from "@/components/PageHeader";
import { toast } from "@/hooks/use-toast";

type Theme = "dark" | "light" | "auto";

export default function Settings() {
  // Profile
  const [name, setName] = useState("Kasia Nowak");
  const [email, setEmail] = useState("kasia@aurora.home");
  const [phone, setPhone] = useState("+48 600 100 200");

  // Preferences
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState("pl");
  const [units, setUnits] = useState("metric");
  const [tempUnit, setTempUnit] = useState("c");
  const [accent, setAccent] = useState("amber");

  // Notifications
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [doNotDisturb, setDnd] = useState(false);
  const [dndStart, setDndStart] = useState("22:00");
  const [dndEnd, setDndEnd] = useState("07:00");
  const [volume, setVolume] = useState(70);
  const [notifs, setNotifs] = useState({
    alarms: true, doorbell: true, cameras: true, energy: true, climate: false, automations: true,
  });

  // Security
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [autoLock, setAutoLock] = useState(5); // minutes
  const [guestAccess, setGuestAccess] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // System / Hub
  const [hubAutoUpdate, setHubAutoUpdate] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [hubStatus, setHubStatus] = useState<"ok" | "checking">("ok");

  const ok = (msg: string) => toast({ title: msg });

  const handleRescan = () => {
    setScanning(true); setHubStatus("checking");
    setTimeout(() => { setScanning(false); setHubStatus("ok"); ok("Hub i 12 urządzeń online"); }, 1400);
  };

  return (
    <div>
      <PageHeader eyebrow="Konfiguracja" title="Ustawienia" subtitle="Profil, bezpieczeństwo, powiadomienia, system." />

      <div className="space-y-6 px-5 pb-6 lg:px-10">
        {/* Profile header */}
        <div className="premium-card flex flex-wrap items-center gap-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-primary text-3xl text-primary-foreground shadow-glow">
              {name.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success ring-4 ring-background" />
          </div>
          <div className="flex-1 min-w-[160px]">
            <div className="font-display text-xl font-semibold">{name}</div>
            <div className="text-xs text-muted-foreground">{email} · Administrator</div>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-primary">Aurora+</span>
              <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-muted-foreground">12 urządzeń</span>
              <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-success">2FA aktywne</span>
            </div>
          </div>
          <ProfileDialog name={name} email={email} phone={phone} onSave={(p) => { setName(p.name); setEmail(p.email); setPhone(p.phone); ok("Profil zapisany"); }} />
        </div>

        {/* ============= ACCOUNT ============= */}
        <Section title="Konto" icon={User}>
          <Row icon={User} label="Imię i nazwisko" value={name}>
            <ProfileDialog name={name} email={email} phone={phone} onSave={(p) => { setName(p.name); setEmail(p.email); setPhone(p.phone); ok("Profil zapisany"); }}>
              <Button variant="outline" size="sm">Edytuj</Button>
            </ProfileDialog>
          </Row>
          <Row icon={Mail} label="E-mail" value={email} />
          <Row icon={Smartphone} label="Telefon" value={phone} />
          <Row icon={KeyRound} label="Hasło" value="Ostatnia zmiana 23 dni temu">
            <PasswordDialog onSave={() => ok("Hasło zaktualizowane")} showPwd={showPwd} setShowPwd={setShowPwd} />
          </Row>
        </Section>

        {/* ============= APPEARANCE ============= */}
        <Section title="Wygląd" icon={Palette}>
          <div className="px-4 py-3">
            <div className="mb-2 text-xs text-muted-foreground">Motyw</div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "dark", label: "Ciemny", Icon: Moon },
                { id: "light", label: "Jasny", Icon: Sun },
                { id: "auto", label: "Auto", Icon: Monitor },
              ] as { id: Theme; label: string; Icon: typeof Sun }[]).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => { setTheme(id); ok(`Motyw: ${label}`); }}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs transition ${theme === id ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-white/[0.02] text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className="h-3.5 w-3.5" /> {label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="mb-2 text-xs text-muted-foreground">Kolor akcentu</div>
            <div className="flex gap-2">
              {[
                { id: "amber", hex: "#F5A623" },
                { id: "sky", hex: "#38BDF8" },
                { id: "violet", hex: "#A78BFA" },
                { id: "emerald", hex: "#34D399" },
                { id: "rose", hex: "#F472B6" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccent(c.id)}
                  className={`h-9 w-9 rounded-2xl ring-2 transition ${accent === c.id ? "ring-foreground scale-105" : "ring-transparent"}`}
                  style={{ background: c.hex }}
                  aria-label={c.id}
                />
              ))}
            </div>
          </div>
          <SelectRow icon={Languages} label="Język" value={language} onChange={(v) => { setLanguage(v); ok("Język zmieniony"); }} options={[
            { value: "pl", label: "Polski" }, { value: "en", label: "English" }, { value: "de", label: "Deutsch" }, { value: "uk", label: "Українська" },
          ]} />
          <SelectRow icon={Globe} label="Jednostki" value={units} onChange={setUnits} options={[
            { value: "metric", label: "Metryczne (m, kg)" }, { value: "imperial", label: "Imperialne (ft, lb)" },
          ]} />
          <SelectRow icon={Sun} label="Temperatura" value={tempUnit} onChange={setTempUnit} options={[
            { value: "c", label: "°Celsjusz" }, { value: "f", label: "°Fahrenheit" },
          ]} />
        </Section>

        {/* ============= NOTIFICATIONS ============= */}
        <Section title="Powiadomienia" icon={BellRing}>
          <ToggleRow icon={Smartphone} label="Powiadomienia push" sub="Na tym urządzeniu" checked={pushEnabled} onChange={setPushEnabled} />
          <ToggleRow icon={Mail} label="E-mail" sub="Codzienne podsumowanie i alerty" checked={emailEnabled} onChange={setEmailEnabled} />
          <ToggleRow icon={Moon} label="Tryb Nie przeszkadzać" sub={doNotDisturb ? `Aktywny ${dndStart} – ${dndEnd}` : "Wyłączony"} checked={doNotDisturb} onChange={setDnd} />
          {doNotDisturb && (
            <div className="grid grid-cols-2 gap-2 px-4 py-3">
              <div>
                <Label className="text-[11px] text-muted-foreground">Od</Label>
                <Input type="time" value={dndStart} onChange={(e) => setDndStart(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">Do</Label>
                <Input type="time" value={dndEnd} onChange={(e) => setDndEnd(e.target.value)} className="mt-1" />
              </div>
            </div>
          )}
          <div className="px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Volume2 className="h-3.5 w-3.5" /> Głośność powiadomień</span>
              <span className="font-display text-foreground">{volume}%</span>
            </div>
            <Slider value={[volume]} max={100} step={5} onValueChange={(v) => setVolume(v[0])} />
          </div>
          <div className="px-4 py-3">
            <div className="mb-2 text-xs text-muted-foreground">Kategorie</div>
            <div className="space-y-1">
              <CategoryToggle icon={Shield} label="Alarm" checked={notifs.alarms} onChange={(v) => setNotifs((n) => ({ ...n, alarms: v }))} />
              <CategoryToggle icon={Bell} label="Domofon" checked={notifs.doorbell} onChange={(v) => setNotifs((n) => ({ ...n, doorbell: v }))} />
              <CategoryToggle icon={Camera} label="Kamery — ruch" checked={notifs.cameras} onChange={(v) => setNotifs((n) => ({ ...n, cameras: v }))} />
              <CategoryToggle icon={Zap} label="Energia" checked={notifs.energy} onChange={(v) => setNotifs((n) => ({ ...n, energy: v }))} />
              <CategoryToggle icon={Sun} label="Klimat" checked={notifs.climate} onChange={(v) => setNotifs((n) => ({ ...n, climate: v }))} />
              <CategoryToggle icon={Calendar} label="Automatyzacje" checked={notifs.automations} onChange={(v) => setNotifs((n) => ({ ...n, automations: v }))} />
            </div>
          </div>
        </Section>

        {/* ============= SECURITY ============= */}
        <Section title="Bezpieczeństwo" icon={Shield}>
          <ToggleRow icon={Shield} label="Weryfikacja dwuetapowa (2FA)" sub={twoFA ? "Aktywna — aplikacja Authenticator" : "Wyłączona"} checked={twoFA} onChange={(v) => { setTwoFA(v); ok(v ? "2FA włączone" : "2FA wyłączone"); }} />
          <ToggleRow icon={Fingerprint} label="Biometria" sub="Odblokowanie aplikacji odciskiem / Face ID" checked={biometric} onChange={setBiometric} />
          <div className="px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Auto-blokada</span>
              <span className="font-display">{autoLock === 0 ? "Wyłączona" : `${autoLock} min`}</span>
            </div>
            <Slider value={[autoLock]} min={0} max={30} step={1} onValueChange={(v) => setAutoLock(v[0])} />
          </div>
          <ToggleRow icon={User} label="Dostęp gościa" sub="Tymczasowe konto z ograniczonymi prawami" checked={guestAccess} onChange={setGuestAccess} />
          <Row icon={Radio} label="Aktywne sesje" value="3 urządzenia">
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="outline" size="sm">Wyloguj wszystkie</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Wylogować wszystkie sesje?</AlertDialogTitle>
                  <AlertDialogDescription>Zostaniesz wylogowana ze wszystkich urządzeń z wyjątkiem tego.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction onClick={() => ok("Wszystkie sesje zamknięte")}>Wyloguj</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Row>
        </Section>

        {/* ============= SYSTEM ============= */}
        <Section title="System i Hub" icon={Cpu}>
          <Row icon={Wifi} label="Aurora Hub" value={hubStatus === "ok" ? "Online · sygnał doskonały" : "Skanowanie…"}>
            <Button variant="outline" size="sm" onClick={handleRescan} disabled={scanning}>
              <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${scanning ? "animate-spin" : ""}`} />
              Skanuj
            </Button>
          </Row>
          <Row icon={MapPin} label="Lokalizacja domu" value="Warszawa · ul. Kwiatowa 12">
            <Button variant="outline" size="sm" onClick={() => ok("Otwieram mapę")}>Zmień</Button>
          </Row>
          <ToggleRow icon={Download} label="Automatyczne aktualizacje" sub="Hub i urządzenia — w godzinach nocnych" checked={hubAutoUpdate} onChange={setHubAutoUpdate} />
          <ToggleRow icon={Database} label="Anonimowa telemetria" sub="Pomóż ulepszać Aurorę" checked={telemetry} onChange={setTelemetry} />
          <ToggleRow icon={Zap} label="Funkcje beta" sub="Wczesny dostęp do nowości" checked={betaFeatures} onChange={setBetaFeatures} />
          <Row icon={Mic} label="Asystent głosowy" value="Polski · zawsze nasłuchuje">
            <Button variant="outline" size="sm" onClick={() => ok("Trening głosu rozpoczęty")}>Trenuj</Button>
          </Row>
        </Section>

        {/* ============= DATA ============= */}
        <Section title="Dane i prywatność" icon={Database}>
          <Row icon={Download} label="Eksportuj dane" value="JSON · historia 12 miesięcy">
            <Button variant="outline" size="sm" onClick={() => ok("Eksport rozpoczęty")}>Pobierz</Button>
          </Row>
          <Row icon={Upload} label="Importuj kopię zapasową" value="Z pliku lub chmury">
            <Button variant="outline" size="sm" onClick={() => ok("Wybierz plik")}>Wczytaj</Button>
          </Row>
          <Row icon={Trash2} label="Wyczyść historię" value="Logi, zdarzenia, statystyki" danger>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Wyczyść</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Wyczyścić całą historię?</AlertDialogTitle>
                  <AlertDialogDescription>Operacja jest nieodwracalna. Konfiguracja urządzeń pozostanie nienaruszona.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction onClick={() => ok("Historia wyczyszczona")}>Wyczyść</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Row>
        </Section>

        {/* ============= HELP ============= */}
        <Section title="Pomoc i konto" icon={HelpCircle}>
          <Row icon={HelpCircle} label="Centrum pomocy" value="Poradniki, FAQ, kontakt">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Row>
          <Row icon={CheckCircle2} label="Wersja aplikacji" value="Aurora Home v 4.2.1 · build 2026.06" />
          <Row icon={AlertTriangle} label="Zgłoś problem" value="Wyślij raport diagnostyczny">
            <Button variant="outline" size="sm" onClick={() => ok("Raport wysłany")}>Wyślij</Button>
          </Row>
          <Row icon={LogOut} label="Wyloguj się" value="Zakończ sesję na tym urządzeniu" danger>
            <Button variant="destructive" size="sm" onClick={() => ok("Wylogowano")}>Wyloguj</Button>
          </Row>
        </Section>

        <div className="pt-2 text-center text-[11px] text-muted-foreground">Aurora Home · v 4.2.1 · build 2026.06</div>
      </div>
    </div>
  );
}

/* ============================== components ============================== */

function Section({ title, icon: Icon, children }: { title: string; icon: typeof User; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      <div className="premium-card !p-0 divide-y divide-border">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value, danger, children }: { icon: typeof User; label: string; value?: string; danger?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${danger ? "bg-destructive/15 text-destructive" : "bg-white/[0.04] text-primary"}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-sm ${danger ? "text-destructive" : ""}`}>{label}</div>
        {value && <div className="truncate text-[11px] text-muted-foreground">{value}</div>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ icon, label, sub, checked, onChange }: { icon: typeof User; label: string; sub?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <Row icon={icon} label={label} value={sub}><Switch checked={checked} onCheckedChange={onChange} /></Row>;
}

function SelectRow({ icon: Icon, label, value, onChange, options }: { icon: typeof User; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-primary"><Icon className="h-4 w-4" /></div>
      <div className="flex-1 text-sm">{label}</div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function CategoryToggle({ icon: Icon, label, checked, onChange }: { icon: typeof User; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="flex-1 text-xs">{label}</div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function ProfileDialog({ name, email, phone, onSave, children }: { name: string; email: string; phone: string; onSave: (p: { name: string; email: string; phone: string }) => void; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(name);
  const [e, setE] = useState(email);
  const [p, setP] = useState(phone);
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) { setN(name); setE(email); setP(phone); } }}>
      <DialogTrigger asChild>{children ?? <Button variant="outline" size="sm">Edytuj profil</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj profil</DialogTitle>
          <DialogDescription>Dane konta administratora.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div><Label>Imię i nazwisko</Label><Input value={n} onChange={(ev) => setN(ev.target.value)} className="mt-1" /></div>
          <div><Label>E-mail</Label><Input type="email" value={e} onChange={(ev) => setE(ev.target.value)} className="mt-1" /></div>
          <div><Label>Telefon</Label><Input value={p} onChange={(ev) => setP(ev.target.value)} className="mt-1" /></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={() => { onSave({ name: n, email: e, phone: p }); setOpen(false); }}>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog({ onSave, showPwd, setShowPwd }: { onSave: () => void; showPwd: boolean; setShowPwd: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const ok = cur && n1.length >= 8 && n1 === n2;
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setCur(""); setN1(""); setN2(""); } }}>
      <DialogTrigger asChild><Button variant="outline" size="sm">Zmień</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Zmień hasło</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Obecne hasło</Label>
            <div className="relative mt-1">
              <Input type={showPwd ? "text" : "password"} value={cur} onChange={(e) => setCur(e.target.value)} />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div><Label>Nowe hasło (min. 8 znaków)</Label><Input type={showPwd ? "text" : "password"} value={n1} onChange={(e) => setN1(e.target.value)} className="mt-1" /></div>
          <div><Label>Powtórz</Label><Input type={showPwd ? "text" : "password"} value={n2} onChange={(e) => setN2(e.target.value)} className="mt-1" /></div>
          {n1 && n2 && n1 !== n2 && <div className="text-xs text-destructive">Hasła nie pasują</div>}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Anuluj</Button>
          <Button disabled={!ok} onClick={() => { onSave(); setOpen(false); }}>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
