import React from 'react'
import { useNavigate } from 'react-router-dom';
import AdminStatsCard from '../../../components/Cards/AdminStatsCard';
import PieChart from '../../../components/Charts/piechart';
import LineChart from '../../../components/Charts/linechart';

const quickReports = [
    { iconName: "people-outline", label: "User Growth Report", path: "/admin/user-growth" },
    { iconName: "document-text-outline", label: "Content Performance", path: "/admin/content-performance" },
    { iconName: "pulse-outline", label: "Engagement Metrics", path: "/admin/engagement-metrics" },
    { iconName: "download-outline", label: "Export Data", path: "/admin/export-data" }
];

const AnalyticsTab = () => {
    const navigate = useNavigate();
    const analytics = {
        totalUsers: 1248,
        newUsers: 42,
        activeContent: 356,
        reportedContent: 8,
        activeSessions: 1842,
    };
    const trafficSourcesData = {
        labels: ["Direct", "Search", "Social", "Referral"],
        datasets: [
            {
                label: 'Traffic Source',
                data: [24, 16, 68, 29],
                borderColor: 'rgba(139, 92, 246, 1)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    };
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatsCard
                    name="Total Users"
                    value={analytics.totalUsers.toLocaleString()}
                    desc={`+${analytics.newUsers.toLocaleString()} this week`}
                    descClass="text-green-600 dark:text-green-400"
                />
                <AdminStatsCard
                    name="Active Content"
                    value={analytics.activeContent.toLocaleString()}
                    desc="View content report"
                    descClass="text-sky-600 dark:text-sky-400"
                />
                <AdminStatsCard
                    name="Reported Content"
                    value={analytics.reportedContent.toLocaleString()}
                    desc="Needs attention"
                    descClass="text-red-600 dark:text-red-400"
                />
                <AdminStatsCard
                    name="Active Sessions"
                    value={analytics.activeSessions.toLocaleString()}
                    desc="View live dashboard"
                    descClass="text-purple-600 dark:text-purple-400"
                />
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
                <div className='max-h-96'><LineChart data={trafficSourcesData} /></div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickReports.map(({ iconName, label, path }) => (
                        <button
                            key={label}
                            onClick={() => navigate(path)}
                            className="p-4 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors flex items-center gap-3"
                        >
                            <ion-icon name={iconName} className="text-2xl"></ion-icon>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AnalyticsTab