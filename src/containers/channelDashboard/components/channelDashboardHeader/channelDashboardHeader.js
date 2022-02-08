import "./channelDashboardHeader.scss"
import React from "react"


const ChannelDashboardHeader = () => {
    const queueName = "temporary name";
    return (
        <div className="channel-Dashboard-header">
            <p>Overview - {queueName}</p>
            <div className="details">
                <div className="main-details">
                    
                </div>
            </div>
        </div>
    );
}

export default ChannelDashboardHeader;