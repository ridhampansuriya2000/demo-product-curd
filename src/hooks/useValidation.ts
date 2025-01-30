interface SignUpFormData {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: string;
}

interface ValidationResult {
    isValid: boolean;
    errorMessages: { [key: string]: string };
}

const useValidation = () => {
    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/~`]).{8,}$/;
        return regex.test(password);
    };

    const validateForm = (formData: SignUpFormData): ValidationResult => {
        let isValid = true;
        const errorMessages: { [key: string]: string } = {};

        if (!formData.fullname) {
            isValid = false;
            errorMessages.fullname = 'Full name is required';
        }
        if (!formData.email) {
            isValid = false;
            errorMessages.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            isValid = false;
            errorMessages.email = 'Invalid email address';
        }
        if (!formData.password) {
            isValid = false;
            errorMessages.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            isValid = false;
            errorMessages.password = 'Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 special character';
        }
        if (!formData.confirmPassword) {
            isValid = false;
            errorMessages.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            isValid = false;
            errorMessages.confirmPassword = 'Passwords do not match';
        }
        if (!formData.mobile) {
            isValid = false;
            errorMessages.mobile = 'Mobile number is required';
        }

        return { isValid, errorMessages };
    };

    return { validateForm };
};

export default useValidation;
