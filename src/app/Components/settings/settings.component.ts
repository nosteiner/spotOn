import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor() { }

  brightnessLevel: number;
  contrastLevel: number;

  ngOnInit() {
  }

  changeBrightness(value) {
    console.log(value);
  }
}
