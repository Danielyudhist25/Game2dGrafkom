import lib from './lib/lib.js';

let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

const image_data = ctx.getImageData(
    0, 0,
    canvas_handler.width, 
    canvas_handler.height
);

let snake = [{x: 100, y: 100},{x: 80,  y: 100}];
let isRunning = false;
let animationFrameId = null;
let dir = {x: GRID_SIZE, y: 0};
let nextDir = {x: GRID_SIZE, y: 0};
let lastTime = 0;
let food = {x: 200, y: 200};
const speed = 180;

function createSquarePolygon(x, y, size) {
    return [
        {x: x, y: y},
        {x: x + size, y: y},
        {x: x + size, y: y + size},
        {x: x, y: y + size}
    ];
}

function drawSnake() {
    const libInstance = new lib(canvas_handler.width, image_data);
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const segmentPolygon = createSquarePolygon(segment.x, segment.y, GRID_SIZE);
        libInstance.drawPolygon(segmentPolygon, "green");
    }
}

function clearImageData() {
    for (let i = 0; i < image_data.data.length; i += 4) {
        image_data.data[i] = 255;
        image_data.data[i + 1] = 255;
        image_data.data[i + 2] = 255;
        image_data.data[i + 3] = 255;
    }
}

function drawFood() {
    const foodPolygon = createSquarePolygon(food.x, food.y, GRID_SIZE);
    const libInstance = new lib(canvas_handler.width, image_data);
    libInstance.drawPolygon(foodPolygon, "red");
}

function gameLoop(timestamp) {
    if (!isRunning) return;
    if (timestamp - lastTime >= speed) {
        update();
        draw();
        lastTime = timestamp;
    }
    animationFrameId = requestAnimationFrame(gameLoop);
}
ctx.putImageData(image_data, 0, 0);