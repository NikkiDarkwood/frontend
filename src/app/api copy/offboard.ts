import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withLogging } from '@/utils/middleware'; // Import your logging middleware

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Log the incoming request
  req.log.info({ method: req.method, url: req.url, params: req.query }, 'API request received');

  if (req.method === 'PUT') {
    try {
      const { offboardDate } = req.body;

      if (!id || typeof id !== 'string') {
        req.log.warn({ id }, 'Invalid ID provided');
        return res.status(400).json({ error: 'Invalid ID' });
      }

      // Update customer with the offboard date
      await prisma.customer.update({
        where: { id: Number(id) },
        data: { offboardDate: new Date(offboardDate) },
      });

      req.log.info({ id }, 'Customer offboarded successfully');
      res.status(200).json({ message: 'Customer offboarded successfully' });
    } catch (error) {
      req.log.error({ error, id }, 'Failed to offboard customer');
      res.status(500).json({ error: 'Failed to offboard customer' });
    }
  } else {
    req.log.warn({ method: req.method }, 'Method not allowed');
    res.status(405).end();
  }
}

export default withLogging(handler);
