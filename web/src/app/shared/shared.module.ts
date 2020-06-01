import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { PlyrModule } from 'ngx-plyr';

import { AlertComponent } from './components/alert/alert.component';
import { AudioListComponent } from './components/audio-list/audio-list.component';
import { CardComponent } from './components/card/card.component';
import { LineClampDirective } from './directives/line-clamp.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PublicPipe } from './pipes/public.pipe';
import { SelectBigComponent } from './components/select-big/select-big.component';
import { SelectComponent } from './components/select/select.component';
import { StreamPipe } from './pipes/stream.pipe';
import { VideoListComponent } from './components/video-list/video-list.component';

@NgModule({
  declarations: [
    AlertComponent,
    AudioListComponent,
    CardComponent,
    LineClampDirective,
    LoaderComponent,
    PhotoListComponent,
    PublicPipe,
    SelectBigComponent,
    SelectComponent,
    StreamPipe,
    VideoListComponent,
  ],
  imports: [
    CommonModule,
    NgxAudioPlayerModule,
    PlyrModule,
  ],
  providers: [
    StreamPipe,
  ],
  exports: [
    AlertComponent,
    AudioListComponent,
    CardComponent,
    LineClampDirective,
    LoaderComponent,
    PhotoListComponent,
    PublicPipe,
    SelectBigComponent,
    SelectComponent,
    StreamPipe,
    VideoListComponent,
  ],
})
export class SharedModule {
}
