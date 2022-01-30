
import React, { useState } from "react";
import Switcher from "../../../../components/switcher/switcher"
import "../../settings.scss"
import "./integrations.scss";

const Integrations = () => {
    const [hubIntegration, setHubIntegration] = useState(false)
    const [slackIntegration, setSlackIntegration] = useState(false)
    return (
        <div className="alerts-integrations-container">
            <h3 className="title">Some sentence</h3>
            <div>
                <div className="hub-connect-integration">
                    <div className="alert-integration-type">
                        <label className="integration-label-bold">Strech hub
                        </label>
                        <Switcher
                            onChange={() => setHubIntegration(!hubIntegration)}
                            checked={hubIntegration} checkedChildren="on" unCheckedChildren="off"
                        />
                    </div>
                    {!hubIntegration && <p>Signin placeholder</p>}
                </div>
                <div className="alert-integration-type">
                    <label className="alert-integration-label">Slack
                    </label>
                    <Switcher
                        onChange={() => setSlackIntegration(!slackIntegration)}
                        checked={slackIntegration} checkedChildren="on" unCheckedChildren="off"
                    />
                </div>
            </div>
        </div>
    );
}

export default Integrations;