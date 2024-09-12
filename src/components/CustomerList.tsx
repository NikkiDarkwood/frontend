import React, { useState } from 'react';
import Link from 'next/link';
import { Customer } from '../types'; // Ensure this path is correct

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-3 text-center">SAMBA</h1>
      <h2 className="text-2xl font-bold mb-6 text-center">Customer List</h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg shadow-sm w-full max-w-md"
        />
      </div>

      <ul className="space-y-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              className={`p-6 rounded-lg shadow-lg ${
                customer.offboardDate ? 'bg-gray-200 text-gray-600' : 'bg-white text-gray-800'
              }`}
            >
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-semibold">Name: {customer.name}</p>
                <p className="text-gray-700">AWS Account ID: {customer.awsAccountId}</p>
                <p className="text-gray-700">Email: {customer.awsRootEmail}</p>
                <p className="text-gray-700">Type: {customer.awsAccountType}</p>
                <p className="text-gray-700">
                  Onboard Date:{' '}
                  {customer.onboardDate ? new Date(customer.onboardDate).toLocaleDateString() : 'N/A'}
                </p>
                {customer.offboardDate && (
                  <p className="text-gray-700">
                    Offboard Date: {new Date(customer.offboardDate).toLocaleDateString()}
                  </p>
                )}
                <p className="text-gray-700">
                  Services: {customer.awsServices.join(', ')}
                </p>
              </div>
              <Link
                href={`/edit-customer/${customer.id}`}
                className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                Edit
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No customers found.</p>
        )}
      </ul>
    </div>
  );
};

export default CustomerList;
