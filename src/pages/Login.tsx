import { useNavigate } from "react-router-dom";
import { Fingerprint, Home, Lock, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => nav("/"), 700);
  };
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-rose-500/10 to-transparent" />
        <div className="absolute -left-32 top-40 h-[480px] w-[480px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-2xl font-semibold">Aurora Home</div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Smart Living</div>
            </div>
          </div>
          <div>
            <div className="font-display text-5xl font-semibold leading-tight">Twój dom.<br /><span className="text-gradient">Twój rytm.</span></div>
            <p className="mt-4 max-w-md text-muted-foreground">Premium kontrola oświetlenia, klimatu, bezpieczeństwa i energii w jednym eleganckim wnętrzu.</p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>v 4.2 · Aurora OS</span>
            <span>End-to-end szyfrowanie</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="relative flex items-center justify-center p-6">
        <form onSubmit={submit} className="glass-strong w-full max-w-md rounded-3xl p-8 animate-scale-in">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-display text-xl font-semibold">Aurora Home</div>
          </div>
          <h1 className="font-display text-3xl font-semibold">Witaj ponownie</h1>
          <p className="mt-1 text-sm text-muted-foreground">Zaloguj się do swojego domu.</p>

          <div className="mt-6 space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">E-mail</span>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input defaultValue="kasia@aurora.home" className="pl-10 h-12 rounded-2xl bg-white/[0.04] border-white/10" />
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Hasło</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="password" defaultValue="••••••••" className="pl-10 h-12 rounded-2xl bg-white/[0.04] border-white/10" />
              </div>
            </label>
          </div>

          <Button type="submit" disabled={loading} className="mt-6 h-12 w-full rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
            {loading ? "Logowanie…" : "Zaloguj się"}
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> lub <div className="h-px flex-1 bg-border" />
          </div>

          <button type="button" onClick={() => nav("/")} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white/[0.02] py-3 text-sm transition hover:border-primary/30">
            <Fingerprint className="h-5 w-5 text-primary" /> Zaloguj przez Face ID
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">Nie pamiętasz hasła? <span className="text-primary">Resetuj</span></p>
        </form>
      </div>
    </div>
  );
}
