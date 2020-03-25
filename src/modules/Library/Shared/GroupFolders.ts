import * as cpy from 'cpy';
import * as path from 'path';
import * as utils from '../../../utils';
import * as uuid from 'uuid';
import { getRepository } from 'typeorm';

import * as entity from './../../../entity';
import { FoldersCreateBehavior } from './FoldersCreateBehavior';
import { LibraryCreator } from './LibraryCreator';
import { LibraryType } from './LibraryType';
import config from '../../../config';

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
        if (dictionaryFilePaths.length === 0) {
          continue;
        }

        const files = await libraryCreator.createFiles(dictionaryFilePaths);

        const title = path.basename(dirname);
        const slug = utils.slugify(title);
        let background = null;

        if (libraryCreator.type === LibraryType.Photo) {
          try {
            const photoFilePath = dictionaryFilePaths[0];
            const photoNewFileName = `${uuid.v1()}${path.extname(photoFilePath)}`;
            await cpy(photoFilePath, config.directory.backgrounds, { rename: photoNewFileName });
            background = photoNewFileName;
          } catch (err) {
            console.log(err);
            // If there is an error do noting and insert background as null.
          }
        }

        // Save folder in DB.
        const folder = new entity.Folder();
        folder.title = title;
        folder.slug = slug;
        folder.summary = null;
        folder.poster = null;
        folder.background = background;
        folder.files = files;
        await folderRepository.save(folder);

        folders.push(folder);
      }
    }

    return folders;
  }
}
