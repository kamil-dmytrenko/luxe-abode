import { type ReactNode } from "react";

export default function PageHeader({
  eyebrow, title, subtitle, action,
}: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 px-5 pb-4 pt-6 lg:px-10 lg:pt-10">
      <div className="animate-slide-up">
        {eyebrow && <div className="text-xs uppercase tracking-[0.22em] text-primary/80">{eyebrow}</div>}
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="animate-fade-in">{action}</div>}
    </div>
  );
}
