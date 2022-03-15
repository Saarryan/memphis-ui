import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LocalStorageService from './services/auth';
import { Context } from './hooks/store';

function PrivateRoute({ component: Component, ...rest }) {
    const [state] = useContext(Context);

    const shouldRenderPrivateRoute = () => {
        const isValid = LocalStorageService.isValidToken();
        if (!isValid) {
            const handleRefreshToken = LocalStorageService.handleRefreshToken();
            return handleRefreshToken;
        } else {
            return true;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                state.isAuthentication || shouldRenderPrivateRoute() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/signin', state: { referer: props.location } }} />
                )
            }
        />
    );
}

export default PrivateRoute;
