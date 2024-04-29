export class StorageHelper {
  static getTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks || [];
  }

  static setTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static getInputTaskTitle() {
    return sessionStorage.getItem("task-input") || "";
  }

  static setInputTaskTitle(title) {
    if (title) {
      sessionStorage.setItem("task-input", title);
    } else {
      sessionStorage.removeItem("task-input");
    }
  }
}
