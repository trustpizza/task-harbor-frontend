import ProjectCard from "./ProjectCard";

const KanbanColumn = ({ status, projects }) => {
  return (
    <div className="card bg-base-100 shadow-xl flex flex-col h-full">
      <div className="card-body">
        <h2 className="card-title">{status}</h2>
        <div className="overflow-y-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;