// pages/api/onboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'; // Example with Prisma

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;

        // Basic validation
        const requiredFields = [
            "name",
            "awsAccountId",
            "awsRootEmail",
            "awsAccountType",
            "awsServices",
            "onboardDate",
        ];

        if (!requiredFields.every(field => field in data) || !requiredFields.every(field => data[field] !== null && data[field] !== "")) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // Convert onboardDate to date object
            const onboardDate = new Date(data.onboardDate);

            // Add customer to the database
            await prisma.customer.create({
                data: {
                    name: data.name,
                    awsAccountId: data.awsAccountId,
                    awsRootEmail: data.awsRootEmail,
                    awsAccountType: data.awsAccountType,
                    awsServices: data.awsServices,
                    onboardDate: onboardDate,
                },
            });

            res.status(200).json({ message: 'Customer onboarded successfully' });
        } catch (error) {
            console.error('Error onboarding customer:', error);
            res.status(500).json({ error: 'An error occurred while onboarding the customer' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
