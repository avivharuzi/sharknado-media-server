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

  static async getById(id: string): Promise<entity.Library> {
    const libraryRepository = getRepository(entity.Library);

    return libraryRepository.findOne(id, { relations: ['folders'] });
  }

  static async create(body: string): Promise<entity.Library> {
    const value = await utils.validateJoiSchema(body, joiSchemas.libraryBodySchema);

    const libraryCreator = new LibraryCreator(value.name, value.type, value.paths);

    return libraryCreator.create();
  }

  static async destroy(id: string): Promise<void> {
    const libraryRepository = getRepository(entity.Library);
    const folderRepository = getRepository(entity.Folder);
    const fileRepository = getRepository(entity.File);
    const metadataRepository = getRepository(entity.Metadata);

    const library = await LibraryService.getById(id);

    const folderIds = library.folders.map(folder => folder.id);

    const folders = await folderRepository.findByIds(folderIds, { relations: ['files', 'files.metadata'] });
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
  }
}
