import './style.scss';

import React from 'react';

import Button from '../../../components/button';

const ConnectionDetails = () => {
    const connectionDetails = {
        host: 'https://stream-staging.strech.io/json/2a0f1f21-cd0d-4a1b-9538-f938e2eed8cd',
        AuthType: 'Api key',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };

    const openSdkModal = () => {};
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
                        onClick={() => openSdkModal()}
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default ConnectionDetails;
