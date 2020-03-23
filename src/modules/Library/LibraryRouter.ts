import { Router } from 'express';

import { LibraryHandler } from './LibraryHandler';

const router: Router = Router();

router.get('/', LibraryHandler.index);
router.get('/:libraryId', LibraryHandler.show);
router.post('/', LibraryHandler.create);
router.delete('/:libraryId', LibraryHandler.destroy);
router.get('/:libraryId/folders', LibraryHandler.folders);
router.get('/:libraryId/folders/:folderId', LibraryHandler.folder);

export {
  router,
};
