import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import ContentTab from './ContentTab';
import AudienceTab from './AudienceTab';
import EngagementTab from './EngagementTab';
import EarningsTab from './EarningsTab';
import TabView from '../../components/TabView';
import SettingsHeading2 from '../../components/Headers/settingsHeading2';

const WriterAnalyticsPage = () => {
    const [timeRange, setTimeRange] = useState('7d');
    const tabs = [
        { key: 'overview', label: 'Overview', icon: 'stats-chart-outline', component: OverviewTab },
        { key: 'content', label: 'Content', icon: 'document-text-outline', component: ContentTab },
        { key: 'audience', label: 'Audience', icon: 'people-outline', component: AudienceTab },
        { key: 'engagement', label: 'Engagement', icon: 'chatbubbles-outline', component: EngagementTab },
        { key: 'earnings', label: 'Earnings', icon: 'cash-outline', component: EarningsTab },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SettingsHeading2 title='Channel Analytics' desc='Insights and performance metrics for your content' >
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg  cursor-pointer bg-neutral-100 dark:bg-neutral-800 dark:text-white text-sm"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="12m">Last 12 months</option>
                        <option value="all">All time</option>
                    </select>
                </div>
            </SettingsHeading2>
            <TabView tabs={tabs} />
        </div>
    );
};

export default WriterAnalyticsPage;