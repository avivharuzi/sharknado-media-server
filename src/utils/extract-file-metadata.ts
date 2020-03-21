import * as ffprobe from 'ffprobe';
import * as ffprobeStatic from 'ffprobe-static';
import * as path from 'path';

import { FileMetadata } from '../modules/Shared/FileMetadata';

export default async (filePath: string): Promise<FileMetadata> => {
  const parse = path.parse(filePath);

  const info = await ffprobe(filePath, {
    path: ffprobeStatic.path,
  });

  return {
    path: filePath,
    root: parse.root,
    dir: parse.dir,
    base: parse.base,
    ext: parse.ext,
    name: parse.name,
    info,
  };
}
