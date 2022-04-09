import React from 'react';
import {} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import AuthService from './services/auth';

function PrivateRoute(props) {
    const { component: Component, ...rest } = props;

    if (AuthService.isValidToken()) {
        return <Route {...rest} render={() => Component} />;
    } else {
        return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />;
    }
}

export default PrivateRoute;
