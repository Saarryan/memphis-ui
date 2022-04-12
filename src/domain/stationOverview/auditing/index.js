import './style.scss';

import React, { useState } from 'react';

import CustomTabs from '../../../components/Tabs';
import GenericList from './genericList';
import { Divider } from 'antd';
import comingSoonBox from '../../../assets/images/comingSoonBox.svg';

const auditColumns = [
    {
        key: '1',
        title: 'Log message',
        width: '250px'
    },
    {
        key: '2',
        title: 'Source',
        width: '250px'
    },
    {
        key: '3',
        title: 'Date',
        width: '200px'
    }
];

const messagesColumns = [
    {
        key: '1',
        title: 'Publisher',
        width: '250px'
    },
    {
        key: '2',
        title: 'Subscriber',
        width: '250px'
    },
    {
        key: '3',
        title: 'Date',
        width: '200px'
    }
];

const auditRows = [
    {
        key: '1',
        logData: 'Avraham created a project with three factories',
        date: '12/02/22',
        source: 'Loger'
    },
    {
        key: '2',
        logData: 'Avraham updated a factory, id:"123456" ',
        date: '12/02/22',
        source: 'Loger'
    },
    {
        key: '3',
        logData: 'Idan created a factory',
        date: '12/02/22',
        source: 'Loger'
    },
    {
        key: '4',
        logData: 'Sveta created a factory',
        date: '12/02/22',
        source: 'Loger'
    }
];

const messagesRows = [
    {
        key: '1',
        publisher: 'external apllication',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"factory":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697","text":"Hello, world!","ts":"1355517523.000005","edited":{"user":"U2147483697","ts":"1358878755.000001"}}}'
    },
    {
        key: '2',
        publisher: 'kafka connector',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"factory":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697","text":"Hello, world!","ts":"1355517523.000005"}}'
    },
    {
        key: '3',
        publisher: 'SalesForce connector',
        subscriber: 'external apllication',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"factory":"C2147483705","ts":"1358878755.000001","message":{"type":"message","user":"U2147483697"}}'
    },
    {
        key: '4',
        publisher: 'external apllication',
        subscriber: 'kafka connector',
        date: '12/02/22',
        data: '{"type":"message","subtype":"message_changed","hidden":true,"factory":"C2147483705","ts":"1358878755.000001"}'
    }
];

const Auditing = () => {
    const [value, setValue] = useState(0);
    const tabs = ['Audit', 'Messages'];

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="auditing-container">
            <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <CustomTabs value={value} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
            <Divider />
            <div className="auditing-body">
                {value === 0 && <GenericList columns={auditColumns} rows={auditRows} />}
                {value === 1 && <GenericList columns={messagesColumns} rows={messagesRows} />}
            </div>
        </div>
    );
};

export default Auditing;
