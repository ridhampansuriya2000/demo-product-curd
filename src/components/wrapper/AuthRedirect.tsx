import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname  } from 'next/navigation';
import {AppDispatch, RootState} from "@/store/store";

interface AuthRedirectProps {
    children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user.isLogin && pathname !== '/auth/login' && pathname !== '/auth/signup' ) {
            router.push('/auth/login');
        }
    }, [user.isLogin, router]);

    return <>{children}</>;
};

export default AuthRedirect;
