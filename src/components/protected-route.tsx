import React  from 'react';
import {
    Redirect,
    Route,
    useLocation,
    RouteProps
} from 'react-router';
import { getAccessToken } from '../services/action/auth';
import { useAppDispatch } from "../services/hooks";


export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }:any) => {
    const dispatch = useAppDispatch();
    const location = useLocation<any>();
    const refreshToken = localStorage.refreshToken;

    React.useEffect(() => {
        if (refreshToken) {
            dispatch(getAccessToken());
        }
    }, [dispatch, refreshToken]);

    // @ts-ignore
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
