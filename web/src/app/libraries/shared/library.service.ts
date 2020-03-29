import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Folder } from './folder';
import { Library } from './library';
import { LibraryBody } from './library-body';
import { LibraryType } from './library-type.enum';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly url: string = `${environment.baseApiUrl}/libraries`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getLibraries(): Observable<Library[]> {
    return this.httpClient.get<Library[]>(this.url);
  }

  getLibrary(libraryId: string): Observable<Library> {
    return this.httpClient.get<Library>(`${this.url}/${libraryId}`);
  }

  createLibrary(libraryBody: LibraryBody): Observable<Library> {
    return this.httpClient.post<Library>(this.url, libraryBody);
  }

  deleteLibrary(libraryId: string): Observable<Library> {
    return this.httpClient.delete<Library>(`${this.url}/${libraryId}`);
  }

  getLibraryFolders(libraryId: string): Observable<Folder[]> {
    return this.httpClient.get<Folder[]>(`${this.url}/${libraryId}/folders`);
  }

  getLibraryFolder(libraryId: string, folderId: string): Observable<Folder> {
    return this.httpClient.get<Folder>(`${this.url}/${libraryId}/folders/${folderId}`);
  }

  getLibraryIcon(type: LibraryType): string {
    switch (type) {
      case LibraryType.Video:
        return 'videocam';
      case LibraryType.Photo:
        return 'photo_camera';
      case LibraryType.Audio:
        return 'music_note';
      default:
        return '';
    }
  }
}
