import * as Joi from 'joi';

import { LibraryType } from '../modules/Library/Shared/LibraryType';

export default Joi.object().keys({
  name: Joi.string().min(3).max(255).required(),
  type: Joi.string().valid(LibraryType.Video, LibraryType.Audio, LibraryType.Photo).required(),
  paths: Joi.array().items(Joi.string()).required(),
});
