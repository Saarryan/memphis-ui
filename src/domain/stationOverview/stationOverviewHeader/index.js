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
import awaitingIcon from '../../../assets/images/awaitingIcon.svg';
import averageMesIcon from '../../../assets/images/averageMesIcon.svg';
import cpuIcon from '../../../assets/images/cpuIcon.svg';
import memoryIcon from '../../../assets/images/memoryIcon.svg';
import storageIcon from '../../../assets/images/storageIcon.svg';

const StationOverviewHeader = (props) => {
    const [state, dispatch] = useContext(Context);
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const history = useHistory();
    const [retentionValue, setRetentionValue] = useState('');

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

    const returnToStaionsList = () => {
        const url = window.location.href;
        const staionName = url.split('factories/')[1].split('/')[0];
        history.push(`${pathDomains.factoriesList}/${staionName}`);
    };

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
                </div>
                <div className="details-wrapper">
                    <div className="icon">
                        <img src={awaitingIcon} width={22} height={44} />
                    </div>
                    <div className="more-details">
                        <p className="number">1000</p>
                        <span>&nbsp;</span>
                        <p className="title">Awaiting messages</p>
                    </div>
                </div>
                <div className="details-wrapper">
                    <div className="icon">
                        <img src={averageMesIcon} width={24} height={24} />
                    </div>
                    <div className="more-details">
                        <p className="number">500Mb</p>
                        <span>&nbsp;</span>
                        <p className="title">Av. message size</p>
                    </div>
                </div>
                <div className="details-wrapper">
                    <div className="icon">
                        <img src={memoryIcon} width={24} height={24} />
                    </div>
                    <div className="more-details">
                        <p className="number">20Mb/80Mb</p>
                        <Progress showInfo={false} status={(20 / 80) * 100 > 60 ? 'exception' : 'success'} percent={(20 / 80) * 100} size="small" />
                        <p className="title">Mem</p>
                    </div>
                </div>
                <div className="details-wrapper">
                    <div className="icon">
                        <img src={cpuIcon} width={22} height={22} />
                    </div>
                    <div className="more-details">
                        <p className="number">50%</p>
                        <Progress showInfo={false} status={(35 / 100) * 100 > 60 ? 'exception' : 'success'} percent={(35 / 100) * 100} size="small" />
                        <p className="title">CPU</p>
                    </div>
                </div>
                <div className="details-wrapper">
                    <div className="icon">
                        <img src={storageIcon} width={30} height={30} />
                    </div>
                    <div className="more-details">
                        <p className="number">{60}Mb/100Mb</p>
                        <Progress showInfo={false} status={(60 / 100) * 100 > 60 ? 'exception' : 'success'} percent={(60 / 100) * 100} size="small" />
                        <p className="title">Storage</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StationOverviewHeader;
