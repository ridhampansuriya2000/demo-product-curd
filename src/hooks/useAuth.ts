const useAuth = () => {
    const authenticateUser = async (email: string, password: string) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email === email && user.password === password) {
            return { isAuthenticated: true, errorMessage: '' };
        }
        return { isAuthenticated: false, errorMessage: 'Invalid credentials' };
    };

    return { authenticateUser };
};

export default useAuth;
