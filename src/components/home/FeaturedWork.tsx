'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

interface FeaturedWorkProps {
    sectionRef: (el: HTMLElement | null) => void;
}

export function FeaturedWork({ sectionRef }: FeaturedWorkProps) {
    return (
        <section ref={sectionRef} id="featured" className="py-12 sm:py-32 relative">

            <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4">
                    <div className="space-y-2">
                        <h2 className="text-sm font-mono text-purple-500 tracking-[0.2em] uppercase">
                            Masterpiece
                        </h2>
                        <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter">
                            Luxe Wear AI
                        </h3>
                    </div>
                    <Link
                        href="/project"
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>View All Projects</span>
                        <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="group relative grid lg:grid-cols-12 items-center border border-border/50 bg-background/50 backdrop-blur-sm rounded-3xl overflow-hidden p-0 sm:p-6 lg:p-0 transition-all duration-500 hover:shadow-2xl hover:border-border/80">

                    {/* Content */}
                    <div className="lg:col-span-5 p-6 sm:p-0 lg:p-12 lg:pr-6 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1 relative z-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-wide">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                </span>
                                Flagship Project
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                A sophisticated SaaS platform empowering businesses to deploy autonomous AI agents.
                                Features real-time data integration, multi-system orchestration, and
                                detailed analytical reporting.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['Next.js 14', 'Gemini AI', 'Vector DB', 'Redis', 'Supabase'].map((tag) => (
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
                                href="https://luxwearai.vercel.app"
                                target="_blank"
                                className="w-full sm:w-auto px-8 py-3 bg-foreground text-background font-bold uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                            >
                                Live Demo
                                <FaExternalLinkAlt className="h-3 w-3" />
                            </Link>
                            <Link
                                href="https://github.com/trahoangdev/client-luxe-wear-ai"
                                target="_blank"
                                className="w-full sm:w-auto px-8 py-3 border border-border font-bold uppercase tracking-wider rounded-lg hover:bg-muted transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                            >
                                Source
                                <FaGithub className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Image/Preview */}
                    <div className="lg:col-span-7 h-56 sm:h-auto min-h-[200px] lg:min-h-[500px] bg-muted/20 relative order-1 lg:order-2 overflow-hidden rounded-none sm:rounded-xl lg:rounded-none lg:rounded-l-3xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-pink-500/10 to-rose-500/10 z-0" />

                        {/* Mockup / Image Container */}
                        <div className="absolute inset-0 sm:inset-4 lg:inset-8 lg:my-12 sm:rounded-lg shadow-none sm:shadow-2xl overflow-hidden border-b sm:border border-border/20 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                            {/* Replace with actual image path if available */}
                            <Image
                                src="/projects/luxe-wear.png"
                                alt="Luxe Wear AI Interface"
                                fill
                                className="object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
