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
            <div className="charts-wrapper">
                {resourcesTotal &&
                    resourcesTotal.map((res) => {
                        return (
                            <div className="resource" key={res.resource}>
                                <ApexChart data={res} className="chart" />
                                <p className="chart-data">{`${res.usage}${res.units}/${res.total}${res.units}`}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Resources;
