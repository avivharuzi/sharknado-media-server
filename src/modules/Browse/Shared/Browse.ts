import { BrowseFile } from './BrowseFile';
import { BrowsePath } from './BrowsePath';

export interface Browse {
  size: number;
  paths: BrowsePath[];
  files: BrowseFile[];
}
