import { Router } from 'express';

import { LibraryHandler } from './LibraryHandler';

const router: Router = Router();

router.get('/', LibraryHandler.index);
router.get('/:id', LibraryHandler.show);
router.post('/', LibraryHandler.create);

export {
  router,
};
