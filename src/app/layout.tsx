import type React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist } from 'next/font/google';
import './globals.css';
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Background } from '@/components/ui/background';
import { SkipLink } from '@/components/ui/SkipLink';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';




const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-trahoangdev.vercel.app'),
  title: {
    default: 'Hoàng Trọng Trà (trahoangdev) - Software Engineer',
    template: '%s | trahoangdev',
  },
  description: 'Software Engineer specializing in building exceptional digital experiences. Focused on accessible, human-centered products.',
  keywords: ['Software Engineer', 'Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Hoàng Trọng Trà', url: 'https://trahoangdev.vercel.app' }],
  creator: 'Hoàng Trọng Trà',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trahoangdev.vercel.app',
    title: 'Hoàng Trọng Trà (trahoangdev) - Software Engineer',
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
    title: 'Hoàng Trọng Trà (trahoangdev) - Software Engineer',
    description: 'Software Engineer specializing in building exceptional digital experiences.',
    images: ['/og-image.png'],
    creator: '@trahoangdev',
  },
  icons: {
    icon: [{ url: '/logo.ico', sizes: '16x16', type: 'image/png' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <SkipLink />
          <Background />
          <HeaderNavigation />
          <Script id="remove-bis-skin" strategy="beforeInteractive">{`(() => {
        try {
          const clean = (root) => {
            if (!root) return;
            if (root.nodeType === 1 && root.hasAttribute && root.hasAttribute('bis_skin_checked')) {
              root.removeAttribute('bis_skin_checked');
            }
            if (root.querySelectorAll) {
              root.querySelectorAll('[bis_skin_checked]').forEach((node) => node.removeAttribute('bis_skin_checked'));
            }
          };

          clean(document);

          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.type === 'attributes' && mutation.target instanceof Element) {
                mutation.target.removeAttribute('bis_skin_checked');
              }
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                  if (node instanceof Element) {
                    clean(node);
                  }
                });
              }
            }
          });

          observer.observe(document, {
            attributes: true,
            attributeFilter: ['bis_skin_checked'],
            childList: true,
            subtree: true,
          });
        } catch (error) {
          console.warn('Failed to clean bis_skin_checked attributes', error);
        }
      })();`}</Script>
          {children}
          <Analytics />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
