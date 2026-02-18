'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialLinks } from '@/components/intro/SocialLinks';
import { CommunityInfo } from '@/components/intro/CommunityInfo';
import { WebsiteInfoCard } from '@/components/intro/WebsiteInfoCard';
import { User } from 'lucide-react';

export function IntroSection({
  sectionRef,
}: {
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const hours = utc7Time.getUTCHours().toString().padStart(2, '0');
      const minutes = utc7Time.getUTCMinutes().toString().padStart(2, '0');
      const seconds = utc7Time.getUTCSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    // Update every second using requestAnimationFrame for better performance
    let animationFrameId: number;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastUpdate >= 1000) {
        updateClock();
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <header
      id="intro"
      ref={sectionRef}
      className="min-h-screen flex items-center opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 scroll-mt-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
        {/* Left column - Main info */}
        <div className="lg:col-span-1 space-y-8">
          <div
            className="magnet-card rounded-3xl border-2 border-border
           p-6 hover:shadow-2xl
           transition-all duration-500
           group/info
           overflow-hidden bg-background"
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 
                   bg-gradient-to-r from-transparent via-foreground/30 to-transparent
                   -translate-x-full group-hover/info:translate-x-full 
                   transition-transform duration-1000 ease-in-out
                   pointer-events-none z-10 -skew-x-12"
            ></div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase">
                TRA HOANG DEV
              </h1>
              <div className="text-lg font-medium">
                Software Engineer | Content Creator | Senior Student
              </div>
              <div className="text-sm text-muted-foreground">
                Writing code that thinks, designing interfaces that feel. Let's break the loop.
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="group magnet-card rounded-3xl border-dashed-animated border-border p-6  hover:shadow-2xl transition-all duration-500">
            <div className="group hover-lift hover:scale-100 out aspect-square bg-muted rounded-2xl overflow-hidden relative">
              {!imageError ? (
                <Image
                  src="/portrait.jpg"
                  alt="Portrait of Tra Hoang Dev"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2 bg-muted/50">
                  <User className="w-20 h-20 opacity-50" />
                  <span className="text-sm font-medium tracking-wider">OFFLINE</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#service"
              className="px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base whitespace-nowrap rounded-full border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Navigate to contact section"
            >
              Connect
            </Link>
            <Link
              href="/project"
              className="px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base whitespace-nowrap rounded-full border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="View all projects"
            >
              My Matrix
            </Link>
            <Link
              href="/resume"
              className="px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base whitespace-nowrap rounded-full border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="View resume"
            >
              CV
            </Link>
          </div>
        </div>

        {/* Center column - Message and contact */}
        <div className="lg:col-span-1 space-y-8">
          {/* Social icons */}
          <div className="magnet-card rounded-3xl border-wave-animated border-border p-6  hover:shadow-2xl transition-all duration-500">
            <SocialLinks />
          </div>

          {/* Personal message */}
          <div className="magnet-card rounded-3xl group border-pulse-animated border-border p-6  hover:shadow-2xl transition-all duration-500">
            <div className="space-y-4">
              <div className="font-medium">Yo, Fellow Traveler! 🖖</div>
              <p className="text-sm leading-relaxed">
                Welcome to
                <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mx-1">
                  MY MATRIX
                </span>
                ! I&apos;m{' '}
                <span
                  className={`relative font-bold transition-all duration-500 
    group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]
    before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-400
    before:transition-all before:duration-500 group-hover:before:w-full`}
                >
                  Tra Hoang Trong
                </span>
                . You've just warped into my digital headquarters. It's awesome to have you here! Whether you're looking to crack the code on a new project, explore the frontiers of AI, or just hang out and talk tech — you've found your crew. Relax, explore, and let's build the future together. Stay distinctive. Stay true.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <div className="px-3 py-1 rounded-full text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  AI Engineer
                </div>
                <div className="px-3 py-1 rounded-full text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  Web Developer
                </div>
                <div className="px-3 py-1 rounded-full text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  Software Engineer
                </div>
              </div>
            </div>
          </div>

          {/* Payment info */}
          {/* Buy Me a Coffee */}
          <Link
            href="https://buymeacoffee.com/trahoangdev"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-8"
          >
            <div className="magnet-card rounded-3xl border-dotted-thick border-border p-6  hover:shadow-2xl transition-all duration-500 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg group-hover:text-yellow-500 transition-colors">
                    Fuel My Code ☕
                  </h3>
                  <span className="text-2xl animate-pulse">⚡</span>
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  If you enjoy my work, consider buying me a coffee to keep the
                  algo running!
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-yellow-400 text-black font-bold text-xs rounded-full transition-transform group-hover:scale-105">
                    Buy me a coffee
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-background group-hover:bg-yellow-100 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-yellow-600"
                    >
                      <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* 🔥 Join our community card - Temporarily hidden
          <div className="mb-8">
            <CommunityInfo />
          </div>
          */}

          {/* Website Info Card */}
          {/* Moved to the right column */}
        </div>

        {/* Right column - Business cards */}
        <div className="lg:col-span-1 space-y-8">
          {/* Studio card */}
          {/* Studio card */}
          <div className="magnet-card rounded-3xl border-neon-animated border-border p-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-[140px] flex items-center justify-center bg-background">

            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-16 translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

            <div className="space-y-3 relative z-10 text-center">
              <div className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase group-hover:text-cyan-500 transition-colors duration-300">
                Architect of Flow
              </div>

              <div className="text-2xl font-black tracking-tighter uppercase relative">
                {/* Glitch effect layers */}
                <span className="relative z-10 block group-hover:-translate-y-1 transition-transform duration-300">
                  TRAHOANGDEV
                </span>
                <div className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 mix-blend-multiply dark:mix-blend-screen -z-10">
                  TRAHOANGDEV
                </div>
                <div className="absolute inset-0 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 mix-blend-multiply dark:mix-blend-screen -z-10">
                  TRAHOANGDEV
                </div>
              </div>
            </div>
          </div>

          {/* Mind Channel card */}
          <div
            className="relative overflow-hidden group border border-border 
        rounded-3xl p-6 cursor-pointer
        transition-all duration-300 ease-out
        hover:shadow-[0_0_20px_-5px_var(--foreground)]
        hover:border-foreground
        hover:scale-[1.02]
        bg-background"
          >
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-red-500">LIVE</span>
              </div>
              <div className="text-4xl font-black font-mono tracking-tighter tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                {mounted ? currentTime : '00:00:00'}
              </div>
              <div className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                UTC+7 • HO CHI MINH
              </div>
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none animate-scan"></div>
          </div>

          {/* Description */}
          <div className="magnet-card rounded-3xl border-zigzag-animated border-border p-6  hover:shadow-2xl transition-all duration-500 ease-out">
            <p className="text-xs leading-relaxed">
              <span className="text-foreground font-medium relative inline-block group">
                <span className="relative z-10 transition-all duration-700 ease-out group-hover:text-purple-400 group-hover:-translate-y-0.5">
                  Daily Fuel
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out group-hover:w-full"></span>
              </span>{' '}
              "Life is the most complex project you'll ever maintain. No documentation, changing requirements, and plenty of unexpected bugs. But that's where the fun is! Iterate often, embrace the refactors, and don't forget to garbage collect the negativity. Keep your runtime happy."
            </p>

            {/* Animated quote text */}
            <div className="mt-4">
              <p className="text-sm italic text-muted-foreground relative group">
                <span className="absolute -left-4 top-0 text-2xl text-purple-500 opacity-30 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:-translate-y-1">
                  "
                </span>
                <span className="relative inline-block">
                  <span className="relative z-10 transition-all duration-700 ease-out group-hover:text-foreground">
                    Code with heart. Ship with pride.
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:opacity-70 group-hover:-translate-y-1"></span>
                </span>
                <span className="absolute -right-2 bottom-0 text-2xl text-purple-500 opacity-30 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:-translate-y-1">
                  "
                </span>
              </p>
            </div>
          </div>

          {/* Website Info Card */}
          <WebsiteInfoCard />
        </div>
      </div>
    </header>
  );
}
