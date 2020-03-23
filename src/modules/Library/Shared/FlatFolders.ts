import * as path from 'path';
import { getRepository } from 'typeorm';

import * as entity from './../../../entity';
import * as utils from '../../../utils';
import { FoldersCreateBehavior } from './FoldersCreateBehavior';
import { LibraryCreator } from './LibraryCreator';

export class FlatFolders implements FoldersCreateBehavior {
  async create(libraryCreator: LibraryCreator): Promise<entity.Folder[]> {
    const folderRepository = getRepository(entity.Folder);
    const folders: entity.Folder[] = [];

    for (const libraryPath of libraryCreator.paths) {
      const filePaths = await libraryCreator.getFilePaths(libraryPath);

      for (const filePath of filePaths) {
        const files = await libraryCreator.createFiles([filePath]);

        const fileParse = path.parse(filePath);

        const title = utils.trimFileName(fileParse.name);
        const slug = utils.slugify(title);

        // Save folder in DB.
        const folder = new entity.Folder();
        folder.title = title;
        folder.slug = slug;
        folder.summary = null;
        folder.poster = null;
        folder.background = null;
        folder.files = files;
        await folderRepository.save(folder);

        folders.push(folder);
      }
    }

    return folders;
  }
}
