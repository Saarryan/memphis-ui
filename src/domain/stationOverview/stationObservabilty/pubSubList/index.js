import './style.scss';

import React from 'react';

import OverflowTip from '../../../../components/tooltip/overflowtip';
import comingSoonBox from '../../../../assets/images/comingSoonBox.svg';
import infoIcon from '../../../../assets/images/infoIcon.svg';

const data = [
    {
        key: '1',
        name: 'xxx',
        type: 'Externl factory'
    },
    {
        key: '2',
        name: 'xxx',
        type: 'Kafka connector'
    },
    {
        key: '3',
        name: 'xxx',
        type: 'SalesForce connector'
    },
    {
        key: '4',
        name: 'xxx',
        type: 'Externl factory'
    },
    {
        key: '5',
        name: 'xxx',
        type: 'SalesForce connector'
    },
    {
        key: '6',
        name: 'xxx',
        type: 'Externl factory'
    },
    {
        key: '7',
        name: 'xxx',
        type: 'Externl factory'
    },
    {
        key: '8',
        name: 'xxx',
        type: 'Kafka connector'
    },
    {
        key: '9',
        name: 'xxx',
        type: 'Externl factory'
    },
    {
        key: '10',
        name: 'xxx',
        type: 'Externl factory'
    }
];

const PubSubList = (props) => {
    return (
        <div className="pubSub-list-container">
            <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <div className="header">
                <p className="title">{props.publishers ? 'Publishers' : 'Subscribers'}</p>
                <p className="add-connector-button">{props.publishers ? 'Add publishers' : 'Add subscribers'}</p>
            </div>
            <div className="coulmns-table">
                <span style={{ width: '150px' }}>Name</span>
                <span style={{ width: '200px' }}>Factory type</span>
                <span style={{ width: '60px' }}></span>
            </div>
            <div className="rows-wrapper">
                {data.map((row, index) => {
                    return (
                        <div className="pubSub-row" key={index}>
                            <OverflowTip text={row.name} width={'150px'}>
                                {row.name}
                            </OverflowTip>
                            <OverflowTip text={row.type} width={'200px'}>
                                {row.type}
                            </OverflowTip>
                            <span className="link-row" style={{ width: '60px' }}>
                                <img src={infoIcon} />
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PubSubList;
