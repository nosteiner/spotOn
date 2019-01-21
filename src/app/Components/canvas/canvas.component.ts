import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { SpotsService } from 'src/app/Services/spots.service';
import { Spot } from 'src/app/Models/Spot';
import { Video } from 'src/app/Models/Video';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private spotsService: SpotsService) { }

  isRight = true;
  // spots = [];
  ctx: CanvasRenderingContext2D;
  spot: Spot;
  @Input() id: number;
  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    this.spot = new Spot(htmlCanvasElement.width / 2, htmlCanvasElement.height / 2);

    this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height);
    this.makeSpotMovable();
  }

  drawSpot(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
  }

  makeSpotMovable() {
    const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;

    window.onkeydown = (event) => {
      const keyPr = event.keyCode;
      const moveBy = 0.1;
      const moveByInPixel = this.mmToPixel(moveBy);

      const up = 40;
      const down = 38;
      const right = 39;
      const left = 37;

      if (keyPr === right && this.spot.xPos < htmlCanvasElement.width) {
        this.spot.moveByX(moveByInPixel); // right arrow add 20 from current
      } else if (keyPr === left && this.spot.xPos > 0) {
        this.spot.moveByX(-moveByInPixel); // left arrow subtract 20 from current
      } else if (keyPr === up && this.spot.yPos < htmlCanvasElement.height) {
        this.spot.moveByY(moveByInPixel); // top arrow subtract 20 from current
      } else if (keyPr === down && this.spot.yPos > 0) {
        this.spot.moveByY(-moveByInPixel); // bottom arrow add 20 from current
      }
      /*clearing anything drawn on canvas
       *comment this below do draw path */
      this.ctx.clearRect(0, 0, 500, 500);

      // Drawing rectangle at new position
      this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height);
    };
  }

  mmToPixel(mm) {
    return 3.7795275591 * mm;
  }
}
