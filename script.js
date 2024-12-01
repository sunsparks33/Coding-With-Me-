const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
  x: 50,
  y: 200,
  radius: 10,
  color: 'red',
  dx: 0,
  dy: 0,
  speed: 2,
};

// Obstacles
const obstacles = [
  { x: 150, y: 100, width: 20, height: 200 },
  { x: 300, y: 0, width: 20, height: 300 },
  { x: 450, y: 150, width: 20, height: 250 },
  { x: 200, y: 50, width: 100, height: 20 },
  { x: 400, y: 300, width: 100, height: 20 },
];

// Goal
const goal = { x: 550, y: 175, width: 30, height: 50 };

// Keys for movement (Z, Q, S, D)
const keys = {
  z: false,
  s: false,
  q: false,
  d: false,
};

// Event listeners for keypresses
document.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase()] = false;
});

// Update ball position
function updateBall() {
  if (keys.z) ball.dy = -ball.speed; // Move up
  else if (keys.s) ball.dy = ball.speed; // Move down
  else ball.dy = 0;

  if (keys.q) ball.dx = -ball.speed; // Move left
  else if (keys.d) ball.dx = ball.speed; // Move right
  else ball.dx = 0;

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Prevent ball from leaving canvas
  if (ball.x - ball.radius < 0) ball.x = ball.radius;
  if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;
  if (ball.y - ball.radius < 0) ball.y = ball.radius;
  if (ball.y + ball.radius > canvas.height) ball.y = canvas.height - ball.radius;
}

// Check for collisions with obstacles
function checkCollisions() {
  for (let obstacle of obstacles) {
    if (
      ball.x + ball.radius > obstacle.x &&
      ball.x - ball.radius < obstacle.x + obstacle.width &&
      ball.y + ball.radius > obstacle.y &&
      ball.y - ball.radius < obstacle.y + obstacle.height
    ) {
      resetBall();
    }
  }
}

// Reset ball position
function resetBall() {
  ball.x = 50;
  ball.y = 200;
}

// Check if the ball reached the goal
function checkGoal() {
  if (
    ball.x + ball.radius > goal.x &&
    ball.x - ball.radius < goal.x + goal.width &&
    ball.y + ball.radius > goal.y &&
    ball.y - ball.radius < goal.y + goal.height
  ) {
    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('message').style.display = 'block';
  }
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = 'black';
  for (let obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}

// Draw goal
function drawGoal() {
  ctx.fillStyle = 'gold';
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawObstacles();
  drawGoal();
  updateBall();
  checkCollisions();
  checkGoal();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();