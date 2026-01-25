import Link from 'next/link';
import { BlogPostMetadata } from '@/modules/blog/types';
import { cn } from '@/lib/utils';
import { CalendarDays, Clock } from 'lucide-react';

interface BlogCardProps {
    post: BlogPostMetadata;
    className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className={cn("group block h-full", className)}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                {post.coverImage && (
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{post.readingTime}</span>
                            </div>
                        )}
                    </div>
                    <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                        {post.excerpt}
                    </p>
                    {post.tags && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border group-hover:bg-secondary transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
