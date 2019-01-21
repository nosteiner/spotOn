import { Component, OnInit } from '@angular/core';
import { SpotsService } from 'src/app/Services/spots.service';
import { Spot } from 'src/app/Models/Spot';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private spotsService: SpotsService) { }

  isRight = true;
  // spots = [];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  spot: Spot;

  ngOnInit() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    // this.spots = this.spotsService.spots;
    this.spot = new Spot(this.canvas.width / 2, this.canvas.height / 2);
    // this.handleGetSpotsArray(this.isRight);
    // this.handleAddToSpotsArray();
    // this.drawSpots();
    this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height);
    this.makeSpotMovable();
  }

  newSpot() {
    console.log(this.canvas.width / 2, this.canvas.height / 2);
    return new Spot(this.canvas.width / 2, this.canvas.height / 2);
  }

  drawSpot(x, y, wid, hei) {
    this.ctx.fillRect(x, y, wid, hei);
  }

  makeSpotMovable() {
    window.onkeydown = (event) => {
      const keyPr = event.keyCode;
      const moveBy = 0.1;

      const up = 40;
      const down = 38;
      const right = 39;
      const left = 37;

      if (keyPr === right && this.spot.xPos < this.canvas.width) {
        this.spot.moveByX(moveBy); // right arrow add 20 from current
      } else if (keyPr === left && this.spot.xPos > 0) {
        this.spot.moveByX(-moveBy); // left arrow subtract 20 from current
      } else if (keyPr === up && this.spot.yPos < this.canvas.height) {
        this.spot.moveByY(moveBy); // top arrow subtract 20 from current
      } else if (keyPr === down && this.spot.yPos > 0) {
        this.spot.moveByY(-moveBy); // bottom arrow add 20 from current
      }
      /*clearing anything drawn on canvas
       *comment this below do draw path */
      this.ctx.clearRect(0, 0, 500, 500);

      // Drawing rectangle at new position
      this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.width);
    };
  }

  // handleGetSpotsArray(isRight) {
  //   this.spotsService.getSpots(isRight);
  // }

  // handleAddToSpotsArray() {
  //   const newSpot = this.newSpot();
  //   this.spotsService.addToSpotsArray(newSpot);
  // }

  // drawSpots() {
  //   for (const spot of this.spots) {
  //     console.log(spot);
  //     this.ctx.fillRect(spot.xPos, spot.yPos, spot.width, spot.height);
  //   }
  // }
}
