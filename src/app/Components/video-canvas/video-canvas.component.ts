import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-canvas',
  templateUrl: './video-canvas.component.html',
  styleUrls: ['./video-canvas.component.scss']
})
export class VideoCanvasComponent implements OnInit {

  constructor() { }

  isRight = true;
  ctx: CanvasRenderingContext2D;
  video: HTMLVideoElement;
  brightnessLevel = 0;
  contrastLevel = 0;

  @Input() id: string;
  @ViewChild('videoCanvas') videoCanvas: ElementRef;


  ngOnInit() {
    this.initCanvas();
  }

  initCanvas() {
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
  }

  loadVideoToCanvas(video) {
    this.video = video;
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.video.addEventListener('play', () => {
      window.setInterval(() => {
        this.ctx.drawImage(this.video, 5, 5, 260, 125);
      }, 20);
    }, false);
  }

  changeBrightness(value) {

    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.brightnessLevel = value / 100;
    return this.ctx.filter = `brightness(${this.brightnessLevel})`;
  }

  changeContrast(value) {
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.contrastLevel = value;
    return this.ctx.filter = `contrast(${this.contrastLevel})`;
  }
}

