import './style.scss';

import React from 'react';

import FunctionsOverview from '../../../../components/functionsOverview';

const functions = [
    {
        _id: 1,
        name: 'sveta sveta sveta sveta sveta sveta sveta sveta',
        type: 'blabl'
    },
    {
        _id: 2,
        name: 'sveta2',
        type: 'blabl'
    },
    {
        _id: 3,
        name: 'sveta3',
        type: 'blabl'
    },
    {
        _id: 4,
        name: 'sveta2',
        type: 'blabl'
    },
    {
        _id: 5,
        name: 'sveta3',
        type: 'blabl'
    },
    {
        _id: 6,
        name: 'sveta2',
        type: 'blabl'
    },
    {
        _id: 7,
        name: 'sveta3',
        type: 'blabl'
    }
];

const FactoryOverview = () => {
    return (
        <div className="factory-overview-container">
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

export default FactoryOverview;
