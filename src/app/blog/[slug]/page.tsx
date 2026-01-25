import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/modules/blog/service';
import Link from 'next/link';
import { ChevronLeft, CalendarDays, Clock, User } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/blog/CodeBlock';

import { getRelatedPosts } from '@/modules/blog/service';
import { BlogCard } from '@/components/blog/BlogCard';

// Custom components map for markdown
const components: any = {
    h1: ({ node, ...props }: any) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
    ),
    h2: ({ node, ...props }: any) => (
        <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2 text-foreground" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props} />
    ),
    p: ({ node, ...props }: any) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-foreground/90" {...props} />
    ),
    ul: ({ node, ...props }: any) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-foreground/90" {...props} />
    ),
    ol: ({ node, ...props }: any) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-foreground/90" {...props} />
    ),
    li: ({ node, ...props }: any) => (
        <li className="mt-2" {...props} />
    ),
    strong: ({ node, ...props }: any) => (
        <strong className="font-bold text-foreground" {...props} />
    ),
    a: ({ node, ...props }: any) => (
        <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
    ),
    pre: ({ node, ...props }: any) => (
        <CodeBlock {...props} />
    ),
    code: ({ node, ...props }: any) => (
        <code className="relative rounded bg-muted/80 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground border border-border/30" {...props} />
    ),
};

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    try {
        const post = getPostBySlug(resolvedParams.slug);
        return {
            title: `${post.title} - Tra Hoang`,
            description: post.excerpt,
        };
    } catch (error) {
        return {
            title: 'Post Not Found'
        };
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params;
    let post;
    try {
        post = getPostBySlug(resolvedParams.slug);
    } catch (error) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);

    return (
        <>
            <article className="container max-w-4xl py-12 md:py-24 mx-auto px-4">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group"
                >
                    <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                </Link>

                <div className="space-y-6 mb-12 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>{post.readingTime}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl lg:leading-[1.1]">
                        {post.title}
                    </h1>

                    {post.tags && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1 text-sm font-medium text-secondary-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {post.coverImage && (
                    <div className="mb-12 overflow-hidden rounded-xl border bg-muted shadow-lg">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full object-cover max-h-[600px]"
                        />
                        {post.coverImageCaption && (
                            <div className="bg-muted/50 p-3 text-center border-t">
                                <p className="text-sm text-muted-foreground italic">
                                    {post.coverImageCaption}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="prose prose-stone dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <div className="bg-muted/30 py-12 border-t">
                    <div className="container max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-8">Read Next</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
