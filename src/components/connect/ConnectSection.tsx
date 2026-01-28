'use client';

import Link from 'next/link';
import { CONNECT_LINKS, generateConnectUrl } from '@/lib/constants';

interface ConnectSectionProps {
  activeSection: string;
  sectionRef: (el: HTMLElement | null) => void;
}

export function ConnectSection({ activeSection, sectionRef }: ConnectSectionProps) {
  return (
    <section
      id="service"
      ref={sectionRef}
      aria-labelledby="connect-heading"
      className="py-20 sm:py-32 opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
    >
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
        <div className="magnet-card border-double-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
          <div className="space-y-6 sm:space-y-8">
            <h2 id="connect-heading" className="text-3xl sm:text-4xl font-bold uppercase">
              Let's Connect
            </h2>
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Partner with me on product builds, creative strategy, and technical leadership.
                Let&apos;s craft thoughtful experiences that resonate.
              </p>
              <div className="space-y-4">
                <Link
                  href="mailto:contact@trahoangdev.com"
                  className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span className="text-base sm:text-lg font-mono">
                    contact@trahoangdev.com
                  </span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="border-dotted-thick border-border p-4">
            <div className="text-sm text-muted-foreground font-mono uppercase">
              Elsewhere
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONNECT_LINKS.map((social, index) => (
              <Link
                key={social.name}
                href={generateConnectUrl(social.urlTemplate, social.handle)}
                className={`group magnet-card ${index % 2 === 0
                  ? 'border-pulse-animated'
                  : 'border-wave-animated'
                  } border-border p-4 hover-lift hover:bg-muted transition-all duration-300`}
              >
                <div className="space-y-2">
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-bold">
                    {social.name}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {social.handle}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
