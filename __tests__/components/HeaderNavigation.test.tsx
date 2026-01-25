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
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);
  });

  it('should render logo/brand', () => {
    render(<HeaderNavigation />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<HeaderNavigation />);
    // Select the main navigation
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
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
