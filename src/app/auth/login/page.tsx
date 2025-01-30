'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from "@/store/slice/userSlice";
import useAuth from '@/hooks/useAuth';
import { AppDispatch } from "@/store/store";
import Link from "next/link";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { authenticateUser } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async () => {
        let validationErrors = { email: '', password: '' };
        if (!formData.email) validationErrors.email = 'Email is required';
        if (!formData.password) validationErrors.password = 'Password is required';
        
        if (validationErrors.email || validationErrors.password) {
            setErrors(validationErrors);
            return;
        }

        const { isAuthenticated, errorMessage } = await authenticateUser(formData.email, formData.password);
        
        if (isAuthenticated) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            dispatch(setUser({ email: formData.email, fullname: user.fullname, isLogin: true }));
            router.push('/dashboard');
        } else {
            setErrors({ ...errors, password: errorMessage });
            setFormData({ email: '', password: '' });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 flex justify-center items-center h-screen w-full">
            <div className='m-auto w-full'>
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    {errors.email && <p className="text-red-500 mt-2 w-full">{errors.email}</p>}
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    {errors.password && <p className="text-red-500 mt-2 w-full">{errors.password}</p>}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white p-2 w-full"
                    >
                        Login
                    </button>
                    <Link className={'text-blue-500 float-end mt-1'} href='/auth/signup'>Sign Up</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
