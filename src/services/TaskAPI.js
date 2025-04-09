import BaseAPI from "./BaseAPI";
import Task from "./models/Task";

export class TaskAPI extends BaseAPI {
  static async fetchTasks(taskableId, taskableType, include = "", timeout = this.DEFAULT_TIMEOUT) {
    const query = include ? `?include=${include}` : "";
    const response = await this.sendRequest("GET", null, `/${taskableType}/${taskableId}/tasks${query}`, timeout);
    return response.data.map((taskData) => new Task(taskData, response.included));
  }

  static async fetchTask(taskableId, taskId, taskableType, include = "", timeout = this.DEFAULT_TIMEOUT) {
    const query = include ? `?include=${include}` : "";
    const response = await this.sendRequest("GET", null, `/${taskableType}/${taskableId}/tasks/${taskId}${query}`, timeout);
    return new Task(response.data, response.included);
  }
}