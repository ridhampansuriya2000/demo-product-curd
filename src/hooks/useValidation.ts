import { useState } from 'react';

interface ValidationResult {
    isValid: boolean;
    error: {
        fullname: string;
        email: string;
        password: string;
        confirmPassword: string;
        mobile: string;
    };
}

const useValidation = () => {
    const [error, setError] = useState<{
        fullname: string;
        email: string;
        password: string;
        confirmPassword: string;
        mobile: string;
    }>({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
    });

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validatePassword = (password: string): boolean => {
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
        let isValid = true;
        const errorMessages = {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
        };

        if (!fullname) {
            isValid = false;
            errorMessages.fullname = 'Full name is required';
        }
        if (!email) {
            isValid = false;
            errorMessages.email = 'Email is required';
        }
        if (!password) {
            isValid = false;
            errorMessages.password = 'Password is required';
        }
        if (!confirmPassword) {
            isValid = false;
            errorMessages.confirmPassword = 'Confirm password is required';
        }
        if (!mobile) {
            isValid = false;
            errorMessages.mobile = 'Mobile number is required';
        }

        if (email && !validateEmail(email)) {
            isValid = false;
            errorMessages.email = 'Invalid email address';
        }
        if (password && !validatePassword(password)) {
            isValid = false;
            errorMessages.password =
                'Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 special character';
        }
        if (password && confirmPassword && password !== confirmPassword) {
            isValid = false;
            errorMessages.confirmPassword = 'Passwords do not match';
        }

        setError(errorMessages);

        return { isValid, error: errorMessages };
    };

    return { validateForm, error };
};

export default useValidation;
