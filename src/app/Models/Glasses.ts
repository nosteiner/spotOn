import { Lens } from './Lens';
import { Spot } from './Spot';
import { Settings } from 'http2';

export class Glasses {

    constructor() {

        this.lenses = Array();
        this.addToLensesArray(new Lens(true));
        this.addToLensesArray(new Lens(false));
    }
    private _id: String;
    public lenses: Array<Lens>;

    setSpot(spot: Spot, spotIndex, isRight) {
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        this.lenses[index].spots[spotIndex] = spot;
    }

    setSettings(settings, isRight) {
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        this.lenses[index].settings = settings;
    }

    getSettings(isRight){
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        return this.lenses[index].settings;
    }

    getSpot(isRight, spotIndex) {
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        return this.lenses[index].spots[spotIndex];
    }

    addToLensesArray(lens: Lens) {
        this.lenses.push(lens);
    }
}

