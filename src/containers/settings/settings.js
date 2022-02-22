import React, { useState } from "react";

import Profile from "./components/profile/profile";
import Integrations from "./components/integrations/integrations";
import Alerts from "./components/alerts/alerts";
import "./settings.scss";
import CustomTabs from "../../components/Tabs/tabs";



function Users() {
    const [value, setValue] = useState(0);
    const tabs = ['Profile', 'Integrations', 'Alerts']

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <h1 className="main-header-h1">Settings</h1>
            <div className="settings-panel-body">
                <div style={{ width: "fit-content" }}>
                    <CustomTabs
                        value={value}
                        onChange={handleChangeMenuItem}
                        tabs={tabs}
                    >
                    </CustomTabs>
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
