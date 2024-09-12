import { useState, useEffect } from 'react';
import { fetchCustomers } from '../services/api';
import CustomerList from '../components/CustomerList';
import Layout from '@/components/Layout';
import { Customer } from '../types';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const getCustomers = async () => {
            const data = await fetchCustomers();
            setCustomers(data);
        };
        getCustomers();
    }, []);

    useEffect(() => {
        setFilteredCustomers(
            customers.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, customers]);

    return (
        <Layout>
        <div>
            <CustomerList customers={filteredCustomers} />
        </div>
        </Layout>
    );
};

export default Home;
