class FieldDefinition {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes?.name || "Unnamed Field";
    this.fieldType = data.attributes?.field_type || "string";
    this.options = data.attributes?.options || null;
    this.required = data.attributes?.required || false;
  }
}

export default FieldDefinition;