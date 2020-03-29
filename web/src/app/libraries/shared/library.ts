import { LibraryType } from './library-type.enum';

export interface Library {
  id: string;
  name: string;
  slug: string;
  type: LibraryType;
  paths: string[];
  createdAt: Date;
  updatedAt: Date;
}
