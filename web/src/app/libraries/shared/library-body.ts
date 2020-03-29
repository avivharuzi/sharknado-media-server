import { LibraryType } from './library-type.enum';

export interface LibraryBody {
  name: string;
  type: LibraryType;
  paths: string[];
}
