import * as fs from 'fs';
import * as path from 'path';

import { Browse } from './Shared/Browse';

export class BrowseService {
  static async getBrowse(startPath: string = '/', includingFiles: boolean = true): Promise<Browse> {
    const browse: Browse = {
      size: 0,
      paths: [],
      files: [],
    };

    const directories = await fs.promises.readdir(path.join(startPath));

    for (const directory of directories) {
      const directoryPath = path.join(startPath, directory);

      let stat;

      try {
        stat = await fs.promises.lstat(directoryPath);
      } catch (_) {
        // Probably the directory does not exist anymore...
        continue;
      }

      // In case we don't want to include files.
      if (!stat.isDirectory() && !includingFiles) {
        continue;
      }

      try {
        await fs.promises.access(directoryPath, fs.constants.R_OK);
      } catch (_) {
        // Directory or file is not readable...
        continue;
      }

      browse.size++;

      const title = path.basename(directoryPath);
      const key = encodeURIComponent(directoryPath);

      const browseCommonProperties = {
        path: directoryPath,
        title,
      };

      if (stat.isDirectory()) {
        browse.paths.push({ ...browseCommonProperties, key });
      } else {
        browse.files.push({ ...browseCommonProperties });
      }
    }

    return browse;
  }
}
