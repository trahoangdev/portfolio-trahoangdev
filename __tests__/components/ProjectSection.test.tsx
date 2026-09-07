import { act, render, screen, waitFor } from '@testing-library/react';
import { ProjectSection } from '@/features/projects/components/ProjectSection';

// Mock child components
jest.mock('@/features/projects/components/ProjectShowcase', () => ({
  ProjectShowcase: ({ projects }: { projects: any[] }) => (
    <div data-testid="project-showcase">
      Showcase: {projects.length} projects
    </div>
  ),
}));

jest.mock('@/features/projects/components/ProjectFilterBar', () => ({
  ProjectFilterBar: ({ availableLanguages }: { availableLanguages: string[] }) => (
    <div data-testid="project-filter">
      Filters: {availableLanguages.length} languages
    </div>
  ),
}));

jest.mock('@/app/actions/project', () => ({
  getProjectCatalog: jest.fn().mockResolvedValue({
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
    facets: {
      categories: [{ label: 'Web', slug: 'web', count: 1 }],
      languages: [{ label: 'TypeScript', slug: 'typescript', count: 1 }],
    },
    activeFilter: { categories: [], languages: [] },
  }),
}));

// Mock project module
jest.mock('@/features/projects/module/ProjectModule', () => ({
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

async function renderProjectSection(activeSection: string, sectionRef: jest.Mock) {
  await act(async () => {
    render(<ProjectSection activeSection={activeSection} sectionRef={sectionRef} />);
  });
}

describe('ProjectSection', () => {
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', async () => {
    await renderProjectSection('project', mockRef);
    const section = document.querySelector('#project');
    expect(section).toBeInTheDocument();
  });

  it('should have correct section id', async () => {
    await renderProjectSection('project', mockRef);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('id', 'project');
  });

  it('should render section heading', async () => {
    await renderProjectSection('project', mockRef);
    expect(screen.getByText(/project hypergrid/i)).toBeInTheDocument();
  });

  it('should render "View All" link', async () => {
    await renderProjectSection('project', mockRef);
    const link = screen.getByRole('link', { name: /view all/i });
    expect(link).toHaveAttribute('href', '/project');
  });

  it('should load and display projects', async () => {
    await renderProjectSection('project', mockRef);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-showcase')).toHaveTextContent('Showcase: 1 projects');
    });
  });

  it('should render ProjectShowcase component', async () => {
    await renderProjectSection('project', mockRef);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-showcase')).toHaveTextContent('Showcase: 1 projects');
    });
  });

  it('should render ProjectFilterBar component', async () => {
    await renderProjectSection('project', mockRef);
    
    await waitFor(() => {
      expect(screen.getByTestId('project-filter')).toHaveTextContent('Filters: 1 languages');
    });
  });

  it('should call sectionRef with section element', async () => {
    await renderProjectSection('project', mockRef);
    expect(mockRef).toHaveBeenCalled();
  });

  it('should apply active section styles when section is active', async () => {
    await renderProjectSection('project', mockRef);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('data-inview', 'true');
  });

  it('should not apply active styles when section is not active', async () => {
    await renderProjectSection('intro', mockRef);
    const section = document.querySelector('#project');
    expect(section).not.toHaveAttribute('data-inview', 'true');
  });

  it('should have proper accessibility attributes', async () => {
    await renderProjectSection('project', mockRef);
    const section = document.querySelector('#project');
    expect(section).toHaveAttribute('id', 'project');
  });
});
