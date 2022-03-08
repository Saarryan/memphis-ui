import './sysComponents.scss'
import React, { useState } from 'react'
import { Divider } from "@material-ui/core";
import HealthyBadge from '../../../../components/healthyBadge/healthyBadge'

const SysComponents = () => {

    const [sysComponents, setSysComponents] = useState([
        { podName: "Database", pods: "2/3", status: "healthy" },
        { podName: "Backend", pods: "3/3", status: "unhealthy" },
        { podName: "Workers", pods: "1/3", status: "risky" },
        { podName: "Database", pods: "3/3", status: "healthy" },
    ])
    // const [sysComponents, setSysComponents] = useState(null)

    return (
        <div className='dashboard-wrapper sys-components-container'>
            <p>sys Components</p>
            <div className='sys-components sys-components-header'>
                <p>Pod name</p>
                <p>Pods</p>
                <p>Status</p>
            </div>
            {!sysComponents && <Divider />}
            {sysComponents && sysComponents.map(comp => {
                return <div key={comp.podName}>
                    <Divider />
                    <div className='sys-components'>
                        <p>{comp.podName}</p>
                        <p>{comp.pods}</p>
                        <p><HealthyBadge healthy={comp.status==="healthy"}/></p>
                    </div>
                    
                </div>
            })}

        </div>
    );
}

export default SysComponents;