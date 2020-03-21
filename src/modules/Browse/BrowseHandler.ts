import { Request, Response } from 'express';

import { BrowseService } from './BrowseService';

export class BrowseHandler {
  static index(withKey: boolean = false) {
    return async (req: Request, res: Response): Promise<void> => {
      const includingFiles = !!req.query.includingFiles;

      try {
        const startPath = withKey ? decodeURIComponent(req.params.key) : '/';

        const browse = await BrowseService.getBrowse(startPath, includingFiles);

        res.send(browse);
      } catch (e) {
        console.log('error: ', e);

        res.send({}); // TODO:: Return real error.
      }
    };
  }
}
