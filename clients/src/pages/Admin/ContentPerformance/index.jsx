import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OverviewTab from './OverviewTab';
import TopContentTab from './TopContentTab';
import EngagementTab from './EngagementTab';
import TrendsTab from './TrendsTab';
import TabView from '../../../components/TabView';
import Stats from './Stats';
import AdminHeading from '../../../components/Headers/AdminHeading';
import { Datepicker } from '../../../components/Inputs/simpleInputs';

const ContentPerformancePage = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [filter, setFilter] = useState('all');
    const tabs = [
        {
            key: 'overview',
            label: 'Overview',
            component: OverviewTab,
        },
        {
            key: 'top-content',
            label: 'Top Content',
            component: TopContentTab,
        },
        {
            key: 'engagement',
            label: 'Engagement',
            component: EngagementTab,
        },
        {
            key: 'trends',
            label: 'Trends',
            component: TrendsTab,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminHeading title='Content Performance' desc='Analyze and optimize your content strategy'>
                <Datepicker startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            </AdminHeading>
            <Stats />
            <TabView tabs={tabs} defaultTab='overview'>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="text-sm font-medium">Filter by:</div>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    >
                        All Content
                    </button>
                    <button
                        onClick={() => setFilter('published')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setFilter('drafts')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'drafts' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    >
                        Drafts
                    </button>
                    <button
                        onClick={() => setFilter('article')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'article' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    >
                        Articles
                    </button>
                    <button
                        onClick={() => setFilter('tutorial')}
                        className={`px-3 py-1 rounded-full text-sm ${filter === 'tutorial' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    >
                        Tutorials
                    </button>
                </div>
            </TabView>
        </div>
    );
};

export default ContentPerformancePage;