import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

@Pipe({
  name: 'stream',
})
export class StreamPipe implements PipeTransform {
  transform(path: string, type: string): string {
    const key = encodeURIComponent(path);
    return `${environment.baseApiUrl}/stream/${type}/${key}`;
  }
}
