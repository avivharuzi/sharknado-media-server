import { Application } from 'express';

import * as BrowseRouter from './modules/Browse/BrowseRouter';
import * as LibraryRouter from './modules/Library/LibraryRouter';
import * as StreamRouter from './modules/Stream/StreamRouter';

export default (app: Application) => {
  app.use('/browse', BrowseRouter.router);
  app.use('/stream', StreamRouter.router);
  app.use('/libraries', LibraryRouter.router);
};
