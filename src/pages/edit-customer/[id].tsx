import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

const awsServiceOptions = ['Billing', 'Cloud Fundamentals', 'Manage & Operate'];

const EditCustomerPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [customer, setCustomer] = useState({
    name: '',
    awsAccountId: '',
    awsRootEmail: '',
    awsAccountType: '',
    awsServices: [] as string[],
    onboardDate: '',
    offboardDate: '',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomer({
            ...data,
            onboardDate: data.onboardDate ? data.onboardDate.split('T')[0] : '',
            offboardDate: data.offboardDate ? data.offboardDate.split('T')[0] : '',
          });
          setSelectedServices(data.awsServices); // Set selected services from database
        })
        .catch((error) => console.error('Error fetching customer:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedServices((prevServices) =>
      prevServices.includes(value)
        ? prevServices.filter((service) => service !== value)
        : [...prevServices, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCustomer = { ...customer, awsServices: selectedServices };

    // Convert dates to ISO format or null if empty
    updatedCustomer.onboardDate = customer.onboardDate ? new Date(customer.onboardDate).toISOString() : '';
    updatedCustomer.offboardDate = customer.offboardDate ? new Date(customer.offboardDate).toISOString() : '';

    try {
      await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      });
      router.push('/'); // Redirect to home page after saving
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Layout>
      <div className="p-3"></div>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Customer</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          {/* AWS Account ID */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">AWS Account ID:</label>
            <input
              type="text"
              name="awsAccountId"
              value={customer.awsAccountId}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          {/* AWS Root Email */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">AWS Root Email:</label>
            <input
              type="email"
              name="awsRootEmail"
              value={customer.awsRootEmail}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          {/* AWS Account Type */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">AWS Account Type:</label>
            <input
              type="text"
              name="awsAccountType"
              value={customer.awsAccountType}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          {/* AWS Services */}
          <fieldset className="flex flex-col mt-4">
            <legend className="font-medium mb-2">AWS Services:</legend>
            <div className="flex flex-wrap gap-4">
              {awsServiceOptions.map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    value={service}
                    checked={selectedServices.includes(service)}
                    onChange={handleServiceChange}
                    className="mr-2"
                  />
                  {service}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Onboard Date */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Onboard Date:</label>
            <input
              type="date"
              name="onboardDate"
              value={customer.onboardDate}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>

          {/* Offboard Date */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Offboard Date:</label>
            <input
              type="date"
              name="offboardDate"
              value={customer.offboardDate}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <small className="text-gray-500">
              Leave empty to remove the offboard date.
            </small>
          </div>

          {/* Submit Button */}
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

export default EditCustomerPage;
