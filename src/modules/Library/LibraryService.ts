import { getRepository } from 'typeorm';

import * as entity from './../../entity';
import * as joiSchemas from './../../joi-schemas';
import * as utils from './../../utils';
import { LibraryCreator } from './Shared/LibraryCreator';

export class LibraryService {
  static async getAll(): Promise<entity.Library[]> {
    const libraryRepository = getRepository(entity.Library);

    return libraryRepository.find();
  }

  static async getById(libraryId: string): Promise<entity.Library> {
    const libraryRepository = getRepository(entity.Library);

    return libraryRepository.findOneOrFail(libraryId);
  }

  static async create(body: string): Promise<entity.Library> {
    const { name, type, paths } = await utils.validateJoiSchema(body, joiSchemas.libraryBodySchema);

    const libraryCreator = new LibraryCreator(name, type, paths);

    return libraryCreator.create();
  }

  static async destroy(libraryId: string): Promise<entity.Library> {
    const libraryRepository = getRepository(entity.Library);
    const folderRepository = getRepository(entity.Folder);
    const fileRepository = getRepository(entity.File);
    const metadataRepository = getRepository(entity.Metadata);

    const library = await libraryRepository.findOneOrFail(libraryId, { relations: ['folders'] });

    const folderIds = library.folders.map(folder => folder.id);

    const folders = await folderRepository.findByIds(
      folderIds,
      { relations: ['files', 'files.metadata'] },
    );
    const fileIds = [];
    const metadataIds = [];

    folders.forEach(folder => {
      folder.files.forEach(file => {
        fileIds.push(file.id);
        metadataIds.push(file.metadata.id);
      });
    });

    await fileRepository.delete(fileIds);
    await metadataRepository.delete(metadataIds);
    await folderRepository.delete(folderIds);
    await libraryRepository.delete(library.id);

    return library;
  }

  static async folders(libraryId: string): Promise<entity.Folder[]> {
    const folderRepository = getRepository(entity.Folder);

    return folderRepository.find({
      where: {
        library: {
          id: libraryId,
        },
      },
    });
  }

  static async folder(libraryId: string, folderId: string): Promise<entity.Folder> {
    const folderRepository = getRepository(entity.Folder);

    return folderRepository.findOneOrFail(
      folderId,
      {
        relations: ['library', 'files', 'files.metadata'], where: {
          library: {
            id: libraryId,
          },
        },
      },
    );
  }
}
