// src/utils/logger.ts

import pino from 'pino';
import pinoPrismaTransport from './pino-prisma-transport';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino(
  {
    level: isProduction ? 'info' : 'debug',
    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          // Be cautious with req.body to avoid logging sensitive data
        };
      },
    },
  },
  pinoPrismaTransport()
);

export default logger;
