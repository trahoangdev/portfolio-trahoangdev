import Link from 'next/link';
import { Award, ExternalLink, Medal, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

import { HONORS_AWARDS, HonorAward } from '@/features/honors/infrastructure/honorData';

const categoryIcons = {
  Academy: ShieldCheck,
  Competition: Sparkles,
  Professional: Trophy,
  Technical: Medal,
};

function HonorAwardRow({ award, index }: { award: HonorAward; index: number }) {
  const Icon = categoryIcons[award.category];

  return (
    <article
      className="group relative grid gap-5 border-t border-border/70 bg-background py-6 transition-colors duration-300 first:border-t-0 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-8"
    >
      <div className="flex items-center justify-between gap-4 sm:block">
        <div className="flex items-center gap-4 sm:block sm:space-y-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {award.date}
          </div>
        </div>

        <div className="font-mono text-3xl font-bold leading-none text-muted-foreground/35 sm:mt-6 sm:text-5xl">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {award.category}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {award.issuer}
            </span>
          </div>

          <h2 className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
            {award.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {award.summary}
          </p>
        </div>

        <div className="grid gap-4 rounded-xl bg-muted/45 p-4 sm:p-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/90">
            {award.impact}
          </p>

          {award.credentialUrl && (
            <Link
              href={award.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Credential
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {award.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-[11px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function HonorsAwardsShowcase() {
  const categories = Array.from(new Set(HONORS_AWARDS.map((award) => award.category)));
  const latestYear = HONORS_AWARDS[0]?.date.match(/\d{4}/)?.[0] ?? new Date().getFullYear();

  return (
    <section aria-labelledby="honors-awards-heading" className="space-y-10 sm:space-y-12">
      <header className="grid gap-7 border-b-2 border-border pb-9 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:tracking-[0.24em]">
            <Award className="h-4 w-4" aria-hidden="true" />
            Verified Milestones
          </div>
          <div className="space-y-4">
            <h1
              id="honors-awards-heading"
              className="max-w-4xl text-[2.4rem] font-black uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Honors & Awards
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A compact record of academy recognitions, technical credentials, and verified achievements that support the way I build software.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 border-2 border-border text-center lg:grid-cols-1 lg:text-left">
          <div className="border-r-2 border-border p-3 lg:border-b-2 lg:border-r-0">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Records
            </dt>
            <dd className="mt-1 text-2xl font-black">{HONORS_AWARDS.length}</dd>
          </div>
          <div className="border-r-2 border-border p-3 lg:border-b-2 lg:border-r-0">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Year
            </dt>
            <dd className="mt-1 text-2xl font-black">{latestYear}</dd>
          </div>
          <div className="p-3">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Tracks
            </dt>
            <dd className="mt-1 text-2xl font-black">{categories.length}</dd>
          </div>
        </dl>
      </header>

      <div className="relative rounded-2xl border-2 border-border px-5 sm:px-7 lg:px-8">
        <div className="pointer-events-none absolute bottom-8 left-[5.65rem] top-8 hidden w-px bg-border/60 sm:block" />
        {HONORS_AWARDS.map((award, index) => (
          <HonorAwardRow key={award.id} award={award} index={index} />
        ))}
      </div>
    </section>
  );
}
