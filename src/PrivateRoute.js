import React from 'react';
import { Route } from 'react-router-dom';

import { isValidToken } from './services/auth';
import { handleRefreshTokenRequest } from './services/http';

function PrivateRoute(props) {
    const { component: Component, ...rest } = props;

    if (isValidToken()) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        handleRefreshTokenRequest();
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
}

export default PrivateRoute;
