import BaseAPI from "./BaseAPI";

export class ProjectAPI extends BaseAPI {

  // Fetch all projects
  static async fetchProjects(timeout = this.DEFAULT_TIMEOUT) {
    return this.sendRequest('GET', null, '/projects', timeout);
  }

  // Fetch a specific project by ID
  static async fetchProject(projectid, timeout = this.DEFAULT_TIMEOUT) {
    const response = await this.sendRequest('GET', null, `/projects/${projectid}?include=all`, timeout);
    if (!response) return [];
    return response
  }

  // Create a new project
  static async createProject(projectData, timeout = this.DEFAULT_TIMEOUT) {
    return this.sendRequest('POST', projectData, '/projects', timeout);
  }
}