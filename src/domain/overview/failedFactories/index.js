import './style.scss';

import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import React, { useState } from 'react';
import comingSoonBox from '../../../assets/images/comingSoonBox.svg';

const data = [
    {
        key: '1',
        name: 'Memphis_Collector',
        factoryName: 'Memphis_sys',
        status: 1
    },
    {
        key: '2',
        name: 'S3_Enrichment',
        factoryName: 'Image_connector',
        status: 2
    },
    {
        key: '3',
        name: 'Event_Processing',
        factoryName: 'EntryFace',
        status: 2
    },
    {
        key: '4',
        name: 'Api_To_BigQuery',
        factoryName: 'Collector',
        status: 1
    },
    {
        key: '5',
        name: 'Logs',
        factoryName: 'Users_Journey',
        status: 1
    }
];
const FailedFactories = () => {
    return (
        <div className="overview-wrapper failed-factories-container">
            <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <p className="overview-components-header">Un-Healthy stations</p>
            <div className="factories-err-message">
                <ErrorSharpIcon className="err-icon" theme="outlined" />
                <p>For 5/23 stations, there may be a problem</p>
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
                                    Go to station
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
