import React  from 'react';
import { useDispatch } from 'react-redux';
import {
    Redirect,
    Route,
    useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { getAccessToken } from '../services/action/auth';


export function ProtectedRoute({ children, ...rest }) {
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
};

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
