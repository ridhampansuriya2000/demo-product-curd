'use client';

import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/store/slice/productSlice';
import { useState } from 'react';
import Modal from "@/components/UI/modal";
import {AppDispatch} from "@/store/store";

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

const ProductCard = ({ product, handleEditeOpenModal }: {
    product: Product,
    onEdit: () => void;
    handleEditeOpenModal : (product: Product | null) => void;
    onDelete: () => void; }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showMoreDetils, setShowMoreDetils] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleOpenModal = (setState) => {
        setState(true);
    };

    const handleCloseModal = (setState) => {
        setState(false);
    };


    const confirmDelete = () => {
        dispatch(deleteProduct(product.id));
        setIsConfirmModalOpen(false);
    };

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="border rounded-lg shadow-lg p-6  mx-auto bg-white w-full flex-1">
            <h3 className="text-xl font-semibold text-center">{product.title}</h3>
            <img src={product.thumbnail || null} alt={product?.title} className="w-full h-48 object-cover rounded-lg my-4" />
            <div className="space-y-3">
                <p className="text-gray-600">{product?.description}</p>
                <p className="text-lg font-bold text-green-500">${product?.price}</p>
                <p className="text-sm text-gray-500">Category: <span className="font-medium">{product?.category}</span></p>
                <p className="text-sm text-gray-500">Brand: <span className="font-medium">{product?.brand}</span></p>
                {isExpanded && (
                    <div>
                        <p className="text-sm text-gray-500">Stock: <span className="font-medium">{product?.stock}</span></p>
                        <p className="text-sm text-gray-500">Availability: <span className="font-medium">{product?.availabilityStatus}</span></p>
                        <p className="text-sm text-gray-500">Warranty: <span className="font-medium">{product?.warrantyInformation}</span></p>
                        <p className="text-sm text-gray-500">Shipping Info: <span className="font-medium">{product?.shippingInformation}</span></p>
                        <p className="text-sm text-gray-500">Minimum Order: <span className="font-medium">{product?.minimumOrderQuantity}</span></p>
                        <div>
                            <h4 className="text-md font-semibold">Tags:</h4>
                            <ul className="flex flex-wrap gap-2">
                                {product?.tags?.map((tag: string) => (
                                    <li key={tag} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs">{tag}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold">Reviews:</h4>
                            <div>
                                {product.reviews.length > 0 ? (
                                    product.reviews.map((review: any, index: number) => (
                                        <div key={index} className="mb-2">
                                            <p className="font-medium">{review.reviewerName}</p>
                                            <p className="text-sm text-gray-500">{new Date(review?.date).toLocaleDateString()}</p>
                                            <p className="text-sm">{review?.comment}</p>
                                            <p className="text-sm text-yellow-500">Rating: {review?.rating} / 5</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No reviews yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {!isExpanded && (
                    <button onClick={()=>handleOpenModal(setShowMoreDetils)} className="text-blue-500 text-sm mt-2">
                        View More
                    </button>
                )}
                {isExpanded && (
                    <button onClick={toggleContent} className="text-blue-500 text-sm mt-2">
                        View Less
                    </button>
                )}
                <div className='flex gap-2'>
                    <button className="bg-red-500 text-white p-2 w-full rounded-lg mt-4"
                            onClick={() => handleOpenModal(setIsConfirmModalOpen)}>Delete Product
                    </button>
                    <button className="bg-gray-400 text-white p-2 w-full rounded-lg mt-4"
                            onClick={() => handleEditeOpenModal(product)}>Edit
                    </button>
                </div>
            </div>
            {showMoreDetils && <Modal isOpen={showMoreDetils} onClose={() => handleCloseModal(setShowMoreDetils)}>
            <div className=" rounded-lg shadow-lg p-6 max-w-lg  mx-auto bg-white">
                    <h3 className="text-xl font-semibold text-center">{product?.title}</h3>
                    <img src={product.thumbnail || null} alt={product?.title}
                         className="w-full h-48 object-cover rounded-lg my-4"/>
                    <div className="space-y-3">
                        <p className="text-gray-600">{product.description}</p>

                        <div>
                            <div className='flex justify-around  gap-[30px]'>
                                <div className='space-y-3'>
                                    <p className="text-lg font-bold text-green-500">${product?.price}</p>
                                    <p className="text-sm text-gray-500">Category: <span
                                        className="font-medium">{product?.category}</span></p>
                                    <p className="text-sm text-gray-500">Brand: <span
                                        className="font-medium">{product?.brand}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">Stock: <span
                                        className="font-medium">{product?.stock}</span></p>
                                    <p className="text-sm text-gray-500">Availability: <span
                                        className="font-medium">{product?.availabilityStatus}</span></p>
                                    <p className="text-sm text-gray-500">Warranty: <span
                                        className="font-medium">{product?.warrantyInformation}</span></p>
                                    <p className="text-sm text-gray-500">Shipping Info: <span
                                        className="font-medium">{product?.shippingInformation}</span></p>
                                    <p className="text-sm text-gray-500">Minimum Order: <span
                                        className="font-medium">{product?.minimumOrderQuantity}</span></p>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-md font-semibold">Tags:</h4>
                                        <ul className="flex flex-wrap gap-2">
                                            {product?.tags?.map((tag: string) => (
                                                <li key={tag}
                                                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs">{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold">Reviews:</h4>
                                        <div>
                                            {product?.reviews?.length > 0 ? (
                                                product.reviews?.map((review: any, index: number) => (
                                                    <div key={index} className="mb-2">
                                                        <p className="font-medium">{review?.reviewerName}</p>
                                                        <p className="text-sm text-gray-500">{new Date(review?.date).toLocaleDateString()}</p>
                                                        <p className="text-sm">{review?.comment}</p>
                                                        <p className="text-sm text-yellow-500">Rating: {review?.rating} /
                                                            5</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No reviews yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>}
            {isConfirmModalOpen && (
                <Modal isOpen={isConfirmModalOpen} onClose={() => handleCloseModal(setIsConfirmModalOpen)}>
                    <div className='px-5 py-3'>
                        <p className="mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex gap-2 justify-center">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={confirmDelete}>Yes
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => handleCloseModal(setIsConfirmModalOpen)}>No
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ProductCard;
