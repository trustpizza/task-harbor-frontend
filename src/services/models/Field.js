class Field {
  constructor(data) {
    this.id = data.id;
    this.value = data.attributes?.value || null;
    this.fieldableType = data.attributes?.fieldable_type || null;
    this.fieldableId = data.attributes?.fieldable_id || null;
    this.fieldDefinitionId = data.relationships?.field_definition?.data?.id || null;
  }
}

export default Field;