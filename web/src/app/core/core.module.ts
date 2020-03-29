import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { LibrariesModule } from '../libraries/libraries.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LibrariesModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    SidenavComponent,
  ],
})
export class CoreModule {
}
