'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialLinks } from '@/components/intro/SocialLinks';
import { CommunityInfo } from '@/components/intro/CommunityInfo';
import { WebsiteInfoCard } from '@/components/intro/WebsiteInfoCard';

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
      className="min-h-screen flex items-center opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
    >
      <div className="grid lg:grid-cols-3 gap-8 w-full">
        {/* Left column - Main info */}
        <div className="lg:col-span-1 space-y-8">
          <div
            className="magnet-card border-solid-animated border-border
           p-6 hover-lift hover:scale-105 hover:shadow-2xl
           transition-all duration-500
           group/info
           dark:hover:bg-background dark:hover:text-foreground"
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 
                   dark:from-transparent dark:via-black/20dark:to-transparent
                   -translate-x-full group-hover/info:translate-x-full 
                   transition-transform duration-1000 ease-in-out
                   dark:bg-background dark:text-foreground"
            ></div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase">
                TRA HOANG DEV
              </h1>
              <div className="text-lg font-medium">
                Software Engineer | AI Engineer | Senior Student
              </div>
              <div className="text-sm text-muted-foreground">
                Writing code that thinks, designing interfaces that feel. Let's break the loop.
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="group magnet-card border-dashed-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <div className="group hover-lift hover:scale-125 out aspect-square bg-muted rounded-lg overflow-hidden relative">
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
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Portrait not found
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Link
              href="/#service"
              className="px-6 py-2 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift"
            >
              Connect
            </Link>
            <Link
              href="/project"
              className="px-6 py-2 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift"
            >
              My Matrix
            </Link>
          </div>
        </div>

        {/* Center column - Message and contact */}
        <div className="lg:col-span-1 space-y-8">
          {/* Social icons */}
          <div className="magnet-card border-wave-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
            <SocialLinks />
          </div>

          {/* Personal message */}
          <div className="magnet-card group border-pulse-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
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

              <div className="flex gap-2 mt-4">
                <div className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  AI Engineer
                </div>
                <div className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  Web Developer
                </div>
                <div className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                  Software Developer
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
            <div className="magnet-card border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500 group">
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
                  <div className="px-3 py-1 bg-yellow-400 text-black font-bold text-xs rounded-sm transition-transform group-hover:scale-105">
                    Buy me a coffee
                  </div>
                  <div className="w-8 h-8 border border-border flex items-center justify-center bg-background group-hover:bg-yellow-100 transition-colors">
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
          <div className="magnet-card border-double-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out"></div>
            <div className="space-y-4 relative z-10">
              <div className="bg-foreground text-background p-4 text-center transition-all duration-500 group-hover:bg-white group-hover:text-black">
                <div className="text-sm font-bold">ARCHITECT OF FLOW</div>
                <div className="text-xs">TRAHOANGDEV</div>
              </div>
            </div>
          </div>

          {/* Mind Channel card */}
          <div
            className="relative overflow-hidden group border border-border 
        rounded-1xl p-6 cursor-pointer
        transition-[transform,box-shadow] duration-300 ease-out
        hover:shadow-[0_0_0_2px_rgba(255,255,255,0.85),0_0_36px_14px_rgba(255,255,255,0.25)]
        hover:scale-105 hover:bg-muted
        will-change-transform transform-gpu"
          >
            <div className="space-y-4 text-center">
              <div className="text-xs tracking-wider">= = = = =</div>
              <div className="text-2xl font-bold">MIND</div>
              <div className="text-sm">CHANNEL</div>
              <div className="text-2xl font-bold font-mono bg-foreground text-background px-2 py-1 inline-block">
                {mounted ? currentTime : '00:00:00'}
              </div>
              <div className="text-xs">UTC+7 LIVE</div>
            </div>
          </div>

          {/* Description */}
          <div className="magnet-card border-zigzag-animated border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out">
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
