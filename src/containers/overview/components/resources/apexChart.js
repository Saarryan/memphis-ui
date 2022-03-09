

import React from 'react';
import ApexCharts from 'apexcharts'
import ReactApexChart from "react-apexcharts"

export default function ApexChart(props) {
    const series = [props.data.usage / props.data.total * 100]

    const options = {
        chart: {
            // height: 350,
            type: 'radialBar',
        },
        fill: {
            type: 'solid',
            colors: ['#5A4FE5']
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: 60,
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '12px',
                        fontFamily: undefined,
                        fontWeight: 400,
                        color: "#1D1D1D",
                        offsetY: 5,

                    },
                    value: {
                        show: false,
                    },
                }
            },

        },
        labels: [props.data.resource],

    };


    return (
        <div className="chart" style={{ display:"flex", justifyContent:"flex-end"}}>
            <ReactApexChart options={options} series={series} type="radialBar" width={180} />
        </div>
    );
}


