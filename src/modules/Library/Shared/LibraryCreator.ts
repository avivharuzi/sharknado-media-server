import * as fastGlob from 'fast-glob';
import { getRepository } from 'typeorm';

import * as entity from './../../../entity';
import * as utils from './../../../utils';
import fileExtensions from './../../Shared/file-extensions';
import { LibraryType } from './LibraryType';

export class LibraryCreator {
  name: string;
  slug: string;
  type: LibraryType;
  paths: string[];

  constructor(name: string, type: LibraryType, paths: string[]) {
    this.name = name;
    this.slug = utils.slugify(name);
    this.type = type;
    this.paths = paths;
  }

  async create(): Promise<entity.Library> {
    const libraryRepository = getRepository(entity.Library);

    const folders = await this.createFolders();

    // Save library in DB.
    const library = new entity.Library();
    library.name = this.name;
    library.slug = this.slug;
    library.type = this.type;
    library.folders = folders;
    const newLibrary = await libraryRepository.save(library);

    return libraryRepository.findOne(newLibrary.id, { relations: ['folders'] });
  }

  private async createFolders(): Promise<entity.Folder[]> {
    const folderRepository = getRepository(entity.Folder);

    const folders: entity.Folder[] = [];

    for (const path of this.paths) {
      const filePaths = await this.getFilePaths(path);
      const files = await this.createFiles(filePaths);

      // Save folder in DB.
      const folder = new entity.Folder();
      folder.path = path;
      folder.files = files;
      await folderRepository.save(folder);

      folders.push(folder);
    }

    return folders;
  }

  private async createFiles(filePaths: string[]): Promise<entity.File[]> {
    const fileRepository = getRepository(entity.File);
    const metadataRepository = getRepository(entity.Metadata);

    const files: entity.File[] = [];

    for (const filePath of filePaths) {
      const fileMetadata = await utils.extractFileMetadata(filePath);
      const name = utils.trimFileName(fileMetadata.name);
      const slug = utils.slugify(name);
      const cover = null;

      // Save metadata in DB.
      const metadata = new entity.Metadata();
      metadata.path = filePath;
      metadata.root = fileMetadata.root;
      metadata.dir = fileMetadata.dir;
      metadata.base = fileMetadata.base;
      metadata.ext = fileMetadata.ext;
      metadata.name = fileMetadata.name;
      metadata.info = fileMetadata.info;
      await metadataRepository.save(metadata);

      // Save file in DB.
      const file = new entity.File();
      file.name = name;
      file.slug = slug;
      file.cover = cover;
      file.metadata = metadata;
      await fileRepository.save(file);

      files.push(file);
    }

    return files;
  }

  private async getFilePaths(path: string): Promise<string[]> {
    const patterns = this.getPatterns(path);

    return await fastGlob(patterns);
  }

  private getPatterns(path: string): string[] {
    let extensions: string[];

    switch (this.type) {
      case LibraryType.Video:
        extensions = fileExtensions.VIDEO;
        break;
      case LibraryType.Audio:
        extensions = fileExtensions.AUDIO;
        break;
      case LibraryType.Photo:
        extensions = fileExtensions.PHOTO;
        break;
      default:
        throw new Error('LibraryType does not exist');
    }

    const patterns: string[] = [];

    for (const extension of extensions) {
      patterns.push(`${path}/**/*${extension}`);
    }

    return patterns;
  }
}
