import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LibraryActions from './../../store/library.actions';
import { AddLibraryStep } from '../../shared/add-library-step.enum';
import { AppState } from '../../../store/app.reducer';
import { BrowseComponent } from '../../shared/components/browse/browse.component';
import { LibraryService } from '../../shared/library.service';
import { LibraryType } from '../../shared/library-type.enum';

@Component({
  selector: 'app-library-new',
  templateUrl: './library-new.component.html',
  styleUrls: ['./library-new.component.scss'],
})
export class LibraryNewComponent {
  @ViewChild('browseComponent', { static: false }) browseComponent: BrowseComponent;

  modalRefAddLibrary: BsModalRef;
  modalRefBrowse: BsModalRef;

  currentStep: AddLibraryStep;

  AddLibraryStep = AddLibraryStep;
  LibraryType = LibraryType;

  type: LibraryType;
  name: string;
  paths: string[];

  loading: boolean;
  errorMessage: string;

  constructor(
    private libraryService: LibraryService,
    private modalService: BsModalService,
    private store: Store<AppState>,
  ) {
    this.goToStepSelectType();
    this.paths = [];
    this.selectType(LibraryType.Video);
    this.loading = false;
  }

  selectType(type: LibraryType) {
    this.type = type;
  }

  goToStepSelectType(): void {
    this.currentStep = AddLibraryStep.SelectType;
  }

  goToStepAddFolders(): void {
    this.currentStep = AddLibraryStep.AddFolders;
  }

  openModalAddLibrary(template: TemplateRef<any>) {
    this.modalRefAddLibrary = this.modalService.show(template, { class: 'modal-lg' });

    this.modalService.config.keyboard = false;
  }

  openModalBrowse(template: TemplateRef<any>) {
    this.modalRefBrowse = this.modalService.show(template);
  }

  addPath(path: string): void {
    if (path) {
      this.paths.push(path);
    }

    this.modalRefBrowse.hide();
  }

  removePath(i: number): void {
    this.paths.splice(i, 1);
  }

  createLibrary(): void {
    const name = this.name;
    const type = this.type;
    const paths = this.paths;

    this.loading = true;

    this.libraryService.createLibrary({
      name,
      type,
      paths,
    }).subscribe(library => {
      this.store.dispatch(LibraryActions.addLibrary({ library }));
      this.errorMessage = null;
      this.loading = false;
      this.modalRefAddLibrary.hide();
      this.reset();
    }, err => {
      this.errorMessage = err.error.message;
      this.loading = false;
    });
  }

  private reset(): void {
    this.name = '';
    this.type = LibraryType.Video;
    this.paths = [];
  }
}
