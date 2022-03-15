import React, { useState } from 'react';

import Switcher from '../../../components/switcher';

const Alerts = () => {
    const [errorsAlert, setErrorsAlert] = useState(false);
    const [schemaAlert, setSchemaAlert] = useState(false);
    return (
        <div className="alerts-integrations-container">
            <h3 className="title">We will keep an eye on your data streams and alert you if anything went wrong according to the following triggers:</h3>
            <div>
                <div className="alert-integration-type">
                    <label className="alert-label-bold">Errors</label>
                    <Switcher onChange={() => setErrorsAlert(!errorsAlert)} checked={errorsAlert} checkedChildren="on" unCheckedChildren="off" />
                </div>
                <div className="alert-integration-type">
                    <label className="alert-label-bold">Schema has changed</label>
                    <Switcher onChange={() => setSchemaAlert(!schemaAlert)} checked={schemaAlert} checkedChildren="on" unCheckedChildren="off" />
                </div>
            </div>
        </div>
    );
};

export default Alerts;
