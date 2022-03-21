import './style.scss';

import React, { useState } from 'react';
import ApexChart from './apexChart';

const Resources = () => {
    const [resourcesTotal, setResources] = useState([
        { resource: 'CPU', usage: 50, total: 100, units: 'Mb' },
        { resource: 'Mem', usage: 75, total: 100, units: 'Mb' },
        { resource: 'Storage', usage: 25, total: 100, units: 'Mb' }
    ]);

    return (
        <div className="overview-wrapper resources-container">
            <p className="overview-components-header">Resources</p>
            {resourcesTotal &&
                resourcesTotal.map((res) => {
                    return (
                        <div className="resource" key={res.resource}>
                            <ApexChart data={res} />
                            <p>{`${res.usage}${res.units}/${res.total}${res.units}`}</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default Resources;
