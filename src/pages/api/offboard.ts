import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { offboardDate } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      // Update customer with the offboard date
      await prisma.customer.update({
        where: { id },
        data: { offboardDate: new Date(offboardDate) },
      });

      res.status(200).json({ message: 'Customer offboarded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to offboard customer' });
    }
  } else {
    res.status(405).end();
  }
}
