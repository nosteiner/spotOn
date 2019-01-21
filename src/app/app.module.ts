import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import { VideoComponent } from './Components/video/video.component';
import { SpotComponent } from './Components/spot/spot.component';
import { CanvasComponent } from './Components/canvas/canvas.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { LensComponent } from './Components/lens/lens.component';


@NgModule({
  declarations: [
    AppComponent,
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
