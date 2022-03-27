import './style.scss';

import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { Progress } from 'antd';

import HealthyBadge from '../../../components/healthyBadge';
import { Context } from '../../../hooks/store';

const StationOverviewHeader = (props) => {
    const [state, dispatch] = useContext(Context);

    const history = useHistory();

    const ccc = () => {
        const referer = '/factories/1';
        history.push(referer);
    };

    return (
        <div className="station-overview-header">
            <div className="title-wrapper">
                <h1 className="station-name">Overview - {state.stationDetails.name}</h1>
                <CloseIcon onClick={() => ccc()} style={{ cursor: 'pointer' }} />
            </div>
            <div className="details">
                <div className="main-details">
                    <p>
                        <b>Retention:</b> {state.stationDetails.retention}
                    </p>
                    <p>
                        <b>Max throughput:</b> {state.stationDetails.max_throughput}
                    </p>
                    <HealthyBadge status={state.stationDetails.healthy} />
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
