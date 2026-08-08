import { getAllPosts } from '@/features/blog/module/service';
import { BlogList } from '@/features/blog/components/BlogList';
import { Rss } from 'lucide-react';

export const metadata = {
    title: 'Blog',
    description: 'Sharing my thoughts on software development, design, and more.',
    alternates: {
        types: {
            'application/rss+xml': '/feed.xml',
        },
    },
};

export default async function BlogPage() {
    const posts = getAllPosts();
    const tagCounts = posts.reduce((counts, post) => {
        post.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
        return counts;
    }, new Map<string, number>());
    const allTags = Array.from(tagCounts.keys()).sort((a, b) => {
        const frequencyDifference = (tagCounts.get(b) ?? 0) - (tagCounts.get(a) ?? 0);
        return frequencyDifference || a.localeCompare(b);
    });

    return (
        <main className="blog-journal overflow-x-clip bg-background pb-12 pt-28 md:pb-16 md:pt-32">
            <section className="mx-auto max-w-6xl px-4 md:px-8">
                <div className="grid min-w-0 rounded-[var(--radius-blog-surface)] border border-border bg-background px-4 pb-14 pt-10 md:px-8 md:pb-16 md:pt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.55fr)] lg:gap-12">
                    <h1 className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-[length:var(--text-blog-title)] font-medium leading-[0.82] tracking-[-0.055em]">
                        My Blog
                    </h1>
                    <div className="mt-8 flex min-w-0 flex-col justify-between gap-8 border-t border-border pt-6 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
                        <p className="max-w-md text-[length:var(--text-blog-lede)] leading-relaxed text-muted-foreground">
                            Field notes on software engineering, cloud systems, AI, and the decisions behind the build.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                            <span className="tabular-nums text-muted-foreground">{posts.length} published notes</span>
                            <a
                                href="/feed.xml"
                                className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-medium underline decoration-border underline-offset-4 transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:decoration-foreground focus-visible:rounded-[var(--radius-blog-control)]"
                                aria-label="Subscribe to the blog RSS feed"
                            >
                                RSS feed
                                <Rss className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <BlogList initialPosts={posts} allTags={allTags} />
            </div>

            <footer className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
                <div className="grid gap-6 rounded-[var(--radius-blog-surface)] border border-border bg-background px-4 py-8 text-sm text-muted-foreground md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-8">
                    <p className="max-w-xl leading-relaxed">
                        Written and maintained by trahoangdev. Notes are published when a build leaves something worth documenting.
                    </p>
                    <a
                        href="/feed.xml"
                        className="min-h-11 whitespace-nowrap font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] hover:decoration-foreground"
                    >
                        <span className="inline-flex items-center gap-2">
                            Follow via RSS
                            <Rss className="h-4 w-4" aria-hidden="true" />
                        </span>
                    </a>
                </div>
            </footer>
        </main>
    );
}
