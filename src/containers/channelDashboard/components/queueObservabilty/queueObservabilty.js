import "./queueObservabilty.scss"
import React from "react"
import PubSubList from "./pubSubList/pubSubList";
import QueueOverview from "./queueOverview/queueOverview";


const QueueObservabilty = () => {
    return (
        <div className="queue-observabilty-container">
            <div className="pub-list">
                <PubSubList />
            </div>
            <div className="thunnel-from-sub">

            </div>
            <div className="qeueu-overview">
                <QueueOverview />
            </div>
            <div className="thunnel-to-pub">

            </div>
            <div className="sub-list">
                <PubSubList />
            </div>

        </div>
    );
}

export default QueueObservabilty;