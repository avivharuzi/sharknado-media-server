import * as entity from './../../../entity';
import { LibraryCreator } from './LibraryCreator';

export interface FoldersCreateBehavior {
  create(libraryCreator: LibraryCreator): Promise<entity.Folder[]>;
}
