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
}
