import { Folder } from './folder';
import { Metadata } from './metadata';

export interface File {
  id: string;
  folder?: Folder;
  metadata?: Metadata;
  createdAt: Date;
  updatedAt: Date;
}
