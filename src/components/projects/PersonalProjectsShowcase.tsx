'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaUsers } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { BsPuzzleFill } from 'react-icons/bs';

const PERSONAL_PROJECTS = [
    {
        id: 'trahoangdev-portfolio',
        title: 'Personal Portfolio',
        description:
            'A modern, high-performance portfolio built with Next.js 16 and Tailwind CSS 4. Features a matrix-themed design, interactive particles background, and seamless animations.',
        repo: 'https://github.com/trahoangdev/portfolio-trahoangdev',
        demo: 'https://trahoangdev.vercel.app',
        tags: [
            'Next.js 16',
            'Tailwind CSS 4',
            'TypeScript',
            'Shadcn UI',
            'Sentry',
            'Redis',
        ],
        isMaintenance: false,
        members: 1,
        image: '/projects/portfolio.png',
        gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    },
    {
        id: 'dev-orbit-blog',
        title: 'DevOrbit - Blog Platform',
        description:
            'An open-source blog platform designed for developers. Features MDX support, syntax highlighting, dark mode, and a highly optimized reading experience.',
        repo: 'https://github.com/trahoangdev/dev-orbit',
        demo: 'https://devorbitblog.vercel.app',
        tags: [
            'Next.js 14',
            'TypeScript',
            'Tailwind CSS',
            'Shadcn UI',
            'Contentlayer',
            'MDX',
            'Vercel',
        ],
        isMaintenance: false,
        members: 1,
        image: '/projects/blog.png',
        gradient: 'from-purple-500/20 via-pink-500/20 to-red-500/20',
    },
    {
        id: 'luxe-wear-ai',
        title: 'LUXE WEAR AI',
        description:
            'SaaS platforms enable businesses to build, deploy, and manage AI agents. The system supports real-time data integration, performs actions across third-party systems, and provides detailed analytical reporting.',
        repo: 'https://github.com/trahoangdev/client-luxe-wear-ai',
        demo: 'https://luxwearai.vercel.app',
        tags: [
            'Next.js 14',
            'TypeScript',
            'GeminiAI',
            'Tailwind CSS',
            'Vector DB',
            'Redis',
            'Supabase',
            'Pincode',
            'Shadcn UI',
            'Zustand',
            'SaaS',
        ],
        isMaintenance: false,
        members: 3,
        image: '/projects/luxe-wear.png',
        gradient: 'from-orange-500/20 via-pink-500/20 to-rose-500/20',
    },
];

export function PersonalProjectsShowcase() {
    return (
        <section className="space-y-8 rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur md:p-8">
            <header className="flex items-center justify-center gap-4 py-4">
                <div className="relative flex items-center justify-center">
                    <BsPuzzleFill className="h-8 w-8 text-foreground animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold font-mono tracking-tight uppercase">Personal Projects</h2>
            </header>

            <div className="grid gap-8">
                {PERSONAL_PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="group relative grid gap-6 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-6 transition-all duration-500 hover:border-solid hover:border-border hover:bg-muted/30 hover:shadow-xl md:grid-cols-2 lg:gap-12"
                    >
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        {project.title}
                                    </h3>
                                    {project.members && (
                                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
                                            <FaUsers className="h-3 w-3" />
                                            <span>{project.members} Members</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-muted-foreground leading-relaxed font-mono text-sm max-w-md">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={project.repo}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                                >
                                    <span>REPO</span>
                                    <FaGithub className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={project.demo}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                                >
                                    <span>VISIT</span>
                                    <FaExternalLinkAlt className="h-3 w-3" />
                                </Link>

                                {project.isMaintenance && (
                                    <div className="flex items-center gap-2 text-yellow-500 text-xs font-mono px-2 py-1 bg-yellow-500/10 rounded border border-yellow-500/20">
                                        <FiAlertTriangle /> <span>Not Maintaining</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-md border border-dashed border-border text-xs font-mono text-muted-foreground transition-colors group-hover:border-foreground/50 group-hover:text-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Preview */}
                        <div className={`relative aspect-video rounded-xl overflow-hidden border border-border/40 bg-gradient-to-br ${project.gradient} group-hover:border-border transition-all duration-500`}>
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                                    <span className="text-6xl font-black text-foreground/10 uppercase tracking-tighter">
                                        {project.title.split(' ')[0]}
                                    </span>
                                </div>
                            )}

                            {/* Mock UI window controls - Only show if no image or over image for style */}
                            {!project.image && (
                                <div className="absolute top-3 left-4 flex gap-1.5 opacity-50">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
