'use client';

import { useState, useEffect } from 'react';

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

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSubmit: (product: Product) => void;
}

const ProductModal = ({ isOpen, onClose, product, onSubmit } : ProductModalProps) => {
    const [formData, setFormData] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        category: '',
        price: undefined,
        discountPercentage: 0,
        rating: 0,
        stock: undefined,
        tags: [],
        brand: '',
        sku: '',
        weight: 0,
        dimensions: { width: 0, height: 0, depth: 0 },
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        reviews: [],
        returnPolicy: '',
        minimumOrderQuantity: 0,
        meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
        thumbnail: '',
        images: [],
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 w-96 rounded">
                    <h2 className="text-xl mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="title" className="block">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stock" className="block">Stock</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock || ''}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                {product ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ProductModal;