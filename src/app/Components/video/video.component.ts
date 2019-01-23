import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor() { }

  @Input() videoId: string;
  @Output() videoStream = new EventEmitter<HTMLVideoElement>();
  @ViewChild('videoElement') videoElement: any;

  video: any;

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    this.initCamera();
  }

  initCamera() {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.srcObject = stream;
        this.videoStream.emit(this.video);
        this.video.play();
      }).catch(error => console.error('getUserMedia() error:', error));
    }
  }
}
