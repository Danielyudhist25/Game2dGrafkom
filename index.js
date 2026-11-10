let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

const image_data = ctx.getImageData(
    0, 0,
    canvas_handler.width, 
    canvas_handler.height
);