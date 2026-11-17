import lib from './lib/lib.js';

let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

const image_data = ctx.getImageData(
    0, 0,
    canvas_handler.width, 
    canvas_handler.height
);

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