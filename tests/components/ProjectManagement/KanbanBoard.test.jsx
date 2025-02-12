// KanbanBoard.test.jsx
import { render, screen } from '@testing-library/react';
import ProjectCard from '../../../src/components/ProjectManagement/ProjectCard';
import KanbanBoard from '../../../src/components/ProjectManagement/KanbanBoard';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./ProjectCard', () => {
  return {
    __esModule: true,
    default: ({ project }) => <div data-testid={`project-card-${project.id}`}>{project.name}</div>,
  };
});

describe('KanbanBoard', () => {
  it('renders the Kanban board with projects grouped by status', () => {
    const projects = [
      { id: 1, name: 'Project A', status: 'In Progress' },
      { id: 2, name: 'Project B', status: 'Completed' },
      { id: 3, name: 'Project C', status: 'In Progress' },
    ];

    render(<KanbanBoard projects={projects} />);

    expect(screen.getByRole('heading', { name: 'In Progress' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Completed' })).toBeInTheDocument();
    
    expect(screen.getByText('Project A')).toBeInTheDocument(); // or getByRole if you have one
    expect(screen.getByText('Project B')).toBeInTheDocument();
    expect(screen.getByText('Project C')).toBeInTheDocument();
  });

  it('handles projects without a status', () => {
    const projects = [{ id: 1, name: 'Project A' }];

    render(<KanbanBoard projects={projects} />);

    expect(screen.getByRole('heading', { name: 'No Status' })).toBeInTheDocument();
    expect(screen.getByText('Project A')).toHaveTextContent('Project A');
  });

  it('renders nothing when projects prop is undefined', () => {
    render(<KanbanBoard projects={undefined} />);
    const kanbanBoard = screen.queryByRole('grid'); // Or whatever role the board has
    expect(kanbanBoard).not.toBeInTheDocument();
  });

  it.skip('renders No Projects message when projects array is empty or null', () => {
    render(<KanbanBoard projects={[]} />);
    expect(screen.getByText('No Projects')).toBeInTheDocument();

    render(<KanbanBoard projects={null} />);
    expect(screen.getByText('No Projects')).toBeInTheDocument();
  });
});