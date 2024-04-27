import TaskList from "./src/task-list.js";

const taskList = new TaskList();

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", () => {
  const description = taskInput.value.trim();

  if (description) {
    taskList.addTask(description);
    taskList.renderTasks();
    taskInput.value = "";
  }
});

// Вызов функции восстановления при загрузке страницы
document.addEventListener("DOMContentLoaded", restoreTaskInputFromSessionStorage);
