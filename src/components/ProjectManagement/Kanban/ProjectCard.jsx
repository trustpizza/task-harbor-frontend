const ProjectCard = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow-xl m-2"> {/* Added margin */}
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p className="text-sm text-gray-500">{project.description}</p> {/* Added styling */}
        <div className="mt-4 border-t pt-2"> {/* Added separator */}
          <div className="flex justify-between"> {/* Flexbox for layout */}
            <div>
              <p className="font-semibold text-sm">Status:</p>
              <p className="text-sm">{project.status || "No Status"}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Due Date:</p>
              <p className="text-sm">{project.dueDate || "Not Set"}</p>
            </div>
          </div>
        </div>
        {/* Add more project details as needed */}
      </div>
    </div>
  );
};

export default ProjectCard;