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
  ang = 0;

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

    window.onkeydown = (event) => {
      const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;

      this.ctx.clearRect(0, 0, htmlCanvasElement.width, htmlCanvasElement.height);


      // console.log(document.getElementById(this.id.toString()));
      const keyPr = event.keyCode;

      this.handleMove(keyPr, htmlCanvasElement);
      this.handleRotate(keyPr);


      this.rotate(0);
    };
  }

  handleRotate(keyPr) {
    const A = 65;
    const rotateInterval = 1;

    if (keyPr === A) {
      this.spot.rotateBy(rotateInterval);
      this.rotate(rotateInterval);
      console.log(this.spot);
    }

  }
  handleMove(keyPr, htmlCanvasElement) {
    const moveInterval = 0.1;
    const moveIntervalInPixel = this.mmToPixelOnWindose(moveInterval);

    const up = 40;
    const down = 38;
    const right = 39;
    const left = 37;

    if (keyPr === right && this.spot.xPos < htmlCanvasElement.width) {
      this.spot.moveByX(moveIntervalInPixel); // right arrow add 20 from current
    } else if (keyPr === left && this.spot.xPos > 0) {
      this.spot.moveByX(- moveIntervalInPixel); // left arrow subtract 20 from current
    } else if (keyPr === up && this.spot.yPos < htmlCanvasElement.height) {
      this.spot.moveByY(moveIntervalInPixel); // top arrow subtract 20 from current
    } else if (keyPr === down && this.spot.yPos > 0) {
      this.spot.moveByY(- moveIntervalInPixel); // bottom arrow add 20 from current
    }

      this.glassesService.glasses.setSpotPos(this.spot, 0, this.id); /*hard coded 0 - as index of spot in the spots array*/
      this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height); // Drawing rectangle at new position
  }

  mmToPixelOnWindose(mm) {
    return 3.7795275591 * mm;
  }

  degToRad(deg) {
    return deg * Math.PI / 180;
  }


  rotate(rotateBy) {
    const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    const canvasWidth = htmlCanvasElement.width;
    const canvasHeigth = htmlCanvasElement.height;

    const iw = this.spot.width;
    const ih = this.spot.height;
    const xpos = this.spot.xPos;
    const ypos = this.spot.yPos;

    this.ctx.save(); /*saves the state of canvas*/
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeigth); /*clear the canvas*/
    this.ctx.translate(xpos, ypos); /*let's translate*/
    this.ctx.rotate(Math.PI / 180 * (this.spot.rotate += rotateBy)); /*increment the angle and rotate the image*/
    this.ctx.translate(-(canvasWidth / 2) + iw / 2, -(canvasHeigth / 2) - ih / 2); /*let's translate*/
    this.ctx.fillRect(canvasWidth / 2 - iw / 2, canvasHeigth / 2 - ih / 2, iw, ih); /*draw the image ;)*/
    this.ctx.restore(); /*restore the state of canvas*/
  }
}
