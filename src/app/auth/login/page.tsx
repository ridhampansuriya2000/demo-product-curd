'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from "@/store/slice/userSlice";
import useAuth from '@/hooks/useAuth';
import {AppDispatch} from "@/store/store";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { authenticateUser } = useAuth();

    const handleSubmit = async () => {
        const { isAuthenticated, errorMessage } = await authenticateUser(email, password);
        if (isAuthenticated) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch(setUser({ email, fullname: user.fullname, isLogin: true }));
            router.push('/dashboard');
        } else {
            setError(errorMessage);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 flex justify-center items-center h-screen w-full">
            <div className='m-auto'>
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white p-2 w-full"
                    >
                        Login
                    </button>
                    <Link className={'text-blue-500 float-end mt-1'} href='/auth/signup'>Sign Up</Link>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;