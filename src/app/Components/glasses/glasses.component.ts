import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.scss']
})
export class GlassesComponent implements OnInit {

  constructor() { }
  L = 'L';
  R = 'R';

  isActiveL = false;
  isActiveR = true;

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyPr = event.keyCode;
      if (keyPr === 32) {
        this.isActiveL = !this.isActiveL;
        this.isActiveR = !this.isActiveR;
      }
  }
}
