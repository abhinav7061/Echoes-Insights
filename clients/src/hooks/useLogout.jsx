import { toast } from 'sonner';
import { usePost } from './usePost';
import { useUserAuthentication } from '../context/userContext';

const useLogout = () => {
    const { logout: logoutUser } = useUserAuthentication();

    const api = usePost('/user/logout');

    const logout = async () => {
        const response = await api.post();
        if (response.error) return toast.error(response?.error || 'Logout failed');
        logoutUser();
        toast.success('Logged out successfully!');
    };

    return { logout, ...api };
};

export default useLogout;
