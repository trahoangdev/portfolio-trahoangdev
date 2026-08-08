import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogList } from '@/features/blog/components/BlogList';
import { BlogPostMetadata } from '@/features/blog/module/types';

describe('BlogList', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/blog');
  });

  const mockPosts: BlogPostMetadata[] = [
    {
      slug: 'post-1',
      title: 'React Server Components',
      excerpt: 'A deep dive into React Server Components',
      date: '2025-01-15',
      author: 'Test Author',
      tags: ['React', 'Next.js'],
    },
    {
      slug: 'post-2',
      title: 'TypeScript Best Practices',
      excerpt: 'Learn TypeScript best practices',
      date: '2025-01-10',
      author: 'Test Author',
      tags: ['TypeScript'],
    },
    {
      slug: 'post-3',
      title: 'Tailwind CSS Guide',
      excerpt: 'Master Tailwind CSS',
      date: '2025-01-05',
      author: 'Test Author',
      tags: ['CSS', 'Tailwind'],
    },
  ];

  const allTags = ['React', 'Next.js', 'TypeScript', 'CSS', 'Tailwind'];

  it('should render without crashing', () => {
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    expect(screen.getByRole('searchbox', { name: /search the archive/i })).toBeInTheDocument();
  });

  it('should render all posts initially', () => {
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    expect(screen.getByText('React Server Components')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Best Practices')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS Guide')).toBeInTheDocument();
  });

  it('should filter posts by search query', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const searchInput = screen.getByRole('searchbox', { name: /search the archive/i });
    await user.type(searchInput, 'React');

    expect(screen.getByText('React Server Components')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript Best Practices')).not.toBeInTheDocument();
    expect(screen.queryByText('Tailwind CSS Guide')).not.toBeInTheDocument();
  });

  it('should filter posts by tag', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const typeScriptTag = screen.getByRole('button', { name: 'TypeScript' });
    await user.click(typeScriptTag);

    expect(screen.getByText('TypeScript Best Practices')).toBeInTheDocument();
    expect(screen.queryByText('React Server Components')).not.toBeInTheDocument();
    expect(screen.queryByText('Tailwind CSS Guide')).not.toBeInTheDocument();
  });

  it('should show "All topics" button as active initially', () => {
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    const allButton = screen.getByRole('button', { name: 'All topics' });
    expect(allButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should toggle tag selection when clicking same tag twice', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const reactTag = screen.getByRole('button', { name: 'React' });
    await user.click(reactTag);
    expect(reactTag).toHaveAttribute('aria-pressed', 'true');

    await user.click(reactTag);
    expect(reactTag).toHaveAttribute('aria-pressed', 'false');
  });

  it('should show empty state when no posts match', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const searchInput = screen.getByRole('searchbox', { name: /search the archive/i });
    await user.type(searchInput, 'NonExistentPost');

    expect(screen.getByText(/no matching notes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  it('should clear filters when clicking "Clear all filters"', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const searchInput = screen.getByRole('searchbox', { name: /search the archive/i });
    await user.type(searchInput, 'NonExistentPost');

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    expect(screen.getByText('React Server Components')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Best Practices')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS Guide')).toBeInTheDocument();
  });

  it('should render all tags', () => {
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    allTags.forEach((tag) => {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    });
  });

  it('should filter by both search and tag', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const searchInput = screen.getByRole('searchbox', { name: /search the archive/i });
    await user.type(searchInput, 'Server');

    const reactTag = screen.getByRole('button', { name: 'React' });
    await user.click(reactTag);

    expect(screen.getByText('React Server Components')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript Best Practices')).not.toBeInTheDocument();
  });

  it('should be case insensitive in search', async () => {
    const user = userEvent.setup();
    render(<BlogList initialPosts={mockPosts} allTags={allTags} />);
    
    const searchInput = screen.getByRole('searchbox', { name: /search the archive/i });
    await user.type(searchInput, 'react');

    expect(screen.getByText('React Server Components')).toBeInTheDocument();
  });
});
