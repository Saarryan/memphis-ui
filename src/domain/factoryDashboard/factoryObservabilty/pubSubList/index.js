import './style.scss';

import React from 'react';
import { Table, Tag, Space } from 'antd';

import infoIcon from '../../../../assets/images/infoIcon.svg';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        className: 'column_table',
        render: (text, record) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '40px' }}>{text}</div>
    },
    {
        title: 'Application type',
        dataIndex: 'type',
        className: 'column_table',
        ellipsis: true,
        render: (text, record) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '60px' }}>{text}</div>
    },
    {
        title: '',
        key: 'action',
        className: 'column_table',
        render: (text, record) => (
            <Space size="small">
                <a>
                    <img src={infoIcon} />
                </a>
            </Space>
        )
    }
];

const data = [
    {
        key: '1',
        name: 'xxx',
        type: 'Externl application'
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
        type: 'Externl application'
    },
    {
        key: '5',
        name: 'xxx',
        type: 'SalesForce connector'
    },
    {
        key: '6',
        name: 'xxx',
        type: 'Externl application'
    },
    {
        key: '7',
        name: 'xxx',
        type: 'Externl application'
    },
    {
        key: '8',
        name: 'xxx',
        type: 'Kafka connector'
    },
    {
        key: '9',
        name: 'xxx',
        type: 'Externl application'
    },
    {
        key: '10',
        name: 'xxx',
        type: 'Externl application'
    }
];

const PubSubList = (props) => {
    return (
        <div className="pubSub-list-container">
            <div className="header">
                <p className="title">{props.publishers ? 'Publishers' : 'Subscribers'}</p>
                <p className="add-connector-button">{props.publishers ? 'Add publishers' : 'Add subscribers'}</p>
            </div>
            <Table
                className="pub-sub-table"
                columns={columns}
                dataSource={data}
                size="small"
                pagination={false}
                tableLayout="auto"
                scroll={{ y: 300 }}
                onRow={(record, rowIndex) => {
                    if (rowIndex % 2 != 0) {
                        return {
                            className: 'odd'
                        };
                    }
                }}
            />
            {/* <VirtualTable
                columns={columns}
                dataSource={data}
                scroll={{
                    y: 300
                    
                }}
            /> */}
        </div>
    );
};

export default PubSubList;
