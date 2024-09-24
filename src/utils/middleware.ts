// src/utils/middleware.ts

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import pino from 'pino-http';
import logger from './logger'; // Use the logger we configured

export function withLogging(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    pino({ logger })(req, res);
    return handler(req, res);
  };
}
