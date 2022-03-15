import "./throughput.scss"

import React from "react"
import ApexChart from "./areaChart"

const Throughput = () => {
    return (
        <div className="throughput-container">
            <p className="title">Throughput</p>
            <ApexChart/>
        </div>
    );
}

export default Throughput;