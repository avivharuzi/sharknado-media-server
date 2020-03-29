import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as LibraryActions from './library.actions';
import { LibraryService } from '../shared/library.service';

@Injectable({
  providedIn: 'root',
})
export class LibraryEffects {
  loadLibraries$ = createEffect(() => this.actions$.pipe(
    ofType(LibraryActions.loadLibraries),
    mergeMap(() => this.libraryService.getLibraries()
      .pipe(
        map(libraries => (LibraryActions.librariesLoaded({ libraries }))),
        catchError(() => EMPTY),
      )),
    ),
  );

  loadFolders$ = createEffect(() => this.actions$.pipe(
    ofType(LibraryActions.loadFolders),
    mergeMap(({ libraryId }) => this.libraryService.getLibraryFolders(libraryId)
      .pipe(
        map(folders => (LibraryActions.foldersLoaded({ folders }))),
        catchError(() => EMPTY),
      )),
    ),
  );

  loadFolder$ = createEffect(() => this.actions$.pipe(
    ofType(LibraryActions.loadFolder),
    mergeMap(({ libraryId, folderId }) => this.libraryService.getLibraryFolder(libraryId, folderId)
      .pipe(
        map(folder => (LibraryActions.folderLoaded({ folder }))),
        catchError(() => EMPTY),
      )),
    ),
  );

  constructor(
    private actions$: Actions,
    private libraryService: LibraryService,
  ) {
  }
}
