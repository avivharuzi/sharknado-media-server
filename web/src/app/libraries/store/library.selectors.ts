import { createSelector } from '@ngrx/store';

import * as fromLibrary from './library.reducer';
import { AppState } from '../../store/app.reducer';

export const selectLibrary = (state: AppState) => state.library;

export const selectLibraries = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.libraries,
);

export const selectFolders = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.folders,
);

export const selectFolder = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.folder,
);

export const selectIsLibrariesLoading = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.isLibrariesLoading,
);

export const selectIsFoldersLoading = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.isFoldersLoading,
);

export const selectIsFolderLoading = createSelector(
  selectLibrary,
  (state: fromLibrary.LibraryState) => state.isFolderLoading,
);
