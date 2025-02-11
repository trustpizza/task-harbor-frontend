import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectIndex from '../../../src/pages/ProjectManagement/User/ProjectIndex';
import { describe, it, expect, vi } from 'vitest';
import { useProjects } from '../../../src/services/Projects';

vi.mock('../../../src/services/Projects', () => {
  const mockUseProjects = vi.fn();

  return {
    useProjects: mockUseProjects
  }
})

vi.mock('../../../src/components/Shared/LoadingIndicator', () => ({
  default: () => <div data-testid='loading-indicator'>Loading...</div>
}));


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

  it('renders project list with correct details', async () => {
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

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBe(3);

      expect(screen.getByRole('link', { name: 'Project A' })).toHaveAttribute('href', '/projects/1');
      expect(screen.getByRole('link', { name: 'Very Long Project Name That Might Wrap' })).toHaveAttribute('href', '/projects/2');
      expect(screen.getByRole('link', { name: 'Project with & special characters' })).toHaveAttribute('href', '/projects/3');
    });
  });

})