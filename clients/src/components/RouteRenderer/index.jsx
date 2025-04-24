import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import LogoLoader from '../Loader/logo_loader';

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        const element = route.element ? (
            <Suspense fallback={<LogoLoader className='h-screen' size={100} />}>
                <ProtectedRoute access={route.access}>
                    {route.element}
                </ProtectedRoute>
            </Suspense>
        ) : undefined;

        return (
            <Route
                key={index}
                path={route.path}
                index={route.index}
                element={element}
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};

const RouteRenderer = ({ routes }) => {
    return <Routes>{renderRoutes(routes)}</Routes>;
};

export default RouteRenderer;