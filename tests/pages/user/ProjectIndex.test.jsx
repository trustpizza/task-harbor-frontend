import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectIndex from '../../../src/pages/ProjectManagement/User/ProjectIndex';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from '../../../src/services/Projects';

vi.mock('../../../src/services/Projects', () => {
  return {
    useProjects: vi.fn(),
  };
});

vi.mock('../../../src/components/Shared/LoadingIndicator', () => ({
  default: () => <div data-testid="loading-indicator">Loading...</div>,
}));

// Mock ProjectList (and implicitly ProjectCard)
vi.mock('./ProjectList', () => { // Path to your ProjectList component
  return {
    __esModule: true, // Important for ES modules
    default: ({ projects }) => (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`} data-testid={`project-link-${project.id}`}>
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    ),
  };
});


describe("Project Index Page", () => {

  it('renders loading indicator when loading is true', () => {
    const mockUseProjects = vi.mocked(useProjects);
    mockUseProjects.mockReturnValue({
      projects: [],
      error: null,
      loading: true
    })
    
    render(
      <MemoryRouter>
        <ProjectIndex />
      </MemoryRouter>
    )

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders error message when error is not null', () => {
    const mockUseProjects = vi.mocked(useProjects);
    mockUseProjects.mockReturnValue({
      projects: [],
      error: 'Failed to fetch projects',
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProjectIndex />
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Failed to fetch projects')).toBeInTheDocument();
  });

  it('renders "No projects available" when projects array is empty', () => {
    const mockUseProjects = vi.mocked(useProjects);
    mockUseProjects.mockReturnValue({ projects: [], error: null, loading: false });

    render(
      <MemoryRouter>
        <ProjectIndex />
      </MemoryRouter>
    );

    expect(screen.getByText('No projects available')).toBeInTheDocument();
  });

  it.skip('renders project list with correct details', () => {
    const mockProjects = [
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Very Long Project Name That Might Wrap' },
      { id: 3, name: 'Project with & special characters' },
    ];
    const mockUseProjects = vi.mocked(useProjects);
    mockUseProjects.mockReturnValue({ projects: mockProjects, error: null, loading: false });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ProjectIndex />} />
        </Routes>
      </MemoryRouter>
    );

    // Query by data-testid directly (no list items anymore)
    expect(screen.getByTestId('project-link-1')).toHaveAttribute('href', '/projects/1');
    expect(screen.getByTestId('project-link-2')).toHaveAttribute('href', '/projects/2');
    expect(screen.getByTestId('project-link-3')).toHaveAttribute('href', '/projects/3');

    // Also check the text content (project names)
    expect(screen.getByTestId('project-link-1')).toHaveTextContent('Project A');
    expect(screen.getByTestId('project-link-2')).toHaveTextContent('Very Long Project Name That Might Wrap');
    expect(screen.getByTestId('project-link-3')).toHaveTextContent('Project with & special characters');
  });

})