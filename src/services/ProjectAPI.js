export class ProjectAPI {
  static API_URL = "http://localhost:3000/api/v1";

  static getAuthToken() {
    return localStorage.getItem('accessToken'); // Get token from localStorage (or wherever you store it)
  }

  static async fetchProjects(timeout = DEFAULT_TIMEOUT) {
    try {
      const token = this.getAuthToken();
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.API_URL}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Add Authorization header
        },
        signal: signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request timed out");
        return [];
      } else {
        console.error("Error fetching projects:", error);
        return [];
      }
    }
  }

  static async fetchProject(projectId, timeout = DEFAULT_TIMEOUT) {
    try {
      const token = this.getAuthToken();
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.API_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Add Authorization header
        },
        signal: signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error(`Request for project ${projectId} timed out`);
        return null;
      } else {
        console.error(`Error fetching project ${projectId}:`, error);
        return null;
      }
    }
  }

  static async createProject(projectData, timeout = DEFAULT_TIMEOUT) {
    try {
      const token = this.getAuthToken();
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Add Authorization header
        },
        body: JSON.stringify(projectData),
        signal: signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request to create project timed out");
        return null;
      } else {
        console.error("Error creating project:", error);
        return null;
      }
    }
  }
}
