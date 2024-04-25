// Сохранение списка задач в localStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Загрузка списка задач из localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks || [];
}

const tasks = loadTasksFromLocalStorage();

saveTasksToLocalStorage(tasks);

// Восстановление списка задач после загрузки страницы
function restoreTasksFromLocalStorage() {
  const tasks = loadTasksFromLocalStorage();
}

// Загрузка списка задач из localStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks || [];
}

// Вызов функции восстановления при загрузке страницы
document.addEventListener("DOMContentLoaded", restoreTasksFromLocalStorage);

// Сохранение названия задачи в sessionStorage при вводе
const taskInputLs = document.getElementById("task-input");
taskInputLs.addEventListener("input", function () {
  sessionStorage.setItem("taskInputValue", taskInput.value);
});

// Восстановление названия задачи из sessionStorage после загрузки страницы
function restoreTaskInputFromSessionStorage() {
  const taskInputValue = sessionStorage.getItem("taskInputValue");
  if (taskInputValue) {
    taskInput.value = taskInputValue;
    showMessage("Часть названия новой задачи была восстановлена из sessionStorage.");
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

// Вызов функции восстановления при загрузке страницы
document.addEventListener("DOMContentLoaded", restoreTaskInputFromSessionStorage);

export { saveTasksToLocalStorage, loadTasksFromLocalStorage, restoreTasksFromLocalStorage, restoreTaskInputFromSessionStorage, showMessage };
