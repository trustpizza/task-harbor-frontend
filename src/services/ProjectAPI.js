const DEFAULT_TIMEOUT = 5 * 1000; 

export class ProjectAPI {
  static API_URL = "http://localhost:3000/api/v1";

  static async fetchProjects(timeout = DEFAULT_TIMEOUT) {  // Add timeout parameter
    try {
      const controller = new AbortController(); // Create an AbortController
      const signal = controller.signal;        // Get the signal

      const timeoutId = setTimeout(() => controller.abort(), timeout); // Set timeout

      const response = await fetch(`${this.API_URL}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal, // Pass the signal to fetch
      });

      clearTimeout(timeoutId); // Clear the timeout if the request succeeds

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {  // Check if it's a timeout error
        console.error("Request timed out");
        return []; // Or throw the error if you want the caller to handle it
      } else {
        console.error("Error fetching projects:", error);
        return [];
      }
    }
  }

  static async fetchProject(projectId, timeout = DEFAULT_TIMEOUT) { // Add timeout parameter
    try {
        const controller = new AbortController(); // Create an AbortController
      const signal = controller.signal;        // Get the signal

      const timeoutId = setTimeout(() => controller.abort(), timeout); // Set timeout
      const response = await fetch(`${this.API_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
                signal: signal, // Pass the signal to fetch
      });
      clearTimeout(timeoutId); // Clear the timeout if the request succeeds

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {  // Check if it's a timeout error
        console.error(`Request for project ${projectId} timed out`);
        return null; // Or throw the error
      } else {
        console.error(`Error fetching project ${projectId}:`, error);
        return null;
      }
    }
  }

  static async createProject(projectData, timeout = DEFAULT_TIMEOUT) {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData), // Send project data in the request body
        signal: signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text(); // Get error details from the server
        throw new Error(`Error ${response.status}: ${errorText}`); // Include details in error message
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("Request to create project timed out");
        return null; // Or throw the error
      } else {
        console.error("Error creating project:", error);
        return null;
      }
    }
  }
}