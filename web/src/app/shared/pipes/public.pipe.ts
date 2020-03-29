import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

@Pipe({
  name: 'public',
})
export class PublicPipe implements PipeTransform {
  transform(fileName: string, prefix: string): string {
    return `${environment.basePublicUrl}/${prefix}/${fileName}`;
  }
}
