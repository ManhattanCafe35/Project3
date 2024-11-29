const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const tileSize = 50;
const rows = 10;
const cols = 10;


const levels = [
    [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1], 
        [1, 0, 1, 0, 0, 2, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    ],
    [
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 2, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    ],
];

let currentLevel = 0;
let maze = levels[currentLevel];


let player = { x: 0, y: 0 };


const exits = [
    { x: 8, y: 9 },
    { x: 9, y: 0 },
];


function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = '#000'; 
            } else if (maze[row][col] === 2) {
                ctx.fillStyle = 'red'; 
            } else {
                ctx.fillStyle = '#fff'; 
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}


function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(
        player.x * tileSize + tileSize / 2,
        player.y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}


function drawExit() {
    ctx.fillStyle = 'green';
    const exit = exits[currentLevel];
    ctx.fillRect(exit.x * tileSize, exit.y * tileSize, tileSize, tileSize);
}


function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawExit();
    drawPlayer();
}


function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        const tile = maze[newY][newX];
        if (tile === 0) {
            player.x = newX;
            player.y = newY;
        } else if (tile === 2) {
            document.getElementById('status').textContent = 'You Died! Press Restart to Try Again.';
            return; 
        }
    }

    renderGame();

    
    if (player.x === exits[currentLevel].x && player.y === exits[currentLevel].y) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            maze = levels[currentLevel];
            player = { x: 0, y: 0 };
            renderGame();
        } else {
            document.getElementById('status').textContent = 'You Completed the Game!';
        }
    }
}


function restartGame() {
    currentLevel = 0;
    maze = levels[currentLevel];
    player = { x: 0, y: 0 };
    document.getElementById('status').textContent = '';
    renderGame();
}


document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});


renderGame();
