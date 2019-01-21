import { Settings } from './Settings';

export class Lens {

    public isRight: boolean;
    public settings: Settings;

    constructor(isRight) {
        this.isRight = isRight;
        this.settings = new Settings();
    }

    set(brightness, contrast) {

    }
}
