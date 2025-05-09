import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, Title);

const ScatterChart = ({ data, options, title }) => {

    const defaultOptions = {
        responsive: true,
        plugins: {
            title: {
                display: !!title,
                text: title,
                font: { size: 18 }
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'X Axis'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis'
                }
            }
        }
    };

    return <Scatter data={data} options={options || defaultOptions} />;
};

export default ScatterChart;
