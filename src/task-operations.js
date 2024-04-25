export function deleteTask(tasks, index) {
  tasks.splice(index, 1);
}

export function editTask(tasks, index, newDescription) {
  tasks[index].description = newDescription;
}
