// compression.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as zlib from 'zlib';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalEnd = res.end;
    const stream = zlib.createGzip();

    res.setHeader('Content-Encoding', 'gzip');

    stream.on('data', (chunk) => {
      originalEnd.call(res, chunk); // Passing the chunk to originalEnd
    });

    stream.on('end', () => {
      originalEnd.call(res); // Calling originalEnd without a chunk
    });

    res.end = function (data?: any) {
      if (data) {
        stream.write(data);
      }
      stream.end();
      return res; // Returning the response object
    };

    next();
  }
}
