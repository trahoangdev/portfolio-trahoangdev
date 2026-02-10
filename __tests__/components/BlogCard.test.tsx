import { render, screen } from '@testing-library/react';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPostMetadata } from '@/modules/blog/types';

describe('BlogCard', () => {
  const mockPost: BlogPostMetadata = {
    slug: 'test-post',
    title: 'Test Blog Post',
    excerpt: 'This is a test excerpt for the blog post.',
    date: '2025-01-15',
    author: 'Test Author',
    tags: ['React', 'Next.js'],
    coverImage: '/test-image.jpg',
    readingTime: '5 min read',
  };

  it('should render without crashing', () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should render post title', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('should render post excerpt', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/This is a test excerpt/i)).toBeInTheDocument();
  });

  it('should have correct link href', () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('should render cover image when provided', () => {
    render(<BlogCard post={mockPost} />);
    const image = screen.getByAltText('Test Blog Post');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so check if it contains the original path
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
  });

  it('should render date correctly', () => {
    render(<BlogCard post={mockPost} />);
    const timeElement = screen.getByText(/Jan/i);
    expect(timeElement).toBeInTheDocument();
  });

  it('should render reading time when provided', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should render tags when provided', () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('should not render cover image when not provided', () => {
    const postWithoutImage = { ...mockPost, coverImage: undefined };
    render(<BlogCard post={postWithoutImage} />);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });

  it('should not render reading time when not provided', () => {
    const postWithoutReadingTime = { ...mockPost, readingTime: undefined };
    render(<BlogCard post={postWithoutReadingTime} />);
    expect(screen.queryByText(/min read/i)).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<BlogCard post={mockPost} className="custom-class" />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('custom-class');
  });

  it('should have proper article structure', () => {
    render(<BlogCard post={mockPost} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });
});
