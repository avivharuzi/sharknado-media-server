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
      const id = req.params.id;
      const library = await LibraryService.getById(id) || {};

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
}
