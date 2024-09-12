import React, { useState } from 'react';
import Layout from '../components/Layout';

interface CustomerFormData {
  name: string;
  awsAccountId: string;
  awsRootEmail: string;
  awsAccountType: 'Organization' | 'Standalone';
  awsServices: string[];
  onboardDate: string;
}

const Onboard: React.FC = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    awsAccountId: '',
    awsRootEmail: '',
    awsAccountType: 'Standalone',
    awsServices: [],
    onboardDate: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, onboardDate: e.target.value });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const updatedServices = checked
        ? [...prevData.awsServices, value]
        : prevData.awsServices.filter(service => service !== value);
      return { ...prevData, awsServices: updatedServices };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (!formData.name || !formData.awsAccountId || !formData.awsRootEmail) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Send form data to the backend API
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to onboard customer.');
      }

      alert('Customer onboarded successfully!');
      setFormData({
        name: '',
        awsAccountId: '',
        awsRootEmail: '',
        awsAccountType: 'Standalone',
        awsServices: [],
        onboardDate: '',
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred while onboarding the customer.');
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg mt-8">
        <h1 className="text-2xl font-semibold mb-6">Onboard Customer</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Customer Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Customer AWS Account ID:</label>
            <input
              type="text"
              name="awsAccountId"
              value={formData.awsAccountId}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Customer AWS Root Email:</label>
            <input
              type="email"
              name="awsRootEmail"
              value={formData.awsRootEmail}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Customer AWS Account Type:</label>
            <select
              name="awsAccountType"
              value={formData.awsAccountType}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option value="Organization">Organization</option>
              <option value="Standalone">Standalone</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Customer AWS Services:</label>
            <div className="flex flex-wrap gap-4">
              {['Billing', 'Cloud Fundamentals', 'Manage & Operate'].map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    value={service}
                    checked={formData.awsServices.includes(service)}
                    onChange={handleServiceChange}
                    className="mr-2"
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Onboard Date:</label>
            <input
              type="date"
              name="onboardDate"
              value={formData.onboardDate}
              onChange={handleDateChange}
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

export default Onboard;
