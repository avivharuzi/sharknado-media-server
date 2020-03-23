import { Application, Router } from 'express';

import * as BrowseRouter from './modules/Browse/BrowseRouter';
import * as LibraryRouter from './modules/Library/LibraryRouter';
import * as StreamRouter from './modules/Stream/StreamRouter';

const apiRouter: Router = Router();

apiRouter.use('/browse', BrowseRouter.router);
apiRouter.use('/stream', StreamRouter.router);
apiRouter.use('/libraries', LibraryRouter.router);

export default (app: Application) => {
  app.use('/api', apiRouter);
};
