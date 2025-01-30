'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from '@/store/slice/userSlice';
import useValidation from '@/hooks/useValidation';
import Link from "next/link";

interface SignUpFormData {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'Male' | 'Female' | 'Other';
    mobile: string;
}

const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'Male',
        mobile: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { validateForm } = useValidation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        
        if (name === "mobile") {
            newValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        }
    
        setFormData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    
        // Revalidate the specific field manually
        const { isValid, errorMessages } = validateForm({ ...formData, [name]: newValue });
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessages[name] || '',
        }));
    };        

    const handleSubmit = () => {
        const { isValid, errorMessages } = validateForm(formData);
        if (!isValid) {
            setErrors(errorMessages);
            return;
        }

        dispatch(setUser({ fullname: formData.fullname, email: formData.email, isLogin: false }));
        localStorage.setItem('user', JSON.stringify(formData));
        router.push('/auth/login');
    };

    return (
        <div className="max-w-md mx-auto p-6 flex justify-center items-center h-screen w-full">
            <div className='w-full'>
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="border p-2 w-full mb-1 mt-1"
                    />
                    {errors.fullname && <p className="text-red-500 mb-2">{errors.fullname}</p>}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="border p-2 w-full mb-1 mt-1"
                    />
                    {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        className="border p-2 w-full mb-1 mt-1"
                    />
                    {errors.password && <p className="text-red-500 mb-2 w-full">{errors.password}</p>}
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                        className="border p-2 w-full mb-1 mt-1"
                    />
                    {errors.confirmPassword && <p className="text-red-500 mb-2">{errors.confirmPassword}</p>}
                    <div className="mb-1 m1-1">
                        <label className="mr-2">Gender:</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleInputChange}
                            />
                            &nbsp;Male
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                            />
                            &nbsp;Female
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleInputChange}
                            />
                            &nbsp;Other
                        </label>
                    </div>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile Number"
                        required
                        className="border p-2 w-full mb-1"
                    />
                    {errors.mobile && <p className="text-red-500 mb-5">{errors.mobile}</p>}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white p-2 w-full"
                    >
                        Sign Up
                    </button>
                    <Link className={'text-blue-500 float-end'} href='/auth/login'>Login</Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
