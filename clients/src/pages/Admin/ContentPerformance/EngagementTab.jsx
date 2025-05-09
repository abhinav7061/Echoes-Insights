import React from 'react'
import { BarChart, LineChart } from '../../../components/Charts';
const EngagementTab = () => {
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
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Engagement Metrics</h2>
                <div className="h-96">
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    label: 'Read Rate %',
                                    data: [55, 58, 62, 60, 65, 68],
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Like Rate %',
                                    data: [12, 14, 15, 13, 16, 18],
                                    borderColor: 'rgba(16, 185, 129, 1)',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Share Rate %',
                                    data: [4, 5, 6, 5, 7, 8],
                                    borderColor: 'rgba(245, 158, 11, 1)',
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Content Types Engagement</h2>
                    <div className="h-64">
                        <BarChart
                            data={{
                                labels: ['Articles', 'Tutorials', 'Courses', 'Guides'],
                                datasets: [
                                    {
                                        label: 'Read Rate %',
                                        data: [65, 72, 58, 63],
                                        backgroundColor: 'rgba(59, 130, 246, 0.7)'
                                    },
                                    {
                                        label: 'Like Rate %',
                                        data: [18, 22, 15, 16],
                                        backgroundColor: 'rgba(16, 185, 129, 0.7)'
                                    },
                                    {
                                        label: 'Share Rate %',
                                        data: [8, 10, 6, 7],
                                        backgroundColor: 'rgba(245, 158, 11, 0.7)'
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Top Engaging Content</h2>
                    <div className="space-y-3">
                        {[...contentPerformance]
                            .sort((a, b) => (b.reads / b.views) - (a.reads / a.views))
                            .slice(0, 5)
                            .map((content, index) => (
                                <div key={content.id} className="flex items-center justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{index + 1}</span>
                                        <p className="text-sm truncate max-w-xs">{content.title}</p>
                                    </div>
                                    <span className="text-sm font-medium">
                                        {Math.round((content.reads / content.views) * 100)}%
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EngagementTab