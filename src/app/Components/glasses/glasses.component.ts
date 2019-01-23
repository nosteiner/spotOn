import { Component, OnInit, HostListener } from '@angular/core';
import { GlassesService } from 'src/app/Services/glasses.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.scss']
})
export class GlassesComponent implements OnInit {

  constructor(private glassesService: GlassesService) { }
  L = false;
  R = true;

  isActiveL = false;
  isActiveR = true;

  ngOnInit() {
    // this.glassesService.postGlasses();
    this.glassesService.getGlasses();

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
