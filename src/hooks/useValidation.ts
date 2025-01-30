import { useState } from 'react';

interface ValidationResult {
    isValid: boolean;
    error: string;
}

const useValidation = () => {
    const [error, setError] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        // Password must contain at least one uppercase, one lowercase, one number, and one special character.
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/~`]).{8,}$/;
        return regex.test(password);
    };

    const validateForm = (
        fullname: string,
        email: string,
        password: string,
        confirmPassword: string,
        mobile: string
    ): ValidationResult => {
        if (!fullname || !email || !password || !confirmPassword || !mobile) {
            setError('All fields are required');
            return { isValid: false, error: 'All fields are required' };
        }
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return { isValid: false, error: 'Invalid email address' };
        }
        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 special character'
            );
            return {
                isValid: false,
                error:
                    'Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 special character',
            };
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return { isValid: false, error: 'Passwords do not match' };
        }
        setError('');
        return { isValid: true, error: '' };
    };

    return { validateForm, error };
};

export default useValidation;
