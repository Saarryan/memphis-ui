import './style.scss';

import { Divider } from '@material-ui/core';
import React, { useState } from 'react';
import comingSoonBox from '../../../assets/images/comingSoonBox.svg';

import HealthyBadge from '../../../components/healthyBadge';

const SysComponents = () => {
    const [sysComponents, setSysComponents] = useState([
        { podName: 'Database', pods: '3/3', status: 'healthy' },
        { podName: 'UI', pods: '3/3', status: 'healthy' },
        { podName: 'Control-plane', pods: '2/3', status: 'risky' },
        { podName: 'Broker', pods: '1/3', status: 'unhealthy' }
    ]);

    return (
        <div className="overview-wrapper sys-components-container">
            <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <p className="overview-components-header">System components</p>
            <div className="sys-components sys-components-header">
                <p>Pod name</p>
                <p>Pods</p>
                <p>Status</p>
            </div>
            {!sysComponents && <Divider />}
            <div className="component-list">
                {sysComponents &&
                    sysComponents.map((comp, i) => {
                        return (
                            <div key={`${comp.podName}${i}`}>
                                <Divider />
                                <div className="sys-components">
                                    <p>{comp.podName}</p>
                                    <p>{comp.pods}</p>
                                    <HealthyBadge status={comp.status} />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default SysComponents;
