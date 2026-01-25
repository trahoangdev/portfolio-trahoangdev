import { getAllPosts } from '@/modules/blog/service';
import { BlogList } from '@/components/blog/BlogList';

export const metadata = {
    title: 'Blog </> trahoangdev',
    description: 'Sharing my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
    const posts = getAllPosts();
    // Extract unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags || []))).sort();

    return (
        <div className="container py-12 md:py-24 space-y-12 max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                    My Blog
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                    Insights, tutorials, and stories from my journey as a developer.
                </p>
            </div>

            <BlogList initialPosts={posts} allTags={allTags} />
        </div>
    );
}
