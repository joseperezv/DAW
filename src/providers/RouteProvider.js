import { Navigate, useRoutes } from 'react-router-dom';

import Rutinas from '../pages/Rutinas';
import Perfil from '../pages/Perfil';
import Dietas from '../pages/Dietas';
import Blogs from '../pages/Blogs';
import Admin from '../pages/Admin';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import useAuth from '../hooks/useAuth';
import PageWrapper from '../components/PageWrapper';

// AuthRoute component
const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace={true} />;
};

// RouteProvider component
function RouteProvider() {
    const routes = useRoutes([
        {
            path: '/',
            element: <AuthRoute><PageWrapper><Rutinas /></PageWrapper></AuthRoute>,
        },
        {
            path: '/rutinas',
            element: <AuthRoute><PageWrapper><Rutinas /></PageWrapper></AuthRoute>,
        },
        {
            path: '/perfil',
            element: <AuthRoute><PageWrapper><Perfil /></PageWrapper></AuthRoute>,
        },
        {
            path: '/dietas',
            element: <AuthRoute><PageWrapper><Dietas /></PageWrapper></AuthRoute>,
        },
        {
            path: '/blogs',
            element: <AuthRoute><PageWrapper><Blogs /></PageWrapper></AuthRoute>,
        },
        {
            path: '/admin',
            element: <AuthRoute><PageWrapper><Admin /></PageWrapper></AuthRoute>,
        },
        {
            path: '/signin',
            element: <PageWrapper><SignIn /></PageWrapper>,
        },
        {
            path: '/signup',
            element: <PageWrapper><SignUp /></PageWrapper>,
        },
    ]);

    return routes;
}

export default RouteProvider;
