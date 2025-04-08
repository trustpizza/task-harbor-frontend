import { useParams, Outlet, useLocation } from "react-router-dom";
import { useProject } from "../../../../services/Projects";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import ProjectDescription from "../../../../components/ProjectManagement/ProjectDescription";
import ProjectFields from "../../../../components/ProjectManagement/ProjectFields";
import TaskGrid from "../../../../components/TaskManagement/TaskGrid";

const ProjectDetail = () => {
  const { projectid } = useParams();
  const location = useLocation();
  const { project, error, loading } = useProject({ projectid });

  if (!projectid) {
    return <p>Error: Project ID is missing.</p>;
  }

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  if (!project || !project.data) {
    return <p>Error: Project data is unavailable.</p>;
  }

  const project_attrs = project.data.attributes || {};
  const included = project.included || [];
  const field_defs = included.filter((item) => item.type === "field_definition");
  const fields = included.filter((item) => item.type === "field");
  const tasks = included.filter((item) => item.type === "task");

  const handleDescriptionSubmit = (updatedData) => {
    console.log("Updated project details:", updatedData);
    // Add API logic here to update the project details
  };

  const handleFieldsSubmit = (updatedFields) => {
    console.log("Updated fields:", updatedFields);
    // Add API logic here to update the fields
  };

  const handleTaskSubmit = (updateTasks) => {
    console.log("Updated tasks:", updateTasks);
    // Add API logic here to update the tasks
  };

  const isChildRoute = location.pathname.includes(`/projects/${projectid}/tasks/`);

  return (
    <PageLayout title={project_attrs.name || "Untitled Project"}>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <div className="flex flex-col items-center w-full gap-2 mb-4">
          <div className="w-full max-w-3xl">
            <ProjectDescription
              description={project_attrs.description || "No description available"}
              projectManager={project_attrs.project_manager || "Unknown"}
              dueDate={project_attrs.due_date || new Date().toISOString()}
              isEditable={true}
              onSubmit={handleDescriptionSubmit}
            />
          </div>

          <div className="w-full max-w-3xl">
            <ProjectFields
              fieldDefinitions={field_defs}
              fields={fields}
              canEdit={true}
              onSubmit={handleFieldsSubmit}
            />
          </div>

          <div className="w-full max-w-3xl">
            <TaskGrid
              projectId={projectid}
              tasks={tasks}
              canEdit={true}
              onSubmit={handleTaskSubmit}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProjectDetail;