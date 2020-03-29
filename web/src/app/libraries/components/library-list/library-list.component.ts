import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as LibrarySelectors from '../../store/library.selectors';
import { AppState } from '../../../store/app.reducer';
import { Library } from '../../shared/library';
import { LibraryService } from '../../shared/library.service';
import { LibraryType } from '../../shared/library-type.enum';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss'],
})
export class LibraryListComponent {
  libraries$: Observable<Library[]>;
  isLibrariesLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private libraryService: LibraryService,
  ) {
    this.libraries$ = this.store.select(LibrarySelectors.selectLibraries);
    this.isLibrariesLoading$ = this.store.select(LibrarySelectors.selectIsLibrariesLoading);
  }

  getLibraryIcon(type: LibraryType): string {
    return this.libraryService.getLibraryIcon(type);
  }
}
