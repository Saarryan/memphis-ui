import './style.scss';

import React, { useEffect, useContext } from 'react';

import ChannelDashboardHeader from './channelDashboardHeader';
import QueueObservabilty from './queueObservabilty';
import ConnectionDetails from './connectionDetails';
import Throughput from './throughput';
import Auditing from './auditing';
import { Context } from '../../hooks/store';

const ChannelDashboard = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'applications' });
    }, []);

    return (
        <div className="channel-dashboard-container">
            <div className="dashboard-header">
                <ChannelDashboardHeader />
            </div>
            <div className="dashboard-top">
                <div className="queue-observability">
                    <QueueObservabilty />
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

export default ChannelDashboard;
