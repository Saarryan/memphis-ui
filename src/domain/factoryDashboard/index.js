import './style.scss';

import React, { useEffect, useContext } from 'react';

import FactoryDashboardHeader from './factoryDashboardHeader';
import FactoryObservabilty from './factoryObservabilty';
import ConnectionDetails from './connectionDetails';
import Throughput from './throughput';
import Auditing from './auditing';
import { Context } from '../../hooks/store';

const FactoryDashboard = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
    }, []);

    return (
        <div className="factory-dashboard-container">
            <div className="dashboard-header">
                <FactoryDashboardHeader />
            </div>
            <div className="dashboard-top">
                <div className="factory-observability">
                    <FactoryObservabilty />
                </div>
                <div className="connection-details">
                    <ConnectionDetails />
                </div>
            </div>
            <div className="dashboard-bottom">
                <div className="auditing">
                    <Auditing />
                </div>
                <div className="throughput">
                    <Throughput />
                </div>
            </div>
        </div>
    );
};

export default FactoryDashboard;
