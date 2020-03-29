import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as LibrarySelectors from './../../../../libraries/store/library.selectors';
import { AppState } from '../../../../store/app.reducer';
import { Library } from '../../../../libraries/shared/library';
import { LibraryService } from '../../../../libraries/shared/library.service';
import { LibraryType } from '../../../../libraries/shared/library-type.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  libraries$: Observable<Library[]>;

  constructor(
    private store: Store<AppState>,
    private libraryService: LibraryService,
  ) {
    this.libraries$ = this.store.select(LibrarySelectors.selectLibraries);
  }

  getLibraryIcon(type: LibraryType): string {
    return this.libraryService.getLibraryIcon(type);
  }
}
