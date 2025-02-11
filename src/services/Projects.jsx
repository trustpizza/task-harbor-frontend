import { useEffect, useState } from "react";
import { ProjectAPI } from "./ProjectAPI";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProjectAPI.fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, error, loading };
};

export const useProject = ({ projectid }) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectid) return;  // Guard against empty projectId
        
    ProjectAPI.fetchProject(projectid)
      .then(setProject)
      .catch((err) => setError(err))  // Ensure setError is called with the error object
      .finally(() => setLoading(false));

  }, [projectid]); // Include projectId as a dependency

  return { project, error, loading };
};
