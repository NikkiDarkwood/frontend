import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Customer } from '../types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage = 8;

  // Fetch customers from the backend API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/customers'); // Replace with the correct API endpoint
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search query (name, email, account ID, type, services)
  const filteredCustomers = customers.filter((customer) =>
    ['name', 'awsAccountId', 'awsRootEmail', 'awsAccountType'].some((field) =>
      customer[field as keyof Customer]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    customer.awsServices.some((service) =>
      service.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-3 text-center">SAMBA</h1>
      <h2 className="text-2xl font-bold mb-6 text-center">Customer List</h2>


      {/* Accordion Customer List with Search */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md">
              {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <TextField
          label="Search Customers"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
          }}
        />
      </div>
        {loading ? (
          <CircularProgress />
        ) : filteredCustomers.length > 0 ? (
          currentCustomers.map((customer) => (
            <Accordion
              key={customer.id}
              style={{
                backgroundColor: customer.offboardDate ? '#EFF6FF' : 'white',
                color: customer.offboardDate ? '#555' : '#000',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${customer.id}-content`}
                id={`panel-${customer.id}-header`}
              >
                <Typography className="text-lg font-semibold">{customer.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={`space-y-2 ${customer.offboardDate ? 'text-gray-60' : 'text-gray-80'}`}>
                  <p>AWS Account ID: {customer.awsAccountId}</p>
                  <p>Email: {customer.awsRootEmail}</p>
                  <p>Type: {customer.awsAccountType}</p>
                  <p>
                    Onboard Date: {customer.onboardDate ? new Date(customer.onboardDate).toLocaleDateString() : 'N/A'}
                  </p>
                  {customer.offboardDate && (
                    <p>Offboard Date: {new Date(customer.offboardDate).toLocaleDateString()}</p>
                  )}
                  <p>Services: {customer.awsServices.join(', ')}</p>
                </div>
                <Link
                  href={`/edit-customer/${customer.id}`}
                  className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Edit
                </Link>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography className="text-center text-gray-500">No customers found.</Typography>
        )}
      </div>

      {/* Pagination */}
      {filteredCustomers.length > customersPerPage && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={Math.ceil(filteredCustomers.length / customersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerList;
