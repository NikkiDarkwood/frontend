import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const prisma = new PrismaClient(); // Instantiate PrismaClient

    if (req.method === 'GET') {
      // Handle GET request to fetch a customer by ID
      try {
        const customer = await prisma.customer.findUnique({
          where: { id: Number(id) }, // Adjust to match your ID type
        });

        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }

        return res.status(200).json(customer);
      } catch (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).json({ message: 'Error fetching customer' });
      }
    }

    if (req.method === 'PUT') {
      // Handle PUT request to update a customer by ID
      const { name, awsAccountId, awsRootEmail, awsAccountType, awsServices, onboardDate } = req.body;
      try {
        const updatedCustomer = await prisma.customer.update({
          where: { id: Number(id) }, // Adjust to match your ID type
          data: {
            name,
            awsAccountId,
            awsRootEmail,
            awsAccountType,
            awsServices,
            onboardDate: new Date(onboardDate), // Ensure the date is correctly formatted
          },
        });

        return res.status(200).json(updatedCustomer);
      } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ message: 'Error updating customer' });
      }
    }

    // Return 405 if method is not allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
