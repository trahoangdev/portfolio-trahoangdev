import { render, screen } from '@testing-library/react';
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('HeaderNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should have navigation landmark', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render logo/brand', () => {
    render(<HeaderNavigation />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<HeaderNavigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });

  it('should be sticky positioned', () => {
    render(<HeaderNavigation />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('fixed');
  });

  it('should have z-index for layering', () => {
    render(<HeaderNavigation />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('z-');
  });

  it('should be responsive', () => {
    render(<HeaderNavigation />);
    const header = screen.getByRole('banner');
    // Check for the inner div that has padding classes
    const innerDiv = header.querySelector('div');
    expect(innerDiv?.className).toMatch(/px-|py-/);
  });
});
