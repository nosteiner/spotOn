import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() { }

  @Input() videoId: string;
  ngOnInit() {
    // this.initCamera();
  }

  initCamera() {

    const video = document.parentElement.querySelector('video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
      }).catch(error => console.error('getUserMedia() error:', error));
    }
  }
}
