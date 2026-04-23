import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Simple reading time estimate: 200 words per minute
    const words = content.split(/\s+/g).length;
    const minutes = Math.ceil(words / 200);
    const readingTime = `${minutes} min read`;

    // Ensure date is a string
    const dateStr = data.date instanceof Date ? data.date.toISOString() : data.date;

    return {
        slug: realSlug,
        title: data.title,
        excerpt: data.excerpt,
        date: dateStr,
        author: data.author,
        coverImage: data.coverImage,
        coverImageCaption: data.coverImageCaption,
        content,
        tags: data.tags,
        readingTime: data.readingTime || readingTime,
    } as BlogPost;
}

export function getAllPosts(): BlogPostMetadata[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ content, ...meta }) => meta)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMetadata[] {
    const allPosts = getAllPosts();
    return allPosts
        .filter((post) => post.slug !== currentSlug)
        .slice(0, limit);
}
