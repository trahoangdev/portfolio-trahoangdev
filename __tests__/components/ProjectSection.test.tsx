import { render, screen, waitFor } from '@testing-library/react';
import { ProjectSection } from '@/components/projects/ProjectSection';

// Mock child components
jest.mock('@/components/projects/ProjectShowcase', () => ({
  ProjectShowcase: ({ projects }: { projects: any[] }) => (
    <div data-testid="project-showcase">
      Showcase: {projects.length} projects
    </div>
  ),
}));

jest.mock('@/components/projects/ProjectFilterBar', () => ({
  ProjectFilterBar: ({ availableLanguages }: { availableLanguages: string[] }) => (
    <div data-testid="project-filter">
      Filters: {availableLanguages.length} languages
    </div>
  ),
}));

// Mock project module
jest.mock('@/modules/projects/ProjectModule', () => ({
  createProjectControllers: () => ({
    refresh: {
      initialLoad: jest.fn().mockResolvedValue({
        projects: [
          {
            id: '1',
            title: 'Test Project',
            summary: 'Test summary',
            languages: [{ label: 'TypeScript', slug: 'typescript' }],
            categories: [{ label: 'Web', slug: 'web' }],
            date: '2024',
            featured: true,
          },
        ],
      }),
    },
  }),
  createProjectPreferenceController: () => ({
    listFeatured: jest.fn().mockResolvedValue(['1']),
    subscribe: jest.fn().mockReturnValue(() => {}),
  }),
}));

describe('ProjectSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    const section = document.querySelector('#project');
    expect(section).toBeInTheDocument();
  });

  it('should have correct section id', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('id', 'project');
  });

  it('should render section heading', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    expect(screen.getByText(/project hypergrid/i)).toBeInTheDocument();
  });

  it('should render "View All" link', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    const link = screen.getByRole('link', { name: /view all/i });
    expect(link).toHaveAttribute('href', '/project');
  });

  it('should load and display projects', async () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-showcase')).toBeInTheDocument();
    });
  });

  it('should render ProjectShowcase component', async () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-showcase')).toBeInTheDocument();
    });
  });

  it('should render ProjectFilterBar component', async () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-filter')).toBeInTheDocument();
    });
  });

  it('should call sectionRef with section element', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should apply active section styles when section is active', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('data-inview', 'true');
  });

  it('should not apply active styles when section is not active', () => {
    render(<ProjectSection activeSection="intro" sectionRef={mockRef} />);
    const section = document.querySelector('#project');
    expect(section).not.toHaveAttribute('data-inview', 'true');
  });

  it('should have proper accessibility attributes', () => {
    render(<ProjectSection activeSection="project" sectionRef={mockRef} />);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('id', 'project');
  });
});
