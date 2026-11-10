import myLib from './lib/lib.js';

let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

const image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
let lib = new myLib(canvas_handler.width, image_data);

const GRID_SIZE = 20;

let snake = [
    {x: 100, y: 100},
    {x: 80,  y: 100}
];

let dir = {x: GRID_SIZE, y: 0};
let nextDir = {x: GRID_SIZE, y: 0};

let food = {x: 200, y: 200};

let isRunning = false;
let animationFrameId = null;
let lastTime = 0;
const speed = 180;

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dir.y === 0)    { nextDir = {x: 0, y: -GRID_SIZE}; }
    if (e.key === "ArrowDown" && dir.y === 0)  { nextDir = {x: 0, y: GRID_SIZE}; }
    if (e.key === "ArrowLeft" && dir.x === 0)  { nextDir = {x: -GRID_SIZE, y: 0}; }
    if (e.key === "ArrowRight" && dir.x === 0) { nextDir = {x: GRID_SIZE, y: 0}; }
});

document.querySelector("#btnStart").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    }
});

document.querySelector("#btnPause").addEventListener("click", () => {
    isRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});

document.querySelector("#btnReset").addEventListener("click", () => {
    isRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    snake = [{x: 100, y: 100}, {x: 80, y: 100}];
    dir = {x: GRID_SIZE, y: 0};
    nextDir = {x: GRID_SIZE, y: 0};
    food = {x: 200, y: 200};
    
    clearImageData();
    renderGame();
    ctx.putImageData(image_data, 0, 0);
});


function createSquarePolygon(x, y, size) {
    return [
        {x: x, y: y},
        {x: x + size, y: y},
        {x: x + size, y: y + size},
        {x: x, y: y + size}
    ];
}


function drawBlock(x, y, borderColor, fillColor) {
    let poly = createSquarePolygon(x, y, GRID_SIZE);
    lib.polygon(poly, borderColor);
    
    lib.flood_fill(x + 2, y + 2, {r: 0, g: 0, b: 0}, fillColor);
}

function clearImageData() {
    for (let i = 0; i < image_data.data.length; i += 4) {
        image_data.data[i]     = 0;
        image_data.data[i + 1] = 0;
        image_data.data[i + 2] = 0;
        image_data.data[i + 3] = 255;
    }
}

function renderGame() {
    drawBlock(food.x, food.y, {r: 255, g: 255, b: 255}, {r: 255, g: 0, b: 0});

    for (let i = 0; i < snake.length; i++) {
        drawBlock(snake[i].x, snake[i].y, {r: 255, g: 255, b: 255}, {r: 0, g: 255, b: 0});
    }
}

function gameLoop(timestamp) {
    if (!isRunning) return;

    if (timestamp - lastTime > speed) {
        lastTime = timestamp;
        dir = nextDir;

        let newHead = {
            x: snake[0].x + dir.x,
            y: snake[0].y + dir.y
        };

        if (newHead.x >= canvas_handler.width) newHead.x = 0;
        if (newHead.x < 0) newHead.x = canvas_handler.width - GRID_SIZE;
        if (newHead.y >= canvas_handler.height) newHead.y = 0;
        if (newHead.y < 0) newHead.y = canvas_handler.height - GRID_SIZE;

        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            food.x = Math.floor(Math.random() * (canvas_handler.width / GRID_SIZE)) * GRID_SIZE;
            food.y = Math.floor(Math.random() * (canvas_handler.height / GRID_SIZE)) * GRID_SIZE;
        } else {
            snake.pop();
        }

        clearImageData();
        renderGame();
        ctx.putImageData(image_data, 0, 0);
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

clearImageData();
renderGame();
ctx.putImageData(image_data, 0, 0);