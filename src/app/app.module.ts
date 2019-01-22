import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import { VideoComponent } from './Components/video/video.component';
import { CanvasComponent } from './Components/canvas/canvas.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { LensComponent } from './Components/lens/lens.component';
import { GlassesComponent } from './Components/glasses/glasses.component';
import { VideoCanvasComponent } from './Components/video-canvas/video-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    CanvasComponent,
    SettingsComponent,
    LensComponent,
    GlassesComponent,
    VideoCanvasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    WebcamModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
