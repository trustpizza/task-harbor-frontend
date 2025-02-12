import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectCard from "../../../src/components/ProjectManagement/ProjectCard";

describe('ProjectCard', () => {
  it('renders project details correctly', () => {
    const project = {
      name: 'My Project',
      description: 'A project description.',
      status: 'In Progress',
      dueDate: '2024-03-15',
    };

    render(<ProjectCard project={project} />);

    expect(screen.getByRole('heading', { name: 'My Project' })).toBeInTheDocument(); // Or getByText('My Project')
    expect(screen.getByText('A project description.')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Due Date:')).toBeInTheDocument();
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
  });

  it('handles missing project details gracefully', () => {
    const project = {
      name: 'Another Project',
    }; // Missing description, status, and dueDate

    render(<ProjectCard project={project} />);

    expect(screen.getByRole('heading', { name: 'Another Project' })).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('No Status')).toBeInTheDocument(); // Default value
    expect(screen.getByText('Due Date:')).toBeInTheDocument();
    expect(screen.getByText('Not Set')).toBeInTheDocument(); // Default value
  });

  it('renders nothing if the project prop is null or undefined', () => {
    render(<ProjectCard project={null} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument(); // Check if *nothing* is rendered

    render(<ProjectCard project={undefined} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
