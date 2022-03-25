import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { handleRefreshToken, isValidToken } from './services/auth';

function PrivateRoute(props) {
    const { component: Component, ...rest } = props;

    if (isValidToken()) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        localStorage.clear();
        return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />;
    }
}

export default PrivateRoute;
