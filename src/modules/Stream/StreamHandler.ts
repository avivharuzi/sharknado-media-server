import * as fs from 'fs';
import * as stream from 'stream';

import { Request, Response } from 'express';

export class StreamHandler {
  static audio(req: Request, res: Response): void {
    const filePath = decodeURIComponent(req.params.key);

    res.sendFile(filePath);
  }

  static photo(req: Request, res: Response): void {
    StreamHandler.streamTinyFiles(req, res);
  }

  static async video(req: Request, res: Response): Promise<void> {
    const filePath = decodeURIComponent(req.params.key);

    let fileStat;

    try {
      fileStat = await fs.promises.stat(filePath);
    } catch (error) {
      res.sendStatus(400);
      return;
    }

    let headers;
    let start;
    let end;

    const range = req.headers.range || '';
    const total = fileStat.size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];

      start = parseInt(partialStart, 10);
      end = partialEnd ? parseInt(partialEnd, 10) : total - 1;

      const chunkSize = (end - start) + 1;

      headers = {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);
    } else {
      headers = {
        'Accept-Ranges': 'bytes',
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, headers);
    }

    const fileStream = fs.createReadStream(filePath, { start: start, end: end });

    fileStream.pipe(res);
  }

  private static streamTinyFiles(req: Request, res: Response) {
    const filePath = decodeURIComponent(req.params.key);

    const r = fs.createReadStream(filePath);
    const ps = new stream.PassThrough();
    stream.pipeline(
      r,
      ps,
      (err) => {
        if (err) {
          return res.sendStatus(400);
        }
      },
    );

    ps.pipe(res);
  }
}
