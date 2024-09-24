import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Customer } from '../types';
import { fetchCustomers, offboardCustomer } from '../services/api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

const Offboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [offboardDate, setOffboardDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  const handleCustomerChange = (event: any, value: Customer | null) => {
    setSelectedCustomer(value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffboardDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCustomer || !offboardDate) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const isoDate = new Date(offboardDate).toISOString();
      await offboardCustomer({ id: selectedCustomer.id.toString(), offboardDate: isoDate });
      alert('Customer offboarded successfully!');
      setSelectedCustomer(null);
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
            <Autocomplete
              options={customers}
              getOptionLabel={(customer) =>
                `${customer.name} (ID: ${customer.awsAccountId}, Email: ${customer.awsRootEmail})`
              }
              onChange={handleCustomerChange}
              value={selectedCustomer}
              loading={loading}
              filterOptions={(options, { inputValue }) => {
                return options.filter(
                  (customer) =>
                    customer.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                    customer.awsRootEmail.toLowerCase().includes(inputValue.toLowerCase()) ||
                    customer.awsAccountId.includes(inputValue)
                );
              }}
              renderOption={(props, option) => (
                <li {...props}>
                    <span className="font-bold">{option.name}</span>
                  <span className="ml-2">{' (ID: '}{option.awsAccountId}, Email: {option.awsRootEmail}</span>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by name, email, or AWS Account ID"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
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
