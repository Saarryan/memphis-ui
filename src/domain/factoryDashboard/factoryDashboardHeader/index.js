import './style.scss';

import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { Progress } from 'antd';

import HealthyBadge from '../../../components/healthyBadge';
import { Context } from '../../../hooks/store';

const FactoryDashboardHeader = (props) => {
    const [state, dispatch] = useContext(Context);

    const history = useHistory();

    const ccc = () => {
        const referer = '/applications/1';
        history.push(referer);
    };

    return (
        <div className="factory-Dashboard-header">
            <div className="title-wrapper">
                <h1 className="factory-name">Overview - {state.factoryDetails.name}</h1>
                <CloseIcon onClick={() => ccc()} style={{ cursor: 'pointer' }} />
            </div>
            <div className="details">
                <div className="main-details">
                    <p>
                        <b>Retention:</b> {state.factoryDetails.retention}
                    </p>
                    <p>
                        <b>Max throughput:</b> {state.factoryDetails.max_throughput}
                    </p>
                    <HealthyBadge status={state.factoryDetails.healthy} />
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.factoryDetails.awaiting_messages}</p>
                        <span>&nbsp;</span>
                        <p className="title">Awaiting messages</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.factoryDetails.average_message_size}Mb</p>
                        <span>&nbsp;</span>
                        <p className="title">Av. message size</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.factoryDetails.memory}Mb/80Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.factoryDetails.memory / 80) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.factoryDetails.memory / 80) * 100}
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
                        <p className="number">{state.factoryDetails.cpu}%</p>
                        <Progress
                            showInfo={false}
                            status={(state.factoryDetails.cpu / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.factoryDetails.cpu / 100) * 100}
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
                        <p className="number">{state.factoryDetails.storage}Mb/100Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.factoryDetails.storage / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.factoryDetails.storage / 100) * 100}
                            size="small"
                        />
                        <p className="title">Storage</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FactoryDashboardHeader;
