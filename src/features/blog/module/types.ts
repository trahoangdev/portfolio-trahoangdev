export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    coverImage?: string;
    coverImageCaption?: string;
    content: string;
    tags?: string[];
    readingTime?: string;
}

export type BlogPostMetadata = Omit<BlogPost, 'content'>;
