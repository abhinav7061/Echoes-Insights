import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Stats from './Stats';
import OverviewTab from './OverviewTab';
import ContentTab from './ContentTab';
import SegmentsTab from './SegmentsTab';
import TrendsTab from './TrendsTab';
import TabView from '../../../components/TabView';
import TimeframeSelector from './TimeframeSelector';
import AdminHeading from '../../../components/Headers/AdminHeading';
import { Datepicker } from '../../../components/Inputs/simpleInputs';

const EngagementMetricsPage = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [timeframe, setTimeframe] = useState('7d');
    const tabs = [
        {
            key: 'overview',
            label: 'Overview',
            component: OverviewTab,
        },
        {
            key: 'content',
            label: 'By Content',
            component: ContentTab,
        },
        {
            key: 'segments',
            label: 'By Segments',
            component: SegmentsTab,
        },
        {
            key: 'trends',
            label: 'Trends',
            component: TrendsTab,
        },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminHeading title='Engagement Metrics' desc='Analyze how users interact with your content'>
                <Datepicker startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            </AdminHeading>
            <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
            <Stats />
            <TabView tabs={tabs} defaultTab="overview" />
        </div>
    );
};

export default EngagementMetricsPage;