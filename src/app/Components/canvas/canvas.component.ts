import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Spot } from 'src/app/Models/Spot';
import { GlassesService } from 'src/app/Services/glasses.service';
import { getElementDepthCount } from '@angular/core/src/render3/state';

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
  @Input() id: boolean;
  @Input() isActive: boolean;

  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {
    this.glassesService.glassesSubject.subscribe((glasses) => {
      console.log(glasses);
      this.spot = this.glassesService.getSpot(this.id, 0);
      this.initCanvas();
    });
    this.glassesService.getGlasses(this.glassesService.id);
  }


initCanvas() {
  this.ctx = this.canvas.nativeElement.getContext('2d');
this.rotate(0); // to draw the rotated spot for the first time
  this.handleKeyDown();
}

drawSpot(x, y, width, height) {

  this.ctx.fillStyle = '#FF0000';
  this.ctx.fillRect(x, y, width, height);
}

handleKeyDown() {
  window.onkeydown = (event) => {
    const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;

    this.ctx.clearRect(0, 0, htmlCanvasElement.width, htmlCanvasElement.height);
    const keyPr = event.keyCode;

    this.handleMove(keyPr, htmlCanvasElement);
    this.handleRotate(keyPr);
    this.glassesService.glasses.setSpot(this.spot, 0, this.id); /*hard coded 0 - as index of spot in the spots array*/
    this.glassesService.updateGlasses(this.glassesService.id);
  };
}

handleRotate(keyPr) {
  const A = 65;
  const D = 68;
  const rotateInterval = 1;

  if (keyPr === A) {
    this.spot.rotateBy(rotateInterval);
    this.rotate(rotateInterval);
  } else if (keyPr === D) {
    this.spot.rotateBy(-rotateInterval);
    this.rotate(-rotateInterval);
  }
  this.rotate(0);
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
  this.drawSpot(this.spot.xPos, this.spot.yPos, this.spot.width, this.spot.height); // Drawing rectangle at new position
}

mmToPixelOnWindose(mm) {
  return 3.7795275591 * mm;
}

degToRad(deg) {
  return deg * Math.PI / 180;
}

rotate(rotateInterval) {
  const htmlCanvasElement = this.canvas.nativeElement as HTMLCanvasElement;
  const canvasWidth = htmlCanvasElement.width;
  const canvasHeigth = htmlCanvasElement.height;

  const spotWidth = this.spot.width;
  const spotHeight = this.spot.height;
  const spotPosX = this.spot.xPos;
  const spotPosY = this.spot.yPos;

  this.ctx.save(); /*saves the state of canvas*/
  this.ctx.clearRect(0, 0, canvasWidth, canvasHeigth); /*clear the canvas*/
  this.ctx.translate(spotPosX, spotPosY); /*let's translate*/
  this.ctx.rotate(Math.PI / 180 * (this.spot.rotation += rotateInterval)); /*increment the angle and rotate the image*/
  this.ctx.translate(-(canvasWidth / 2) + spotWidth / 2, -(canvasHeigth / 2) - spotHeight / 2); /*let's translate*/
  this.drawSpot(canvasWidth / 2 - spotWidth / 2, canvasHeigth / 2 - spotHeight / 2, spotWidth, spotHeight);
  this.ctx.restore(); /*restore the state of canvas*/
}
}
