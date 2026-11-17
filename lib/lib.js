export class lib{
    constructor (canvas_width, image_data){
        this.canvas_width = canvas_width
        this.image_data = image_data
    }

    draw_dot(x, y, color){
        const index = (x + (y * this.canvas_width)) * 4;
        this.image_data.data[index] = color.r;
        this.image_data.data[index + 1] = color.g;
        this.image_data.data[index + 2] = color.b;
        this.image_data.data[index + 3] = 255;
    }

    get_dot(x, y) {
        let index = (x + (y * this.canvas_width)) * 4;
        let warna = {r:0, g:0, b:0, a:0};
        warna.r = this.image_data.data[index]
        warna.g = this.image_data.data[index+1];
        warna.b = this.image_data.data[index+2];
        warna.a = 255;
        return warna;
    }

    dda_line(x1, y1, x2, y2, color) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        if (Math.abs(dx) >= Math.abs(dy)) {
            let m = dy / dx;
            let y = y1;
            if (dx === 0) {
            this.   draw_dot(x1, y1, color);
            return;
            }
            if (x2 > x1) {
            for (let x = x1; x <= x2; x++) {
                this.draw_dot(x, Math.round(y), color);
                y += m;}
        }else {
            for (let x = x1; x >= x2; x--) {
                this.draw_dot(x, Math.round(y), color);
                y -= m;}
        }
    } else {
        let m = dx / dy;
        let x = x1;
        if (y2 > y1) {
            for (let y = y1; y <= y2; y++) {
                this.draw_dot(Math.round(x), y, color);
                x += m;
            }
        }else {
            for (let y = y1; y >= y2; y--) {
                this.draw_dot(Math.round(x), y, color);
                x -= m;
            }
        }
    }
    }
}