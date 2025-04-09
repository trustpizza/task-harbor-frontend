import Field from "./Field";
import FieldDefinition from "./FieldDefinition";

class Task {
  constructor(data, included = []) {
    console.log(data, included)
    this.id = data.id;
    this.name = data.attributes?.name || "Untitled Task";
    this.description = data.attributes?.description || "No description available";
    this.dueDate = data.attributes?.due_date || null;
    this.taskableType = data.relationships?.taskable?.data?.type || null;
    this.taskableId = data.relationships?.taskable?.data?.id || null;

    this.fields = included
      .filter((item) => item.type === "field")
      .map((fieldData) => new Field(fieldData));

    this.fieldDefinitions = included
      .filter((item) => item.type === "field_definition")
      .map((fieldDefData) => new FieldDefinition(fieldDefData));
  }

  isOverdue() {
    if (!this.dueDate) return false;
    return new Date(this.dueDate) < new Date();
  }
}

export default Task;