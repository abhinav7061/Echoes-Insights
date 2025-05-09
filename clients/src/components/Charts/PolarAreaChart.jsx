// components/PolarAreaChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({ data, options }) => {
    return <PolarArea data={data} options={options} />;
};

export default PolarAreaChart;
