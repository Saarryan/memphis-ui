import './auditing.scss'
import React, { useState } from 'react'
import CustomTabs from '../../../../components/Tabs/tabs';
import GenericList from './genericList/genericList';

const auditColumns = [
    {
        title: 'Log message',
        dataIndex: 'data',
        className: 'column_table',
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {text}
            </div>
        ),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        className: 'column_table',
        ellipsis: true,
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                {text}
            </div>
        ),
    },
    {
        title: 'Source',
        dataIndex: 'source',
        className: 'column_table',
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                {text}
            </div>
        ),
    },
];

const messagesColumns = [
    {
        title: 'Publisher',
        dataIndex: 'publisher',
        className: 'column_table',
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '200px' }}>
                {text}
            </div>
        ),
    },
    {
        title: 'Subscriber',
        dataIndex: 'subscriber',
        className: 'column_table',
        ellipsis: true,
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '200px' }}>
                {text}
            </div>
        ),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        className: 'column_table',
        render: (text, record) => (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                {text}
            </div>
        ),
    },
];

const auditRows = [
    {
        key: '1',
        data: 'Avraham created a project with three factories',
        date: '12/02/22',
        source: 'Logeer'
    },
    {
        key: '2',
        data: 'Avraham updated a factory, id:"123456" ',
        date: '12/02/22',
        source: 'Logeer'
    },
    {
        key: '3',
        data: 'Idan created a factory',
        date: '12/02/22',
        source: 'Logeer'
    },
    {
        key: '4',
        data: 'Sveta created a factory',
        date: '12/02/22',
        source: 'Logeer'
    },
    {
        key: '5',
        data: 'Yaniv created a factory',
        date: '12/02/22',
        source: 'Logeer'
    },
];

const messagesRows = [
    {
        key: '1',
        publisher: 'external apllication',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"channel":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697","text":"Hello, world!","ts":"1355517523.000005","edited":{"user":"U2147483697","ts":"1358878755.000001"}}}'
    },
    {
        key: '2',
        publisher: 'kafka connector',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"channel":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697","text":"Hello, world!","ts":"1355517523.000005"}}'
    },
    {
        key: '3',
        publisher: 'SalesForce connector',
        subscriber: 'external apllication',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"channel":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697"}}'
    },
    {
        key: '4',
        publisher: 'external apllication',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"channel":"C2147483705","ts":"1358878755.000001"}'
    },
    {
        key: '5',
        publisher: 'external apllication',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"channel":"C2147483705","ts":"1358878755.000001"}'
    },
];

const Auditing = () => {
    const [value, setValue] = useState(0);
    const tabs = ['Audit', 'Messages']

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="auditing-container">
            <CustomTabs
                value={value}
                onChange={handleChangeMenuItem}
                tabs={tabs}
            >
            </CustomTabs>
            <div className="auditing-body">
                {value === 0 && <GenericList
                    columns={auditColumns}
                    rows={auditRows} />}
                {value === 1 && <GenericList
                    columns={messagesColumns}
                    rows={messagesRows} />}
            </div>
        </div>
    );
}

export default Auditing;