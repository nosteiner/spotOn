export class Settings {
    constructor() {
        this.brightness = 100;
        this.contrast = 100;
    }
    public _id: String;
    public brightness: number;
    public contrast: number;

    set(brightness, contrast) {
        this.brightness = brightness;
        this.contrast = contrast;
    }
}
