import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withLogging } from '@/utils/middleware';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {

  req.log.info({ method: req.method, url: req.url }, 'API request received');

  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany();
      req.log.info({ count: customers.length }, 'Customers retrieved successfully');
      res.status(200).json(customers);
    } catch (error) {
      req.log.error({ error }, 'Failed to fetch customers');
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  } else {
    req.log.warn({ method: req.method }, 'Method not allowed');
    res.status(405).end();
  }
}

export default withLogging(handler);
