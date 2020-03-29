import { createAction, props } from '@ngrx/store';

import { Folder } from '../shared/folder';
import { Library } from '../shared/library';

export const addLibrary = createAction('[Library] Add Library', props<{ library: Library }>());

export const loadLibraries = createAction('[Library] Load Libraries');
export const librariesLoaded = createAction('[Library] Libraries Loaded', props<{ libraries: Library[] }>());

export const loadFolders = createAction('[Library] Load Folders', props<{ libraryId: string }>());
export const foldersLoaded = createAction('[Library] Folders Loaded', props<{ folders: Folder[] }>());

export const loadFolder = createAction('[Library] Load Folder', props<{ libraryId: string, folderId: string }>());
export const folderLoaded = createAction('[Library] Folder Loaded', props<{ folder: Folder }>());
