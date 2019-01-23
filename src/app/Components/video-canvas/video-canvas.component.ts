import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { GlassesService } from 'src/app/Services/glasses.service';
import { Settings } from 'src/app/Models/Settings';

@Component({
  selector: 'app-video-canvas',
  templateUrl: './video-canvas.component.html',
  styleUrls: ['./video-canvas.component.scss']
})
export class VideoCanvasComponent implements OnInit, OnChanges {

  constructor(private glassesService: GlassesService) { }

  settings: Settings;
  ctx: CanvasRenderingContext2D;
  video: HTMLVideoElement;

  @Input() brightnessValue;
  @Input() contrastValue;
  @Input() id: boolean;

  @ViewChild('videoCanvas') videoCanvas: ElementRef;

  ngOnInit() {
    this.glassesService.glassesSubject.subscribe((glasses) => {
      this.settings = this.glassesService.getSettings(this.id);
      this.initCanvas();
    });
    this.glassesService.getGlasses(this.glassesService.id);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.contrastValue) {
      this.changeContrast(changes.contrastValue.currentValue);
    } else if (changes.brightnessValue) {
      this.changeBrightness(changes.brightnessValue.currentValue);
    }
  }

  initCanvas() {
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
  }

  loadVideoToCanvas(video) {
    this.video = video;
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.video.addEventListener('play', () => {
      window.setInterval(() => {
        this.fitVideoToCanvas();
      }, 20);
    }, false);
  }

  fitVideoToCanvas() {
    const htmlCanvasElement = this.videoCanvas.nativeElement as HTMLCanvasElement;
    const vRatio = (htmlCanvasElement.height / this.video.videoHeight) * this.video.videoWidth;
    this.ctx.drawImage(this.video, 0, 0, vRatio, htmlCanvasElement.height);

    // fill horizontally
    const hRatio = (htmlCanvasElement.width / this.video.videoWidth) * this.video.videoHeight;
    this.ctx.drawImage(this.video, 0, 0, htmlCanvasElement.width, hRatio);
  }

  changeBrightness(value) {
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.brightnessValue = value / 100.0;
    this.settings.set(this.brightnessValue, this.contrastValue);
    this.glassesService.glasses.setSettings(this.settings, this.id); /*hard coded 0 - as index of spot in the spots array*/
    this.glassesService.updateGlasses(this.glassesService.id);
    return this.ctx.filter = `brightness(${this.brightnessValue})`;
  }

  changeContrast(value) {
    this.ctx = this.videoCanvas.nativeElement.getContext('2d');
    this.contrastValue = value / 100.0;
    this.glassesService.glasses.setSettings(this.settings, this.id); /*hard coded 0 - as index of spot in the spots array*/
    this.glassesService.updateGlasses(this.glassesService.id);
    return this.ctx.filter = `contrast(${this.contrastValue})`;
  }
}

