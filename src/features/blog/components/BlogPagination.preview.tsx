import { BlogPagination } from './BlogPagination';

const noop = () => undefined;

export function BlogPaginationPreview() {
    return (
        <div className="blog-journal space-y-8 bg-background p-8 text-foreground">
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} previewState="default" />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} previewState="hover" />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} previewState="focus" />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} previewState="active" />
            <BlogPagination currentPage={1} totalPages={4} onPageChange={noop} disabled />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} isLoading />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} error="Could not load this page." />
            <BlogPagination currentPage={2} totalPages={4} onPageChange={noop} successMessage="Page loaded." />
        </div>
    );
}
