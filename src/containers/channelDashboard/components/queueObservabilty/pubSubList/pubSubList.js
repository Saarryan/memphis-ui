import "./pubSubList.scss"
import React from "react"


const PubSubList = (props) => {
    return (
        <div className="pubSub-list-container">
            <div className="header">
                <p className="title">{props.publishers ? 'Publishers' : 'Subscribers'}</p>
                <p className="add-connector-button">{props.publishers ? 'Add publishers' : 'Add subscribers'}</p>
            </div>
        </div>
    );
}

export default PubSubList;