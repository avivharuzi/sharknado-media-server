import * as path from 'path';
import { getRepository } from 'typeorm';

import * as entity from './../../../entity';
import * as utils from '../../../utils';
import config from '../../../config';
import { FoldersCreateBehavior } from './FoldersCreateBehavior';
import { LibraryCreator } from './LibraryCreator';
import { LibraryType } from './LibraryType';

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
        let background = null;

        if (libraryCreator.type === LibraryType.Video) {
          try {
            const thumbnailFilePath = await utils.createVideoThumbnail(
              filePath,
              config.directory.backgrounds,
            );
            background = path.basename(thumbnailFilePath);
          } catch (_) {
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
