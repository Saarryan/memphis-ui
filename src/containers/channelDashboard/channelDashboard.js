import "./channelDashboard.scss"
import React from "react"
import ChannelDashboardHeader from "./components/channelDashboardHeader/channelDashboardHeader";
import QueueObservabilty from "./components/queueObservabilty/queueObservabilty";
import ConnectionDetails from "./components/connectionDetails/connectionDetails";
import Auditing from "./components/auditing/auditing";
import Throughput from "./components/throughput/throughput";


const ChannelDashboard = () => {
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
}

export default ChannelDashboard;