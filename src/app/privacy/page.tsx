import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How this portfolio handles analytics, diagnostics, and visitor data.',
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="mx-auto min-h-screen max-w-3xl px-6 pb-20 pt-28 sm:px-8">
      <article className="space-y-10">
        <header className="space-y-4 border-b border-border pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Privacy</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How this site handles data</h1>
          <p className="max-w-2xl text-muted-foreground">
            This portfolio collects only the operational data needed to understand usage, diagnose errors, and keep the site reliable.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Analytics and performance</h2>
          <p className="leading-7 text-muted-foreground">
            Vercel Analytics and Speed Insights may process page, device, and performance information. Sentry may receive errors, performance traces, and sampled session replays; replay text and media are configured to be masked or blocked.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Page-view counter</h2>
          <p className="leading-7 text-muted-foreground">
            The public counter records page-view increments in Upstash Redis. A one-way hash derived from the request IP is retained briefly for rate limiting; the counter does not store the raw IP address.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Questions</h2>
          <p className="leading-7 text-muted-foreground">
            For privacy questions, email <a className="underline underline-offset-4 hover:text-foreground" href="mailto:trahoangdev@gmail.com">trahoangdev@gmail.com</a>.
          </p>
        </section>

        <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-muted-foreground">
          Back to home
        </Link>
      </article>
    </main>
  );
}
