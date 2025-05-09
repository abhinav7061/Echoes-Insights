import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewTab from './OverviewTab';
import AcquisitionTab from './AcquisitionTab';
import RetentionTab from './RetentionTab';
import SegmentsTab from './SegmentsTab';
import TabView from '../../../components/TabView';
import AdminHeading from '../../../components/Headers/AdminHeading';
import { Datepicker } from '../../../components/Inputs/simpleInputs';

const UserGrowthPage = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const userStats = {
        totalUsers: 12480,
        newThisMonth: 1420,
        activeToday: 842,
        retentionRate: '62%'
    };

    const tabs = [
        { label: 'Overview', key: 'overview', component: OverviewTab, },
        { label: 'Acquisition', key: 'acquisition', component: AcquisitionTab, },
        { label: 'Retention', key: 'retention', component: RetentionTab, },
        { label: 'Segments', key: 'segments', component: SegmentsTab, },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminHeading title='User Growth Analytics' desc='Track and analyze your user acquisition and retention' >
                <Datepicker startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
            </AdminHeading>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Users</p>
                    <p className="text-2xl font-semibold">{userStats.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+12.5% from last month</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">New This Month</p>
                    <p className="text-2xl font-semibold">{userStats.newThisMonth.toLocaleString()}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8.3% from last month</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Today</p>
                    <p className="text-2xl font-semibold">{userStats.activeToday.toLocaleString()}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">3.2% from total</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">7-Day Retention</p>
                    <p className="text-2xl font-semibold">{userStats.retentionRate}</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">+2.1% from last week</p>
                </div>
            </div>
            <TabView tabs={tabs} defaultTab="overview" />
        </div>
    );
};

export default UserGrowthPage;