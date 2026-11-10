let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

const image_data = ctx.getImageData(
    0, 0,
    canvas_handler.width, 
    canvas_handler.height
);

function drawBlock(x, y, borderColor, fillColor) {
    let poly = createSquarePolygon(x, y, GRID_SIZE);
    lib.polygon(poly, borderColor);
    // Mengisi bagian dalam kotak dengan Flood Fill
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