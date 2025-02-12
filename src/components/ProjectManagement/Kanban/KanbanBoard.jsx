// KanbanBoard.jsx
import { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ projects }) => {
  const [projectsByStatus, setProjectsByStatus] = useState({});

  useEffect(() => {
    setProjectsByStatus(groupProjectsByStatus(projects));
  }, [projects]);

  const statuses = Object.keys(projectsByStatus);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto overflow-y-auto">
      {statuses.map((status) => (
        <KanbanColumn key={status} status={status} projects={projectsByStatus[status]} />
      ))}
    </div>
  );
};

const groupProjectsByStatus = (projects) => {
  const groupedProjects = {};
  if (projects) {
    projects.forEach((project) => {
      const status = project.status || 'No Status';
      if (!groupedProjects[status]) {
        groupedProjects[status] = [];
      }
      groupedProjects[status].push(project);
    });
  }
  return groupedProjects;
};

export default KanbanBoard;