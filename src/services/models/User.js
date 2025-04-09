class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.attributes?.name || "Unknown User";
    this.email = data.attributes?.email || "No email provided";
  }

  getDisplayName() {
    return this.name || this.email;
  }
}

export default User;