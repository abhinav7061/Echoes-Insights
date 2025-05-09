import React from 'react'
import Tabs from '../../../components/TabView/Tabs';

const TimeframeSelector = ({ timeframe, setTimeframe }) => {
    const timeframeTabs = [
        { key: '7d', label: 'Last 7 Days' },
        { key: '30d', label: 'Last 30 Days' },
        { key: '90d', label: 'Last 90 Days' },
        { key: 'custom', label: 'Custom Range' },
    ];
    return (
        <Tabs
            tabs={timeframeTabs}
            activeTab={timeframe}
            handleTabChange={setTimeframe}
        />
    )
}

export default TimeframeSelector