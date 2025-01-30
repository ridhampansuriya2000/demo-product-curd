'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setProducts, setPage } from '@/store/slice/productSlice';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import ProductModal from '@/components/ProductModal';
import {AppDispatch} from "@/store/store";
import {logoutUser} from "@/store/slice/userSlice";

interface User {
    fullname: string;
    email: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: { width: number; height: number; depth: number };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: { rating: number; comment: string; date: string; reviewerName: string; reviewerEmail: string }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string };
    thumbnail: string;
    images: string[];
}

interface RootState {
    user: User;
    products: {
        items: Product[];
        totalPages: number;
        currentPage: number;
    };
}

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const products = useSelector((state: RootState) => state.products.items);
    const totalPages = useSelector((state: RootState) => state.products.totalPages);
    const currentPage = useSelector((state: RootState) => state.products.currentPage);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        dispatch(fetchProducts(currentPage));
    }, []);
// }, [currentPage]);   // call api every time when pagination will change

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredProducts = React.useMemo(()=>{
        return products.filter((product: Product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    },[products,searchQuery]);

    const handleAddProduct = async (newProduct: Product) => {
        try {
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            // Below for do locally because In Real data it will not add, so I add for locally redux
            dispatch(setProducts([...products, {...data, id : Date.now()}]));
            // dispatch(setProducts([...products]));
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (product: Product) => {
        try {
            const updatedProducts = products.map((prod) => // for locally updates data
                prod.id == product.id ? product : prod
            );
            dispatch(setProducts(updatedProducts)); // for locally updates data
            const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            {/** update api is not working so I commented bellow code  */}
            // const updatedProducts = products.map((prod) =>
            //     prod.id === data.id ? data : prod
            // );
            // dispatch(setProducts(updatedProducts));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            // In Real data it will not delete so I do locally
            dispatch(setProducts(products.filter((product) => product.id !== id)));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleOpenModal = (product: Product | null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProduct(null);
        setIsModalOpen(false);
    };

    return (
        <div className="py-6 px-24">
            <div className='w-full flex justify-end '>
                <button className='bg-red-500 text-white p-2 rounded-lg mt-4' onClick={()=>dispatch(logoutUser())}>Log Out</button>
            </div>
            <h1 className="text-2xl">Welcome, {user?.fullname}</h1>
            <div className="flex w-full justify-between gap-1 items-center">
                <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
                <div>
                    <button
                        onClick={() => handleOpenModal(null)}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Add New Product
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {filteredProducts.slice((currentPage - 1) * 9, currentPage * 9).map((product: Product, index) => (
                // {filteredProducts.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => handleOpenModal(product)}
                        onDelete={() => handleDeleteProduct(product.id)}
                        handleEditeOpenModal={handleOpenModal}
                    />
                ))}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => dispatch(setPage(page))}
            />
            {isModalOpen && <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                product={editingProduct}
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            />}
        </div>
    );
};

export default Dashboard;
