import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Folder } from '../../../libraries/shared/folder';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  @Input() folder: Folder;
}
