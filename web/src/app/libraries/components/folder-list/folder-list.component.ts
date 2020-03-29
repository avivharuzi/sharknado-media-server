import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as LibraryActions from './../../store/library.actions';
import * as LibrarySelectors from './../../store/library.selectors';
import { AppState } from '../../../store/app.reducer';
import { Folder } from '../../shared/folder';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent implements OnInit {
  libraryId: string;
  folders$: Observable<Folder[]>;
  isFoldersLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.folders$ = this.store.select(LibrarySelectors.selectFolders);
    this.isFoldersLoading$ = this.store.select(LibrarySelectors.selectIsFoldersLoading);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.libraryId = params.libraryId;
      this.loadFolders();
    });
  }

  loadFolders(): void {
    this.store.dispatch(LibraryActions.loadFolders({ libraryId: this.libraryId }));
  }
}
