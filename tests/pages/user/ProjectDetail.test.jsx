import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from '../../../src/pages/ProjectManagement/User/ProjectDetail';
import { useProject } from '../../../src/services/Projects';

vi.mock('../../../src/services/Projects', () => {
  const mockUseProject = vi.fn();

  return {
    useProject: mockUseProject
  }
})

vi.mock('../../../src/components/Shared/LoadingIndicator', () => ({
  default: () => <div data-testid='loading-indicator'>Loading...</div>
}));

describe('ProjectDetail', () => {
  
  it('renders loading indicator when loading is true', () => {
    const mockUseProject = vi.mocked(useProject);
    mockUseProject.mockReturnValue({
      project: null, error: null, loading: true
    });

    render(
      <MemoryRouter initialEntries={['/projects/1']}> {/* Set initial location */}
        <Routes>
          <Route path="/projects/:projectid" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );    

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders error message when error is not null', () => {
    const mockUseProject = vi.mocked(useProject);
    mockUseProject.mockReturnValue({
      project: null,
      error: 'Failed to fetch project',
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/projects/1']}> {/* Set initial location */}
        <Routes>
          <Route path="/projects/:projectid" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );    
    expect(screen.getByText('Error: Failed to fetch project')).toBeInTheDocument();
  });

  it('renders project details when project is available', async () => {
    const mockProject = { id: 1, name: 'Test Project' };
    const mockUseProject = vi.mocked(useProject);
    mockUseProject.mockReturnValue({ project: mockProject, error: null, loading: false });

    render(
      <MemoryRouter initialEntries={['/projects/1']}> {/* Set initial location */}
        <Routes>
          <Route path="/projects/:projectid" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );    

    // Use waitFor to handle potential asynchronous rendering
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument(); // More robust query
    });
  });

  it('correctly passes projectid to the useProject hook', () => {
      const mockUseProject = vi.mocked(useProject);
      mockUseProject.mockReturnValue({ project: {id: 1, name: 'test'}, error: null, loading: false });

      render(
        <MemoryRouter initialEntries={['/projects/1']}> {/* Set initial location */}
          <Routes>
            <Route path="/projects/:projectid" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      );

      expect(mockUseProject).toHaveBeenCalledWith({ projectid: '1' }); // Check if the hook is called with the correct id.
  });
});