export default class Task {
  constructor(description, completed = false) {
    this.description = description;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
