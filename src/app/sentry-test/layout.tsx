import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Diagnostics',
  robots: { index: false, follow: false },
};

export default function SentryTestLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_SENTRY_TEST_PAGE !== 'true') {
    notFound();
  }

  return children;
}
