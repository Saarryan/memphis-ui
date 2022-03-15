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
        status: 2
    },
    {
        key: '3',
        name: 'xxx',
        appName: 'SalesForce connector',
        status: 2
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
            <p className='dashboard-components-header'>Un-Healthy factories</p>
            <div className='factories-err-message'>
                <ErrorSharpIcon
                    className="err-icon"
                    theme="outlined"
                />
                <p>For 5/23 factories, there may be a problem</p>
            </div>
            <div className='err-factories-list'>
                <div className='coulmns-table'>
                    <span style={{ 'width': '200px' }}>Name</span>
                    <span style={{ 'width': '200px' }}>Application name</span>
                    <span style={{ 'width': '100px' }}>Status</span>
                    <span style={{ 'width': '100px' }}></span>
                </div>
                <div className='rows-wrapper'>
                    {data.map((factory, index) => {
                        return (
                            <div className='factory-row' key={index}>
                                <span style={{ 'width': '200px' }}>{factory.name}</span>
                                <span style={{ 'width': '200px' }}>{factory.appName}</span>
                                {factory.status === 1 &&
                                    <span style={{ 'width': '100px' }}>
                                        <div className='dot green'></div>
                                        In action
                                    </span>
                                }
                                {factory.status === 2 &&
                                    <span style={{ 'width': '100px' }}>
                                        <div className='dot yellow'></div>
                                        On idle
                                    </span>
                                }
                                <span className='link-row' style={{ 'width': '100px' }}>Go to queue</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default FailedFactories;