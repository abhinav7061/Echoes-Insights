import React from 'react'
import { BarChart, LineChart, PieChart } from '../../../components/Charts';

const OverviewTab = () => {
    const contentPerformance = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            author: 'Alex Johnson',
            type: 'article',
            published: '2023-05-15',
            views: 8420,
            reads: 5120,
            likes: 1240,
            shares: 420,
            comments: 180,
            status: 'published'
        },
        {
            id: 2,
            title: 'CSS Grid Complete Guide',
            author: 'Sarah Williams',
            type: 'tutorial',
            published: '2023-05-10',
            views: 7210,
            reads: 4210,
            likes: 980,
            shares: 310,
            comments: 145,
            status: 'published'
        },
        {
            id: 3,
            title: 'TypeScript for Beginners',
            author: 'Mike Chen',
            type: 'course',
            published: '2023-05-05',
            views: 5320,
            reads: 3120,
            likes: 760,
            shares: 210,
            comments: 95,
            status: 'published'
        },
        {
            id: 4,
            title: 'State Management Comparison',
            author: 'Emma Davis',
            type: 'article',
            published: '2023-04-28',
            views: 4890,
            reads: 2890,
            likes: 640,
            shares: 180,
            comments: 72,
            status: 'published'
        },
        {
            id: 5,
            title: 'Node.js Best Practices',
            author: 'James Wilson',
            type: 'guide',
            published: '2023-04-22',
            views: 4210,
            reads: 2510,
            likes: 520,
            shares: 150,
            comments: 68,
            status: 'draft'
        }
    ];

    const handleExport = (format) => {
        console.log(`Exporting ${format} report`);
        // Implement actual export logic
    };
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Content Performance</h2>
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
                            Export CSV
                        </button>
                    </div>
                </div>
                <div className="h-96">
                    <BarChart
                        data={{
                            labels: contentPerformance.map(item => item.title),
                            datasets: [
                                {
                                    label: 'Views',
                                    data: contentPerformance.map(item => item.views),
                                    backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                },
                                {
                                    label: 'Reads',
                                    data: contentPerformance.map(item => item.reads),
                                    backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                },
                                {
                                    label: 'Likes',
                                    data: contentPerformance.map(item => item.likes),
                                    backgroundColor: 'rgba(245, 158, 11, 0.7)'
                                }
                            ]
                        }}
                        options={{
                            scales: {
                                x: {
                                    stacked: true,
                                },
                                y: {
                                    stacked: true
                                }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Content Types Distribution</h2>
                    <div className="h-64">
                        <PieChart
                            data={{
                                labels: ['Articles', 'Tutorials', 'Courses', 'Guides'],
                                datasets: [
                                    {
                                        data: [45, 25, 15, 15],
                                        backgroundColor: [
                                            'rgba(59, 130, 246, 0.7)',
                                            'rgba(16, 185, 129, 0.7)',
                                            'rgba(139, 92, 246, 0.7)',
                                            'rgba(245, 158, 11, 0.7)'
                                        ]
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Engagement Rate</h2>
                    <div className="h-64">
                        <LineChart
                            data={{
                                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                datasets: [
                                    {
                                        label: 'Engagement Rate %',
                                        data: [55, 58, 62, 60, 65, 68],
                                        borderColor: 'rgba(139, 92, 246, 1)',
                                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                        tension: 0.3,
                                        fill: true
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab