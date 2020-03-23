import * as path from 'path';
import * as utils from '../../../utils';
import { getRepository } from 'typeorm';

import * as entity from './../../../entity';
import { FoldersCreateBehavior } from './FoldersCreateBehavior';
import { LibraryCreator } from './LibraryCreator';

export class GroupFolders implements FoldersCreateBehavior {
  async create(libraryCreator: LibraryCreator): Promise<entity.Folder[]> {
    const folderRepository = getRepository(entity.Folder);
    const folders: entity.Folder[] = [];

    for (const libraryPath of libraryCreator.paths) {
      const filePaths = await libraryCreator.getFilePaths(libraryPath);

      const filesDictionary: { [key: string]: string[] } = {};

      filePaths.map(filePath => {
        const dirname = path.dirname(filePath);

        if (filesDictionary.hasOwnProperty(dirname)) {
          filesDictionary[dirname].push(filePath);
        } else {
          filesDictionary[dirname] = [filePath];
        }
      });

      for (const [dirname, dictionaryFilePaths] of Object.entries(filesDictionary)) {
        const files = await libraryCreator.createFiles(dictionaryFilePaths);

        const title = path.basename(dirname);
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
