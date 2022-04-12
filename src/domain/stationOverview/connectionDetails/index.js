import './style.scss';

import React, { useState } from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';
import SelectComponent from '../../../components/select';
import { CopyBlock, atomOneLight } from 'react-code-blocks';

const ConnectionDetails = () => {
    const connectionDetails = {
        host: 'https://stream-staging.strech.io/json/2a0f1f21-cd0d-4a1b-9538-f938e2eed8cd',
        AuthType: 'Api key',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };

    const [open, modalFlip] = useState(false);
    const selectLngOption = ['Node.js'];
    const [langSelected, setLangSelected] = useState('Node.js');
    const value =
        "var AWS = require('aws-sdk');\n// Set the Region\nAWS.config.update({region: 'us-west-2'});\n// Create DynamoDB service object\nvar ddb = new AWS.DynamoDB{apiVersion: '2006-03-01'});\n\n// Call DynamoDB to retrieve the list of tables\n                            ddb.listTables({Limit:10}, function(err, data) {\nif (err) {\nconsole.log('Error', err.code);\n} else {\nconsole.log('Tables names are ', data.TableNames);\n}\n});";
    const handleSelectLang = (e) => {
        setLangSelected(e);
    };
    return (
        <div className="connection-details-container">
            <p className="title">Connection details</p>
            <div className="connections-details">
                <h1 className="host">
                    Host:<a>{connectionDetails.host}</a>
                </h1>
                <div className="sdk-btn">
                    <Button
                        width="180px"
                        height="39px"
                        placeholder="SDK"
                        colorType="purple"
                        radiusType="circle"
                        backgroundColorType="none"
                        fontSize="12px"
                        fontWeight="600"
                        border="purple"
                        onClick={() => modalFlip(true)}
                    />
                </div>
            </div>
            <Modal header="SDK" minHeight="740px" minWidth="500px" closeAction={() => modalFlip(false)} clickOutside={() => modalFlip(false)} open={open} hr={false}>
                <div className="sdk-details-container">
                    <div className="select-lan">
                        <p>Language</p>
                        <SelectComponent
                            value={langSelected}
                            colorType="navy"
                            backgroundColorType="none"
                            borderColorType="gray"
                            radiusType="semi-round"
                            width="220px"
                            height="50px"
                            options={selectLngOption}
                            onChange={(e) => handleSelectLang(e)}
                            dropdownClassName="select-options"
                        />
                    </div>
                    <div className="installation">
                        <p>Installation</p>
                        <div className="install-copy">
                            <p>Npm install memphis</p>
                        </div>
                    </div>
                    <div className="code-example">
                        <p>which should output something like</p>
                        <div className="code-content">
                            <CopyBlock language={'jsx'} text={value} showLineNumbers={true} theme={atomOneLight} wrapLines={true} codeBlock />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectionDetails;
