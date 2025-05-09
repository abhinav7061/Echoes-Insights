import React from 'react'
import { LineChart, BarChart, ScatterChart } from '../../../components/Charts';

const EngagementTab = () => {
    const engagementData = {
        datasets: [
            {
                label: 'Engagement Pattern',
                data: [
                    { x: 10, y: 20 },
                    { x: 15, y: 30 },
                    { x: 25, y: 10 },
                    { x: 30, y: 40 },
                    { x: 40, y: 35 },
                    { x: 50, y: 60 }
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <LineChart data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Comments',
                            data: [120, 190, 300, 500, 200, 300],
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.5)'
                        },
                        {
                            label: 'Shares',
                            data: [80, 120, 200, 350, 150, 250],
                            borderColor: 'rgb(16, 185, 129)',
                            backgroundColor: 'rgba(16, 185, 129, 0.5)'
                        }
                    ]
                }} options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Engagement Over Time' }
                    }
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <BarChart data={{
                        labels: ['Like', 'Comment', 'Share', 'Save'],
                        datasets: [{
                            label: 'Engagement Types',
                            data: [1200, 800, 500, 300],
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(245, 158, 11, 0.7)',
                                'rgba(139, 92, 246, 0.7)'
                            ]
                        }]
                    }} options={{
                        plugins: {
                            title: { display: true, text: 'Engagement Breakdown' }
                        }
                    }} />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <ScatterChart data={engagementData} options={{
                        plugins: {
                            title: { display: true, text: 'Engagement Patterns' }
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default EngagementTab