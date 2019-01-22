
export class Spot {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.width = 4;
        this.height = 2;
        this.rotate = 0;
    }
    public xPos: number;
    public yPos: number;
    public width: number;
    public height: number;
    public rotate: number;


    rotateBy(value) {
        this.rotate += value;
    }

    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    moveByX(delta) {
        this.xPos += delta;
    }
    moveByY(delta) {
        this.yPos += delta;
    }
}
