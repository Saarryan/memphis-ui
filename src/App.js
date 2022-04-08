import './App.scss';

import { Switch, Route, withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState } from 'react';

import StationOverview from './domain/stationOverview';
import FactoriesList from './domain/factoriesList';
import AppWrapper from './components/appWrapper';
import StationsList from './domain/stationsList';
import PrivateRoute from './PrivateRoute';
import Overview from './domain/overview';
import Settings from './domain/settings';
import pathControllers from './router';
import Users from './domain/users';
import Login from './domain/login';
import { Redirect } from 'react-router-dom';
import AuthService from './services/auth';
import { handleRefreshTokenRequest } from './services/http';
import { LOCAL_STORAGE_TOKEN } from './const/localStorageConsts';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 850 });
    return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 849 });
    return isMobile ? children : null;
};

const App = withRouter(() => {
    const [authCheck, setAuthCheck] = useState(true);

    useEffect(async () => {
        if (localStorage.getItem(LOCAL_STORAGE_TOKEN) && !AuthService.isValidToken()) {
            await handleRefreshTokenRequest();
        }
        setAuthCheck(false);
    }, []);

    return (
        <div className="app-container">
            <div>
                {' '}
                {!authCheck && (
                    <Switch>
                        <Route exact path={pathControllers.login} component={Login} />
                        <PrivateRoute exact path={pathControllers.overview}>
                            <AppWrapper
                                content={
                                    <div>
                                        <Overview />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute exact path={pathControllers.users}>
                            <AppWrapper
                                content={
                                    <div>
                                        <Users />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute exact path={pathControllers.settings}>
                            <AppWrapper
                                content={
                                    <div>
                                        <Settings />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute exact path={pathControllers.factoriesList}>
                            <AppWrapper
                                content={
                                    <div>
                                        <FactoriesList />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute exact path={`${pathControllers.factoriesList}/:id`}>
                            <AppWrapper
                                content={
                                    <div>
                                        <StationsList />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute exact path={`${pathControllers.factoriesList}/:id/:id`}>
                            <AppWrapper
                                content={
                                    <div>
                                        <StationOverview />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <PrivateRoute path="/">
                            <AppWrapper
                                content={
                                    <div>
                                        <Overview />
                                    </div>
                                }
                            ></AppWrapper>
                        </PrivateRoute>
                        <Route>
                            <Redirect to={pathControllers.overview} />
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    );
});

export default App;
