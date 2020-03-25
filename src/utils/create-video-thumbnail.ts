import * as fse from 'fs-extra';
import * as getVideoDimensions from 'get-video-dimensions';
import * as mimeTypes from 'mime-types';
import * as path from 'path';
import * as sharp from 'sharp';
import * as thumbsupply from 'thumbsupply';
import * as uuid from 'uuid';

export default async (
  filePath: string,
  destinationDir: string,
  timestamp: string = '50%',
): Promise<string> => {
  const fileName = uuid.v1();

  const dimensions = await getVideoDimensions(filePath);
  const mimeType = mimeTypes.lookup(filePath);

  const tempFile = await thumbsupply.generateThumbnail(filePath, {
    size: {
      name: `${dimensions.height}p`,
      width: dimensions.width,
      height: dimensions.height,
    },
    timestamp: timestamp,
    forceCreate: true,
    mimetype: mimeType,
  });

  const tempFileExtension = path.parse(tempFile).ext;
  const targetFilePath = path.join(destinationDir, `${fileName}${tempFileExtension}`);

  await sharp(tempFile).webp({ quality: 50 }).toFile(targetFilePath);
  await fse.unlink(tempFile);

  return targetFilePath;
}
