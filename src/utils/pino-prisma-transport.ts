// src/utils/pino-prisma-transport.ts

import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary
import { Transform } from 'stream';

interface LogObject {
  level: number;
  time: number;
  msg: string;
  [key: string]: any;
}

export default function pinoPrismaTransport() {
  const levelMap: { [key: number]: string } = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  };

  return new Transform({
    objectMode: true,
    async transform(chunk: any, _encoding, callback) {
      try {
        const logObject: LogObject = JSON.parse(chunk.toString());
        const level = levelMap[logObject.level] || 'info';
        const message = logObject.msg;
        const timestamp = new Date(logObject.time);
        const { req, res, err, ...meta } = logObject;

        // Remove undefined or null meta properties
        Object.keys(meta).forEach((key) => {
          if (meta[key] === undefined || meta[key] === null) {
            delete meta[key];
          }
        });

        // Save the log to the database using the singleton prisma instance
        await prisma.log.create({
          data: {
            level,
            message,
            timestamp,
            meta,
          },
        });

        callback();
      } catch (error) {
        console.error('Error in pinoPrismaTransport:', error);
        callback(error as Error);
      }
    },
  });
}
