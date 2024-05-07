import Task from "./task.js";
import { StorageHelper } from "./StorageHelper.js";
import {
  deleteTask as deleteTaskFromArray,
  editTask as editTaskInArray,
} from "./task-operations.js";
import { drawChart } from "./chart.js";
import { debounce } from "../helpers/debounce.js";

export default class TaskList {
  tasks = [];
  _filteredTasks = [];

  // Конструктор класса
  constructor(tasks) {
    this.setTasks(tasks);
    this._filteredTasks = this.tasks;
    this.debouncedFilterTasks = debounce(this.filterTasks.bind(this), 300);
  }

  sync() {
    this._filteredTasks = this.tasks;
  }

  filterTasks(search) {
    // console.log(Math.random()) // Для проверки частоты срабатывания функции
    search = search.toLowerCase();
    this._filteredTasks = this.tasks.filter(
      (item) => item.description.toLowerCase().indexOf(search) !== -1
    );

    this.renderTasks();
  }

  get filteredTasks() {
    return this._filteredTasks;
  }

  setTasks(tasks) {
    if (!tasks || !Array.isArray(tasks)) return;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.description) {
        this.tasks.push(new Task(task.description, task.completed));
      }
    }
  }

  // Метод для добавления новой задачи в массив tasks
  addTask(description) {
    const task = new Task(description);
    this.tasks.push(task);
    this.sync();
  }

  // Метод для удаления задачи из массива tasks по указанному индексу
  deleteTask(index) {
    deleteTaskFromArray(this.tasks, index);
    this.sync();
  }

  // Метод для редактирования задачи в массиве tasks по указанному индексу и новому описанию
  editTask(index, newDescription) {
    editTaskInArray(this.tasks, index, newDescription);
  }

  // Метод для получения количества всех задач
  getAllTasks() {
    return this.tasks;
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  getTodoTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  // Метод для отображения списка задач на странице
  renderTasks() {
    const taskListElement = document.getElementById("task-list");
    taskListElement.textContent = "";

    // Перебираем массив tasks и для каждой задачи создаем элемент списка
    const tasks = this._filteredTasks;
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.toggle("task-completed", task.completed);
      // Добавляем разметку для отображения задачи, кнопок редактирования и удаления
      listItem.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="task-description">${task.description}</span>
        <input type="text" class="task-edit-input" value="${task.description}">
        <button class="edit-button">Редактировать</button>
        <button class="delete-button">Удалить</button>
      `;
      taskListElement.appendChild(listItem);

      // Назначаем обработчики событий для элементов управления задачей
      const checkbox = listItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        task.toggle();
        listItem.classList.toggle("task-completed", task.completed);
        this.saveTasks();
      });

      const editButton = listItem.querySelector(".edit-button");
      const deleteButton = listItem.querySelector(".delete-button");
      const descriptionSpan = listItem.querySelector(".task-description");
      const editInput = listItem.querySelector(".task-edit-input");

      editButton.addEventListener("click", () => {
        descriptionSpan.style.display = "none";
        editInput.style.display = "inline-block";
        editInput.focus();
      });

      editInput.addEventListener("blur", () => {
        if (editInput.value.trim() !== "") {
          this.editTask(index, editInput.value.trim());
          this.saveTasks();
          descriptionSpan.textContent = editInput.value.trim();
        }
        descriptionSpan.style.display = "inline-block";
        editInput.style.display = "none";
      });

      deleteButton.addEventListener("click", () => {
        this.deleteTask(index);
        this.renderTasks();
        this.saveTasks();
      });
    });
  }

  drawStats() {
    const tasks = this.getAllTasks();
    if (!tasks.length) return;

    // Получаем количество задач и рисуем столбчатую диаграмму
    drawChart(
      tasks.length,
      this.getCompletedTasks().length,
      this.getTodoTasks().length
    );
  }

  // Метод для сохранения задач в localStorage
  saveTasks() {
    StorageHelper.setTasks(this.tasks);
    this.drawStats();
  }
}
