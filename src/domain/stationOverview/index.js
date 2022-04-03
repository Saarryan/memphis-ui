import './style.scss';

import React, { useEffect, useContext, useState, createContext, useReducer } from 'react';

import StationOverviewHeader from './stationOverviewHeader';
import StationObservabilty from './stationObservabilty';
import { ApiEndpoints } from '../../const/apiEndpoints';
import ConnectionDetails from './connectionDetails';
import { httpRequest } from '../../services/http';
import { Context } from '../../hooks/store';
import Throughput from './throughput';
import Auditing from './auditing';
import Reducer from './hooks/reducer';

export const StationStoreContext = createContext({});

const StationOverview = () => {
    const [stationState, stationDispatch] = useReducer(Reducer);

    const [state, dispatch] = useContext(Context);
    const [isLoading, setisLoading] = useState(false);
    const [staionDetails, setStaionDetails] = useState('');
    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getStaionDetails();
    }, []);

    const getStaionDetails = async () => {
        const url = window.location.href;
        const staionName = url.split('factories/')[1].split('/')[1];
        setisLoading(true);
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION}?station_name=${staionName}`);
            stationDispatch({ type: 'SET_STATION_DATA', payload: data });
            setisLoading(false);
        } catch (err) {
            return;
        }
    };

    return (
        <StationStoreContext.Provider value={[stationState, stationDispatch]}>
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
        </StationStoreContext.Provider>
    );
};

export default StationOverview;
