import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { handleRefreshToken, isValidToken } from './services/auth';

function PrivateRoute(props) {
    const { component: Component, ...rest } = props;

    if (isValidToken()) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        handleRefreshToken();
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
}

export default PrivateRoute;
