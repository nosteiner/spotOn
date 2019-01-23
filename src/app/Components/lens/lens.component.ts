import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Settings } from 'src/app/Models/Settings';
import { GlassesService } from 'src/app/Services/glasses.service';

@Component({
  selector: 'app-lens',
  templateUrl: './lens.component.html',
  styleUrls: ['./lens.component.scss']
})
export class LensComponent implements OnInit {

  constructor(private glassesService: GlassesService) { }
  @Input() side: string;
  @Input() isActive: boolean;
  settings: Settings;
  brightnessValue = 100;
  contrastValue = 100;

  ngOnInit() {
    this.glassesService.glassesSubject.subscribe((glasses) => {
      this.settings = this.glassesService.getSettings(this.side);
      this.brightnessValue = this.settings.brightness;
      this.contrastValue = this.settings.contrast;
    });
  }

  changeContrast(value) {
    this.contrastValue = Number(value);
  }

  changeBrightness(value) {
    this.brightnessValue = Number(value);
  }
}
