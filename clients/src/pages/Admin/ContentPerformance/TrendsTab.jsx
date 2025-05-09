import React from 'react'
import { LineChart } from '../../../components/Charts';
const TrendsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Content Trends</h2>
                <div className="h-96">
                    <LineChart
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    label: 'New Content',
                                    data: [12, 15, 18, 14, 20, 22],
                                    borderColor: 'rgba(59, 130, 246, 1)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                },
                                {
                                    label: 'Trending Topics',
                                    data: [8, 12, 15, 18, 22, 25],
                                    borderColor: 'rgba(16, 185, 129, 1)',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    tension: 0.3,
                                    fill: true
                                }
                            ]
                        }}
                    />
                </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Top Trending Topics</h2>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'CSS', 'JavaScript', 'Performance', 'Security', 'Testing', 'State Management', 'APIs'].map(topic => (
                        <span
                            key={topic}
                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm"
                        >
                            #{topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrendsTab