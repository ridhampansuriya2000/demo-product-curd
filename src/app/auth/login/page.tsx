'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {setUser} from "@/store/slice/userSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email === email) {
            dispatch(setUser({ fullname: user.fullname, email: user.email }));
            router.push('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl">Login</h2>
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
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Login;