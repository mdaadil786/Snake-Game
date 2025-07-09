const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
let food;
let direction = null;
let nextDirection = null;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let gameInterval = null;
let gameRunning = false;
let gameStarted = false;

document.getElementById("highScore").innerText = `High Score: ${highScore}`;

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  const key = e.key;

  if (key === "ArrowLeft" && direction !== "RIGHT") nextDirection = "LEFT";
  if (key === "ArrowUp" && direction !== "DOWN") nextDirection = "UP";
  if (key === "ArrowRight" && direction !== "LEFT") nextDirection = "RIGHT";
  if (key === "ArrowDown" && direction !== "UP") nextDirection = "DOWN";
});

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
}

function drawGame() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff00" : "#009900";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  if (!gameStarted) return; // 🛑 Prevent initial box from moving until start

  direction = nextDirection || direction;

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Check collision
  if (
    headX < 0 || headX >= canvas.width ||
    headY < 0 || headY >= canvas.height ||
    snake.some((s, index) => index !== 0 && s.x === headX && s.y === headY)
  ) {
    stopGame();
    alert("Game Over! Score: " + score);
    return;
  }

  // Eat food
  if (headX === food.x && headY === food.y) {
    score++;
    food = spawnFood();

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highScore").innerText = `High Score: ${highScore}`;
    }

    if (score % 2 === 0) {
      clearInterval(gameInterval);
      const speed = Math.max(50, 150 - score * 5);
      gameInterval = setInterval(drawGame, speed);
    }
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
  document.getElementById("score").innerText = "Score: " + score;
}

function startGame() {
  if (!gameRunning) {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = "RIGHT";
    nextDirection = "RIGHT";
    score = 0;
    food = spawnFood();
    gameStarted = true;
    gameRunning = true;
    document.getElementById("score").innerText = "Score: 0";
    gameInterval = setInterval(drawGame, 150);
  }
}

function pauseGame() {
  if (gameRunning) {
    clearInterval(gameInterval);
    gameRunning = false;
  }
}

function resumeGame() {
  if (!gameRunning && gameStarted) {
    gameRunning = true;
    gameInterval = setInterval(drawGame, 150);
  }
}

function restartGame() {
  clearInterval(gameInterval);
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "RIGHT";
  nextDirection = "RIGHT";
  score = 0;
  food = spawnFood();
  gameStarted = true;
  gameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  gameInterval = setInterval(drawGame, 150);
}
