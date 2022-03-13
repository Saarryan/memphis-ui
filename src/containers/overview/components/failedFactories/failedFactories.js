import './failedFactories.scss'
import React, { useState } from 'react'
import ErrorSharpIcon from "@material-ui/icons/ErrorSharp";

const data = [
    {
        key: '1',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    },
    {
        key: '2',
        name: 'xxx',
        appName: 'Kafka connector',
        status: 1
    },
    {
        key: '3',
        name: 'xxx',
        appName: 'SalesForce connector',
        status: 1
    },
    {
        key: '4',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    },
    {
        key: '5',
        name: 'xxx',
        appName: 'SalesForce connector',
        status: 1
    },
    {
        key: '6',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    },
    {
        key: '7',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    },
    {
        key: '8',
        name: 'xxx',
        appName: 'Kafka connector',
        status: 1
    },
    {
        key: '9',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    },
    {
        key: '10',
        name: 'xxx',
        appName: 'Externl application',
        status: 1
    }
];
const FailedFactories = () => {

    return (
        <div className='dashboard-wrapper factories-container'>
            <p className='dashboard-components-header'>Factories</p>
            <div className='factories-err-message'>
                <ErrorSharpIcon
                    className="err-icon"
                    theme="outlined"
                />
                <p>For 5/23 factories, there may be a problem</p>
            </div>
            <div className='err-factories-list'>
                <div className='coulmns-table'>
                    <span>Name</span>
                    <span>Application name</span>
                    <span>Status</span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default FailedFactories;