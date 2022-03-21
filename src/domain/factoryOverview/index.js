import './style.scss';

import React, { useEffect, useContext } from 'react';

import FactoryOverviewHeader from './factoryOverviewHeader';
import FactoryObservabilty from './factoryObservabilty';
import ConnectionDetails from './connectionDetails';
import Throughput from './throughput';
import Auditing from './auditing';
import { Context } from '../../hooks/store';

const FactoryOverview = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
    }, []);

    return (
        <div className="factory-overview-container">
            <div className="overview-header">
                <FactoryOverviewHeader />
            </div>
            <div className="overview-top">
                <div className="factory-observability">
                    <FactoryObservabilty />
                </div>
                <div className="connection-details">
                    <ConnectionDetails />
                </div>
            </div>
            <div className="overview-bottom">
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

export default FactoryOverview;
