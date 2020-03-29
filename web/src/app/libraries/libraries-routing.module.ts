import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderDetailComponent } from './components/folder-detail/folder-detail.component';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { LibrariesComponent } from './libraries.component';
import { LibraryListComponent } from './components/library-list/library-list.component';

const routes: Routes = [
  {
    path: '', component: LibrariesComponent, children: [
      { path: '', component: LibraryListComponent },
      { path: ':libraryId/folders', component: FolderListComponent },
      { path: ':libraryId/folders/:folderId', component: FolderDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariesRoutingModule {
}
