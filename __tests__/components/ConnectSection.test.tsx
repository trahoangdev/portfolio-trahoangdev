import { render, screen } from '@testing-library/react';
import { ConnectSection } from '@/components/connect/ConnectSection';

// Mock constants
jest.mock('@/lib/constants', () => ({
  CONNECT_LINKS: [
    { name: 'GitHub', urlTemplate: 'https://github.com/{handle}', handle: 'trahoangdev' },
    { name: 'LinkedIn', urlTemplate: 'https://linkedin.com/in/{handle}', handle: 'trahoangdev' },
  ],
  generateConnectUrl: jest.fn((template, handle) => template.replace('{handle}', handle)),
}));

describe('ConnectSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /connect/i });
    expect(section).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /connect/i });
    expect(section).toHaveAttribute('id', 'service');
  });

  it('should render heading', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
  });

  it('should render email link', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    const emailLink = screen.getByRole('link', { name: /contact@trahoangdev\.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@trahoangdev.com');
  });

  it('should call sectionRef with section element', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /connect/i });
    expect(section).toHaveAttribute('aria-labelledby');
  });

  it('should have responsive grid layout', () => {
    render(<ConnectSection activeSection="" sectionRef={mockRef} />);
    const section = screen.getByRole('region', { name: /connect/i });
    const grid = section.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
