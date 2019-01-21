import { Injectable } from '@angular/core';
import { Spot } from 'src/app/Models/Spot';


@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  spots = [];

  constructor() { }

  getSpots(isRight) {
    return this.spots;
  }
  addToSpotsArray(newSpot) {
    this.spots.push(newSpot);
    console.log(this.spots);
  }
}
