import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { isValidElement } from 'react';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { CodeBlock } from '@/features/blog/components/CodeBlock';
import { ArticleTableOfContents, type ArticleHeading } from '@/features/blog/components/ArticleTableOfContents';
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/features/blog/module/service';
import { getArticleSchema } from '@/lib/schema/article';
import { getBreadcrumbSchema } from '@/lib/schema/breadcrumb';

function getTextContent(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (isValidElement<{ children?: React.ReactNode }>(node)) return getTextContent(node.props.children);
    return '';
}

function slugifyHeading(title: string) {
    return title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[’'"`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function extractArticleHeadings(content: string): ArticleHeading[] {
    return content
        .split('\n')
        .map((line) => line.match(/^##\s+(.+?)\s*#*\s*$/))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .map((match) => {
            const title = match[1]
                .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
                .replace(/[*_~`]/g, '')
                .replace(/<[^>]+>/g, '')
                .trim();

            return { id: slugifyHeading(title), title };
        });
}

const components: Components = {
    h1: () => null,
    h2: ({ node: _node, children, ...props }) => {
        const id = slugifyHeading(getTextContent(children));

        return (
            <h2 id={id} className="scroll-mt-32 min-w-0 [overflow-wrap:anywhere] mb-5 mt-14 border-t border-border pt-6 font-[family-name:var(--font-blog-display)] text-3xl font-medium leading-tight tracking-[-0.025em] text-foreground md:text-4xl" {...props}>
                {children}
            </h2>
        );
    },
    h3: ({ node: _node, ...props }) => (
        <h3 className="min-w-0 [overflow-wrap:anywhere] mb-4 mt-10 font-[family-name:var(--font-blog-display)] text-2xl font-medium leading-tight text-foreground md:text-3xl" {...props} />
    ),
    p: ({ node: _node, ...props }) => (
        <p className="mt-6 leading-8 text-foreground/90" {...props} />
    ),
    ul: ({ node: _node, ...props }) => (
        <ul className="my-6 ml-6 list-disc space-y-2 text-foreground/90 marker:text-muted-foreground" {...props} />
    ),
    ol: ({ node: _node, ...props }) => (
        <ol className="my-6 ml-6 list-decimal space-y-2 text-foreground/90 marker:font-mono marker:text-muted-foreground" {...props} />
    ),
    li: ({ node: _node, ...props }) => <li className="pl-1 leading-8" {...props} />,
    strong: ({ node: _node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
    blockquote: ({ node: _node, ...props }) => (
        <blockquote className="my-9 border-l-2 border-foreground pl-5 font-[family-name:var(--font-blog-display)] text-xl leading-relaxed text-foreground" {...props} />
    ),
    a: ({ node: _node, ...props }) => (
        <a className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:decoration-foreground" {...props} />
    ),
    pre: ({ node: _node, ...props }) => <CodeBlock {...props} />,
    code: ({ node: _node, ...props }) => (
        <code className="relative rounded-[var(--radius-blog-inline)] border border-border/50 bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground" {...props} />
    ),
    hr: ({ node: _node, ...props }) => <hr className="my-12 border-border" {...props} />,
};

export async function generateStaticParams() {
    return getPostSlugs().map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }));
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
    } catch {
        return { title: 'Post Not Found' };
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params;
    let post;

    try {
        post = getPostBySlug(resolvedParams.slug);
    } catch {
        notFound();
    }

    const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);
    const articleHeadings = extractArticleHeadings(post.content);
    const articleSchema = getArticleSchema({
        title: post.title,
        description: post.excerpt,
        image: post.coverImage,
        datePublished: post.date,
        slug: resolvedParams.slug,
        author: post.author,
    });
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${resolvedParams.slug}` },
    ]);

    return (
        <main className="blog-journal overflow-x-clip bg-background pb-16 pt-28 md:pt-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <header className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="rounded-[var(--radius-blog-surface)] border border-border bg-background px-4 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
                    <Link
                        href="/blog"
                        className="group inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:text-foreground focus-visible:rounded-[var(--radius-blog-control)]"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Blog archive
                    </Link>

                    <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
                        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                            <div>
                                <span className="block text-xs font-medium text-foreground">Published</span>
                                <time dateTime={post.date} className="mt-1 block tabular-nums">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            {post.readingTime && (
                                <div>
                                    <span className="block text-xs font-medium text-foreground">Reading time</span>
                                    <span className="mt-1 block">{post.readingTime}</span>
                                </div>
                            )}
                            <div>
                                <span className="block text-xs font-medium text-foreground">By</span>
                                <span className="mt-1 block">{post.author}</span>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h1 className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-[length:var(--text-blog-article-title)] font-medium leading-[0.92] tracking-[-0.045em]">
                                {post.title}
                            </h1>
                            <p className="mt-6 max-w-3xl text-[length:var(--text-blog-lede)] leading-relaxed text-muted-foreground">
                                {post.excerpt}
                            </p>
                            {post.tags && (
                                <div className="mt-6 flex flex-wrap gap-2 text-sm">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                                            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-[var(--radius-blog-control)] border border-border bg-muted/60 px-3 py-2 font-medium text-foreground transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:border-foreground hover:bg-foreground hover:text-background active:translate-y-px"
                                            aria-label={`View posts about ${tag}`}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {post.coverImage && (
                <figure className="mx-auto max-w-6xl bg-background px-4 py-8 md:px-8 md:py-10">
                    <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-[var(--radius-blog-surface)] border border-border bg-muted sm:aspect-[16/8] lg:aspect-[16/7]">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width: 1152px) 1088px, calc(100vw - 2rem)"
                        />
                    </div>
                    {post.coverImageCaption && (
                        <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                            {post.coverImageCaption}
                        </figcaption>
                    )}
                </figure>
            )}

            <section className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="rounded-[var(--radius-blog-surface)] border border-border bg-background py-10 md:py-16">
                    <div className="mx-auto grid min-w-0 gap-10 px-4 md:px-8 lg:grid-cols-[9rem_minmax(0,46rem)] lg:gap-8">
                        <aside className="hidden text-sm leading-relaxed lg:block">
                            <div className="sticky top-28 border-t border-border pt-4">
                                <ArticleTableOfContents headings={articleHeadings} />
                            </div>
                        </aside>
                        <article className="min-w-0 max-w-[46rem] text-[1.0625rem]">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                {post.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </section>

            {relatedPosts.length > 0 && (
                <section className="mx-auto mt-14 max-w-6xl px-4 md:px-8" aria-labelledby="read-next-heading">
                    <div className="overflow-hidden rounded-[var(--radius-blog-surface)] border border-border bg-background">
                        <div className="grid gap-4 border-b border-border px-5 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end md:px-8">
                            <h2 id="read-next-heading" className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-3xl font-medium tracking-tight md:text-4xl">Read next</h2>
                            <Link href="/blog" className="min-h-11 whitespace-nowrap text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                                View the archive
                            </Link>
                        </div>
                        <div className="divide-y divide-border">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.slug} post={relatedPost} variant="related" />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
