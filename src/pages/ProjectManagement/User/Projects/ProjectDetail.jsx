import { useParams, Outlet, useLocation } from "react-router-dom";
import { useProject } from "../../../../services/Projects";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import ProjectFields from "../../../../components/ProjectManagement/ProjectFields";
import TaskGrid from "../../../../components/TaskManagement/TaskGrid";

const ProjectDetail = () => {
  const { projectid } = useParams();
  const location = useLocation();
  const { project, error, loading } = useProject({ projectid, include: "all" });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  if (!project) {
    return <p>Error: Project data is unavailable.</p>;
  }

  const isChildRoute = location.pathname.includes(`/projects/${projectid}/tasks/`);

  return (
    isChildRoute ? (
      <Outlet />
    ) : (
      <PageLayout title={project.name}>
        {/* Project Details */}
        <div className="flex flex-col items-center w-full gap-2 mb-4">
          <div className="w-full max-w-3xl">
            <div className="p-6 bg-base-100 shadow-md rounded-lg">
              <h2 className="text-xl font-bold text-primary mb-4">Project Details</h2>
              <p className="text-sm text-secondary mb-2">
                <strong>Description:</strong> {project.description}
              </p>
              <p className="text-sm text-secondary mb-2">
                <strong>Due Date:</strong> {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "No due date"}
              </p>
            </div>
          </div>
          {/* Project Fields */}
          <div className="w-full max-w-3xl">
            <ProjectFields
              title="Project Fields"
              fieldDefinitions={project.fieldDefinitions}
              fields={project.fields}
              canEdit={true}
              onSubmit={(updatedFields) => console.log("Updated fields:", updatedFields)}
            />
          </div>

          {/* Project Tasks */}
          <div className="w-full max-w-3xl">
            <TaskGrid 
              taskableId={projectid}
              tasks={project.tasks}
              canEdit={true}  
              onSubmit={(updatedTasks) => console.log("Updated tasks:", updatedTasks)}
            />
          </div>
        </div>
      </PageLayout>
    )
  );
};

export default ProjectDetail;