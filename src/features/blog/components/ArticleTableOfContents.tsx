'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ArticleHeading {
    id: string;
    title: string;
}

interface ArticleTableOfContentsProps {
    headings: ArticleHeading[];
}

export function ArticleTableOfContents({ headings }: ArticleTableOfContentsProps) {
    const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

    useEffect(() => {
        const headingElements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((heading): heading is HTMLElement => Boolean(heading));

        if (headingElements.length === 0) return;

        const updateActiveHeading = () => {
            const passedHeadings = headingElements.filter(
                (heading) => heading.getBoundingClientRect().top <= 152
            );
            setActiveId((passedHeadings.at(-1) ?? headingElements[0]).id);
        };

        const observer = new IntersectionObserver(updateActiveHeading, {
            rootMargin: '-152px 0px -65% 0px',
            threshold: [0, 1],
        });

        headingElements.forEach((heading) => observer.observe(heading));
        updateActiveHeading();

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav aria-label="Table of contents">
            <span className="block text-xs font-medium text-foreground">On this page</span>
            <ol className="mt-3 space-y-1">
                {headings.map((heading) => {
                    const isActive = activeId === heading.id;

                    return (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                onClick={() => setActiveId(heading.id)}
                                aria-current={isActive ? 'location' : undefined}
                                className={cn(
                                    'block border-l py-1 pl-3 leading-snug transition-colors duration-[var(--dur-blog-short)] ease-[var(--ease-blog-out)] focus-visible:rounded-[var(--radius-blog-control)]',
                                    isActive
                                        ? 'border-foreground font-medium text-foreground'
                                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                                )}
                            >
                                {heading.title}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
