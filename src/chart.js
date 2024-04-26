function drawChart(totalTasks, completedTasks, uncompletedTasks, allTasksCount) {
  const canvas = document.getElementById("chart");

  // Проверка наличия canvas
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const ctx = canvas.getContext("2d");
  const maxHeight = 150; // Максимальная высота столбца
  const barWidth = 40;
  const barMargin = 20;
  const chartTopMargin = 20; // Верхний отступ для графика
  const textYOffset = canvas.height - chartTopMargin + 10; // Отступ от нижнего края canvas

  // Проверка деления на 0
  if (allTasksCount === 0) {
    console.error("Cannot divide by zero!");
    return;
  }

  // Очищаем canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем столбцы
  ctx.fillStyle = "blue";
  ctx.fillRect(barMargin, canvas.height - chartTopMargin, barWidth, -((maxHeight * totalTasks) / allTasksCount));

  ctx.fillStyle = "green";
  ctx.fillRect(barMargin + barWidth + barMargin, canvas.height - chartTopMargin, barWidth, -((maxHeight * completedTasks) / allTasksCount));

  ctx.fillStyle = "red";
  ctx.fillRect(barMargin + (barWidth + barMargin) * 2, canvas.height - chartTopMargin, barWidth, -((maxHeight * uncompletedTasks) / allTasksCount));

  // Добавляем подписи к столбцам
  ctx.font = "8px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center"; // Выравнивание текста по центру

  // Подпись для первого столбца
  ctx.fillText("Всего", barMargin + barWidth / 2, textYOffset);

  // Подпись для второго столбца
  ctx.fillText("Завершенные", barMargin + barWidth + barMargin + barWidth / 2, textYOffset);

  // Подпись для третьего столбца
  ctx.fillText("Незавершенные", barMargin + (barWidth + barMargin) * 2 + barWidth / 2, textYOffset);
}

export { drawChart };
