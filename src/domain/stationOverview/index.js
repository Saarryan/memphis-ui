import './style.scss';

import React, { useEffect, useContext } from 'react';

import StationOverviewHeader from './stationOverviewHeader';
import StationObservabilty from './stationObservabilty';
import ConnectionDetails from './connectionDetails';
import Throughput from './throughput';
import Auditing from './auditing';
import { Context } from '../../hooks/store';

const StationOverview = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
    }, []);

    return (
        <div className="station-overview-container">
            <div className="overview-header">
                <StationOverviewHeader />
            </div>
            <div className="overview-top">
                <div className="station-observability">
                    <StationObservabilty />
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

export default StationOverview;
