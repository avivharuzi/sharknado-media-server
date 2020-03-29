import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Browse } from './browse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private readonly url: string = `${environment.baseApiUrl}/browse`;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getBrowseRoot(includingFiles: boolean = true): Observable<Browse> {
    return this.httpClient.get<Browse>(`${this.url}?includingFiles=${includingFiles}`);
  }

  getBrowse(key: string, includingFiles: boolean = true): Observable<Browse> {
    return this.httpClient.get<Browse>(`${this.url}/${key}?includingFiles=${includingFiles}`);
  }
}
