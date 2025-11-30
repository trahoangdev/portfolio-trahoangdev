import { render, screen } from '@testing-library/react';
import AboutMe from '@/components/AboutMe';

// Mock the AnimationController
jest.mock('@/lib/animations', () => ({
  AnimationController: jest.fn().mockImplementation(() => ({
    fadeIn: jest.fn(),
    slideIn: jest.fn(),
    staggeredReveal: jest.fn(),
    cleanup: jest.fn(),
  })),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('AboutMe Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders about me section with correct title', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders professional description', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('fullstack developer')).toBeInTheDocument();
    expect(screen.getByText(/With over 5 years of experience/)).toBeInTheDocument();
  });

  it('renders all technical skills', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('React/Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('renders skill progress bars with correct percentages', () => {
    render(<AboutMe />);
    
    const skillBars = screen.getAllByText(/%$/);
    expect(skillBars.length).toBeGreaterThan(0);
  });

  it('renders professional traits', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('Problem Solving')).toBeInTheDocument();
    expect(screen.getByText('Team Leadership')).toBeInTheDocument();
    expect(screen.getByText('Agile/Scrum')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
  });

  it('has call-to-action button', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    const { container } = render(<AboutMe />);
    
    const aboutSection = container.querySelector('section');
    expect(aboutSection).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });
});
