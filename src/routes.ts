import { Application } from 'express';

import * as BrowseRouter from './modules/Browse/BrowseRouter';

export default (app: Application) => {
  app.use('/browse', BrowseRouter.router);
};
