import BaseAPI from "./BaseAPI";
import Project from "./models/Project";

export class ProjectAPI extends BaseAPI {

  // Fetch all projects
  static async fetchProjects(include = "", timeout = this.DEFAULT_TIMEOUT) {
    const query = include ? `?include=${include}` : "";
    const response = await this.sendRequest("GET", null, `/projects${query}`, timeout);
    return response.data.map((projectData) => new Project(projectData, response.included));
  }

  // Fetch a specific project by ID
  static async fetchProject(projectid, include = "", timeout = this.DEFAULT_TIMEOUT) {
    const query = include ? `?include=${include}` : "";
    const response = await this.sendRequest("GET", null, `/projects/${projectid}${query}`, timeout);
    return new Project(response.data, response.included);
  }

  // Create a new project
  static async createProject(projectData, timeout = this.DEFAULT_TIMEOUT) {
    return this.sendRequest("POST", projectData, "/projects", timeout);
  }
}