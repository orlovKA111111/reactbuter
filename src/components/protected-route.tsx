import React  from 'react';
import { useDispatch } from 'react-redux';
import {
    Redirect,
    Route,
    useLocation,
    RouteProps
} from 'react-router-dom';
import { getAccessToken } from '../services/action/auth';


export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const refreshToken = localStorage.refreshToken;

    React.useEffect(() => {
        if (refreshToken) {
            dispatch(getAccessToken());
        }
    }, [dispatch, refreshToken]);

    return (
        <Route
            {...rest}
            render={() =>
                refreshToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
