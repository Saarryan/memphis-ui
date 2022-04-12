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
import { handleRefreshTokenRequest } from './services/http';
import { LOCAL_STORAGE_TOKEN } from './const/localStorageConsts';
import { useHistory } from 'react-router-dom';
import { HANDLE_REFRESH_INTERVAL } from './config';

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
    const history = useHistory();

    useEffect(async () => {
        await handleRefresh();
        setAuthCheck(false);

        const interval = setInterval(() => {
            handleRefresh();
        }, HANDLE_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = async () => {
        if (window.location.pathname === pathControllers.login) {
            return;
        } else if (localStorage.getItem(LOCAL_STORAGE_TOKEN)) {
            const handleRefreshStatus = await handleRefreshTokenRequest();
            if (handleRefreshStatus) {
                return true;
            }
        } else {
            history.push('/login');
        }
    };

    return (
        <div className="app-container">
            <div>
                {' '}
                {!authCheck && (
                    <Switch>
                        <Route exact path={pathControllers.login} component={Login} />
                        <PrivateRoute
                            exact
                            path={pathControllers.overview}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <Overview />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            exact
                            path={pathControllers.users}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <Users />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            exact
                            path={pathControllers.settings}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <Settings />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            exact
                            path={pathControllers.factoriesList}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <FactoriesList />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            exact
                            path={`${pathControllers.factoriesList}/:id`}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <StationsList />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            exact
                            path={`${pathControllers.factoriesList}/:id/:id`}
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <StationOverview />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
                        <PrivateRoute
                            path="/"
                            component={
                                <AppWrapper
                                    content={
                                        <div>
                                            <Overview />
                                        </div>
                                    }
                                ></AppWrapper>
                            }
                        />
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
