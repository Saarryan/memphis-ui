import './style.scss';

import React from 'react';

import FunctionsOverview from '../../../../components/functionsOverview';
import comingSoonBox from '../../../../assets/images/comingSoonBox.svg';

const functions = [
    {
        _id: 1,
        name: 'Sentiment Analysis',
        type: 'blabl'
    },
    {
        _id: 2,
        name: 'Clustering',
        type: 'blabl'
    },
    {
        _id: 3,
        name: 'Anomaly Detection',
        type: 'blabl'
    },
    {
        _id: 3,
        name: 'Regression',
        type: 'blabl'
    }
];

const FunctionsBox = () => {
    return (
        <div className="functions-box-container">
            <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <div className="header">
                <p className="title">Factory</p>
                <p className="add-functions-button">Add functions</p>
            </div>
            <div className="function-list">
                <FunctionsOverview functions={functions} horizontal={false} editable={false} />
            </div>
        </div>
    );
};

export default FunctionsBox;
