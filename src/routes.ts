import { Application } from 'express';

import * as BrowseRouter from './modules/Browse/BrowseRouter';
import * as LibraryRouter from './modules/Library/LibraryRouter';

export default (app: Application) => {
  app.use('/browse', BrowseRouter.router);
  app.use('/libraries', LibraryRouter.router);
};
