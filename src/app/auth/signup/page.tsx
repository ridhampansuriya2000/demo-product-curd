'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {setUser} from "@/store/slice/userSlice";

const SignUp = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password should be at least 8 characters');
            return;
        }

        dispatch(setUser({ fullname, email }));

        // Store data in LocalStorage (or Redux Persist)
        localStorage.setItem('user', JSON.stringify({ fullname, email }));

        router.push('/login');
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl">Sign Up</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="border p-2 w-full mb-2"
                />
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="border p-2 w-full mb-2"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-2 w-full"
                >
                    Sign Up
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;