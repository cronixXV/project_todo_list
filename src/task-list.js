import Task from "./task.js";
import { deleteTask as deleteTaskFromArray, editTask as editTaskInArray } from "./task-operations.js";
import { drawChart } from "./chart.js";

export default class TaskList {
  // Конструктор класса, инициализирует пустой массив tasks
  constructor() {
    this.tasks = [];
  }

  // Метод для добавления новой задачи в массив tasks
  addTask(description) {
    const task = new Task(description);
    this.tasks.push(task);
  }

  // Метод для удаления задачи из массива tasks по указанному индексу
  deleteTask(index) {
    deleteTaskFromArray(this.tasks, index);
  }

  // Метод для редактирования задачи в массиве tasks по указанному индексу и новому описанию
  editTask(index, newDescription) {
    editTaskInArray(this.tasks, index, newDescription);
  }

  // Метод для получения количества всех задач, завершенных задач и незавершенных задач
  getTaskCounts() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((task) => task.completed).length;
    const uncompletedTasks = this.tasks.filter((task) => !task.completed).length;

    return { totalTasks, completedTasks, uncompletedTasks };
  }

  // Метод для отображения списка задач на странице
  renderTasks() {
    const taskListElement = document.getElementById("task-list");
    taskListElement.textContent = "";

    // Перебираем массив tasks и для каждой задачи создаем элемент списка
    this.tasks.forEach((task, index) => {
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
      });
    });

    // Получаем количество задач и рисуем столбчатую диаграмму
    const { totalTasks, completedTasks, uncompletedTasks } = this.getTaskCounts();
    drawChart(totalTasks, completedTasks, uncompletedTasks, totalTasks);
  }

  // Метод для сохранения задач в localStorage
  saveTasks() {
    const tasksString = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksString);
  }
}
