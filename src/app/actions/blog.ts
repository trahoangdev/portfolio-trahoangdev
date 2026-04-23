'use server';

import { getAllPosts } from '@/features/blog/module/service';
import { BlogPostMetadata } from '@/features/blog/module/types';

/**
 * Server Action to fetch the latest blog posts.
 * Runs on the server so it has access to the filesystem.
 */
export async function getLatestBlogPosts(limit: number = 3): Promise<BlogPostMetadata[]> {
    const posts = getAllPosts();
    return posts.slice(0, limit);
}
