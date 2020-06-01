import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';

import { Folder } from '../../../libraries/shared/folder';
import { StreamPipe } from '../../pipes/stream.pipe';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioListComponent implements OnInit {
  @Input() folder: Folder;

  playlist: Track[];

  constructor(
    private streamPipe: StreamPipe,
  ) {
  }

  ngOnInit(): void {
    this.playlist = this.folder.files.map(file => {
      return {
        title: file.metadata.name,
        link: this.streamPipe.transform(file.metadata.path, 'audio'),
      };
    });
  }
}
