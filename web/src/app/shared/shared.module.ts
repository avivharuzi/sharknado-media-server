import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlyrModule } from 'ngx-plyr';

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
    PlyrModule,
  ],
  exports: [
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
