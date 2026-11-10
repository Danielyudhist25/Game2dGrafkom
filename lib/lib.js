export default class myLib {
    constructor(width, image_data) {
        this.width = width;
        this.image_data = image_data;
    }

    // Mengubah warna 1 piksel pada posisi (x, y)
    draw_dot(x, y, color) {
        let index = (Math.floor(y) * this.width + Math.floor(x)) * 4;
        this.image_data.data[index]     = color.r;
        this.image_data.data[index + 1] = color.g;
        this.image_data.data[index + 2] = color.b;
        this.image_data.data[index + 3] = color.a !== undefined ? color.a : 255;
    }

    // Membaca warna piksel pada posisi (x, y)
    get_pixel(x, y) {
        let index = (Math.floor(y) * this.width + Math.floor(x)) * 4;
        return {
            r: this.image_data.data[index],
            g: this.image_data.data[index + 1],
            b: this.image_data.data[index + 2],
            a: this.image_data.data[index + 3]
        };
    }

    dda_line(x1, y1, x2, y2, color) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let steps = Math.max(Math.abs(dx), Math.abs(dy));
        
        if (steps === 0) {
            this.draw_dot(x1, y1, color);
            return;
        }

        let xInc = dx / steps;
        let yInc = dy / steps;

        let x = x1;
        let y = y1;
        for (let i = 0; i <= steps; i++) {
            this.draw_dot(x, y, color);
            x += xInc;
            y += yInc;
        }
    }

    polygon(array_titik, color) {
        for (let i = 0; i < array_titik.length; i++) {
            let nextIndex = (i + 1) % array_titik.length;
            this.dda_line(
                array_titik[i].x, array_titik[i].y,
                array_titik[nextIndex].x, array_titik[nextIndex].y,
                color
            );
        }
    }

    flood_fill(startX, startY, targetColor, newColor) {
        if (targetColor.r === newColor.r && 
            targetColor.g === newColor.g && 
            targetColor.b === newColor.b) {
            return;
        }

        let queue = [{x: Math.floor(startX), y: Math.floor(startY)}];

        while (queue.length > 0) {
            let current = queue.shift();
            let x = current.x;
            let y = current.y;

            if (x < 0 || x >= this.width || y < 0 || y >= 500) continue;

            let currentColor = this.get_pixel(x, y);

            if (currentColor.r === targetColor.r && 
                currentColor.g === targetColor.g && 
                currentColor.b === targetColor.b) {
                
                this.draw_dot(x, y, newColor);

                queue.push({x: x + 1, y: y});
                queue.push({x: x - 1, y: y});
                queue.push({x: x, y: y + 1});
                queue.push({x: x, y: y - 1});
            }
        }
    }
}