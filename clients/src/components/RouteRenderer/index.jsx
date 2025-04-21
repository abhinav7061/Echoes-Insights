import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../Loader';
import ProtectedRoute from '../ProtectedRoute';

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        const element = route.element ? (
            <Suspense fallback={<Loader />}>
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