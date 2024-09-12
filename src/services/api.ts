// src/services/api.ts

import { Customer } from '../types';

const API_URL = 'http://localhost:3000'; // Adjust if needed

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_URL}/api/customers`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
  return response.json();
};

export const offboardCustomer = async ({ id, offboardDate }: { id: string, offboardDate: string }) => {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ offboardDate }),
    });

    if (!response.ok) {
      throw new Error('Failed to offboard customer');
    }

    return response.json();
  };
