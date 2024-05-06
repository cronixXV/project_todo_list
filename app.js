import TaskList from "./src/task-list.js";
import { StorageHelper } from "./src/StorageHelper.js";

document.addEventListener("DOMContentLoaded", () => {
  // Выбираем все необходимые DOM элементы
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task-button");

  // Получаем список задач
  const tasksFromLocalStorage = StorageHelper.getTasks();

  // Передаем в конструктор задачи из localStorage
  const taskList = new TaskList(tasksFromLocalStorage);
  taskList.renderTasks();
  taskList.drawStats();

  addTaskButton.addEventListener("click", () => {
    const description = taskInput.value.trim();

    if (description) {
      taskList.addTask(description);
      taskList.renderTasks();
      taskList.saveTasks();
      taskInput.value = "";
      StorageHelper.setInputTaskTitle("");
    }
  });

  // Search
  const taskInputSearch = document.getElementById("task-search");
  taskInputSearch.addEventListener("input", function (event) {
    // console.log(event.target.value)
    taskList.filterTasks(event.target.value);
    taskList.renderTasks();
    // console.log('После поиска', taskList.filteredTasks)
  });

  // Input
  if (taskInput) {
    taskInput.value = StorageHelper.getInputTaskTitle();
    taskInput.addEventListener("input", function (event) {
      StorageHelper.setInputTaskTitle(event.target.value);
    });
  }
});
