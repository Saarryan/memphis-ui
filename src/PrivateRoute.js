import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from './hooks/useAuth';

function PrivateRoute(props) {
    const { isValidToken } = useAuth();
    const { component: Component, ...rest } = props;

    if (isValidToken()) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
    //redirect if there is no user
    return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />;
}

export default PrivateRoute;
