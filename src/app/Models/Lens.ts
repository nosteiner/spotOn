import { Settings } from './Settings';
import { Spot } from './Spot';

export class Lens {
    public _id: String;
    public isRight: Boolean;
    public settings: Settings;
    public spots: Array<Spot>;


    constructor(isRight) {
        this.isRight = isRight;
        this.spots = new Array<Spot>();
        this.settings = new Settings();
        this.spots.push(new Spot(150, 75));
    }

    pushToSpotsArray(spot: Spot) {
        this.spots.push(spot);
    }

    mmToPixelOnWindose(mm) {
        return 3.7795275591 * mm;
    }

}
