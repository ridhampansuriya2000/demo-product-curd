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

    const dispatch = useDispatch();
    const router = useRouter();
    const { validateForm, error } = useValidation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            gender: e.target.value as 'Male' | 'Female' | 'Other',
        }));
    };

    const handleSubmit = () => {
        const { fullname, email, password, confirmPassword, mobile, gender } = formData;

        const { isValid, error } = validateForm(fullname, email, password, confirmPassword, mobile);
        if (!isValid) {
            return;
        }

        dispatch(setUser({ fullname, email, isLogin: false }));

        localStorage.setItem('user', JSON.stringify({ fullname, email, gender, mobile, password }));

        router.push('/auth/login');
    };

    return (
        <div className="max-w-md mx-auto p-6 flex justify-center items-center h-screen w-full">
            <div>
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                        className="border p-2 w-full mb-2"
                    />
                    <div className="mb-2">
                        <label className="mr-2">Gender:</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleGenderChange}
                            />
                            Male
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleGenderChange}
                            />
                            Female
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleGenderChange}
                            />
                            Other
                        </label>
                    </div>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile Number"
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
                    <Link className={'text-blue-500 float-end'} href='/auth/login'>Login</Link>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
