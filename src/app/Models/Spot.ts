
export class Spot {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.width = 4;
        this.height = 2;
        this.rotation = 0;
    }
    public _id: String;
    public xPos: number;
    public yPos: number;
    public width: number;
    public height: number;
    public rotation: number;

    rotateBy(value) {
        this.rotation += value;
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
