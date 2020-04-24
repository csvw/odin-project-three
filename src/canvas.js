class Canvas {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.browserSupport = false;
        this.ctx = null;
        if(this.canvas.getContext) {
            this.browserSupport = true;
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas = this.resizeCanvas.bind(this);
            this.initResizing();
            this.rectManager = new RectangleManager(this.canvas, this.ctx);
        }
    }

    animationLoop() {
        if(this.browserSupport) {
            window.requestAnimationFrame(this.rectManager.draw);
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initResizing() {
        this.resizeCanvas();
        window.onresize = this.resizeCanvas;
    }
}

class RectangleManager {
    constructor(canvas, ctx) {
        this.limit = 20;
        this.timeStamp = null;
        this.drawDelay = 20;
        this.rectangles = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    draw(timeStamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i = 0; i < this.rectangles.length; i++) {
            this.drawRect(i, timeStamp);
        }
        this.removeExpiredRects();
        this.addNewRect(timeStamp);
        this.dampenMainDisplay();
        window.requestAnimationFrame(this.draw);
    }

    dampenMainDisplay() {
        this.ctx.fillStyle = "rgba(245, 245, 245, 0.85)";
        this.ctx.fillRect(
            this.canvas.width - this.canvas.width * .8 * .5 - this.canvas.width / 2,
            this.canvas.height - this.canvas.height * .8 * .5 - this.canvas.height / 2,
            this.canvas.width * .8,
            this.canvas.height * .8,
            )
    }

    removeExpiredRects() {
        this.rectangles = this.rectangles.filter(function(elem) {
            return elem.animFrame < elem.animLen; 
       });
    }

    addNewRect(timeStamp) {
        if(this.timeStamp == null) {
            this.timeStamp = timeStamp;
        }
        if(this.rectangles.length < this.limit) {
            if(timeStamp - this.timeStamp > this.drawDelay) {
                this.rectangles.push(this.generateRectangle());
                this.timeStamp = timeStamp;
            }
        }
    }

    drawRect(i, timeStamp) {
        let rect = this.rectangles[i];
        if(rect.timeStamp == null) {
            rect.timeStamp = timeStamp;
        }
        else {
            rect.animFrame += (timeStamp - rect.timeStamp);
            rect.timeStamp = timeStamp;
        }
        if(i == 0) console.log(rect.color.a)
        rect.color.a = -Math.pow((rect.animFrame/rect.animLen - 1/2), 2) * 4 * rect.color.maxAlpha + rect.color.maxAlpha;
        rect.loc.x += rect.vector.dx;
        rect.loc.y += rect.vector.dy;
        this.ctx.fillStyle = `hsla(${rect.color.h},100%,${rect.color.l}%, ${rect.color.a})`;
        this.ctx.fillRect(rect.loc.x, rect.loc.y, rect.w, rect.w);
    }

    generateVector() {
        let params = {};
        let dx = Math.random() * .1;
        let dy = Math.random() * .1;
        params.dx = Math.random() < 0.5 ? -1 * dx : dx;
        params.dy = Math.random() < 0.5 ? -1 * dy : dy;
        return params;
    }

    generateLocation(dim) {
        let params = {};
        params.x = Math.floor(Math.random() * this.canvas.width - dim / 2);
        params.y = Math.floor(Math.random() * this.canvas.height - dim / 2);
        return params;
    }

    generateColor() {
        let params = {};
        params.h = Math.floor(Math.random() * 359);
        params.l = 40 + Math.floor(Math.random() * 20);
        params.a = 0;
        params.maxAlpha = 0.8;
        return params;
    }

    generateDims() {
        return Math.floor(Math.random() * 100 + 15);
    }

    generateRectangle() {
        let params = {};
        params.w = this.generateDims();
        params.loc = this.generateLocation(params.w);
        params.color = this.generateColor();
        params.vector = this.generateVector();
        params.animLen = Math.floor(Math.random() * 8000 + 2000);
        params.animFrame = 0;
        params.timeStamp = null;
        params.alphaInc = 5. / params.animLen;
        return params;
    }
}

export { Canvas };