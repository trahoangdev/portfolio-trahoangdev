import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/Contact';

// Mock the AnimationController
jest.mock('@/lib/animations', () => ({
  AnimationController: jest.fn().mockImplementation(() => ({
    fadeIn: jest.fn(),
    slideIn: jest.fn(),
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

// Mock alert
global.alert = jest.fn();

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact section with correct title', () => {
    render(<Contact />);
    
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it('renders contact form with all fields', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Contact />);
    
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(4);
  });

  it('handles form input changes', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const subjectInput = screen.getByLabelText('Subject');
    const messageInput = screen.getByLabelText('Message');
    const submitButton = screen.getByText('Send Message');
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Thank you for your message! I'll get back to you soon.");
    });
  });

  it('clears form after submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const submitButton = screen.getByText('Send Message');
    
    await user.type(nameInput, 'John Doe');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  });

  it('has proper form validation attributes', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});
