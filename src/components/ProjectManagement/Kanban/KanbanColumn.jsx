import ProjectCard from "./ProjectCard";

const KanbanColumn = ({ status, projects }) => {
  const columnColors = {  // Define colors for each status
    "To Do": "bg-gray-100",  // Light gray
    "In Progress": "bg-yellow-100", // Light yellow
    "Done": "bg-green-100", // Light green
    "Blocked": "bg-red-100", //Light red
    "No Status": "bg-blue-100", //Light blue
  };

  const columnColor = columnColors[status] || "bg-base-100"; // Default if not found

  return (
    <div className={`card ${columnColor} flex flex-col m-2`}>
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