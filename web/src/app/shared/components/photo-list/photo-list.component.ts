import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Folder } from '../../../libraries/shared/folder';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent {
  @Input() folder: Folder;
}
