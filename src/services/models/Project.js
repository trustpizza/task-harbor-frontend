import Field from "./Field";
import FieldDefinition from "./FieldDefinition";
import Task from "./Task";

class Project {
  constructor(data, included = []) {
    this.id = data.id;
    this.name = data.attributes?.name || "Untitled Project";
    this.description = data.attributes?.description || "No description available";
    this.dueDate = data.attributes?.due_date || null;
    
    this.tasks = included
      .filter((item) => item.type === "task")
      .map((task) => new Task(task))
      .filter((task) => task.taskableType === "project" && task.taskableId === this.id);

    // Map fields and field definitions from included data
    this.fields = included
      .filter((item) => item.type === "field")
      .map((fieldData) => new Field(fieldData));

    this.fieldDefinitions = included
      .filter((item) => item.type === "field_definition")
      .map((fieldDefData) => new FieldDefinition(fieldDefData));
  }

  getTaskIds() {
    return this.tasks.map((task) => task.id);
  }

  isOverdue() {
    if (!this.dueDate) return false;
    return new Date(this.dueDate) < new Date();
  }
}

export default Project;