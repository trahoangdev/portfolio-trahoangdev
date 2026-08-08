import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { HeaderNavigation } from '@/components/navigation/HeaderNavigation';
import { SCROLL_THRESHOLD } from '@/lib/constants/ui';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('HeaderNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
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

  it('should show the homepage header after scrolling in React Strict Mode', () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) =>
      window.setTimeout(() => callback(performance.now()), 16)
    );
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((frameId) => {
      window.clearTimeout(frameId);
    });
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: SCROLL_THRESHOLD + 1,
    });

    render(
      <StrictMode>
        <HeaderNavigation />
      </StrictMode>
    );

    act(() => {
      jest.advanceTimersByTime(16);
    });

    expect(screen.getByRole('banner').firstElementChild).toHaveClass('opacity-100');

    window.scrollY = 0;
    fireEvent.scroll(window);

    act(() => {
      jest.advanceTimersByTime(16);
    });

    expect(screen.getByRole('banner').firstElementChild).toHaveClass('opacity-0');
  });
});
