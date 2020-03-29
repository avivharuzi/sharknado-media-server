import { Action, createReducer, on } from '@ngrx/store';

import * as LibraryActions from './library.actions';
import { Folder } from '../shared/folder';
import { Library } from '../shared/library';

export interface LibraryState {
  libraries: Library[];
  folders: Folder[];
  folder: Folder;
  isLibrariesLoading: boolean;
  isFoldersLoading: boolean;
  isFolderLoading: boolean;
}

export const libraryInitialState: LibraryState = {
  libraries: [],
  folders: [],
  folder: null,
  isLibrariesLoading: false,
  isFoldersLoading: false,
  isFolderLoading: false,
};

const libraryReducer = createReducer(
  libraryInitialState,
  on(LibraryActions.addLibrary, (state, { library }) => {
    return {
      ...state,
      libraries: [
        ...state.libraries,
        library,
      ],
    };
  }),
  on(LibraryActions.loadLibraries, state => {
    return {
      ...state,
      isLibrariesLoading: true,
    };
  }),
  on(LibraryActions.librariesLoaded, (state, { libraries }) => {
    return {
      ...state,
      libraries: [...libraries],
      isLibrariesLoading: false,
    };
  }),
  on(LibraryActions.loadFolders, state => {
    return {
      ...state,
      isFoldersLoading: true,
    };
  }),
  on(LibraryActions.foldersLoaded, (state, { folders }) => {
    return {
      ...state,
      folders: [...folders],
      isFoldersLoading: false,
    };
  }),
  on(LibraryActions.loadFolder, state => {
    return {
      ...state,
      isFolderLoading: true,
    };
  }),
  on(LibraryActions.folderLoaded, (state, { folder }) => {
    return {
      ...state,
      folder: {
        ...folder,
      },
      isFolderLoading: false,
    };
  }),
);

export function reducer(state: LibraryState, action: Action) {
  return libraryReducer(state, action);
}
