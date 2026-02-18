'use server';

import { getAllPosts } from '@/modules/blog/service';
import { BlogPostMetadata } from '@/modules/blog/types';

/**
 * Server Action to fetch the latest blog posts.
 * Runs on the server so it has access to the filesystem.
 */
export async function getLatestBlogPosts(limit: number = 3): Promise<BlogPostMetadata[]> {
    const posts = getAllPosts();
    return posts.slice(0, limit);
}
