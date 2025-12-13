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



const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-trahoangdev.vercel.app'),
  title: 'Hoàng Trọng Trà (trahoangdev) - Software Engineer',
  description: 'portfolio website',
  generator: 'trahoangdev',
  icons: {
    icon: [{ url: '/logo.ico', sizes: '16x16', type: 'image/png' }],
    shortcut: '/favicon.ico',
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
        </ThemeProvider>
      </body>
    </html>
  );
}
