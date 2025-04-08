import BaseAPI from "./BaseAPI";

export class TaskAPI extends BaseAPI {
  static async fetchTasks(projectId, options = {}, timeout = this.DEFAULT_TIMEOUT) {
    const query = options.include ? `?include=${options.include}` : "";
    return this.sendRequest("GET", null, `/projects/${projectId}/tasks${query}`, timeout);
  }

  static async fetchTask(projectId, taskId, options = {}, timeout = this.DEFAULT_TIMEOUT) {
    const query = options.include ? `?include=${options.include}` : "";
    return this.sendRequest("GET", null, `/projects/${projectId}/tasks/${taskId}${query}`, timeout);
  }
}