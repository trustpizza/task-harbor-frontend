const ProjectCard = ({ project }) => {
  if (!project) {
    return null; // Or a placeholder if you prefer
  }

  return (
    <>
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p>{project.description}</p>
        <div className="mt-4">
          <p className="font-semibold">Status:</p>
          <p>{project.status || "No Status"}</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Due Date:</p>
          <p>{project.dueDate || "Not Set"}</p>
        </div>
        {/* Add more project details as needed */}
      </div>
    </div>
    </>
  );
};

export default ProjectCard;