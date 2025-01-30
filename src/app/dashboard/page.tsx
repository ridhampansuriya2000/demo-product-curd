'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {setProducts} from "@/store/slice/productSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const products = useSelector((state) => state.products.products);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => dispatch(setProducts(data.products)));
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div>
            <h1>Welcome, {user.fullname}</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 mb-6"
            >
                Logout
            </button>
            <div className="grid grid-cols-3 gap-6">
                {products.map((product : any) => (
                    <div key={product.id} className="border p-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;