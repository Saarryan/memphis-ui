import './style.scss';

import React, { useState } from 'react';

import { Divider } from 'antd';

import Integrations from './integrations';
import CustomTabs from '../../components/Tabs';
import Profile from './profile';
import Alerts from './alerts';

function Users() {
    const [value, setValue] = useState(0);
    // const tabs = ['Profile', 'Integrations', 'Alerts'];
    const tabs = ['Profile'];

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="settings-container">
            <h1 className="main-header-h1">Settings</h1>
            <div className="settings-panel-body">
                <div>
                    <CustomTabs value={value} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
                    <Divider />
                </div>
            </div>
            <div className="settings-panel-body">
                {value === 0 && <Profile />}
                {value === 1 && <Integrations />}
                {value === 2 && <Alerts />}
            </div>
        </div>
    );
}
export default Users;
