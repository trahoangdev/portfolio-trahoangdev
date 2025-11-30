import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock the AnimationController
jest.mock('@/lib/animations', () => ({
  AnimationController: jest.fn().mockImplementation(() => ({
    fadeIn: jest.fn(),
    slideIn: jest.fn(),
    staggeredReveal: jest.fn(),
    cleanup: jest.fn(),
  })),
  CursorTrail: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  })),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero section with correct content', () => {
    render(<Hero />);
    
    expect(screen.getByText('Senior')).toBeInTheDocument();
    expect(screen.getByText('Fullstack')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText(/Crafting exceptional digital experiences/)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    
    expect(screen.getByText('View My Work')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Hero />);
    
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(4); // GitHub, LinkedIn, Twitter, Email
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);
    
    const githubLink = screen.getByLabelText('GitHub');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const twitterLink = screen.getByLabelText('Twitter');
    const emailLink = screen.getByLabelText('Email');

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<Hero />);
    
    const heroSection = container.querySelector('section');
    expect(heroSection).toHaveClass('relative', 'min-h-screen', 'flex', 'items-center');
  });
});
