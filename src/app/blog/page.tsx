import { getAllPosts } from '@/modules/blog/service';
import { BlogList } from '@/components/blog/BlogList';

export const metadata = {
    title: 'Blog </> trahoangdev',
    description: 'Sharing my thoughts on software development, design, and more.',
    alternates: {
        types: {
            'application/rss+xml': '/feed.xml',
        },
    },
};

export default async function BlogPage() {
    const posts = getAllPosts();
    // Extract unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags || []))).sort();

    return (
        <div className="container pt-24 pb-12 md:py-24 space-y-12 max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                        My Blog
                    </h1>
                    <a
                        href="/feed.xml"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                        aria-label="Subscribe to RSS feed"
                        title="RSS Feed"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
                        </svg>
                        <span className="hidden sm:inline">RSS Feed</span>
                    </a>
                </div>
                <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                    Insights, tutorials, and stories from my journey as a developer.
                </p>
            </div>

            <BlogList initialPosts={posts} allTags={allTags} />
        </div>
    );
}
