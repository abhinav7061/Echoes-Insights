
import { useUserAuthentication } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, access }) => {
    const { user } = useUserAuthentication();

    if (access === 'public') return children;


    if (typeof access === 'function') {
        return access(user) ? children : <Navigate to="/" replace />;
    }

    if (Array.isArray(access)) {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        return access.includes(user.role) ? children : <Navigate to="/" replace />;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoute;