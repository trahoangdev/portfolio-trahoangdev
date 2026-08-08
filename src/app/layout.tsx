import type React from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Background } from '@/components/ui/background';
import { SkipLink } from '@/components/ui/SkipLink';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import { getPersonSchema } from '@/lib/schema/person';




const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const PRODUCTION_SITE_URL = 'https://www.trahoangdev.me';
const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : PRODUCTION_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tra Hoang Trong (Hoàng Trọng Trà) (trahoangdev) - Software Engineer',
    template: '%s | trahoangdev',
  },
  description: 'Software Engineer specializing in building exceptional digital experiences. Focused on accessible, human-centered products.',
  keywords: ['Software Engineer', 'Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  // authors: [{ name: 'Hoàng Trọng Trà', url: 'https://trahoangdev.vercel.app' }],
  authors: [
    { name: 'Tra Hoang Trong', url: 'https://www.trahoangdev.me/' },
    { name: 'Hoàng Trọng Trà', url: 'https://www.trahoangdev.me/' },
  ],
  creator: 'Tra Hoang Trong',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PRODUCTION_SITE_URL,
    title: 'Tra Hoang Trong (Hoàng Trọng Trà) (trahoangdev) - Software Engineer',
    description: 'Software Engineer specializing in building exceptional digital experiences.',
    siteName: 'trahoangdev',
    images: [
      {
        url: '/og-image.png', // Ensure this file exists or upgrade opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: 'trahoangdev portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tra Hoang Trong (Hoàng Trọng Trà) (trahoangdev) - Software Engineer',
    description: 'Software Engineer specializing in building exceptional digital experiences.',
    images: [`${PRODUCTION_SITE_URL}/og-image.png`],
    creator: '@trahoangdev',
  },
  icons: {
    icon: [{ url: '/logo.ico', type: 'image/x-icon' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = getPersonSchema();
  const isVercelRuntime = process.env.VERCEL === '1';

  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Preload critical resources */}
        <link rel="preload" href="/portrait.jpg" as="image" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://huggingface.co" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <SkipLink />
          <Background />
          <HeaderNavigation />
          {children}
          {isVercelRuntime ? (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          ) : null}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
