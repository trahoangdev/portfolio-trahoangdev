'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { CalendarDays, Clock, ArrowUpRight } from 'lucide-react';
import { getLatestBlogPosts } from '@/app/actions/blog';
import type { BlogPostMetadata } from '@/modules/blog/types';

interface LatestBlogProps {
    sectionRef: (el: HTMLElement | null) => void;
}

export function LatestBlog({ sectionRef }: LatestBlogProps) {
    const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLatestBlogPosts(3)
            .then(setPosts)
            .catch(() => setPosts([]))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <section
            ref={sectionRef}
            id="blog"
            aria-label="Latest blog posts"
            className="py-20 sm:py-32 relative opacity-0 translate-y-8 transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 scroll-mt-20"
        >
            {/* Decorative blob */}
            <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4">
                    <div className="space-y-2">
                        <h2 className="text-sm font-mono text-blue-500 tracking-[0.2em] uppercase">
                            From the Blog
                        </h2>
                        <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tighter">
                            Latest Thoughts
                        </h3>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                        aria-label="View all blog posts"
                    >
                        <span>Read All Posts</span>
                        <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                </div>

                {/* Posts Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-border/50 bg-background/50 p-6 space-y-4 animate-pulse"
                            >
                                <div className="h-3 bg-muted rounded w-1/3" />
                                <div className="h-6 bg-muted rounded w-3/4" />
                                <div className="space-y-2">
                                    <div className="h-3 bg-muted rounded w-full" />
                                    <div className="h-3 bg-muted rounded w-2/3" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-5 bg-muted rounded w-16" />
                                    <div className="h-5 bg-muted rounded w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <p className="text-lg">No posts yet. Stay tuned!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-2xl hover:border-border/80 hover:-translate-y-1"
                            >
                                {/* Post number */}
                                <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/40 font-bold">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="space-y-4">
                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays className="h-3 w-3" aria-hidden="true" />
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </time>
                                        </div>
                                        {post.readingTime && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-3 w-3" aria-hidden="true" />
                                                <span>{post.readingTime}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold tracking-tight group-hover:text-blue-500 transition-colors duration-300 line-clamp-2 pr-6">
                                        {post.title}
                                    </h4>

                                    {/* Excerpt */}
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-[10px] font-mono border border-border/50 rounded-md uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Read more indicator */}
                                    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-blue-500 transition-colors pt-2">
                                        <span>Read</span>
                                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
