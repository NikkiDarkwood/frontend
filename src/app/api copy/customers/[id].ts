import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withLogging } from '@/utils/middleware'; // Adjust the import path as necessary

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Log the incoming request using req.log
  req.log.info({ method: req.method, url: req.url, params: req.query }, 'API request received');

  if (req.method === 'GET') {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: Number(id) },
      });

      if (!customer) {
        req.log.warn({ id }, 'Customer not found');
        return res.status(404).json({ message: 'Customer not found' });
      }

      req.log.info({ id }, 'Customer retrieved successfully');
      return res.status(200).json(customer);
    } catch (error) {
      req.log.error({ error, id }, 'Error fetching customer');
      return res.status(500).json({ message: 'Error fetching customer' });
    }
  } else if (req.method === 'PUT') {
    try {
      const dataToUpdate: any = {};

      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          if (key === 'onboardDate' || key === 'offboardDate') {
            dataToUpdate[key] = req.body[key] ? new Date(req.body[key]) : null;
          } else {
            dataToUpdate[key] = req.body[key];
          }
        }
      }

      const updatedCustomer = await prisma.customer.update({
        where: { id: Number(id) },
        data: dataToUpdate,
      });

      req.log.info({ id, data: dataToUpdate }, 'Customer updated successfully');
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      req.log.error({ error, id }, 'Error updating customer');
      return res.status(500).json({ message: 'Error updating customer' });
    }
  } else {
    req.log.warn({ method: req.method }, 'Method not allowed');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Export the handler wrapped with withLogging
export default withLogging(handler);
