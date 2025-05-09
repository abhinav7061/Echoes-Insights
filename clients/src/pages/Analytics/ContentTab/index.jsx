import React from 'react'
import { PieChart, BarChart, ScatterChart } from '../../../components/Charts';

const ContentTab = () => {
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

    const contentPerformanceData = {
        labels: ['React Guide', 'CSS Tutorial', 'JS Patterns', 'Node.js Basics'],
        datasets: [
            {
                label: 'Views',
                data: [5000, 3000, 4000, 2000],
                backgroundColor: 'rgba(59, 130, 246, 0.5)'
            },
            {
                label: 'Engagement',
                data: [1200, 800, 1500, 600],
                backgroundColor: 'rgba(16, 185, 129, 0.5)'
            }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <BarChart data={contentPerformanceData} options={{
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Content Performance' },
                        legend: { position: 'bottom' }
                    }
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <ScatterChart data={engagementData} options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: { display: true, text: 'Engagement Patterns' }
                        },
                        scales: {
                            x: { title: { display: true, text: 'Read Duration (min)' } },
                            y: { title: { display: true, text: 'Engagement Score' } }
                        }
                    }} />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                    <PieChart data={{
                        labels: ['Articles', 'Videos', 'Podcasts'],
                        datasets: [{
                            data: [65, 25, 10],
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(245, 158, 11, 0.7)'
                            ]
                        }]
                    }} options={{
                        plugins: {
                            title: { display: true, text: 'Content Distribution' }
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default ContentTab