import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';

import { BrowseComponent } from './shared/components/browse/browse.component';
import { FolderDetailComponent } from './components/folder-detail/folder-detail.component';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { FormsModule } from '@angular/forms';
import { LibrariesComponent } from './libraries.component';
import { LibrariesRoutingModule } from './libraries-routing.module';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { LibraryNewComponent } from './components/library-new/library-new.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BrowseComponent,
    FolderDetailComponent,
    FolderListComponent,
    LibrariesComponent,
    LibraryListComponent,
    LibraryNewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LibrariesRoutingModule,
    ModalModule.forRoot(),
    SharedModule,
  ],
  exports: [
    LibraryNewComponent,
  ],
})
export class LibrariesModule {
}
