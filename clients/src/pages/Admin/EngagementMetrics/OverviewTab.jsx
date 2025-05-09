import React, { useState } from 'react'
import { LineChart, BarChart } from '../../../components/Charts';


const OverviewTab = () => {
    const [exportLoading, setExportLoading] = useState(false);
    const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Read Rate',
                data: [55, 58, 62, 60, 65, 68],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Like Rate',
                data: [12, 14, 15, 13, 16, 18],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Share Rate',
                data: [4, 5, 6, 5, 7, 8],
                borderColor: 'rgba(245, 158, 11, 1)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    };

    const contentTypeEngagement = {
        labels: ['Articles', 'Tutorials', 'Courses', 'Guides'],
        datasets: [
            {
                label: 'Engagement Rate %',
                data: [65, 72, 58, 63],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(245, 158, 11, 0.7)'
                ]
            }
        ]
    };

    const topEngagingContent = [
        { id: 1, title: 'Advanced React Patterns', engagementRate: '72%', readTime: '6.2 min', type: 'article' },
        { id: 2, title: 'CSS Grid Complete Guide', engagementRate: '68%', readTime: '5.8 min', type: 'tutorial' },
        { id: 3, title: 'TypeScript for Beginners', engagementRate: '65%', readTime: '7.1 min', type: 'course' },
        { id: 4, title: 'State Management Comparison', engagementRate: '63%', readTime: '8.4 min', type: 'article' },
        { id: 5, title: 'Node.js Best Practices', engagementRate: '61%', readTime: '9.0 min', type: 'guide' }
    ];

    const handleExport = async (format) => {
        setExportLoading(true);
        // Simulate export
        await new Promise(resolve => setTimeout(resolve, 1500));
        setExportLoading(false);
        console.log(`Exporting ${format} report`);
    };

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Engagement Trends</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleExport('png')}
                            className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            Export PNG
                        </button>
                        <button
                            onClick={() => handleExport('csv')}
                            className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                            {exportLoading ? 'Exporting...' : 'Export CSV'}
                        </button>
                    </div>
                </div>
                <div className="h-96">
                    <LineChart data={trendData} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Engagement by Content Type</h2>
                    <div className="h-64">
                        <BarChart data={contentTypeEngagement} />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Top Engaging Content</h2>
                    <div className="space-y-3">
                        {topEngagingContent.map((content, index) => (
                            <div key={content.id} className="flex items-center justify-between p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{index + 1}</span>
                                    <div>
                                        <p className="text-sm font-medium">{content.title}</p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">{content.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">{content.engagementRate}</span>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{content.readTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab