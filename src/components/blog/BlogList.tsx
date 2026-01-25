'use client';

import { useState, useMemo } from 'react';
import { BlogPostMetadata } from '@/modules/blog/types';
import { BlogCard } from './BlogCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogListProps {
    initialPosts: BlogPostMetadata[];
    allTags: string[];
}

export function BlogList({ initialPosts, allTags }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

            return matchesSearch && matchesTag;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    return (
        <div className="space-y-10">
            {/* Filters Section */}
            <div className="space-y-6">
                {/* Search Input */}
                <div className="relative max-w-md mx-auto md:max-w-2xl">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        className="flex h-12 w-full rounded-full border border-input bg-background/50 backdrop-blur-sm px-10 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm transition-all hover:bg-background hover:shadow-md"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            selectedTag === null
                                ? "bg-primary text-primary-foreground shadow-sm scale-105"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                selectedTag === tag
                                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-20 animate-in fade-in-50 zoom-in-95">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                        <Search className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        We couldn't find any posts matching your search criteria. Try different keywords or remove filters.
                    </p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                        className="mt-6 text-primary font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
