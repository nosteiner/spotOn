import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadImgComponent } from './Components/upload-img/upload-img.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';
import { VideoComponent } from './Components/video/video.component';
import { SpotComponent } from './Components/spot/spot.component';
import { CanvasComponent } from './Components/canvas/canvas.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { LensComponent } from './Components/lens/lens.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadImgComponent,
    VideoComponent,
    SpotComponent,
    CanvasComponent,
    SettingsComponent,
    LensComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    WebcamModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
