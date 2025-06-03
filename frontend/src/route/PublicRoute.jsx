import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, redirectPath = '/dashboard', children }) => {
    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default PublicRoute;