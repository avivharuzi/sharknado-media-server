import { Router } from 'express';

import { BrowseHandler } from './BrowseHandler';

const router: Router = Router();

router.get('/', BrowseHandler.index());
router.get('/:key', BrowseHandler.index(true));

export {
  router,
};
