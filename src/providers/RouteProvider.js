import { Navigate, useRoutes } from 'react-router-dom';

import Rutinas from '../pages/Rutinas';
import Perfil from '../pages/Perfil';
import Dietas from '../pages/Dietas';
import Blogs from '../pages/Blogs';
import Admin from '../pages/Admin';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import useAuth from '../hooks/useAuth';

// AuthRoute component
const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace={true} />;
};

// RouteProvider component
function RouteProvider() {
    const routes = useRoutes([
        {
            path: '/rutinas',
            element: <AuthRoute><Rutinas /></AuthRoute>,
        },
        {
            path: '/perfil',
            element: <AuthRoute><Perfil /></AuthRoute>,
        },
        {
            path: '/dietas',
            element: <AuthRoute><Dietas /></AuthRoute>,
        },
        {
            path: '/blogs',
            element: <AuthRoute><Blogs /></AuthRoute>,
        },
        {
            path: '/admin',
            element: <AuthRoute><Admin /></AuthRoute>,
        },
        {
            path: '/signin',
            element: <SignIn />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
    ]);

    return routes;
}

export default RouteProvider;
