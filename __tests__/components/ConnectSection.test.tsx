import { render, screen } from '@testing-library/react';
import { ConnectSection } from '@/components/connect/ConnectSection';

describe('ConnectSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'service');
  });

  it('should render section heading', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    expect(screen.getByText(/let's connect/i)).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    expect(screen.getByText(/partner with me/i)).toBeInTheDocument();
  });

  it('should render email link', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    const emailLink = screen.getByRole('link', { name: /info@trahoangdev/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@trahoangdev');
  });

  it('should call sectionRef with section element', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should have animation classes for in-view transitions', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    const section = document.querySelector('#service');
    expect(section?.className).toContain('opacity-0');
    expect(section?.className).toContain('translate-y-8');
    expect(section?.className).toContain('data-[inview=true]:opacity-100');
  });

  it('should render correctly regardless of active section', () => {
    render(<ConnectSection activeSection="intro" sectionRef={mockRef} />);
    const section = document.querySelector('#service');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'service');
  });

  it('should have proper accessibility attributes', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'connect-heading');
  });

  it('should render social links section', () => {
    render(<ConnectSection activeSection="service" sectionRef={mockRef} />);
    expect(screen.getByText(/elsewhere/i)).toBeInTheDocument();
  });
});
