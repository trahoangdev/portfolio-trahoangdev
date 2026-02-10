import { render, screen } from '@testing-library/react';
import { FeaturedWork } from '@/components/home/FeaturedWork';

describe('FeaturedWork', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /featured/i });
    expect(section).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /featured/i });
    expect(section).toHaveAttribute('id', 'featured');
  });

  it('should render project title', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    expect(screen.getByText(/tài khoản xịn/i)).toBeInTheDocument();
  });

  it('should render "View All Projects" link', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const link = screen.getByRole('link', { name: /view all projects/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/project');
  });

  it('should render "Live Demo" link with correct attributes', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const link = screen.getByRole('link', { name: /visit tài khoản xịn live demo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://taikhoanxin.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should call sectionRef with section element', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /featured/i });
    expect(section).toHaveAttribute('id', 'featured');
  });

  it('should have responsive classes', () => {
    render(<FeaturedWork sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /featured/i });
    expect(section.className).toMatch(/py-|sm:|md:|lg:/);
  });
});
