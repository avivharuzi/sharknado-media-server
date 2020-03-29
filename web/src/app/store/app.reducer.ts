import { ActionReducerMap } from '@ngrx/store';

import * as fromLibrary from './../libraries/store/library.reducer';

export interface AppState {
  library: fromLibrary.LibraryState;
}

export const appReducer: ActionReducerMap<AppState> = {
  library: fromLibrary.reducer,
};
