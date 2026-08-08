'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { BlogPostMetadata } from '@/features/blog/module/types';
import { cn } from '@/lib/utils';
import { BlogCard } from './BlogCard';
import { BlogPagination } from './BlogPagination';

interface BlogListProps {
    initialPosts: BlogPostMetadata[];
    allTags: string[];
}

const POSTS_PER_PAGE = 5;
const COLLAPSED_TOPIC_COUNT = 8;

export function BlogList({ initialPosts, allTags }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllTopics, setShowAllTopics] = useState(false);

    useEffect(() => {
        const tagFromUrl = new URLSearchParams(window.location.search).get('tag');

        if (tagFromUrl && allTags.includes(tagFromUrl)) {
            setSelectedTag(tagFromUrl);
            setShowAllTopics(!allTags.slice(0, COLLAPSED_TOPIC_COUNT).includes(tagFromUrl));
        }
    }, [allTags]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedTag]);

    const filteredPosts = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return initialPosts.filter((post) => {
            const matchesSearch =
                normalizedQuery.length === 0 ||
                post.title.toLowerCase().includes(normalizedQuery) ||
                post.excerpt.toLowerCase().includes(normalizedQuery);
            const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

            return matchesSearch && matchesTag;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    const isDefaultView = searchQuery.trim().length === 0 && selectedTag === null;
    const featuredPost = isDefaultView ? filteredPosts[0] : undefined;
    const archivePosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;
    const totalPages = Math.ceil(archivePosts.length / POSTS_PER_PAGE);
    const paginatedPosts = archivePosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );
    const visibleTopics = showAllTopics ? allTags : allTags.slice(0, COLLAPSED_TOPIC_COUNT);
    const hiddenTopicCount = Math.max(0, allTags.length - COLLAPSED_TOPIC_COUNT);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTag(null);
        window.history.replaceState(null, '', window.location.pathname);
    };

    const selectTopic = (tag: string | null) => {
        const nextTag = tag === selectedTag ? null : tag;
        setSelectedTag(nextTag);

        const url = new URL(window.location.href);
        if (nextTag) {
            url.searchParams.set('tag', nextTag);
        } else {
            url.searchParams.delete('tag');
        }
        window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    };

    return (
        <section className="py-12 md:py-16" aria-labelledby="archive-heading">
            <div className="grid min-w-0 gap-8 rounded-[var(--radius-blog-surface)] border border-border bg-background p-5 md:p-8 lg:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] lg:gap-12">
                <div>
                    <h2 id="archive-heading" className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-3xl font-medium tracking-tight md:text-4xl">
                        Browse the archive
                    </h2>
                    <p className="mt-3 tabular-nums text-sm leading-relaxed text-muted-foreground" aria-live="polite">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'note' : 'notes'} found
                    </p>
                </div>

                <div className="min-w-0 space-y-6">
                    <div>
                        <label htmlFor="blog-search" className="mb-2 block text-sm font-medium">
                            Search the archive
                        </label>
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                            <input
                                id="blog-search"
                                type="search"
                                className="h-12 w-full rounded-[var(--radius-blog-control)] border border-input bg-background py-3 pl-11 pr-4 text-sm outline-2 outline-transparent outline-offset-1 placeholder:text-muted-foreground hover:bg-muted/40 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Title or subject…"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <span className="text-sm font-medium">Topics</span>
                            {hiddenTopicCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllTopics((visible) => !visible)}
                                    className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground active:translate-y-px"
                                    aria-expanded={showAllTopics}
                                    aria-controls="blog-topic-filters"
                                >
                                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                                    {showAllTopics ? 'Fewer topics' : `${hiddenTopicCount} more`}
                                </button>
                            )}
                        </div>
                        <div id="blog-topic-filters" className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => selectTopic(null)}
                                aria-pressed={selectedTag === null}
                                className={cn(
                                    'min-h-11 whitespace-nowrap rounded-[var(--radius-blog-control)] border px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] active:translate-y-px',
                                    selectedTag === null
                                        ? 'border-foreground bg-foreground text-background'
                                        : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                All topics
                            </button>
                            {visibleTopics.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => selectTopic(tag)}
                                    aria-pressed={selectedTag === tag}
                                    className={cn(
                                        'min-h-11 whitespace-nowrap rounded-[var(--radius-blog-control)] border px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] active:translate-y-px',
                                        selectedTag === tag
                                            ? 'border-foreground bg-foreground text-background'
                                            : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {featuredPost && (
                <div className="py-12 md:py-16">
                    <BlogCard post={featuredPost} variant="featured" />
                </div>
            )}

            {paginatedPosts.length > 0 && (
                <div className="pt-10 md:pt-12">
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                        <h2 id="blog-note-list" className="scroll-mt-28 min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-2xl font-medium tracking-tight md:text-3xl">
                            {isDefaultView ? 'Latest notes' : 'Matching notes'}
                        </h2>
                        <span className="tabular-nums text-sm text-muted-foreground">
                            {archivePosts.length} total
                        </span>
                    </div>
                    <div className="overflow-hidden rounded-[var(--radius-blog-surface)] border border-border bg-background divide-y divide-border">
                        {paginatedPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} variant="archive" />
                        ))}
                    </div>
                </div>
            )}

            {archivePosts.length > 0 && totalPages > 1 && (
                <div className="mt-8">
                    <BlogPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            window.requestAnimationFrame(() => {
                                document.getElementById('blog-note-list')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            });
                        }}
                    />
                </div>
            )}

            {filteredPosts.length === 0 && (
                <div className="rounded-[var(--radius-blog-surface)] border border-border bg-background p-6 md:grid md:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1fr)] md:gap-12 md:p-8">
                    <Search className="mb-6 h-8 w-8 text-muted-foreground md:mb-0" aria-hidden="true" />
                    <div>
                        <h3 className="min-w-0 [overflow-wrap:anywhere] font-[family-name:var(--font-blog-display)] text-3xl font-medium">No matching notes</h3>
                        <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                            The current keyword and topic filter do not match a published note. Clear them to return to the full archive.
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-6 min-h-11 whitespace-nowrap border-b border-foreground font-medium active:translate-y-px"
                        >
                            Clear filters
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
