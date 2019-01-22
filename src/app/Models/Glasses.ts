import { Lens } from './Lens';
import { Spot } from './Spot';

export class Glasses {

    constructor() {
        this.lenses = Array();
        this.addToLensesArray(new Lens(true));
        this.addToLensesArray(new Lens(false));
    }
    _id: Object;
    lenses: Array<Lens>;

    setSpotPos(spot: Spot, spotIndex, isRight) {
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        this.lenses[index].spots[spotIndex] = spot;
    }

    getSpot(isRight, spotIndex) {
        const index = this.lenses.findIndex(lens => lens.isRight === isRight);
        console.log(isRight);
        return this.lenses[index].spots[spotIndex];
    }

    addToLensesArray(lens: Lens) {
        this.lenses.push(lens);
    }
}

