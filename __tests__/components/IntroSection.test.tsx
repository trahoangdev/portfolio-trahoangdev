import { render, screen } from '@testing-library/react';
import { IntroSection } from '@/components/intro/IntroSection';

// Mock child components
jest.mock('@/components/intro/SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>,
}));

jest.mock('@/components/intro/WebsiteInfoCard', () => ({
  WebsiteInfoCard: () => <div data-testid="website-info">Website Info</div>,
}));

describe('IntroSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<IntroSection sectionRef={mockRef} />);
    // IntroSection uses <header> tag, not <section>, so it has 'banner' role
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<IntroSection sectionRef={mockRef} />);
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('id', 'intro');
  });

  it('should render main heading', () => {
    render(<IntroSection sectionRef={mockRef} />);
    expect(screen.getByText(/tra hoang dev/i)).toBeInTheDocument();
  });

  it('should render role description', () => {
    render(<IntroSection sectionRef={mockRef} />);
    expect(screen.getByText(/developer.*student.*content creator/i)).toBeInTheDocument();
  });

  it('should render bio text', () => {
    render(<IntroSection sectionRef={mockRef} />);
    const bioText = screen.getByText(/welcome to/i);
    expect(bioText).toBeInTheDocument();
  });

  it('should render SocialLinks component', () => {
    render(<IntroSection sectionRef={mockRef} />);
    expect(screen.getByTestId('social-links')).toBeInTheDocument();
  });

  it('should render WebsiteInfoCard component', () => {
    render(<IntroSection sectionRef={mockRef} />);
    expect(screen.getByTestId('website-info')).toBeInTheDocument();
  });

  it('should call sectionRef with section element', () => {
    render(<IntroSection sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<IntroSection sectionRef={mockRef} />);
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('id', 'intro');
  });

  it('should have responsive grid layout classes', () => {
    render(<IntroSection sectionRef={mockRef} />);
    const section = screen.getByRole('banner');
    // Check for grid layout in the component
    const gridContainer = section.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });
});
