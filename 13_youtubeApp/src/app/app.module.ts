import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { YoutubeService } from './services/youtube.service';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';
import { YoutubePipe } from './pipes/youtube.pipe';
import { DomSecurePipe } from './pipes/dom-secure.pipe';
import { LanguageConfigModule } from './language-config.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    YoutubeVideoComponent,
    DomSecurePipe,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LanguageConfigModule.forRoot(['es', 'eu', 'en'], 'es')
  ],
  exports: [LanguageConfigModule],
  providers: [ YoutubeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
