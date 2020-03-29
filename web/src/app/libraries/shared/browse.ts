import { BrowseFile } from './browse-file';
import { BrowsePath } from './browse-path';

export interface Browse {
  size: number;
  paths: BrowsePath[];
  files: BrowseFile[];
}
