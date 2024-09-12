import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany();
      res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
