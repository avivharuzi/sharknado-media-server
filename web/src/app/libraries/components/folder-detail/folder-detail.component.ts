import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as LibraryActions from './../../store/library.actions';
import * as LibrarySelectors from './../../store/library.selectors';
import { AppState } from '../../../store/app.reducer';
import { Folder } from '../../shared/folder';
import { LibraryType } from '../../shared/library-type.enum';

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderDetailComponent implements OnInit {
  libraryId: string;
  folderId: string;

  folder$: Observable<Folder>;
  isFolderLoading$: Observable<boolean>;

  LibraryType = LibraryType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.folder$ = this.store.select(LibrarySelectors.selectFolder);
    this.isFolderLoading$ = this.store.select(LibrarySelectors.selectIsFolderLoading);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.libraryId = params.libraryId;
      this.folderId = params.folderId;

      this.loadFolder();
    });
  }

  loadFolder(): void {
    this.store.dispatch(LibraryActions.loadFolder({ libraryId: this.libraryId, folderId: this.folderId }));
  }
}
