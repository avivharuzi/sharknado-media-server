import * as fse from 'fs-extra';

export default async (filePaths: string[]): Promise<void> => {
  for (const filePath of filePaths) {
    await fse.unlink(filePath);
  }
};
