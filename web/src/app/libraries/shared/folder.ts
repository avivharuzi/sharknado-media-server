import { File } from './file';
import { Library } from './library';

export interface Folder {
  id: string;
  title: string;
  slug: string;
  summary: string;
  poster: string;
  background: string;
  library?: Library;
  files?: File[];
  createdAt: Date;
  updatedAt: Date;
}
