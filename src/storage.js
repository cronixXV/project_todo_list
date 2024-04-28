// Сохранение списка задач в localStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Загрузка списка задач из localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks || [];
}

// Удаление задачи
function deleteTask(taskIndex) {
  const tasks = loadTasksFromLocalStorage();
  tasks.splice(taskIndex, 1);
  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  updateChartData(totalTasks, completedTasks);
}

// Создание новой задачи
function createTask(task) {
  const tasks = loadTasksFromLocalStorage();
  tasks.push({ text: task, completed: false });
  saveTasksToLocalStorage(tasks);
  renderTasks(tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  updateChartData(totalTasks, completedTasks);
}

// Отображение списка задач на странице
function renderTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;
    listItem.addEventListener("click", () => deleteTask(index));
    taskList.appendChild(listItem);
  });
}

// Обновление данных графика
// Обновление данных графика
function updateChartData(myChart, totalTasks, completedTasks) {
  myChart.data.datasets[0].data = [
    totalTasks,
    completedTasks,
    totalTasks - completedTasks,
  ];
  myChart.update();
}

// Сохранение названия задачи в sessionStorage при вводе
const taskInput = document.getElementById("task-input");
taskInput.addEventListener("input", function () {
  sessionStorage.setItem("taskInputValue", taskInput.value);
});

// Восстановление названия задачи из sessionStorage после загрузки страницы
function restoreTaskInputFromSessionStorage() {
  const taskInputValue = sessionStorage.getItem("taskInputValue");
  if (taskInputValue) {
    taskInput.value = taskInputValue;
    showMessage(
      "Часть названия новой задачи была восстановлена из sessionStorage."
    );
  }
}

// Показ сообщения пользователю
function showMessage(message) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.textContent = message;

  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}

// Добавление новой задачи при нажатии на кнопку
document.getElementById("add-task-button").addEventListener("click", () => {
  if (taskInput.value.trim()) {
    createTask(taskInput.value);
    taskInput.value = "";
  }
});

// Восстановление списка задач и текста в поле ввода после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
  const tasks = loadTasksFromLocalStorage();
  renderTasks(tasks);
  restoreTaskInputFromSessionStorage();

  if (typeof updateChartData === "function") {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    updateChartData(myChart, totalTasks, completedTasks);
  }
});

export {
  saveTasksToLocalStorage,
  loadTasksFromLocalStorage,
  deleteTask,
  createTask,
  restoreTaskInputFromSessionStorage,
  showMessage,
  updateChartData,
};
