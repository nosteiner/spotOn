import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Spot } from 'src/app/Models/Spot';
import { Lens } from 'src/app/Models/Lens';
import { GlassesService } from 'src/app/Services/glasses.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(private glassesService: GlassesService) {
  }

  ctx: CanvasRenderingContext2D;
  spot: Spot;

  @Input() id: string;
  @Input() isActive: boolean;

  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {
    this.spot = this.glassesService.getSpot(this.id, 0);
    this.initCanvas();
  }

  initCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height);
    this.moveSpotOnKeyDown();
  }

  drawSpot(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
  }

  moveSpotOnKeyDown() {
    const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    window.onkeydown = (event) => {
      const keyPr = event.keyCode;
      const moveBy = 0.1;
      const moveByInPixel = this.mmToPixelOnWindose(moveBy);

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

      this.glassesService.glasses.setSpotPos(this.spot, 0, this.id); /*hard coded 0 - as index of spot in the spots array*/
      // Drawing rectangle at new position
      this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height);
    };
  }

  mmToPixelOnWindose(mm) {
    return 3.7795275591 * mm;
  }

}
