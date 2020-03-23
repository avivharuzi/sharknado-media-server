import { Router } from 'express';

import { StreamHandler } from './StreamHandler';

const router: Router = Router();

router.get('/video/:key', StreamHandler.video);
router.get('/photo/:key', StreamHandler.photo);
router.get('/audio/:key', StreamHandler.audio);

export {
  router,
};
