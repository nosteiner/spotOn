import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lens',
  templateUrl: './lens.component.html',
  styleUrls: ['./lens.component.scss']
})
export class LensComponent implements OnInit {

  constructor() { }
@Input() side: string;
@Input() isActive: boolean;

  ngOnInit() {
  }
}
