import BaseAPI from "./BaseAPI";

export class TaskAPI extends BaseAPI {
  static async fetchTasks(taskableId, taskableType, options = {}, timeout = this.DEFAULT_TIMEOUT) {
    if (typeof taskableType === 'string' && !taskableType.endsWith("s")) {
      taskableType += "s";
    } else if (typeof taskableType !== 'string') {
      console.error("TaskAPI.fetchTask received non-string taskableType:", taskableType);
      return Promise.resolve(null);
    }
    
    const query = options.include ? `?include=${options.include}` : ""; // Ensure query is declared before use
    return this.sendRequest("GET", null, `/${taskableType}/${taskableId}/tasks${query}`, timeout);
  }

  static async fetchTask(taskableId, taskId, taskableType, options = {}, timeout = this.DEFAULT_TIMEOUT) {
    if (typeof taskableType === 'string' && !taskableType.endsWith("s")) {
      taskableType += "s";
    } else if (typeof taskableType !== 'string') {
      console.error("TaskAPI.fetchTask received non-string taskableType:", taskableType);
      return Promise.resolve(null); // Example: return null
    }

    const query = options.include ? `?include=${options.include}` : ""; // Ensure query is declared before use
    return this.sendRequest("GET", null, `/${taskableType}/${taskableId}/tasks/${taskId}${query}`, timeout);
  }
}