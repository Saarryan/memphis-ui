import './style.scss';

import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import React, { useState } from 'react';

const data = [
    {
        key: '1',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    },
    {
        key: '2',
        name: 'xxx',
        factoryName: 'Kafka connector',
        status: 2
    },
    {
        key: '3',
        name: 'xxx',
        factoryName: 'SalesForce connector',
        status: 2
    },
    {
        key: '4',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    },
    {
        key: '5',
        name: 'xxx',
        factoryName: 'SalesForce connector',
        status: 1
    },
    {
        key: '6',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    },
    {
        key: '7',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    },
    {
        key: '8',
        name: 'xxx',
        factoryName: 'Kafka connector',
        status: 1
    },
    {
        key: '9',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    },
    {
        key: '10',
        name: 'xxx',
        factoryName: 'Externl factory',
        status: 1
    }
];
const FailedFactories = () => {
    return (
        <div className="overview-wrapper failed-factories-container">
            <p className="overview-components-header">Un-Healthy factories</p>
            <div className="factories-err-message">
                <ErrorSharpIcon className="err-icon" theme="outlined" />
                <p>For 5/23 factories, there may be a problem</p>
            </div>
            <div className="err-factories-list">
                <div className="coulmns-table">
                    <span style={{ width: '200px' }}>Name</span>
                    <span style={{ width: '200px' }}>Factory name</span>
                    <span style={{ width: '100px' }}>Status</span>
                    <span style={{ width: '100px' }}></span>
                </div>
                <div className="rows-wrapper">
                    {data.map((factory, index) => {
                        return (
                            <div className="factory-row" key={index}>
                                <span style={{ width: '200px' }}>{factory.name}</span>
                                <span style={{ width: '200px' }}>{factory.factoryName}</span>
                                {factory.status === 1 && (
                                    <span style={{ width: '100px' }}>
                                        <div className="dot green"></div>
                                        In action
                                    </span>
                                )}
                                {factory.status === 2 && (
                                    <span style={{ width: '100px' }}>
                                        <div className="dot yellow"></div>
                                        On idle
                                    </span>
                                )}
                                <span className="link-row" style={{ width: '100px' }}>
                                    Go to factory
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FailedFactories;
