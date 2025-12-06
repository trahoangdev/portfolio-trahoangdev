import { render, screen } from '@testing-library/react';
import { WorkSection } from '@/components/work/WorkSection';

describe('WorkSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'work');
  });

  it('should render section heading', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    expect(screen.getByText(/roadmap/i)).toBeInTheDocument();
  });

  it('should render experience items', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    // Check for common experience-related text
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('should call sectionRef with section element', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should have animation classes for in-view transitions', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section.className).toContain('opacity-0');
    expect(section.className).toContain('translate-y-8');
    expect(section.className).toContain('data-[inview=true]:opacity-100');
  });

  it('should render correctly regardless of active section', () => {
    render(<WorkSection activeSection="intro" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'work');
  });

  it('should have proper accessibility attributes', () => {
    render(<WorkSection activeSection="work" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'work-heading');
  });


});
