import "./channelDashboardHeader.scss"
import React, { useContext } from "react";
import { Progress } from 'antd';
import { Context } from "../../../../hooks/store";
import HealthyBadge from "../../../../components/healthyBadge/healthyBadge";


const ChannelDashboardHeader = () => {
    const [state, dispatch] = useContext(Context);

    return (
        <div className="channel-Dashboard-header">
            <h1 className="channel-name">Overview - {state.queueDetails.name}</h1>
            <div className="details">
                <div className="main-details">
                    <p><b>Retention:</b> {state.queueDetails.retention}</p>
                    <p><b>Max throughput:</b> {state.queueDetails.max_throughput}</p>
                    <HealthyBadge healthy={state.queueDetails.healthy} />
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.queueDetails.awaiting_messages}</p>
                        <span>&nbsp;</span>
                        <p className="title">Awaiting messages</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.queueDetails.average_message_size}Mb</p>
                        <span>&nbsp;</span>
                        <p className="title">Av. message size</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.queueDetails.memory}Mb/80Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.queueDetails.memory / 80) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.queueDetails.memory / 80) * 100} size="small" />
                        <p className="title">Mem</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.queueDetails.cpu}%</p>
                        <Progress
                            showInfo={false}
                            status={(state.queueDetails.cpu / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.queueDetails.cpu / 100) * 100} size="small" />
                        <p className="title">CPU</p>
                    </div>
                </div>
                <div className="details-wrapper awaiting-messages">
                    <div className="icon">
                        <p>icon</p>
                    </div>
                    <div className="more-details">
                        <p className="number">{state.queueDetails.storage}Mb/100Mb</p>
                        <Progress
                            showInfo={false}
                            status={(state.queueDetails.storage / 100) * 100 > 60 ? 'exception' : 'success'}
                            percent={(state.queueDetails.storage / 100) * 100} size="small" />
                        <p className="title">Storage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelDashboardHeader;