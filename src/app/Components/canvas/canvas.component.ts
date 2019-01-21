import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.drawRectable();
  }

  drawRectable() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let xPos = 0;
    let yPos = 0;

ctx.rect(xPos, yPos, 50, 50);

  }
}
