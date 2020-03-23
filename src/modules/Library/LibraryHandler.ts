import { Request, Response } from 'express';

import { LibraryService } from './LibraryService';

export class LibraryHandler {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const libraries = await LibraryService.getAll();

      res.locals.success(libraries);
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async show(req: Request, res: Response): Promise<void> {
    try {
      const libraryId = req.params.libraryId;
      const library = await LibraryService.getById(libraryId);

      res.locals.success(library);
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;
      const library = await LibraryService.create(body);

      res.locals.success(library);
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async destroy(req: Request, res: Response): Promise<void> {
    try {
      const libraryId = req.params.libraryId;

      const deletedLibrary = await LibraryService.destroy(libraryId);

      res.locals.success(deletedLibrary);
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async folders(req: Request, res: Response): Promise<void> {
    try {
      const libraryId = req.params.libraryId;
      const folders = await LibraryService.folders(libraryId);

      res.locals.success(folders);
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async folder(req: Request, res: Response): Promise<void> {
    try {
      const libraryId = req.params.libraryId;
      const folderId = req.params.folderId;
      const folder = await LibraryService.folder(libraryId, folderId);

      res.locals.success(folder);
    } catch (error) {
      res.locals.error(error);
    }
  }
}
