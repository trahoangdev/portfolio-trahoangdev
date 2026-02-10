'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

interface FeaturedWorkProps {
    sectionRef: (el: HTMLElement | null) => void;
}

export function FeaturedWork({ sectionRef }: FeaturedWorkProps) {
    return (
        <section ref={sectionRef} id="featured" aria-label="Featured work" className="py-12 sm:py-32 relative">

            <div className="absolute top-1/2 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4">
                    <div className="space-y-2">
                        <h2 className="text-sm font-mono text-emerald-500 tracking-[0.2em] uppercase">
                            Masterpiece
                        </h2>
                        <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter">
                            Tài Khoản Xịn
                        </h3>
                    </div>
                    <Link
                        href="/project"
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                        aria-label="View all projects"
                    >
                        <span>View All Projects</span>
                        <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                </div>

                <div className="group relative grid lg:grid-cols-12 items-center border border-border/50 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden p-0 sm:p-6 lg:p-0 transition-all duration-500 hover:shadow-2xl hover:border-border/80">

                    {/* Content */}
                    <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 lg:pr-6 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1 relative z-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wide">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Flagship Project
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                A premier marketplace for digital access. Connecting users with top-tier service accounts through a seamless, automated platform. Quality, reliability, and speed—delivered.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['Next.js 14', 'Supabase', 'Banking API', 'Shadcn UI', 'SCSS'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs font-mono border border-border/50 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <Link
                                href="https://taikhoanxin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 min-h-[44px] bg-foreground text-background font-bold uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                aria-label="Visit Tài Khoản Xịn live demo (opens in new tab)"
                            >
                                Live Demo
                                <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
                            </Link>
                            {/* Repo button hidden as repo is private in data */}
                        </div>
                    </div>

                    {/* Image/Preview */}
                    <div className="lg:col-span-7 h-64 sm:h-80 md:h-96 lg:min-h-[500px] bg-muted/20 relative order-1 lg:order-2 overflow-hidden rounded-none sm:rounded-xl lg:rounded-none lg:rounded-l-3xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-green-500/10 z-0" />

                        {/* Mockup / Image Container */}
                        <div className="absolute inset-0 sm:inset-4 lg:inset-8 lg:my-12 sm:rounded-lg shadow-none sm:shadow-2xl overflow-hidden border-b sm:border border-border/20 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            <Image
                                src="/projects/taikhoanxin.png"
                                alt="Tài Khoản Xịn Interface"
                                fill
                                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
