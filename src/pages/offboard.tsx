import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Customer } from '../types';
import { fetchCustomers, offboardCustomer } from '../services/api';

const Offboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [offboardDate, setOffboardDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load customers.');
      }
    };

    getCustomers();
  }, []);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffboardDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCustomerId || !offboardDate) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const isoDate = new Date(offboardDate).toISOString();
      await offboardCustomer({ id: selectedCustomerId, offboardDate: isoDate });
      alert('Customer offboarded successfully!');
      setSelectedCustomerId('');
      setOffboardDate('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while offboarding the customer.');
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg mt-8">
        <h1 className="text-2xl font-semibold mb-6">Offboard Customer</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Select Customer:</label>
            <select
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              className="border rounded-md p-2"
            >
              <option value="">--Select a Customer--</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Offboard Date:</label>
            <input
              type="date"
              value={offboardDate}
              onChange={handleDateChange}
              required
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Offboard;
