import './style.scss';

import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Progress } from 'antd';

import HealthyBadge from '../../../components/healthyBadge';
import { Context } from '../../../hooks/store';
import { StationStoreContext } from '..';
import { convertSecondsToDate } from '../../../services/dateConvertor';
import pathDomains from '../../../router';

const StationOverviewHeader = (props) => {
    const [state, dispatch] = useContext(Context);
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const history = useHistory();
    const [retentionValue, setRetentionValue] = useState('');

    const returnToStaionsList = () => {
        const url = window.location.href;
        const staionName = url.split('factories/')[1].split('/')[0];
        history.push(`${pathDomains.factoriesList}/${staionName}`);
    };
    useEffect(() => {
        switch (stationState?.station?.retention_type) {
            case 'message_age_sec':
                setRetentionValue(convertSecondsToDate(stationState?.station?.retention_value));
                break;
            case 'bytes':
                setRetentionValue(`${stationState?.station?.retention_value} bytes`);
                break;
            case 'messages':
                setRetentionValue(`${stationState?.station?.retention_value} messages`);
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="station-overview-header">
            <div className="title-wrapper">
                <h1 className="station-name">Overview - {stationState?.station?.name}</h1>
                <CloseIcon onClick={() => returnToStaionsList()} style={{ cursor: 'pointer' }} />
            </div>
            <div className="details">
                <div className="main-details">
                    <p>
                        <b>Retention:</b> {retentionValue}
                    </p>
                    <p>
                        <b>Replicas:</b> {stationState?.station?.replicas}
                    </p>
                    <p>
                        <b>Storage Type:</b> {stationState?.station?.storage_type}
                    </p>
                    {/* <HealthyBadge status={state.stationDetails.healthy} /> */}
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.stationDetails.awaiting_messages}</p>
                        <span>&nbsp;</span>
                        <p className="title">Awaiting messages</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.stationDetails.average_message_size}Mb</p>
                        <span>&nbsp;</span>
                        <p className="title">Av. message size</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.stationDetails.memory}Mb/80Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.stationDetails.memory / 80) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.stationDetails.memory / 80) * 100}
                            size="small"
                        />
                        <p className="title">Mem</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.stationDetails.cpu}%</p>
                        <Progress
                            showInfo={false}
                            status={(state.stationDetails.cpu / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.stationDetails.cpu / 100) * 100}
                            size="small"
                        />
                        <p className="title">CPU</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.stationDetails.storage}Mb/100Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.stationDetails.storage / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.stationDetails.storage / 100) * 100}
                            size="small"
                        />
                        <p className="title">Storage</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StationOverviewHeader;
