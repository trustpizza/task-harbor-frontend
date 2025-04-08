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
    if (!projectid) {
      setError("Project ID is missing");
      setLoading(false);
      return;
    }

    ProjectAPI.fetchProject(projectid)
      .then(setProject)
      .catch((err) => setError(err.message || "Failed to fetch project"))
      .finally(() => setLoading(false));
  }, [projectid]);

  return { project, error, loading };
};

export const useCreateProject = () => {
  const [creating, setCreating] = useState(false);
  const [createdProject, setCreatedProject] = useState(null);
  const [error, setError] = useState(null);

  const createProject = async (projectData) => {
    setCreating(true);
    setError(null); // Clear any previous errors

    try {
      const newProject = await ProjectAPI.createProject(projectData);
      setCreatedProject(newProject); // Store the created project
      return newProject; // Return the new project data
    } catch (err) {
      setError(err); // Capture and set the error
      return null; // Return null to indicate failure
    } finally {
      setCreating(false);
    }
  };

  return { createProject, creating, createdProject, error };
};