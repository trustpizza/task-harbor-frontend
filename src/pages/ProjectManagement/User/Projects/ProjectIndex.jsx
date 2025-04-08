import { Link, Outlet } from "react-router-dom";
import { useProjects} from "../../../../services/Projects";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import PageLayout from "../../../../Layouts/ProjectPageLayout";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects();

  const socialLinks = [ // Define your social links
    { name: 'linkedin', icon: 'linkedin', href: 'https://www.linkedin.com/in/yourprofile' },
    { name: 'github', icon: 'github', href: 'https://github.com/yourusername' },
  ];
  console.log(projects, error, loading)
  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageLayout title="Projects" > {/* Wrap with PageLayout */}
      {projects.data.length === 0 ? (
        <p>No projects available</p>
      ): (
        <ul>
          {projects.data.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.attributes.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet /> {/* Keep Outlet for nested routes */}
    </PageLayout>
  );
};

export default ProjectIndex;
// const ProjectIndex = () => {
//   const { projects, error, loading } = useProjects();

//   if (loading) return <LoadingIndicator />;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//     <div>
//       <h1>Projects</h1>
//       {projects.length === 0 ? (
//         <p>No projects available</p>
//       ) : (
//         <ul>
//           {projects.map((project) => (
//             <li key={project.id}>
//               <Link to={`/projects/${project.id}`}>{project.name}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     <Outlet />
//     </>
//   );
// };

// export default ProjectIndex;
