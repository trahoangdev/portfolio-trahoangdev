import { render, screen } from '@testing-library/react';
import Projects from '@/components/Projects';

// Mock the AnimationController
jest.mock('@/lib/animations', () => ({
  AnimationController: jest.fn().mockImplementation(() => ({
    fadeIn: jest.fn(),
    staggeredReveal: jest.fn(),
    hoverEffect: jest.fn(() => ({
      enter: jest.fn(),
      leave: jest.fn(),
    })),
    cleanup: jest.fn(),
  })),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Projects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders projects section with correct title', () => {
    render(<Projects />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Projects />);
    
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Analytics Dashboard')).toBeInTheDocument();
  });

  it('renders project technologies', () => {
    render(<Projects />);
    
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project action buttons', () => {
    render(<Projects />);
    
    const liveDemoButtons = screen.getAllByText('Live Demo');
    const githubButtons = screen.getAllByText('GitHub');
    
    expect(liveDemoButtons.length).toBeGreaterThan(0);
    expect(githubButtons.length).toBeGreaterThan(0);
  });

  it('displays featured project badges', () => {
    render(<Projects />);
    
    const featuredBadges = screen.getAllByText('⭐ Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });

  it('renders project categories', () => {
    render(<Projects />);
    
    expect(screen.getByText('Full Stack')).toBeInTheDocument();
    expect(screen.getByText('Web App')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
  });

  it('has view all projects button', () => {
    render(<Projects />);
    
    expect(screen.getByText('View All Projects')).toBeInTheDocument();
  });

  it('applies correct CSS classes for grid layout', () => {
    const { container } = render(<Projects />);
    
    const projectsGrid = container.querySelector('.grid.lg\\:grid-cols-2');
    expect(projectsGrid).toBeInTheDocument();
  });
});
