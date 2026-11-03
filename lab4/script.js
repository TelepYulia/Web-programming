document.addEventListener('DOMContentLoaded', () => {
  const SETTINGS = {
    lazy: { time: 5, size: 80, maxStep: 150 },
    normal: { time: 3, size: 55, maxStep: 350 },
    hard: { time: 2, size: 35, maxStep: 1000 }
  };

  const difficultySelect = document.getElementById('difficulty-select');
  const colorSelect = document.getElementById('color-select');
  const startBtn = document.getElementById('start-btn');
  const statsPanel = document.getElementById('stats-panel');
  const scoreVal = document.getElementById('score-val');
  const timerVal = document.getElementById('timer-val');
  const targetBox = document.getElementById('target-box');

  let score = 0;
  let timerId = null;
  let timeLeft = 0;
  let currentConfig = null;
  let isGameOver = false;

  startBtn.addEventListener('click', () => {
    const difficulty = difficultySelect.value;
    const color = colorSelect.value;

    if (!difficulty || !color) {
      return;
    }

    currentConfig = SETTINGS[difficulty];
    score = 0;
    isGameOver = false;
    scoreVal.textContent = score;

    targetBox.style.backgroundColor = color;
    targetBox.style.width = `${currentConfig.size}px`;
    targetBox.style.height = `${currentConfig.size}px`;
    targetBox.style.display = 'block';

    statsPanel.style.display = 'flex';

    moveBox();
    resetAndStartTimer();
  });

  function moveBox() {
    if (isGameOver) return;

    const boxSize = currentConfig.size;
    const maxStep = currentConfig.maxStep;

    const minX = 20;
    const maxX = window.innerWidth - boxSize - 20;
    const minY = 120;
    const maxY = window.innerHeight - boxSize - 20;

    const currentLeft = targetBox.offsetLeft || (maxX / 2);
    const currentTop = targetBox.offsetTop || (maxY / 2);

    let newX = currentLeft + (Math.random() * maxStep * 2 - maxStep);
    newX = Math.max(minX, Math.min(maxX, newX));

    let newY = currentTop + (Math.random() * maxStep * 2 - maxStep);
    newY = Math.max(minY, Math.min(maxY, newY));

    targetBox.style.left = `${newX}px`;
    targetBox.style.top = `${newY}px`;
  }

  targetBox.addEventListener('click', () => {
    if (isGameOver) return;

    score++;
    scoreVal.textContent = score;

    moveBox();
    resetAndStartTimer();
  });

  function resetAndStartTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
    }

    timeLeft = currentConfig.time;
    timerVal.textContent = timeLeft;

    timerId = setInterval(() => {
      timeLeft--;
      timerVal.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    isGameOver = true;
    targetBox.style.display = 'none';

    alert(`Гра завершена! Ви набрали ${score} очок. Щоб почати заново, оновіть сторінку або виберіть налаштування.`);
  }
});
