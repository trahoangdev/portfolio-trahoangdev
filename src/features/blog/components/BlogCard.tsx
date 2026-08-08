import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogPostMetadata } from '@/features/blog/module/types';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    post: BlogPostMetadata;
    className?: string;
    variant?: 'featured' | 'archive' | 'related';
}

function formatDate(date: string, long = false) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: long ? 'long' : 'short',
        day: 'numeric',
    });
}

export function BlogCard({ post, className, variant = 'archive' }: BlogCardProps) {
    if (variant === 'featured') {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className={cn('group grid min-w-0 gap-7 rounded-[var(--radius-blog-surface)] border border-border bg-background p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)] md:items-stretch md:p-5', className)}
                aria-label={`Read featured note: ${post.title}`}
            >
                {post.coverImage && (
                    <div className="relative min-h-64 min-w-0 overflow-hidden rounded-[var(--radius-blog-control)] border border-border bg-muted md:min-h-[25rem]">
                        <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            priority
                            className="object-cover transition-opacity duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] group-hover:opacity-90"
                            sizes="(min-width: 768px) 62vw, 100vw"
                        />
                    </div>
                )}
                <article className="flex min-w-0 flex-col justify-between border-t border-border pt-5 md:border-b-0 md:border-l md:pl-7 md:pt-1">
                    <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span>Featured note</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={post.date} className="tabular-nums">{formatDate(post.date, true)}</time>
                            {post.readingTime && (
                                <>
                                    <span aria-hidden="true">·</span>
                                    <span>{post.readingTime}</span>
                                </>
                            )}
                        </div>
                        <h2 className="mt-6 min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-4xl font-medium leading-[0.98] tracking-[-0.035em] md:text-5xl">
                            {post.title}
                        </h2>
                        <p className="mt-5 line-clamp-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <div className="mt-8 flex items-end justify-between gap-4">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            {post.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </div>
                </article>
            </Link>
        );
    }

    if (variant === 'related') {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className={cn('group grid min-h-24 min-w-0 gap-3 px-5 py-5 focus-visible:rounded-[var(--radius-blog-control)] sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center', className)}
                aria-label={`Read next: ${post.title}`}
            >
                <time dateTime={post.date} className="tabular-nums text-sm text-muted-foreground">{formatDate(post.date)}</time>
                <h3 className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-xl font-medium leading-tight md:text-2xl">
                    {post.title}
                </h3>
                <ArrowUpRight className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true" />
            </Link>
        );
    }

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn('group grid min-w-0 gap-5 px-5 py-7 focus-visible:rounded-[var(--radius-blog-control)] md:grid-cols-[8.5rem_minmax(0,1fr)_11rem] md:items-center lg:grid-cols-[9.5rem_minmax(0,1fr)_14rem]', className)}
            aria-label={`Read note: ${post.title}`}
        >
            <div className="order-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground md:order-1 md:block">
                <time dateTime={post.date} className="block tabular-nums">{formatDate(post.date)}</time>
                {post.readingTime && <span className="mt-1 block">{post.readingTime}</span>}
            </div>
            <article className="order-3 min-w-0 md:order-2">
                <h3 className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
                    {post.title}
                </h3>
                <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {post.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
            </article>
            {post.coverImage && (
                <div className="relative order-1 aspect-[16/9] min-w-0 overflow-hidden rounded-[var(--radius-blog-control)] border border-border bg-muted md:order-3 md:aspect-[4/3]">
                    <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        className="object-cover transition-opacity duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] group-hover:opacity-85"
                        sizes="(min-width: 1024px) 224px, (min-width: 768px) 176px, 100vw"
                    />
                </div>
            )}
        </Link>
    );
}
